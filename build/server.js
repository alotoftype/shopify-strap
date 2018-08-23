/* CONFIG */
import config from './../sync.config.json';

export default BrowserSync => {

    return () => {

        let proxy = {};

        config.targets.forEach(target => {
            if (target.target_name === 'development') {
                proxy.domain = target.primary_domain;
                proxy.theme = target.theme_id;
            }
        });

        return BrowserSync({
            proxy: `${proxy.domain}/?preview_theme_id=${proxy.theme}`,
            files: ['./theme/assets/**'],
            serveStatic: ['./theme/assets'],
            https: true,
            notify: true,
            open: false,
            reloadOnRestart: true,
            https: {
                key: "./build/ssl/localhost.key",
                cert: "./build/ssl/localhost.crt"
            },
            snippetOptions: {
                rule: {
                    match: /<\/head>/i,
                    fn: (snippet, match) => {
                        return snippet + match;
                    }
                }
            },
            rewriteRules: [{
                    match: /(<link href=)(.*?)\/\/(cdn.shopify.com)(.*?)(stylesheet.css)/,
                    fn: () => '<link href="stylesheet.css'
                },
                {
                    match: /(<script src=)(.*?)\/\/(cdn.shopify.com)(.*?)(bundle.js)/,
                    fn: () => '<script src="bundle.js'
                }
            ]
        });
    }
}
/* CONFIG */
import {
    config
} from './../package.json';

import colors from 'colors';

export default function(gulp, plugins, mode, sync) {
    return () => {
        gulp
            .src(config.styles.src)
            .pipe(plugins.sass({
                outputStyle: 'uncompressed',
                includePaths: config.styles.include
            }).on('error', plugins.sass.logError))
            .pipe(mode.production(
                plugins.cssnano({
                    autoprefixer: {
                        add: true,
                        browsers: [
                            'Android >= 4.4',
                            'BlackBerry >= 11',
                            'Chrome >= 4',
                            'Firefox >= 4',
                            'Explorer >= 10',
                            'iOS >= 4.1',
                            'Opera >= 15',
                            'Safari >= 4',
                            'OperaMini >= 6',
                            'ChromeAndroid >= 10',
                            'FirefoxAndroid >= 4',
                            'ExplorerMobile >= 10'
                        ]
                    }
                })
            ))
            .pipe(plugins.rename('stylesheet.scss.liquid'))
            .pipe(mode.development(
                plugins.print.default(() => {
                    return colors['magenta'](colors.bold(`💈 Stylesheet Compiled`))
                })
            ))
            .pipe(gulp.dest(config.styles.dest))
            .pipe(mode.production(
                plugins.print.default(filename => {
                    return colors['yellow'](`💈 styles:`) + colors['magenta'](` ${filename}`)
                })
            ))
            .pipe(plugins.size({
                title: `💈`,
                gzip: true,
            }))
            .pipe(mode.production(sync.stream()));
    };
}
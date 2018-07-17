/* CONFIG */
import config from './../sync.config.json';

/* Modules */
import _ from 'lodash'
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';

export default BrowserSync => {

	return () => {

		let proxy = {};

		config.targets.forEach(target => {
			if(target.target_name === 'development') {
				proxy.domain = target.primary_domain;
			}
		});

		const stream = BrowserSync({
			proxy: `${proxy.domain}`,
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
		})

		return stream
	}
}
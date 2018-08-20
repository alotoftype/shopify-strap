/* CONFIG */
import {
	config
} from './../package.json';

import colors from 'colors';
import sourcemaps from 'gulp-sourcemaps';

export default function (gulp, plugins, mode, sync) {
	return () => {
		gulp
			.src(config.styles.src)
			.pipe(sourcemaps.init())
			.pipe(plugins.sass({
				outputStyle: 'compressed',
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
			//.pipe(plugins.postcss([ require('postcss-shopify-liquid-expander')]))
			.pipe(plugins.rename('stylesheet.css'))
			.pipe(plugins.replace('"{{', '{{'))
			.pipe(plugins.replace('}}"', '}}'))
			.pipe(mode.development(
				plugins.print.default(() => {
					return colors['magenta'](colors.bold(`💈 Stylesheet Compiled`))
				})
			))
			.pipe(sourcemaps.write())
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

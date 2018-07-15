/* CONFIG */
import {
	config
} from './../package.json';
import colors from 'colors';

export default function (gulp, plugins, mode, file) {
	return () => {
		gulp
			.src(config.json[file].src)
			.pipe(plugins.changed(config.json[file].dest))
			.pipe(mode.production(plugins.jsonminify()))
			.pipe(mode.development(
				plugins.print.default(filename => {
					return colors['magenta'](colors.bold(`JSON Compiled`))
				})
			))
			.pipe(mode.production(
				plugins.print.default(filename => {
					return colors['yellow'](`🔨 ${file}:`) + colors['magenta'](` ${filename}`)
				})
			))
			.pipe(gulp.dest(config.json[file].dest));
	};
}

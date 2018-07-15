/* CONFIG */
import {
	config
} from './../package.json';

/* PLUGINS */
import path from 'path';
import colors from 'colors';
import {
	Transform
} from "stream";

export default (gulp, plugins, mode, dir) => {

	let prefix = '';

	function getPrefix() {
		let stream = new Transform({
			objectMode: true
		});
		stream._transform = function (file, unused, callback) {
			let relative = path.relative(process.cwd(), file.path);
			prefix = path.parse(relative).dir.split(path.sep)[3];
			callback(null, file);
		};
		return stream;
	}

	return () => {

		gulp
			.src(config.views[dir].src)
			.pipe(plugins.changed(config.views[dir].dest))
			.pipe(mode.production(
				plugins.htmlmin({
					minifyJS: true,
					collapseWhitespace: true,
					processScripts: "text/template"
				})
			))
			.pipe(getPrefix(prefix))
			.pipe(plugins.rename(function (path) {
				if (dir === 'snippets') {
					path.basename = `${prefix}.${path.basename}`;
				}
			}))
			.pipe(plugins.changed(config.views[dir].dest))
			.on("error", console.log)
			.pipe(mode.development(
				plugins.print.default(() => {
					return colors['magenta'](colors.bold(`💧 View Compiled`))
				})
			))
			.pipe(mode.production(
				plugins.print.default(filename => {
					return colors['yellow'](`💧 views:`) + colors['magenta'](` ${filename}`)
				})
			))
			.pipe(gulp.dest(config.views[dir].dest));
	};
}

/* CONFIG */
import {
	config
} from './../package.json';

/* PLUGINS */
import rollup from 'rollup-stream';
import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import buffer from 'vinyl-buffer';
import resolveNodeModules from 'rollup-plugin-node-resolve';
import commonJs from 'rollup-plugin-commonjs';
import includePaths from 'rollup-plugin-includepaths';
import buble from 'rollup-plugin-buble';
import uglifyJs from 'rollup-plugin-uglify';
import fileSize from 'rollup-plugin-filesize';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import colors from 'colors';

export default function (gulp, file, mode, sync) {
	return () => {
		let cache;
		const stream = rollup({
			input: config.scripts[file].base + config.scripts[file].input,
			format: config.scripts[file].format,
			sourcemap: false,
			name: config.scripts[file].name,
			cache: cache,
			plugins: [
				resolveNodeModules(),
				commonJs(),
				includePaths({
					paths: config.scripts.include,
					extensions: ['.js']
				}),
				buble(),
				mode.production(uglifyJs()),
				fileSize()
			]
		})

		return stream.on('error', error => {
				console.log(
					colors['yellow']('[Rollup.js] ') +
					colors['red'](`ERROR\n\n`) +
					colors['grey'](`--------------------------------------\n`) +
					colors['red'](`${error.plugin}: `) + `${error.message}` +
					colors['grey'](`\n--------------------------------------`)
				)
				stream.emit('end')
			})
			.on( 'bundle', bundle => { cache = bundle; })
			.pipe(source(config.scripts[file].input, config.scripts[file].base))
			.pipe(buffer())
			.pipe(mode.development(
				sourcemaps.init({loadMaps: true})
			))
			.pipe(mode.development((
				sourcemaps.write('.')
			))
			.pipe(mode.development(sync.stream()))
			.pipe(gulp.dest(config.scripts.dest)));
	};
}

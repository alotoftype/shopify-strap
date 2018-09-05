/* CONFIG */
import {
    config
} from './../package.json';

/* PLUGINS */
import rollup from 'rollup-stream';
import buffer from 'vinyl-buffer';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import includePaths from 'rollup-plugin-includepaths';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify-es';
import fileSize from 'rollup-plugin-filesize';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import colors from 'colors';


export default (gulp, file, mode, sync, cache) => {

    return () => {
        const stream = rollup({
            input: config.scripts[file].base + config.scripts[file].input,
            format: config.scripts[file].format,
            sourcemap: mode.production() ? false : true,
            name: config.scripts[file].name,
            cache: cache,
            plugins: [
                nodeResolve({
                    jsnext: true,
                    main: true,
                    module: true,
                    browser: true
                }),
                commonjs({
                    include: 'node_modules/**'
                }),
                includePaths({
                    paths: config.scripts.include,
                    extensions: ['.js']
                }),
                buble(),
                mode.production(uglify()),
                fileSize()
            ]
        })

        stream
            .on('error', error => {
                console.log(
                    colors['yellow']('[Rollup.js] ') +
                    colors['red'](`ERROR\n\n`) +
                    colors['grey'](`--------------------------------------\n`) +
                    colors['red'](`${error.plugin}: `) + `${error.message}` +
                    colors['grey'](`\n--------------------------------------`)
                )
                stream.emit('end')
            })
            .on('bundle', bundle => cache = bundle)
            .pipe(source(config.scripts[file].input, config.scripts[file].base))
            .pipe(buffer())
            .pipe(mode.development(sourcemaps.init({
                loadMaps: true
            })))
            .pipe(mode.development(sourcemaps.write('.')))
            .pipe(gulp.dest(config.scripts.dest))
            .pipe(mode.development(sync.stream()));

        return stream;
    }
};
/* CONFIG */
import {
	config
} from './../package.json';

export default (gulp, plugins, mode) => {
	return () => {
		gulp
			.src(config.images.src)
			.pipe(plugins.flatten())
			.pipe(plugins.image(mode.development({
				pngquant: false,
				optipng: false,
				zopflipng: false,
				jpegRecompress: false,
				mozjpeg: false,
				guetzli: false,
				gifsicle: true,
				svgo: false,
				concurrent: 10,
				quiet: false // defaults to false
			})))
				.pipe(gulp.dest(config.images.dest));
			};
	}

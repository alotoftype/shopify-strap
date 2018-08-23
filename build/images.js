/* CONFIG */
import {
    config
} from './../package.json';

export default (gulp, plugins, mode) => {
    return () => {
        gulp
            .src(config.images.src)
            .pipe(plugins.flatten())
            .pipe(plugins.changed(config.images.dest, {
                hasChanged: plugins.changed.compareContents
            }))
            .pipe(plugins.image())
            .pipe(gulp.dest(config.images.dest));
    };
}
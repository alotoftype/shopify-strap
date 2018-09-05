import colors from 'colors';

export default function(gulp, plugins, mode) {

    const filename = mode.production() ? `production.zip` : `development.zip`;
    return () => {
        gulp.src('./theme/**/**')
            .pipe(plugins.zip(filename))
            .pipe(plugins.print.default(filename => {
                return colors['magenta'](colors.bold(`Theme Compiled`) + ` – ${filename}`)
            }))
            .pipe(plugins.size({
                gzip: true,
            }))
            .pipe(gulp.dest('./dist/'));
    };
}
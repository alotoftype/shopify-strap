/* CONFIG */
import {
   config
} from './../package.json';
import colors from 'colors';

export default function (gulp, plugins) {
   return () => {
      gulp.src('theme/**/**')
         .pipe(plugins.zip('theme.zip'))
         .pipe(plugins.print.default(filename => {
            return colors['magenta'](colors.bold(`Theme Compiled`)+ ` – ${filename}`)
         }))
         .pipe(plugins.size({
				gzip: true,
			}))
         .pipe(gulp.dest('.'));
   };
}

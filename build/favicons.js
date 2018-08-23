/* CONFIG */
import {
   config
} from './../package.json';

import colors from 'colors';

export default function (gulp, plugins) {
   return () => {
      gulp
         .src(config.favicons.src)
         .pipe(plugins.changed(config.favicons.dest))
         .pipe(plugins.print.default(filename => {
            return colors['yellow'](`🔨 Favicon: `) + colors['magenta'](` ${filename}`)
         }))
         .pipe(gulp.dest(config.favicons.dest));
   };
}

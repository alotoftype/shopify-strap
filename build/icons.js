/* CONFIG */
import { config } from './../package.json';

/* PLUGINS */
import svgSprite from 'gulp-svg-sprite';
import colors from 'colors';

export default (gulp, plugins, mode) => {
  const svgConfig = {
    mode: {
      symbol: {
        dest: config.icons.dest,
        sprite: 'icons.liquid',
        example: false // Build sample page
      }
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false // don't include the !DOCTYPE declaration
    }
  };
  return () => {
    gulp
      .src(config.icons.src)
      .pipe(svgSprite(svgConfig))

      .pipe(mode.development(
				plugins.print.default(filename => {
					return colors['magenta'](colors.bold(`◻️  Icons Compiled`))
				})
			))
			.pipe(mode.production(
				plugins.print.default(filename => {
					return colors['yellow'](`◻️  icons:`) + colors['magenta'](` ${filename}`)
				})
			))
      .pipe(gulp.dest('.'));
  };
}

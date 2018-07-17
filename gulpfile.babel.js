/* CONFIG (Imported) */
import {
	config
} from './package.json';

/* MODULES */
import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import sequence from 'gulp-sequence';
import bs from 'browser-sync';

/* TASKS */
import scripts from './build/scripts';
import styles from './build/styles';
import json from './build/json';
import views from './build/views';
import images from './build/images';
import icons from './build/icons';
import zip from './build/zip';
import clean from './build/clean';
import server from './build/server';

/* PROCESS */
const mode = require('gulp-mode')({
	modes: ['production', 'development'],
	default: 'development',
	verbose: false
});

/* THEME DEVELOPMENT */
gulp.task('scripts', scripts(gulp, 'bundle', mode, bs));
gulp.task('images', images(gulp, plugins(), mode));
gulp.task('icons', icons(gulp, plugins(), mode));
gulp.task('locales', json(gulp, plugins(), mode, 'locales'));
gulp.task('config', json(gulp, plugins(), mode, 'config'));
gulp.task('styles', styles(gulp, plugins(), mode, bs));
gulp.task('templates', views(gulp, plugins(), mode, 'templates'));
gulp.task('customers', views(gulp, plugins(), mode, 'customers'));
gulp.task('snippets', views(gulp, plugins(), mode, 'snippets'));
gulp.task('sections', views(gulp, plugins(), mode, 'sections'));
gulp.task('layout', views(gulp, plugins(), mode, 'layout'));
gulp.task('clean', clean(mode));
gulp.task('zip', zip(gulp, plugins()));
gulp.task('server', server(bs));
``

/* VIEWS TASK */
gulp.task('views', sequence(
	'templates',
	'customers',
	'snippets',
	'sections',
	'layout'
));

/* WATCH TASK */
gulp.task('watch', () => {
	gulp.watch(config.icons.watch, ['icons']).on('change', bs.reload);
	gulp.watch(config.json.locales.watch, ['locales']);
	gulp.watch(config.json.config.watch, ['config']);
	gulp.watch(config.images.watch, ['images']).on('change', bs.reload);
	gulp.watch(config.styles.watch, ['styles']);
	gulp.watch(config.scripts.bundle.watch, ['scripts']);
	gulp.watch(config.views.customers.watch, ['customers']).on('change', bs.reload);
	gulp.watch(config.views.snippets.watch, ['snippets']).on('change', bs.reload);
	gulp.watch(config.views.sections.watch, ['sections']).on('change', bs.reload);
	gulp.watch(config.views.templates.watch, ['templates']).on('change', bs.reload);
	gulp.watch(config.views.layout.watch, ['layout']).on('change', bs.reload);
});

/* BUILD TASK */
gulp.task('build', sequence(
	'clean',
	'views',
	'locales',
	'config',
	'styles',
	'scripts',
	'icons',
	'images'
));

/* PRODUCTION TASK */
gulp.task('production', sequence(
	'clean',
	'views',
	'locales',
	'config',
	'styles',
	'scripts',
	'icons',
	'images'
))

/* DEFAULT TASK */
gulp.task('default', ['watch', 'server']);

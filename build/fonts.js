
import {
	config
} from './../package.json';
import gulp, { src, dest} from 'gulp';

export default (gulp) => {
  return () => {
    gulp
     .src(config.fonts.src)
     .pipe(dest(config.fonts.dest));
  }

  }

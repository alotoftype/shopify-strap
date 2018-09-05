/* CONFIG */
import {
	config
} from './../package.json';

import del from 'del';
import colors from 'colors';

export default function (mode) {
   const isProduction = mode.production();
	const files = isProduction ? config.clean.production : config.clean.development;
   return () => {
      console.log(
         colors['green'](`\n♻️ ` + ` Preparing for build`) +
         colors['grey'](`\n--------------------------------------\n`) +
         colors['yellow']('Building Theme from src directory') +
         colors['grey'](`\n--------------------------------------`)
      );
      return del(files);
   };
}

import del from 'del';
import colors from 'colors';

export default function (mode) {
   return () => {
      console.log(
         colors['green'](`\n♻️ ` + ` Preparing for build`) +
         colors['grey'](`\n--------------------------------------\n`) +
         colors['yellow']('Building Theme from src directory') +
         colors['grey'](`\n--------------------------------------`)
      );
      return del(['./theme/**/**']);
   };
}

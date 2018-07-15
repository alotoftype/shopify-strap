/* Modules */
import 'picturefill';
import Turbolinks from 'turbolinks';
import ssm from 'simplestatemanager';

export default class App {

  static start() {
    Turbolinks.start();
  }

  static router(app) {

    // Load Once
    app.init();

    // Turbolinks OnReady
    document.addEventListener('turbolinks:load', event => {
      app.globals(event.target.body);
      if (typeof app[event.target.body.id].onLoad !== "undefined") {
        app[event.target.body.id].onLoad(event.target.body);
      }
    });

    // Turbolinks beforeRender
    document.addEventListener('turbolinks:before-render', event => {
      if (typeof app[event.data.newBody.id].onRender !== "undefined") {
        app[event.data.newBody.id].onRender(event.data.newBody);
      }
    });
  }

  static cache() {

    // Turbolinks Global Cache Control
    document.addEventListener('turbolinks:before-cache', () => {

      /**
       * Remove Responsive state Management of Components
       */
      ssm.removeStates([
       // States
      ]);
    });

  }

}

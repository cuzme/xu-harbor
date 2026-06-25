import type { App } from 'vue';
import * as components from './components';

export const install = function (app: App) {
  Object.values(components).forEach((component) => {
    if (typeof component.install === 'function') {
      app.use(component);
    }
  });
  return app;
};
export { ButtonPlus } from './components';
export default {
  install,
};

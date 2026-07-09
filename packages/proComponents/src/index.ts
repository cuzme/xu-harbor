import type { App } from 'vue';
import * as components from './components';

type ProGlobalComponents = typeof components;

declare module 'vue' {
  export interface GlobalComponents extends ProGlobalComponents {}
}

export const install = function (app: App) {
  Object.values(components).forEach((component) => {
    if (typeof component.install === 'function') {
      app.use(component);
    }
  });
  return app;
};
export * from './components';
export * from './composables';
export default {
  install,
};

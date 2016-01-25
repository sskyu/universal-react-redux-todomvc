import hook from 'css-modules-require-hook';
import sass from 'node-sass';
import { jsdom } from 'jsdom';

hook({
  extensions: ['.scss'],
  preprocessCss: data => sass.renderSync({ data }).css
});

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

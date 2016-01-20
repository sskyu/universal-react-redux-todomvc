import hook from 'css-modules-require-hook';
import sass from 'node-sass';

hook({
  extensions: ['.scss'],
  preprocessCss: data => sass.renderSync({ data }).css
});

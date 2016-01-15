import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

export default {
  debug: true,

  assets: {
    // images: {
    //   extensions: [
    //     'jpeg',
    //     'jpg',
    //     'png',
    //     'gif'
    //   ],
    //   parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    // },
    // svg: {
    //   extension: 'svg',
    //   parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    // },
    style_modules: {
      extensions: ['scss'],
      filter: (module, regexp, options, log) => {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regexp, options, log);
        } else {
          return regexp.test(module.name);
        }
      },
      path: (module, options, log) => {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        } else {
          return module.name;
        }
      },
      parser: (module, options, log) => {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        } else {
          return module.source;
        }
      }
    }
  }
};

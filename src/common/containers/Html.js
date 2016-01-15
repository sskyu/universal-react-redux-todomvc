import React, { Component, PropTypes } from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  };

  render() {
    const { assets, component, store } = this.props;
    const content = component ? renderToString(component) : '';

    console.log(assets.styles);

    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {this.renderStyleSheets(assets.styles)}
          <link href="/stylesheets/style.css" key="style" rel="stylesheet" type="text/css" />
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          <script
            dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${serialize(store.getState())};` }}
            charSet="UTF-8"
          />
          <script src={assets.javascript.app} charSet="UTF-8" />
        </body>
      </html>
    );
  }

  renderStyleSheets(styles) {
    const styleSheets = Object.keys(styles).map((style, key) => {
      <link
        href={styles[style]}
        key={key}
        media="screen, projection"
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
      />
    });
    return styleSheets;
  }
}

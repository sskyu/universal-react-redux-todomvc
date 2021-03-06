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

    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {this.renderStyleSheets(assets.styles)}
          {/*<link href="/stylesheets/style.css" key="style" rel="stylesheet" type="text/css" />*/}
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
    return Object.keys(styles).map((key, i) => {
      return (
        <link
          href={styles[key]}
          key={i}
          media="screen, projection"
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
        />
      );
    });
  }
}

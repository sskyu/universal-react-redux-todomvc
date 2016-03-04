import React, { Component, PropTypes } from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';

export default class Html extends Component {
  static propTypes = {
    component: PropTypes.node.isRequired,
    store: PropTypes.object.isRequired
  };

  render() {
    const { component, store } = this.props;
    const content = component ? renderToString(component) : '';

    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {this.renderStyleSheet()}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          <script
            dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${serialize(store.getState())};` }}
            charSet="UTF-8"
          />
          <script src='bundle.js' charSet="UTF-8" />
        </body>
      </html>
    );
  }

  renderStyleSheet() {
    if (__DEVELOPMENT__) {
      return;
    }

    return (
      <link
        href='app.css'
        media="screen, projection"
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
      />
    );
  }
}

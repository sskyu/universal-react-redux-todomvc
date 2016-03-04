import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, Router, RouterContext } from 'react-router';

import routes from '../common/routes';
import render from './render';

export default function (req, res, next) {
  match({ routes, location: req.path }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.status(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      render(renderProps)
        .then(html => res.status(200).send(html))
        .catch(e => {
          console.error(e);
          res.status(404).send();
        });
    } else {
      res.status(404).send('Not found');
    }
  });
};

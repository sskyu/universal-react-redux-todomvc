import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Navigator extends Component {
  render() {
    return (
      <div>
        <p>routing sample</p>
        <ul>
          <li><Link to={''}>todo</Link></li>
          <li><Link to={'comment'}>comment</Link></li>
          <li><Link to={'hoge'}>hoge</Link></li>
        </ul>
      </div>
    );
  }
}

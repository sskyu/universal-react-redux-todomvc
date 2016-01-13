import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Navigator extends Component {
  render() {
    return (
      <div>
        <p><Link to={''}>todo</Link></p>
        <p><Link to={'comment'}>comment</Link></p>
        <p><Link to={'hoge'}>hoge</Link></p>
      </div>
    );
  }
}

import React, { Component } from 'react';
import Navigator from '../components/Navigator';

export default class AppContainer extends Component {
  render() {
    return (
      <div>
        <Navigator />
        {this.props.children}
      </div>
    );
  }
}

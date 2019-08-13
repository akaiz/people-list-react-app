import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import UsersContainer from '../containers/UsersContainer';

export default class Main extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={UsersContainer} />
      </div>
    );
  }
}

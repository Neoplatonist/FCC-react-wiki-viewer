import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Header extends React.Component {
  render() {
    return (
      <header className="navbar-fixed">
        <nav>
          <div className="nav-wrapper cyan">
            <a href="" className="brand-logo center">Wikipedia Viewer</a>
          </div>
        </nav>
      </header>
    );
  }
}

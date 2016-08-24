import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Header from './components/header';
import Footer from './components/footer';

export default class App extends Component {
  constructor(props) {
    super(props);

    // All context binding goes here
    this.handleChange = this.handleChange.bind(this);

    // Defines all states used
    this.state = {
      list: {},
    }
  }

  // Pulls form input and queries wikipedia's api
  handleChange(event) {
    var query = event.target.value;
    var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
      query + '&limit=10&namespace=0&format=json';

    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'jsonp',
      headers: { 'Api-User-Agent': 'WikiViewer/1.0' },
      success: function(data) {
        this.setState({list: data}); // Sets api results to "list" state
      }.bind(this)
    });
  }

  // Creates a new div for each result and renders
  searchList(list) {
    if (list.length > 0) {
      return list[3].map((v, k) => {
        return (
          <div className="row" key={'searchList-' + k}>
            <div id="searchList" className="col s10 offset-s1 blue-grey lighten-5 round">
              <a target="_blank" href={v} className="blue-grey-text text-darken-4">
                <h4 className="center">{list[1][k]}</h4><hr />
                <p>{list[2][k]}</p>
              </a>
            </div>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <main className="container">
          <Helmet title='Go + React + Redux = rocks!' />
          <div className="row">
            <div className="col s12 center">
              <h6 id="random"><a target="_blank" href="https://en.wikipedia.org/wiki/Special:Random" className="grey-text text-darken-4"><strong>Click Here for a Random Article</strong></a></h6>
            </div>
          </div>
          <div id="search-container" className="row">
            <div className="col s6 offset-s3">
              {/* Waits for input then starts autorendering results through handleChange */}
              <input id="search" type="text" onChange={this.handleChange} placeholder="Type to Search" />
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              {/* When state changes it rerenders the searchList */}
              {this.searchList(this.state.list)}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

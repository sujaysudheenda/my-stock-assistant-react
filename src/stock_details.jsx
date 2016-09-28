var React = require('react');
var Fluxxor = require('fluxxor');
var StockStore = require('./store/stock_store');
var STOCK_STATES = require('./state/stock_states');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var StockDetails = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('StockStore')
  ],

  getStateFromFlux: function() {
    var state = this.getFlux().store('StockStore').getState();
    if (state.status === 'ERROR') {
      return {
        ERROR: 'error'
      };
    } else {
      return {
        inputJSON: state.data
      };
    }
  },

  getInitialState: function() {
    return null;
  },

  componentDidMount: function () {
    this.getFlux().actions.loadData();
  },

  render: function() {
    if (this.state.ERROR) {
      return (
        <div>{this.state.ERROR}</div>
      );
    }

    if (!this.state.inputJSON) {
      return (
        <div className="bs-component">
          <div className="progress progress-striped active">
            <div className="progress-bar"></div>
          </div>
        </div>
      );
    }

    return (
      <div className="page-header">
          <div className= "well infobox">
            <h2 className="text-primary">{this.state.inputJSON.Name}</h2>
            <p className="text-warning">ChangePercent {this.state.inputJSON.ChangePercent}</p>
            <p className="text-warning">{this.state.inputJSON.ChangePercent}</p>
            <p className="text-danger">Change {this.state.inputJSON.Change}</p>
            <p className="text-success">High {this.state.inputJSON.High}</p>
            <p className="text-warning">Low {this.state.inputJSON.Low}</p>
            <p className="text-info">ChangeYTD {this.state.inputJSON.ChangeYTD}</p>
            <p className="text-info">LastPrice {this.state.inputJSON.LastPrice}</p>
            <p className="text-info">ChangePercent {this.state.inputJSON.ChangePercentYTD}</p>
            <p className="text-info">MSDate {this.state.inputJSON.MSDate}</p>
            <p className="text-info">MarketCap {this.state.inputJSON.MarketCap}</p>
            <p className="text-info">Open {this.state.inputJSON.Open}</p>
            <p className="text-info">Status {this.state.inputJSON.Status}</p>
            <p className="text-info">Symbol {this.state.inputJSON.Symbol}</p>
            <p className="text-info">Timestamp {this.state.inputJSON.Timestamp}</p>
            <p className="text-info">Volume {this.state.inputJSON.Volume}</p>
          </div>
        </div>
    );
  }
});

module.exports = StockDetails;

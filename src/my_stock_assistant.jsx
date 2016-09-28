var React = require('react');
var Fluxxor = require('fluxxor');
var ReactDOM = require('react-dom');
var StockStore = require('./store/stock_store');
var STOCK_STATES = require('./state/stock_states');
var StockDetails = require('./stock_details');

class MyStockAssistant {
  initialize() {
    $("#getStock").click(function() {
      var flux = new Fluxxor.Flux();
      var stock = $('#inputSuccess').val();
      if(stock.trim() === '' || stock === undefined) {
        return;
      }
      ReactDOM.unmountComponentAtNode(document.getElementById('content'));
      flux.addStore('StockStore', new StockStore());
      flux.addActions({
        loadData: function() {
          $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=" + stock,
            success: function(data) {
              console.log(data);
              this.dispatch(STOCK_STATES.STOCK.LOAD_DATA_SUCCESS, data);
            }.bind(this),
            error: function() {
              this.dispatch(STOCK_STATES.STOCK.LOAD_ERROR_MESSAGE);
            }.bind(this),
            complete: function() {
            }.bind(this)
          });
        }
      });

      return ReactDOM.render(
        <StockDetails flux={flux}/>, document.getElementById('content')
      );
    });
  }
}

module.exports = MyStockAssistant;

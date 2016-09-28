/* require, module */

const Fluxxor = require('fluxxor');
const STOCK_STATES = require('../state/stock_states');

const StockStore = Fluxxor.createStore({
  initialize() {
    this.data = null;
    this.status = null;

    this.bindActions(
      STOCK_STATES.STOCK.LOAD_DATA_SUCCESS, this.onLoadDataSuccess
    );
    this.bindActions(
      STOCK_STATES.STOCK.LOAD_ERROR_MESSAGE, this.onLoadDataError
    );
  },

  onLoadDataSuccess(data) {
    this.data = data;
    this.status = 'SUCCESS';
    this.emit('change');
  },

  onLoadDataError() {
    this.status = 'ERROR';
    this.emit('change');
  },

  getState() {
    return {
      data: this.data,
      status: this.status,
    };
  },
});


module.exports = StockStore;

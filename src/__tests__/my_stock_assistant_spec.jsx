/* global describe, it, expect, Fluxxor, TestUtils, React */
jest.dontMock('../my_stock_assistant');
jest.dontMock('../store/stock_store');
jest.dontMock('object-assign');

var $ = require('jquery');
var React = require('react');
var Fluxxor = require('fluxxor');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var StockDetails = require('../stock_details');
var StockStore = require('../store/stock_store');

describe('StockDetails', function (){
  var component, element,
    renderComponent = function () {
      var fakeFlux = new Fluxxor.Flux(
        {'StockStore': new StockStore},
        {
          loadData: $.noop
        }
      );
      return TestUtils.renderIntoDocument(
        React.createElement(StockDetails, {flux: fakeFlux})
      );
    };

  describe('#getInitialState', function () {
    it('returns null', function () {
      var data = {inputJSON: null};
      expect(renderComponent().getInitialState()).toEqual(data);
    });

    it('getStateFromFlux returns null json', function () {
      expect(renderComponent().getStateFromFlux()).toEqual({inputJSON: null});
    });
  });

  describe('#render', function () {
    it('displays a json content', function () {
      var stockComponent = renderComponent();
      var data = {
        ChangePercent: 'change percent',
        Change: 'change',
        High: '113',
        Low: '110',
        ChangeYTD: 'some change',
        LastPrice: 'some data',
        ChangePercent: 'some data',
        MSDate: 'some data',
        MarketCap: 'some data',
        Open: '113',
        Status: 'SUCCESS',
        Symbol: 'AAPL',
        Timestamp: 'Tue Sep 27 00:00:00 UTC-04:00 2016',
        Volume: '24576155'
      };

      stockComponent.getFlux().store('StockStore').onLoadDataSuccess(data);
      element = TestUtils.findRenderedDOMComponentWithClass(stockComponent, 'page-header');

      expect(element).not.toBe(null);
    });
  });
});
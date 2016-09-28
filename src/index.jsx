import '!style!css!less!./css/main.less';
require('bootstrap-material-design/scripts/index.js');
var React = require('react');
var MyStockAssistant = require('./my_stock_assistant');

$.material.init();
new MyStockAssistant().initialize();

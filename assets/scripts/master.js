var $ = require('jquery');
var verifyDownload = require('./verify-download');
var analytics = require('./analytics');

$(document).ready(function() {
  analytics();
  verifyDownload();
});

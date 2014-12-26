+function(angular, undefined) {
  'use strict';
  var patterns = {
    absoluteURL: /(((^(http|https)\:)?\/\/)|([A-Za-z0-9]{2,}\.[A-Za-z]+))/i,
    leadingSlashes: /^\//,
    trailingSlashes: /\/$/,
  };

  angular
    .module('srph.xhr')
    .constant('SRPH_URL_PATTERNS', patterns);
}(angular);
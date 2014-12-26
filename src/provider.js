+function(angular, undefined) {
  'use strict';

  angular
    .module('srph.xhr')
    .provider('srphXhrFactory', providerBlock);

  /** Provider */
  function providerBlock(SRPH_URL_PATTERNS, SRPH_URL_PATTERNS) {
    var _this = this; // Ref
    var patterns = SRPH_URL_PATTERNS;

    _this.setBaseURL = setBaseURL;
    _this.setHeaders = setHeaders;
    _this.setCache = setCache;
    _this.setParams = setParams;
    _this.$get = $get;

    // Set defaults
    _this.baseURL = '';
    _this.params = [];
    _this.headers = [];
    _this.cache = false;

    // -------------------------------------

    /**
     * baseURL setter
     * @param {string} url
     */
    function setBaseURL(url) {
      _this.baseURL = removeTrailingSlashes(url);
    }

    /**
     * Set default headers
     * @param {Array} headers
     */
    function setHeaders(headers) {
      _this.headers = headers;
    }

    /**
     * Set default parameters for each request
     * @param {Array} params
     */
    function setParams(params) {
      _this.params = params;
    }

    /**
     * enable/disable cache for each request
     * @param {boolean} bool
     */
    function setCache(bool) {
      _this.cache = ( !angular.isUndefined(bool) ) ? bool : true;
    }

    /** Factory | $get */
    function $get($http) {
      return {
        request: request
      };

      /**
       * Sends a request to the server
       * @param  {Object} options [options needed for the requests]
       * @param  {Object|Data} data [data to be sent to the server]
       * @return promise
       */
      function request(options) {
        var request // Selected request
          // Shorthands
          , type = options.type
          , data = options.data
          , url  = srphURLProcessor.getFullURL(options.url)
          , headers = _this.headers
          , params = _this.params
          , cache = _this.cache;

        return $http({
          url: url,
          method: type,
          data: data,
          headers: headers,
          params: params,
          cache: cache
        });
      }
    }

    // -------------------------------------
    
    /**
     * Appropriately appends base url to the given url
     * @param  {string} url
     * @return {string} [full url]
     */
    function getFullURL(url) {
      // Append base URL is if not an aboslute url.
      // Return omitted trailing slashes
      if ( !patterns.absoluteURL.test(url) ) { 
        url = _this.baseURL + '/' + url;
      }

      return removeTrailingSlashes(url);
    }

    /**
     * Remove trailing slashes
     * @param {string} url
     * @returns {string} [processed url]
     */
    function removeTrailingSlashes(url) {
      if ( patterns.trailingSlashes.test(url) ) {
        url = url.substr(0, url.length - 1);
      }

      return url;
    }
  }
}(angular);
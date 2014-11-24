+function(angular, undefined) {
  'use strict';

  angular
    .module('srph.xhr')
    .provider('srphXhrFactory', providerBlock);

  /** Provider */
  function providerBlock() {
    var _this = this; // Ref

    _this.setBaseURL = setBaseURL;
    _this.setHeaders = setHeaders;
    _this.setCache = setCache;
    _this.setParams = setParams;
    _this.$get = $get;

    // ---------------------------------

    /** Regex patterns */
    var patterns = {
      absoluteURL: /^(http|ftp|https)?:\/\//i,
      forwardSlashes: /^\//,
      trailingSlashes: /\/$/,
    };

    /** Defaults */
    var defaults = {
      baseURL: '/',
      params: [],
      headers: [],
      cache: false
    };

    // Set defaults
    _this.baseURL = defaults.baseURL;
    _this.params = defaults.params;
    _this.headers = defaults.headers;
    _this.cache = defaults.cache;

    // -------------------------------------

    /**
     * baseURL setter
     * @param {string} url
     */
    function setBaseURL(url) {
      _this.baseURL = processURL(url);
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
        request: request,
        processURL: processURL,
        getFullURL: getFullURL,
        isAbsoluteURL: isAbsoluteURL
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
          , url  = this.getFullURL(options.url)
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
     * Appropriate appends base url
     * @param  {string} url
     * @return {string} [full url]
     */
    function getFullURL(url) {
      // Append base URL is if not an aboslute url.
      // Return omitted trailing slashes
      if ( !isAbsoluteURL(url) ) { 
        url = _this.baseURL + '/' + url;
      }

      return processURL(url);
    }

    /**
     * Remove trailing aslshes
     * @param {string} url
     * @returns {string} [processed url]
     */
    function processURL(url) {
      if ( patterns.trailingSlashes.test(url) ) {
        url = url.substr(0, url.length - 1);
      }

      return url;
    }

    /**
     * Check if the given is an absolute url
     * @param {string} url
     * @returns {boolean}
     */
    function isAbsoluteURL(url) {
      return patterns.absoluteURL.test(url);
    }
  }
}(angular);
+function(angular, undefined) {
  'use strict';

  angular
    .module('srph.xhr')
    .provider('srphXhrFactory', providerBlock);

  /** Provider */
  function providerBlock(SRPH_URL_PATTERNS) {
    var _this = this; // Ref
    var patterns = SRPH_URL_PATTERNS;

    _this.setBaseURL = setBaseURL;
    _this.setDefaultHeaders = setDefaultHeaders;
    _this.setCache = setCache;
    _this.setParams = setParams;
    _this.$get = $get;

    // Set defaults
    _this.baseURL = '';
    _this.params = [];
    _this.defaultHeaders = {};
    _this.cache = false;

    // -------------------------------------

    /**
     * baseURL setter
     * @param {string} url
     */
    function setBaseURL(url) {
      _this.baseURL = removeTrailingSlashes(url);
      return _this;
    }

    /**
     * Set default headers
     * @param {Array} headers
     */
    function setDefaultHeaders(headers) {
      if ( !angular.isObject(headers) ) {
        throw new Error([
          'Headers must be an object with the ',
          'following format { "key": value }'
        ].join(''));
      }

      _this.defaultHeaders = headers;

      return _this;
    }

    /**
     * Set default parameters for each request
     * @param {Array} params
     */
    function setParams(params) {
      _this.params = params;
      return _this;
    }

    /**
     * enable/disable cache for each request
     * @param {boolean} bool
     */
    function setCache(bool) {
      _this.cache = ( !angular.isUndefined(bool) ) ? !!bool : true;
      return _this;
    }

    /** Factory | $get */
    function $get($http) {
      return { request: request };

      /**
       * Sends a request to the server
       * @param  {Object} options [options needed for the requests]
       * @param  {Object|Data} data [data to be sent to the server]
       * @return promise
       */
      function request(options) {
        options = options || {};

        var request // Selected request
          // Shorthands
          , type = options.type || 'GET'
          , data = options.data
          , url  = getFullURL(options.url)
          , headers = angular.extend(options.headers || {}, _this.defaultHeaders)
          , params = _this.params
          , cache = options.cache || _this.cache;

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
      // If URL is undefined or blank, simply return the base URL
      if ( angular.isUndefined(url) || !url.trim().length ) {
        return _this.baseURL;
      }

      // Remove leading slashes since the condition below (absolute url)
      // prepends it in anyway.
      if ( patterns.leadingSlashes.test(url) ) {
        url = url.substr(1, url.length - 1);
      }

      // Append base URL is if not an aboslute url.
      //  Return omitted trailing slashes
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
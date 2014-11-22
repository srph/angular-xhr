+function(angular, undefined) {
  'use strict';

  angular
    .module('srph.xhr')
    .provider('srphXhrFactory', providerBlock);

  /** Provider */
  function providerBlock() {
    var _this = this; // Ref

    _this.setBaseURL = setBaseURL;
    _this.$get = $get;

    // ---------------------------------

    /** Regex patterns */
    var patterns = {
      absoluteURL: /^[http|https]?:\/\//i,
      forwardSlashes: /^\//,
      trailingSlashes: /\/$/,
    };

    /** Defaults */
    var defaults = {
      baseURL: '/',
      params: [],
      headers: [],
      extraFields: []
    }

    // Set defaults
    _this.baseURL = defaults.baseURL;
    _this.params = defaults.params;
    _this.headers = defaults.headers;
    _this.extraFields = defaults.extraFields;

    // -------------------------------------

    /** baseURL setter */
    function setBaseURL(url) {
      _this.baseURL = processURL(url);
    }

    /** Set default headers */
    function setHeaders(headers) {
      _this.headers = headers;
    }

    /** Set default fields */
    function setExtraFields(fields) {
      _this.extraFields = fields;
    }

    /** Factory | $get */
    function $get($http) {
      return {
        requests: requests,
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
          , requests // Request options
          // Shorthands
          , type = options.type
          , data = options.data
          , url  = this.getFullURL(options.url);

         requests = { 
          get: function() {
            return $http.get(url)
          },
          post: function() {
            return $http.post(url, data)
          },
          put: function() {
            return $http.put(url, data);
          }
        };

        request = (
          requests[type] ||
          requests['get']
        )();

        return request;
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
        url = this.baseURL + '/' + url;
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
        url = substring(0, url.length - 1);
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
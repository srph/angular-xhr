+function(angular, undefined) {

  /**
   * @author Kier Borromeo (srph)
   * @link //github.com/srph
   * @repository //github.com/srph/angular-xhr
   */
  angular.module('srph.xhr', []);
}(angular);
+function(angular, undefined) {
  angular
    .module('srph.xhr')
    .directive('srphXhr', directive);

  function directive(srphXhrFactory) {
    var scope = {
      url: '@srphXhr', // URL of the request
      type: '@requestType', // Type of the request
      data: '=requestData', // Data to be sent with the request
      cache: '&requestCache', // If to be cached
      successCb: '=requestSuccess', // Callback to be executed if request was successful
      errorCb: '=requestError' // Callback to be executed if request was settled with an error
    };

    // Directive properties
    return {
      scope: scope,
      restrict: 'EA',
      link: linkFn
    }

    /**
     * Creates a binding according to the
     * provided tag which executes
     * our CONTROLLER "request" method
     * 
     * @see SRPHXHRController
     * @see SRPHXHRController.request
     */
    function linkFn(scope, element, attributes, controller) {
      // Shorthand
      var factory = srphXhrFactory;

      // Gets the tag name of the element
      // which the directive is applied to:
      // extracts "FORM" from <form srph-xhr="...">
      var tag = element.prop("tagName");

      // Add fn to scope
      scope.request = request;

      // Properly an event listener depending
      // on the tag
      switch( tag.toLowerCase() ) {
        case 'form':
          element.on('submit', xhr);
          break;

        default:
          element.on('click', xhr);
          break;
      }

      /**
       * Call controller "request"
       * @param  {event} e
       */
      function xhr(e) {
        // e.preventDefault();
        scope.request( scope.data );
      }

      /**
      * Sends a request to the server
      * @see srphXhrFactroy
      * @see srphXhrFactory.request
      * @param  {Object} data [Data to be sent along with the request]
      * @return {promise}
      */
      function request(data) {
        var options = {
          url: scope.url,
          type: scope.type,
          cache: scope.cache,
          data: data
        };

        factory.request(options)
          .then(scope.successCb || angular.noop)
          .catch(scope.errorCb || angular.noop);
      }
    }
  }
  directive.$inject = ["srphXhrFactory"];
}(angular);
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
      if ( angular.isUndefined(url) || !url.trim().length ) {
        _this.baseURL = '';
      } else {
        _this.baseURL = removeTrailingSlashes(url);
      }

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
      _this.cache = ( !angular.isUndefined(bool) )
        ? bool
        : true;
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
  providerBlock.$inject = ["SRPH_URL_PATTERNS"];
}(angular);
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
+function(angular, undefined) {

  /**
   * @author Kier Borromeo (srph)
   * @link //github.com/srph
   * @repository //github.com/srph/angular-xhr
   */
  angular.module('srph.xhr', []);
}(angular);
+function(angular, undefined) {
  'use strict';
  angular
    .module('srph.xhr')
    .directive('srphXhr', directive);

  function directive(srphXhrFactory) {
    var scope = {
      url: '@srphXhr', // URL of the request
      type: '@requestType', // Type of the request
      data: '=requestData', // Data to be sent with the request
      params: '@requestParams', // Query parameters (?key=value&key2=value)
      cache: '&requestCache', // If to be cached
      successCb: '&requestSuccess', // Callback to be executed if request was successful
      errorCb: '&requestError', // Callback to be executed if request was settled with an error
      preAction: '&requestPreAction', // Callback to be executed before the request
      postAction: '&requestPostAction' // Callback to be automatically executed after the request (final block)
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
    function linkFn(scope, element, attributes) {
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
      function xhr(evt) {
        // evt.preventDefault();
        scope.request( scope.data );
      }

      /**
      * Sends a request to the server
      * @see srphXhrFactroy
      * @see srphXhrFactory.request
      * @param  {Object} data [Data to be sent along with the request]
      * @throws Error
      * @return {promise}
      */
      function request(data) {

        // Execute pre-action, and simply halt execution
        // of the whole request if it returns false
        var preAction = scope.preAction();
        if ( !angular.isUndefined(preAction)
            && angular.isBoolean(preAction) && !preAction ) return;

        var params;

        // JSON throws an error if the JSON format is incorrect
        // However, non-objects are stil parsed.
        // If the query parameters was defined while
        // not an object, throw an error
        if ( !angular.isUndefined(scope.params) ) {
          params = JSON.parse(scope.params);

          if ( !angular.isObject(params) ) {
            throw new Error('Parameters must be an object!');
          }
        }
        
        var options = {
          url: scope.url,
          type: scope.type,
          cache: scope.cache,
          params: params || {},
          data: data
        };

        return factory.request(options)
          .then(thenFn)
          .catch(catchFn)
          .finally(finallyFn);

        /** Shortcut to perform expression with given params */
        function promiseFn(expression, r, s, h, c) {
          expression({ response: r, status: s, headers: h, config: c });
        }

        /**
         * Promise handlers
         * @see promiseFn
         * @params {object|array} r Response
         * @params {string} s Status
         * @params {object} h Headers
         * @params {object} c Config
         */

        function thenFn(r, s, h, c) { promiseFn(scope.successCb, r, s, h, c); }
        function catchFn(r, s, h, c) { promiseFn(scope.errorCb, r, s, h, c); }
        function finallyFn(r, s, h, c) { promiseFn(scope.postAction, r, s, h, c); }
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
    _this.setDefaultParams = setDefaultParams;
    _this.$get = $get;

    // Set defaults
    _this.baseURL = '';
    _this.defaultHeaders = {};
    _this.cache = false;
    _this.params = {
      "get": {},
      "post": {},
      "put": {},
      "patch": {},
      "delete": {}
    };

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
    function setDefaultParams(types, params) {
      if ( !angular.isObject(params) ) {
        throw new Error('Parameters must be an object!');
      }

      if ( angular.isArray(types) ) {
        types.forEach(function(type) { _this.setDefaultParams(type, params); });
      } else {
        // Checks if the request type does not exist
        if ( Object.keys(_this.params).indexOf( types.toLowerCase() ) == -1 ) {
          throw new Error([
            'Request type does not exist; must either be ',
            'a GET, POST, PUT, PATCH, or DELETE'
          ].join(''));
        }

        _this.params[types] = params;
      }

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
          , headers = angular.extend({}, _this.defaultHeaders, options.headers || {})
          , params = angular.extend({}, _this.params[type.toLowerCase()], options.params || {})
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
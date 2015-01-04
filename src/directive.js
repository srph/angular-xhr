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
}(angular);
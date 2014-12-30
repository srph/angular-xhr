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
      * @return {promise}
      */
      function request(data) {
        var params;

        if ( !angular.isUndefined(scope.params) ) {
          params = JSON.parse(scope.params);

          if ( !angular.isObject(params) ) {
            throw new Error('Parameters must be an object!');
          }
        }

        ( scope.preAction || angular.noop )(); // Execute pre
        
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

        /**
         * Promise handlers
         */

        function thenFn(response, status, headers, config) {
          scope.successCb({
            response: response,
            status: status,
            headers: headers,
            config: config
          });
        }

        function catchFn(response, status, headers, config) {
          scope.errorCb({
            response: response,
            status: status,
            headers: headers,
            config: config
          });
        }

        function finallyFn(response, status, headers, config) {
          scope.postAction({
            response: response,
            status: status,
            headers: headers,
            config: config
          });
        }
      }
    }
  }
}(angular);

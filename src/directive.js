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
}(angular);
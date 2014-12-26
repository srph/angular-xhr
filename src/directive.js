+function(angular, undefined) {
  angular
    .module('srph.xhr')
    .directive('srphXhr', directive);

  function directive() {
    var scope = {
      url: '@srphXhr', // URL of the request
      type: '@requestType', // Type of the request
      data: '=requestData', // Data to be sent with the request
      successCb: '=requestSuccess', // Callback to be executed if request was successful
      errorCb: '=requestError' // Callback to be executed if request was settled with an error
    };

    // Directive properties
    return {
      scope: scope,
      restrict: 'EA',
      // replace: true, 
      link: linkFn,
      bindToController: true,
      controllerAs: 'xhrCtrl',
      controller: controllerFn
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
      // Gets the tag name of the element
      // which the directive is applied to:
      // extracts "FORM" from <form srph-xhr="...">
      var tag = element.prop("tagName");

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
        controller.request( controller.data );
      }
    }

    function controllerFn($scope, srphXhrFactory) {
      var vm = this;
      var factory = srphXhrFactory; // Shorthand

      vm.request = request;

      /**
      * Sends a request to the server
      * @see srphXhrFactroy
      * @see srphXhrFactory.request
      * @param  {Object} data [Data to be sent along with the request]
      * @return {promise}
      */
      function request(data) {
        var options = {
          url: vm.url,
          type: vm.type,
          data: data
        };

        factory.request(options)
          .then(vm.successCb || angular.noop)
          .catch(vm.errorCb || angular.noop);
      }
    }
  }
}(angular);
+function(angular, undefined) {
  angular
    .module('srph.xhr')
    .directive('srphXhr', directive);

  function directive() {
    var scope = {
      url: '@srphXhr',
      type: '@requestType',
      data: '=requestData',
      successCb: '=requestSuccess',
      errorCb: '=requestError'
    };

    // Directive properties
    return {
      scope: scope,
      restrict: 'EA',
      replace: true,
      link: linkFn,
      bindToController: true,
      controllerAs: 'xhrCtrl',
      controller: 'SRPHXHRController'
    }

    function linkFn(scope, element, attributes, controller) {
      var tag = element.prop("tagName");

      console.log(tag);

      if ( tag === 'form' ) {
        element.on('submit', xhr);
      } else {
        element.on('click', xhr);
      }

      /** Call controller request */
      function xhr(e) {
        // e.preventDefault();
        controller.request( controller.data );
      }
    }
  }
}(angular);
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
      template: template,
      link: linkFn,
      bindToController: true,
      controllerAs: 'xhrCtrl',
      controller: 'SRPHXHRController'
    }

    function linkFn(element, scope, attributes, controller) {
      element.on('click', function XHROnClick() {
        controller.request( controller.data );
      });
    }
  }
}(angular);
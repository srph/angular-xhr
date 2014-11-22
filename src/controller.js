+function(angular, undefined) {
  angular
    .module('srph.xhr')
    .controller('SRPHXHRController', XHRController);

  function XHRController($scope, srphXhrFactory) {
    var vm = this;

    vm.request = request;

    /** Sends a request to the server */
    function request(data) {
      var options = {
        url: vm.url,
        type: vm.type,
        data: data
      };

      factory(options)
        .then(callback.success)
        .catch(callback.error);
    }
  }
}(angular);
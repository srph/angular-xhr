+function(angular, undefined) {
  angular
    .module('srph.xhr')
    .controller('SRPHXHRController', XHRController);

  function XHRController($scope, srphXhrFactory) {
    var vm = this
      , factory = srphXhrFactory; // Shorthand

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
}(angular);
+function(angular, undefined) {
  angular
    .module('srph.xhr')
    .controller('SRPHXHRController', XHRController);

  function XHRController($scope, srphXhrFactory) {
    var vm = this;

    vm.request = request;

    /** Sends a request to the server */
    function request(options, data) {
      // Shorthand
      var request,
          type = options.type,
          data = options.data,
          url  = srphXhrFactory.getFullURL(options.url);

      // --
      var callback = {
        error: vm.error || angular.noop,
        success: vm.success || angular.noop
      };

      /** Types of XHR */
      var requests = { 
        get: function() {
          return $http.get(url)
        },
        post: function() {
          return $http.post(url, data)
        },
        put: function() {
          return $http.put(url, data);
        }
      };

      request = (requests[type] || requests['get']);

      request()
        .then(callback.success)
        .catch(callback.error);
    }
  }
}(angular);
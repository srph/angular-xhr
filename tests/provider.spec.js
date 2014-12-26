describe('service and provider', function() {
  
  var provider;
  beforeEach(function() {
    angular
      .module('srph.xhr.test', function() { })
      .config(function(srphXhrFactoryProvider) { provider = srphXhrFactoryProvider; });
    module('srph.xhr', 'srph.xhr.test');
    inject(function() { });
  });

  describe('setting base url', function() {
    it('should remove trailing slashes', function() {
      provider.setBaseURL('https://pogi.com/asdad/');
      expect(provider.baseURL).toBe('https://pogi.com/asdad');
    });
  });
});
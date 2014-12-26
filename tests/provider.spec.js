describe('service and provider', function() {
  
  var provider;
  beforeEach(function() {
    angular
      .module('srph.xhr.test', function() { })
      .config(function(srphXhrFactoryProvider) { provider = srphXhrFactoryProvider; });
    module('srph.xhr', 'srph.xhr.test');
    inject(function() { });
  });

  it('should method chain when calling the setter methods', function() {
    expect(provider.setBaseURL()).toEqual(provider);
    expect(provider.setCache()).toEqual(provider);
    expect(provider.setParams()).toEqual(provider);
    expect(provider.setHeaders()).toEqual(provider);
  });

  describe('setting base url', function() {
    it('should remove trailing slashes', function() {
      provider.setBaseURL('https://pogi.com/asdad/');
      expect(provider.baseURL).toBe('https://pogi.com/asdad');
    });
  });

  describe('factory recipe ($get) request', function() {
    var $http;
    var $httpBackend;
    var $get;
    beforeEach(function() {
      inject(function(_$httpBackend_, srphXhrFactory) { $httpBackend = _$httpBackend_; $get = srphXhrFactory; });
      $httpBackend.when('GET', 'pogi.com').respond(200);
      $httpBackend.when('GET', 'pogi.com/yolo').respond(200);
      $httpBackend.when('GET', 'yolo').respond(200);
    });

    it('should default to GET if provided type is undefined', function() {
      $httpBackend.expectGET('pogi.com');
      provider.setBaseURL('pogi.com');
      $get.request({});
    })

    it('should omit leading slashes to provided url', function() {
      $httpBackend.expectGET('pogi.com/yolo');
      provider.setBaseURL('pogi.com');
      $get.request({ type: 'GET', url: '/yolo' });
    });

    it('should append base url to the provided url', function() {
      $httpBackend.expectGET('pogi.com/yolo');
      provider.setBaseURL('pogi.com');
      $get.request({ url: 'yolo', type: 'GET' });
    });

    it('should remove trailed slashes to the provided url', function() {
      $httpBackend.expectGET('pogi.com');
      provider.setBaseURL('pogi.com/');
      $get.request();
    });

    it('should remove leading slashes to the provided url', function() {
      $httpBackend.expectGET('pogi.com/yolo');
      provider.setBaseURL('pogi.com');
      $get.request({ url: 'yolo/' });
    });

    it('should simply request to base url if provided url is blank', function() {
      $httpBackend.expectGET('pogi.com');
      provider.setBaseURL('pogi.com');
      $get.request({ type: 'GET' });
    });

    afterEach(function() {
      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });
});
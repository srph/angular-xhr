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
    expect(provider.setDefaultParams('get', {})).toEqual(provider);
    expect(provider.setDefaultHeaders({ "key": "value" })).toEqual(provider);
  });

  describe('setting base url', function() {
    it('should remove trailing slashes', function() {
      provider.setBaseURL('https://pogi.com/asdad/');
      expect(provider.baseURL).toBe('https://pogi.com/asdad');
    });
  });

  describe('setting default headers', function() {
    it('should throw an error if provided headers is not an object', function() {
      expect( function() { provider.setDefaultHeaders('hello'); }).toThrow(new Error([
          'Headers must be an object with the ',
          'following format { "key": value }'
        ].join('')));
    });
  });

  describe('setting default params', function() {
    it('should throw an error if the provided params is not an object', function() {
      expect(function() { provider.setDefaultParams('get', 'asd'); })
        .toThrow(new Error('Parameters must be an object!'));
    });

    it('should throw an error if the provided request type does not exist', function() {
      expect(function() { provider.setDefaultParams('asd', {}); })
        .toThrow(new Error([
          'Request type does not exist; must either be ',
          'a GET, POST, PUT, PATCH, or DELETE'
        ].join('')));
    });

    it('should have the new set request type', function() {
      provider.setDefaultParams('get', { "yolo": '5' });
      expect(provider.params.get).toEqual({ "yolo": '5' });
    });

    it('should execute a recursion when an array is passed as request type', function() {
      provider.setDefaultParams(['get', 'post'],   { "yolo": '5' });
      expect(provider.params.get).toEqual({ "yolo": '5' });
      expect(provider.params.post).toEqual({ "yolo": '5' });
      expect(provider.params.get).toEqual(provider.params.post);
    });
  });

  describe('setting cache', function() {
    it('should be true if no argument is provided', function() {
      provider.setCache();
      expect(provider.cache).toBe(true);
    });

    it('should work as it is, set cache to provided argument', function() {
      provider.setCache(false);
      expect(provider.cache).toBe(false)
      provider.setCache(true);
      expect(provider.cache).toBe(true)
    });
  });

  describe('request with factory recipe ($get)', function() {
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
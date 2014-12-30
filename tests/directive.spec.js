describe('directive (form / button)', function() {
  var element, html;
  var html;
  var spyEvt;
  var $compile, $rootScope;
  var $httpBackend;
  var $scope;
  beforeEach(module('srph.xhr'));
  beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();

    $httpBackend.when('GET', 'pogi.com').respond(200);
    $httpBackend.when('GET', 'pogi.com?key=5').respond(200);
  }));

  describe('proper binding of event listener', function() {
    it('should call an XHR on submit if it is a form', function() {
      $httpBackend.expectGET('pogi.com');
      element = compile('<form id="form" srph-xhr="pogi.com"></form>');

      spyEvt = spyOnEvent(element, 'submit');
      element.triggerHandler('submit');
      expect('submit').toHaveBeenTriggeredOn(element);
      expect(spyEvt).toHaveBeenTriggered();
      $httpBackend.flush();
    });

    it('should not call an XHR on button click if it is a form', function() {
      element = compile('<form id="form" srph-xhr="pogi.com"><button type="submit">Submit</button></form>');
      var btn = element.find('button[type=submit]');
      spyEvt = spyOnEvent(btn, 'click');
      btn.triggerHandler('click');
      expect('click').toHaveBeenTriggeredOn(btn);
      expect(spyEvt).toHaveBeenTriggered();
    });

    it('should call an XHR on click if it is a button', function() {
      $httpBackend.expectGET('pogi.com');
      element = compile('<button type="button" srph-xhr="pogi.com">Submit</button>');
      spyEvt = spyOnEvent(element, 'click');
      element.triggerHandler('click');
      expect('click').toHaveBeenTriggeredOn(element);
      expect(spyEvt).toHaveBeenTriggered();
      $httpBackend.flush();
    });
  });

  describe('params', function() {
    it('should be a blank object if not defined', function() {
      $httpBackend.expectGET('pogi.com');
      element = compile('<button type="button" srph-xhr="pogi.com">Request</button>');
      element.triggerHandler('click');
      $httpBackend.flush();
    });

    it('should send to ?key=value if defined', function() {
      $httpBackend.expectGET('pogi.com?key=5');
      element = compile("<button type='button' srph-xhr='pogi.com' request-params='{ \"key\": 5 }'>Request</button>");
      element.triggerHandler('click');
      $httpBackend.flush();
    });

    it('should throw an error if passed param is not an object', function() {
      element = compile("<button type='button' srph-xhr='pogi.com' request-params='true'>Request</button>");
      expect(function() { element.triggerHandler('click'); })
        .toThrow(new Error('Parameters must be an object!'));
    });
  });

  afterEach(function() {
    // $httpBackend.flush();
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  function compile(html) {
    var _element = $compile(html)($scope);
    $scope.$digest();
    return _element;
  }
});
describe('url patterns', function() {
  beforeEach(module('srph.xhr'));
  var patterns;
  var abs;
  var trail;

  beforeEach(inject(function(_SRPH_URL_PATTERNS_) {
    patterns = _SRPH_URL_PATTERNS_;
    abs = patterns.absoluteURL;
    trail = patterns.trailingSlashes;
  }));

  describe('absolute url', function() {
    it('should match www.*.com', function() {
      expect('www.com').toMatch(abs);
      expect('www.www.com').toMatch(abs);
    });

    it('should match urls with no scheme', function() {
      expect('//hello.com').toMatch(abs);
    });

    it('should match http and https', function() {
      expect('http://hello.com').toMatch(abs);
      expect('https://hello.com').toMatch(abs);
    });
  });

  describe('trailing slashes', function() {
    it('should match trailing slashes', function() {
      expect('pogi/').toMatch(trail);
    });

    it('should not match without trailing slashes', function() {
      expect('pogi').not.toMatch(trail);
    })
  });
});
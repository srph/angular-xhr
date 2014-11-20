+function(angular, undefined) {
  'use strict';

  angular
    .module('srph.xhr')
    .provider('srphXhrFactory', providerBlock);

  /** Provider */
  function providerBlock() {
    var _this = this; // Ref

    _this.setDefaultURL = setDefaultURL;
    _this.$get = $get;

    /** Regex patterns */
    var patterns = {
      absoluteURL: /^[http|https]?:\/\//i,
      forwardSlashes: /^\//,
      trailingSlashes: /\/$/,
    };

    /** Defaults */
    var defaults = {
      baseURL: '/'
      params: [],
      headers: [],
      extraFields: []
    }

    // Set defaults
    _this.baseURL = defaults.baseURL;
    _this.params = defaults.headers;
    _this.headers = defaults.headers;
    _this.extraFields = defaults.extraFields;

    // -------------------------------------

    /** baseURL setter */
    function setDefaultURL(url) {
      _this.baseURL = processURL(url);
    }

    /** Factory | $get */
    function $get() {
      return {
        processURL: processURL,
        getFullURL: getFullURL,
        isAbsoluteURL: isAbsoluteURL
      };
    }

    // -------------------------------------
    
    /**
     * Appropriate appends base url
     * @param  {string} url
     * @return {string} [full url]
     */
    function getFullURL(url) {
      // Append base URL is if not an aboslute url.
      // Return omitted trailing slashes
      if ( !isAbsoluteURL(url) ) { 
        url = this.baseURL + '/' + url;
      }

      return processURL(url);
    }

    /**
     * Remove trailing aslshes
     * @param {string} url
     * @returns {string} [processed url]
     */
    function processURL(url) {
      if ( patterns.trailingSlashes.test(url) ) {
        url = substring(0, url.length - 1);
      }

      return url;
    }

    /**
     * Check if the given is an absolute url
     * @param {string} url
     * @returns {boolean}
     */
    function isAbsoluteURL(url) {
      return patterns.absoluteURL.test(url);
    }
  }
}(angular);
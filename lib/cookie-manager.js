let {Cc, Ci} = require('chrome');
let querystring = require('sdk/querystring');
let cookie_service = Cc["@mozilla.org/cookieService;1"].getService(Ci['nsICookieService']);
let io_service = Cc["@mozilla.org/network/io-service;1"].getService(Ci['nsIIOService']);

let get, set, remove, CookieManager;

get = function (domain, key) {
  var uri = io_service.newURI(domain, null, null);
  // String containing all cookies for given domain.
  cookies_string = cookie_service.getCookieString(uri, null);
  cookie_pairs = querystring.parse(cookies_string, '; ', '=');
  cookie_val = cookie_pairs[key];
  return cookie_val;
};

set = function (domain, key, val, expiration) {
  // String representing all data for this cookie.
  params_string = '';
  params_string += key + '=' + val + ';';
  
  // Domain should start with a dot, so that the cookie is valid for all the
  // subdomains. E.g. cookie saved with domain '.google.com' is valid for
  // 'google.com' and 'mail.google.com'.
  uri = io_service.newURI(domain, null, null);
  params_string += 'domain=.' + uri.host + ';';
  
  // Expiration timestamp must be added as GMT string.
  if (typeof expiration === 'number') {
    now_stamp = (new Date).getTime();
    expire_stamp = now_stamp + expiration;
    expire_string = (new Date(expire_stamp)).toGMTString();
    params_string += 'expires=' + expire_string + ';';
  }
  
  cookie_service.setCookieString(uri, null, params_string, null);
};

remove = function (domain, key) {
  // Remove cookie by saving it with expiration timestamp in the past.
  set(domain, key, null, -1)
}

// Convenience object that remembers default values for domain and expiration.
// Expiration is set in days instead of milliseconds, as this is the most
// common case.
CookieManager = (function() {
  function CookieManager(domain, expiration_days) {
    this.domain = domain;
    this.expiration = expiration_days * 24 * 60 * 60 * 1000;
  }

  CookieManager.prototype.set = function(key, val) {
    set(this.domain, key, val, this.expiration);
  };

  CookieManager.prototype.get = function(key) {
    return get(this.domain, key);
  };

  CookieManager.prototype.remove = function(key) {
    remove(this.domain, key);
  };

  return CookieManager;

})();

// Expose methods to the export object.
exports.get = get;
exports.set = set;
exports.remove = remove;
exports.CookieManager = CookieManager;

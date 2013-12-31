let cookieManager = require("./cookie-manager");

let expiration = 7*24*60*60*1000;
let domain = 'http://google.com/';

// Set some testing cookies.
cookieManager.set(domain, 'aaa', 'bbb', expiration);
cookieManager.set(domain, 'ccc', 'ddd', expiration);
cookieManager.set(domain, 'eee', 'fff', expiration);
// Remove a cookie.
cookieManager.remove(domain, 'ccc');
// Get cookie values.
existing_cookie = cookieManager.get(domain, 'aaa');
removed_cookie = cookieManager.get(domain, 'ccc');
non_existing_cookie = cookieManager.get(domain, 'zzz');

exports["test if Cookie Manager exists"] = function(assert) {
  assert.notEqual(typeof cookieManager, 'undefined');
};

exports["test if all methods are exported"] = function(assert) {
  assert.equal(typeof cookieManager.set, 'function');
  assert.equal(typeof cookieManager.get, 'function');
  assert.equal(typeof cookieManager.remove, 'function');
};

exports["test if cookies can be set and get"] = function(assert) {
  assert.equal(existing_cookie, 'bbb');
};

exports["test if cookies can be removed"] = function(assert) {
  assert.equal(removed_cookie, null);
};

exports["test if getting non-existing cookie returns null"] = function(assert) {
  assert.equal(non_existing_cookie, null);
};

// Convenience object.
exports["test convenience object"] = function (assert) {
  obj = new cookieManager.CookieManager(domain, 7);
  obj.set('aaa', 'bbb');
  obj.set('ccc', 'ddd');
  obj.set('eee', 'fff');
  obj.remove('ccc');
  assert.equal(obj.get('aaa'), 'bbb');
  assert.equal(obj.get('ccc'), null);
}

require("sdk/test").run(exports);

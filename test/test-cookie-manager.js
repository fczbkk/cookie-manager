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

require("sdk/test").run(exports);


/*
cookie = require('./cookie')

exports['test Cookie Manager methods'] = (assert) ->
  assert.ok cookie, 'exported object existence'
  assert.ok cookie.set, 'set() method existence'
  assert.ok cookie.get, 'get() method existence'
  assert.ok cookie.remove, 'remove() method existence'

exports['test Cookie Manager set() method'] = (assert) ->
  cookie.set 'http://google.com/', 'aaa', 'bbb', 7*24*60*60*1000
  result = cookie.get 'http://google.com/', 'aaa'
  assert.equal result, 'bbb', 'set() method'

exports['test Cookie Manager get() method'] = (assert) ->
  cookie.set 'http://google.com/', 'aaa', 'bbb', 7*24*60*60*1000
  result = cookie.get 'http://google.com/', 'aaa'
  assert.equal result, 'bbb', 'get() method'

exports['test Cookie Manager remove() method'] = (assert) ->
  cookie.set 'http://google.com/', 'aaa', 'bbb', 7*24*60*60*1000
  result_before_removal = cookie.get 'http://google.com/', 'aaa'
  cookie.remove 'http://google.com/', 'aaa'
  result_after_removal = cookie.get 'http://google.com/', 'aaa'
  assert.equal result_before_removal, 'bbb', 'remove() method'
  assert.equal result_after_removal, null, 'remove() method'

require('sdk/test').run exports

*/
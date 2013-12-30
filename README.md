Cookie Manager for Firefox SDK (Jetpack)
========================================

Reusable module for cookie management in Firefox addons. It lets you set, get and remove cookies.

Usage
-----

```javascript
// Import the module.
let cookieManager = require("./cookie-manager");

// Set the cookie.
// Cookie with key 'aaa' and value 'bbb' will be saved. It will be accessible
// on domain 'google.com' and all it's subdomains. The cookie will be valid
// for 7 days (expiration time is set in microseconds).
cookieManager.set('http://google.com/', 'aaa', 'bbb', 7*24*60*60*1000);

// Get cookie's value.
var cookie_value = cookieManager.get('http://google.com/', 'aaa'); // => 'bbb'

// Remove cookie.
cookieManager.remove('http://google.com/', 'aaa');

// Removed or non-existing cookies will return null.
removed_cookie = cookieManager.get(domain, 'aaa'); // => null
non_existing_cookie = cookieManager.get(domain, 'zzz'); // => null
```

Instalation
-----------

TODO

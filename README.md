Cookie Manager for Firefox SDK (Jetpack)
========================================

Reusable module for cookie management in Firefox addons. It lets you set, get and remove cookies.

Usage
-----

```javascript
// Import the module.
let cookieManager = require("cookie-manager");

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

Convenience object
------------------

When working with cookies, most of the time you just want to set and get cookies, that are specified for your project's domain. Also, you usualy set cookie's expiration in days instead of milliseconds. That's why there's a handy convenience object:

```javascript
// Import the module.
let CookieManager = require('cookie-manager').CookieManager;

// Create your object with default values. All cookies will be saved for
// domain '.google.com' and will be valid for 7 days.
var MyCookies = new CookieManager('http://google.com/', 7);

MyCookies.set('aaa', 'bbb');
MyCookies.get('aaa'); // => 'bbb'
MyCookies.remove('aaa');
```

Instalation
-----------

You can follow the [official documentation for installing modules][1], which recommends downloading and extracting the source code of module manually.

But I think the better approach is to **clone the module from the GIT**, because it is easier and it will allow you to simply update the module anytime. You can clone the module to the ```packages``` directory in your SDK folder (it will be available for all your existing and future addons), or you can clone it to the ```packages``` directory in your addon (it will be available only for that addon).

```sh
# go to the packages directory
cd packages
# clone the repository (this will create the 'cookie-manager' directory)
git clone https://github.com/fczbkk/cookie-manager.git
```

Don't forget to **add the module dependency** to your addons' ```package.json```:

```json
...
"dependencies": ["cookie-manager"]
...
```

If you want to **update the module** later, just pull the most recent version from GIT:

```sh
cd packages/cookie-manager
git pull
```

  [1]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/dev-guide/tutorials/adding-menus.html
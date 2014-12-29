angular-xhr
==============

[![Build Status](https://travis-ci.org/srph/angular-xhr.svg)](https://travis-ci.org/srph/angular-xhr)
[![Dependencies Status](https://david-dm.org/srph/angular-xhr.png)](https://david-dm.org/srph/angular-xhr.png)

Send ```$http``` requests with directives.

- Less lines of code for your controllers.
- Explicitly address your requests in your templates.
- Minus one dependency (```$http```) for your controller.

### Why should I use this library?

There are circumstances where a certain part of your app only has to send an ```$http``` request to an API, and repetitive ```$http``` in our controller can be tedious and unacceptable.

You can send a ```POST``` to ```api/v1/users/``` with just this code:

```html
<button
  srph-xhr="api/v1/users"
  request-type="POST"
  request-data="formData">
	Create User
</button>
```

Instead of having something the code below which is, honestly, quite tedious in some situations:

```
// user-create.controller.js

app.controller('UserCreateController', function($scope, $html) {
  $scope.request = function() {
  	// $http...
  }
});

<!-- user-create.html -->
<!-- input.. -->
<button type="button" ng-click="request()">Create User</button>
```

## Let's Get Started

Getting started is very easy.

### Installation

You may grab the [build](https://cdn.rawgit.com/srph/angular-xhr/dist/angular-srph-xhr.js), or from bower!

```bash
bower install angular-srph-xhr
```

While it is also possible to use the one provided by CDNs.

```html
<script src="https://cdn.rawgit.com/srph/angular-xhr/dist/angular-srph-xhr.js"></script>
<script src="https://cdn.rawgit.com/srph/angular-xhr/dist/angular-srph-xhr.min.js"></script>
```

Specify the library (```angular-srph-xhr.js``` or ```angular-srph-xhr.min.js```) in your HTML after angular, like so. It **must be** in proper order.

```html
<script src="cdn..../angular.min.js"></script>
<script src="https://cdn.rawgit.com/srph/angular-xhr/dist/angular-srph-xhr.min.js"></script>
```

### Usage

Check the [API Reference, Usage](https://srph.github.io/angular-xhr/reference.html#api-reference-directive-usage)

## Status

I'd like to keep this library as simple as possible. As of ```0.2.1```:

- [x] Send requests
- [x] Smart URLs (Removing trailing slashes)
- [x] Base URL
- [x] Send headers, set base headers
- [ ] \(Pre-send phase) Action / expression to execute before running the ```$http```
- [ ] Send query parameters
- [ ] File uploads

It is working as it should, but it is **not** yet recommended or suitable for production.

This is an on-going project, and I am in need contributors (especially feat requests).

## Docs / Examples

See the introductory docs [here](https://srph.github.io/angular-xhr), [API reference / docs](https://srph.github.io/angular-xhr/reference.html), and the demos [here](https://srph.github.io/angular-xhr/examples).

## Contribution

I do not *usually* use the other features in the ```XHR``` or ```$http``` API (actually, I've never touched them), so please feel free to issue a feature.

For features or fixes, I would suggest to submit an issue first before submitting a pull request. This avoids closed pull-requests; useless work.

```
=========      ================
| issue |  ->  | pull-request |
=========      ================
```

Make sure to check the [Developer Reference doc](//srph.github.io/angular-xhr/dev-reference.html).

## Changelogs

View [file](https://github.com/srph/angular-xhr/blob/master/CHANGELOG.MD).

## Links / References

- [Github Repository](https://github.com/srph/angular-xhr)
- [Introduction Docs](http://srph.github.io/angular-xhr/)
- [API Docs](http://srph.github.io/angular-xhr/reference.html)
- [Developer Docs](http://srph.github.io/angular-xhr/dev-reference.html)

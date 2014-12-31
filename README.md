angular-xhr
==============

[![Build Status](https://travis-ci.org/srph/angular-xhr.svg)](https://travis-ci.org/srph/angular-xhr)
[![Bower version](https://badge.fury.io/bo/angular-srph-xhr.svg)](http://badge.fury.io/bo/angular-srph-xhr)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Send ```$http``` requests with directives.

- Less lines of code for your controllers.
- Explicitly address your requests in your templates.
- Minus one dependency (```$http```) for your controller.

### Why?

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

Add this library (```angular-srph-xhr.js``` or ```angular-srph-xhr.min.js```) in your project after angular, like so. It **must be** in proper order.

```html
<script src="/path/to/angular.min.js"></script>
<script src="/path/to/angular-srph-xhr.min.js"></script>
```

Angular-XHR **is** available via [Bower]!

```bash
bower install angular-srph-xhr
```

While it is also possible to use the one provided by CDNs.

```html
<script src="https://cdn.rawgit.com/srph/angular-xhr/dist/angular-srph-xhr.js"></script>
<script src="https://cdn.rawgit.com/srph/angular-xhr/dist/angular-srph-xhr.min.js"></script>
```

### Usage

Check the [API Reference, Usage](https://srph.github.io/angular-xhr/reference.html#api-reference-directive-usage)

## Important Notes

I wrote this as proof-of-concept for utilizing directives to its limit, as written [here](https://medium.com/@srph/breaking-down-angularjs-to-smaller-components-f2ab70a104d0). I'd like to keep this library as simple as possible.

I am *in need* of contributors (especially feat requests). I have not yet touched the other features in the ```XHR``` or ```$http``` API, so please feel free to issue a feature.

### Announcements

**As of 12/30/2014**, I am *technically* **stopping** continuous development of this project after the release of ```v0.3```. I'm not sure which kind of design to aim for. If you find it helpful, please feel free to issue a feature (for me to continue), to copy the idea, or to fork as you wish.

After months of fiddling with the project, I realized that this could be paired well with [Restangular](https://github.com/mgonto/restangular), which is a great library on top of ```$http```.

### Status

As of ```0.3```:

- [x] Send requests
- [x] Smart URLs (Removing trailing slashes)
- [x] Base URL
- [x] Send headers, set base headers
- [x] \(Pre-send phase) Action / expression to execute before running the ```$http```
- [x] Send query parameters
- [ ] File uploads

This is an alpha release, and it is **not** recommended or suitable for production.

### Name

Yes, this is very misleading.

However, it was a wiser decision to spend my free time on studying (```$http```, Angular, etc..), and updating the library, instead of changing lots of parts of the docs, changing lots of links, as well as re-registering on [Bower]. Also, given the fact that this is *merely* a proof-of-concept, and currently in ```alpha```.

## Docs / Examples

See the introductory docs [here](https://srph.github.io/angular-xhr), [API reference / docs](https://srph.github.io/angular-xhr/reference.html), and the demos [here](https://srph.github.io/angular-xhr/examples).

## Contribution

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

## Acknowledgements

**angular-xhr** © 2014+, Kier Borromeo (srph). Released under the [MIT](http://mit-license.org/) License.<br>

> [srph.github.io](http://srph.github.io) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/srph) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/_srph)

[MIT]: http://mit-license.org/

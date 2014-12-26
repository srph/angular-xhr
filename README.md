angular-xhr
==============

Send ```$http``` requests with directives.

- Less lines of code for your controllers.
- Explicitly address your XHRs.
- Minus one dependency (```$http```) for your controller.

## Installation

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

API Reference
=====

This library provides a directive (```srph-xhr```) and provider (```srphXhrFactory```) to suit your needs.

## Directive

### Usage

This library offers a small, simple API provided through the ```srph-xhr``` directive. This code sends a ```GET``` to ```api/v1/users```.

```html
 <button srph-xhr="/api/v1/users"></button>
```

Here are some examples with a button and form (which you most likely will use).

### Button

This **button** sends a request to ```api/v1/users```(```srph-xhr```) as ```post```(```request-type```) with the data from your controller ```$scope```'s ```myFormData```(```request-data```)

```html
<button type="button"
  srph-xhr="api/v1/users/"
  request-type="post"
  request-data="myFormData">
  Save this user
</button>
```

### Form

This **form** sends a request (on submit) to ```api/v1/users/{id}``` as ```put``` with the data from your controller ```$scope```'s ```myFormData```

```html
<button type="button"
  srph-xhr="api/v1/users/{{ userFormData.id }}"
  request-type="put"
  request-data="userFormData">
  Save this user
</button>
```

### API

You may use use both the attribute (```<div this-directive>```) and element forms (```<that-directive..></that-directive..>```) whatever addresses your needs.

Option | Type | Default | Description
------ | ---- | ------- | -----------
srph-xhr (request-url) | string | '/' | URL of the request. Simply pass ```www```, ```http(s)``` for absolute urls
request-type | string | 'get' | Type of request
request-data | collection | {} | Data to be sent
request-success | function | noop | success callback
request-error | function | noop | error callback

## Provider

Our provider (```srphXhrFactoryProvider```) allows you to set base urls, settings, and all that sort. While it is also possible to override them with the directives (check the [Directive API](#api-reference-directive-api)).

### Usage

Inject ```srphXhrFactoryProvider``` in your config, then invoke some methods available in the provider API

```javascript
angular
  .module('myApp')
  .config(config);

config.$inject('srphXhrFactoryProvider', ..);

function config(srphXhrFactoryProvider, ..other dependencies) {
  // Code here..
  srphXhrFactoryProvider.setBaseURL('https://api.myapp.com/api/v1/');
}
```

### API

Option | Type | Default | Description
------ | ---- | ------- | -----------
setBaseURL | string | '/' | Base URLs of the all requests.
setHeaders | array | [] | Default headers included in all requests.
setCache | bool | false | Enable/disable cache by default in all requests.
setParams | array | []] | Default params included in all requests.
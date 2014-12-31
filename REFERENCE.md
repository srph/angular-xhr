API Reference
=====

This library provides a directive (```srph-xhr```) and provider (```srphXhrFactoryProvider```) to suit your needs.

# Directive

This library offers a small, simple API provided through the ```srph-xhr``` directive.

## Usage

This code sends a ```GET``` to ```api/v1/users```.

```html
 <button srph-xhr="/api/v1/users"></button>
```

Here are some examples with a button and form (which you most likely will use).

## Button

This **button** sends a request to ```api/v1/users```(```srph-xhr```) as ```post```(```request-type```) with the data from your controller ```$scope```'s ```myFormData```(```request-data```)

```html
<button type="button"
  srph-xhr="api/v1/users/"
  request-type="post"
  request-data="myFormData">
  Save this user
</button>
```

## Form

This **form** sends a request (on submit) to ```api/v1/users/{id}``` as ```put``` with the data from your controller ```$scope```'s ```myFormData```

```html
<button type="button"
  srph-xhr="api/v1/users/{{ userFormData.id }}"
  request-type="put"
  request-data="userFormData">
  Save this user
</button>
```

## API

You may use use both the attribute (```<form srph-xhr>```) and element forms (```<srph-xhr></srph-xhr>```) whatever addresses your needs.

### srph-xhr
*Type* ```string```
*Default* ```/```

Our main directive, also passed value is the URL of the request. Internally concatenates base URL; simply pass ```www```, ```http(s)``` for absolute urls.

```html
<button srph-xhr="api/v1/users"></button>
<button srph-xhr="http://developer.github.com/api/v1/users"></button>
```

### request-type
*Type* ```string``` 
*Default* ```get```

The type of http request to be made (```GET```, ```POST```, ```PUT```, ```PATCH```, ```DELETE```).

```html
<button srph-xhr="..." request-type="post"></button>
```

### request-data
*Type* ```object```
*Default* ```{}```

Data to be sent with the request.

```html
<!-- myFormData is an object you created in $scope -->
<button srph-xhr="https://yolo.com" request-data="myFormData">
```

### request-cache
*Type* ```boolean```
*Default* fallback to ```provider``` cache)

Cache the request.

```html
<button srph-xhr="https://yolo.com" request-cache="true">
```

### request-params
*Type* string (object)
*Default* ```{}```

Add query parameters to the request (```https://mysite.com/?key1=value&key2=..```).

```html
<!-- myFormData is an object you created in $scope -->
<button srph-xhr="https://yolo.com" request-params="{ 'x': 5 }">
```

### request-success
*Type* ```function```
*Default* ```noop```

Callback / expression to be performed when the request is a success.

```html
<button srph-xhr="https://yolo.com" request-success="alert(response.data.message)">
```

In ```request-success```, you are provided ```response```, ```config```, ```headers```, and ```status``` from the executed ```$http``` request.

```html
<button srph-xhr="https://yolo.com" request-success="mySuccessCallback(response, status, headers, config)">
<button srph-xhr="https://yolo.com" request-success="formSuccess = response.data.message">
```

### request-error
*Type* ```function```
*Default* ```noop```

Callback / expression to be performed when the request is a success.

```html
<button
  srph-xhr="https://yolo.com"
  request-error="alert(response.data.message)">
</button>
```

In ```request-error```, you are provided ```response```, ```config```, ```headers```, and ```status``` from the executed ```$http``` request.

```html
<button
  srph-xhr="https://yolo.com"
  request-error="myErrorCallback(response, status, headers, config)">
</button>

<button
  srph-xhr="https://yolo.com"
  request-error="formErrors = response.data.errors">
</button>
```

### request-pre-action
*Type* ```expression``` / ```function```
*Default* ```noop```

Callback / expression to be executed before the request.

```html
<button
  srph-xhr="..."
  request-pre-action="loading = true">
</button>
```

### request-post-action
*Type* ```expression``` / ```function```
*Default* ```noop```

Expression to be executed after the request (final block).

```html
<button
  srph-xhr="..."
  request-post-action="loading = false">
</button>
```

Like [```request-success```]() and [```request-error```](), you are provided ```response```, ```config```, ```headers```, and ```status``` from the executed ```$http``` request.

# Provider

Our provider (```srphXhrFactoryProvider```) allows you to set base urls, settings, and all that sort. While it is also possible to override them with the directives (check the [Directive API](#api-reference-directive-api)).

## Usage

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

## API

setBaseURL | string | '/' | Base URLs of the all requests. 
setDefaultHeaders | object | {} | Default headers included in all requests.
setCache | bool | false | Enable/disable cache by default in all requests.
setDefaultParams | object | {} | Enable/disable cache by default in all requests.
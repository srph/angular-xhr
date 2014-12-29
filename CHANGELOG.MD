Changelogs
=====

Tagged ```BC``` are *Breaking Changes*.

## v0.2.1 - December 28, 2014

- Removed ```setCache```'s of the provided argument. ```setCache``` no longer evaluates given expression by itself.

## v0.2.0 - December 28, 2014

### Provider

- ```BC``` Renamed ```setHeaders``` to ```setDefaultHeaders```
- ```BC``` Fixed; Headers are now objects (was an array on the last version, ```v0.1.6```).
- ```BC``` setDefaultHeaders throws an ```exception``` if provided argument was not an object
- ```setCache``` now automatically typecasts provided argument
- Passing no arguments to ```setBaseURL``` automatically sets ```baseURL``` to ```''```
- Allowing method chaining on setters:
```
srphXhrFactoryProvider
  .setBaseURL(/** .. */)
  .setCache()
  .setDefaultHeaders({ /** ... */ })
```

- Moved URL patterns to its own angular *constant*

### Factory

- Fixed leading slashes (```/{link}```) causing request to have extra ```/``` between the location and pathname (```{baseurl}//{pathname}```).

### Directive

- Removed controller
- Moved everything from controller's ```this``` to scope

### URL Pattern

- Moved patterns
- Updated absolute URLs to detect not only ```http://```, and ```https://```, but also ```//``` (no scheme), and ```www.{location}```.

### Miscellaneous

- Partially added in tests to ensure that everything is working in properly

## v0.1.6 - November 24, 2014

### Directive

- Fixed supposed-to-be forms from submitting a request when clicked.

## v0.1.5 - November 24, 2014

### Provider

- Fixed undefined base url.

## v0.1.4 - November 24, 2014

### Provider

- Fixed misusage of substring fn (substr() instead of {String}.substr())

## v0.1.3 - November 24, 2014

### Provider

- Fixed substring fn being used instead of substr. Typo.

## v0.1.2 - November 23, 2014

### Provider / Service
- Fixed Absolute URL regex

## v0.1.1 - November 23, 2014

### Provider
- Added ```setHeaders```, ```setCache```, ```setParams```. ```setHeaders``` was not added on the last version.
- Fixed typo errors
- Removed ```setExtraHeaders``` (idk y i added this)

### Directive

- Removed directive template (fix)
- Fixed directive ```linkFn```, mispositioned ```args```

## v0.1 - November 23, 2014

- Added basic usage for directives (```request-url```, ```request-type```, ```request-type```, ```request-success```, ```request-error````).
- Added provider for settings (```setBaseURL```, ```setHeaders```, ```setExtraFields```)

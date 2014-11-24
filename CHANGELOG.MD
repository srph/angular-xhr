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
Developer Reference 
=====

* This docs was built for potential contributors & developers of the library. If you only need the API, go to the [API Reference docs](//github.com/srph/angular-xhr/reference.html).

Reminder that I would like this library to be as simple as possible.

## Building from source

To build, you are required to install npm and bower.

### Cloning

Clone the source (```https://github.com/srph/angular-xhr.git```).

```bash
$ git clone https://github.com/srph/angular-xhr.git
```

### Installing dependencies

On the root folder of the cloned ```angular-xhr```, install npm dependencies.

```bash
$ npm install
```

Afterwards, install our bower dependencies.

```bash
$ bower install
```

### Automation / Building scripts

This library uses gulp to automate task (compiling, building, uglifying scripts).

You can simply use ```gulp-default```.

You may use ```gulp-server``` to test by accessing ```localhost:6969```; ```gulp-build``` to build scripts, ```gulp-uglify``` to uglify scripts; and ```gulp-default``` to run all tasks and watch changes.

## The Library

Although this library is named as ```angular-xhr```, it will be formally adressed as ```angular-srph-xhr``` or any similarities to reserve the name for Angular's use.

### Namespace

This library uses the namespace ```srph```, such as prefixing the directives (e.g. ```srph-xhr```), prefixing the providers (```srphXhrFactory```), and the module name ```srph.xhr```.

### Coding Style

This was copy-pasted from [```ReactJS```'s contribution style guide](https://github.com/facebook/react/blob/master/CONTRIBUTING.md)

1. Use semicolons;
2. Commas last,
3. 2 spaces for indentation (no tabs)
4. Prefer ```'``` over ```"```
5. ```"use strict";```
6. 80 character line length
8. "Attractive"
9. Keep it simple, stupid

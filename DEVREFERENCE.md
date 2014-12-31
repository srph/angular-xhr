Developer Reference 
=====

\* This docs was built for potential contributors & developers of the library. If you only need the API, go to the [API Reference docs](//github.com/srph/angular-xhr/reference.html).

Reminder that I would like this library to be as simple as possible.

## Building from source

### Requirements 
To build, you are required to install npm, gulp and bower.

```bash
$ sudo apt-get install npm  # install npm
$ npm install -g gulp bower # install gulp and bower with npm
```

### Cloning

Pull the repository

```bash
$ git init
$ git remote add origin https://github.com/srph/angular-xhr.git
$ git pull && git checkout master
```

### Installing dependencies

In our root folder, run npm and bower.

```bash
$ npm install & bower install
```

### Automation / Building scripts

\* This library uses gulp to automate task (compiling, building, uglifying scripts).

Make sure to run the task in the *root* folder.

```bash
$ gulp # builds the scripts, opens a webserver, and watches for changes
$ gulp server # opens a web server; accessible by ```localhost:6969```
$ gulp build # builds the scripts
$ gulp uglify # uglifies the scripts
```.

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

Do not forget to add tests!

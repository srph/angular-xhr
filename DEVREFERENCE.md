Developer Reference 
=====

This reference contains the list of all files with proper explanations, and how the library works.

* This docs was built for potential contributors & developers of the library. If you only need the API, go to the [API Reference docs](//github.com/srph/angular-xhr/reference.html).

* This library uses the namespace ```srph```, such as prefixing the directives (e.g. ```srph-xhr```), prefixing the providers (```srphXhrFactory```), and the module name ```srph.xhr```. Uses gulp to automate task (compiling, building, uglifying scripts)

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

### Automation | Gulp

You can simply use ```gulp-default```.

You may use ```gulp-server``` to test by accessing ```localhost:6969```; ```gulp-build``` to build scripts, ```gulp-uglify``` to uglify scripts; and ```gulp-default``` to run all tasks and watch changes.

## How it works

Our directive (```srph-xhr```, ```directive.js```) is the quintessential part of the app, it uses a controller (```SRPHXHRController```, ```controller.js```) to use the isolate scope and use our factory(```srphXhrFactory```, ```provider.js```)'s request method.

Our provider (```srphXhrFactoryProvider```, ```provider.js```) only handles basic, default and custom settings; also contains methods essential for processing URLs and requests.

```
===========						 ====================
|directive|  			-> 		 |controller.request|  ->  perform callback
===========						 ====================
									 |		 ^
									 v 		 |
============================== <- ===================
|provider (full url, headers)| 	  |factory (request)| 
============================== -> ===================
								  	 | 		 ^
								  	 v 		 |
								  ===================
								  |	   $http      |
								  ===================	
```
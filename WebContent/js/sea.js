/*
Qzone Project By Qzone Web Group.
Copyright 1998 - 2012
 */

this.seajs = {
	_seajs : this.seajs
};
seajs.version = '1.1.0';
seajs._data = {
	config : {
		debug : '%DEBUG%',
		preload : []
	},
	memoizedMods : {},
	packageMods : []
};
seajs._util = {};
seajs._fn = {};
(function (util) {
	var toString = Object.prototype.toString;
	var AP = Array.prototype;
	util.isString = function (val) {
		return toString.call(val) === '[object String]';
	};
	util.isObject = function (val) {
		return val === Object(val);
	};
	util.isFunction = function (val) {
		return toString.call(val) === '[object Function]';
	};
	util.isArray = Array.isArray || function (val) {
		return toString.call(val) === '[object Array]';
	};
	util.indexOf = AP.indexOf ? function (arr, item) {
		return arr.indexOf(item);
	}
	 : function (arr, item) {
		for (var i = 0, len = arr.length; i < len; i++) {
			if (arr[i] === item) {
				return i;
			}
		}
		return -1;
	};
	var forEach = util.forEach = AP.forEach ? function (arr, fn) {
		arr.forEach(fn);
	}
	 : function (arr, fn) {
		for (var i = 0, len = arr.length; i < len; i++) {
			fn(arr[i], i, arr);
		}
	};
	util.map = AP.map ? function (arr, fn) {
		return arr.map(fn);
	}
	 : function (arr, fn) {
		var ret = [];
		forEach(arr, function (item, i, arr) {
			ret.push(fn(item, i, arr));
		});
		return ret;
	};
	util.filter = AP.filter ? function (arr, fn) {
		return arr.filter(fn);
	}
	 : function (arr, fn) {
		var ret = [];
		forEach(arr, function (item, i, arr) {
			if (fn(item, i, arr)) {
				ret.push(item);
			}
		});
		return ret;
	};
	util.unique = function (arr) {
		var ret = [];
		var o = {};
		forEach(arr, function (item) {
			o[item] = 1;
		});
		if (Object.keys) {
			ret = Object.keys(o);
		} else {
			for (var p in o) {
				if (o.hasOwnProperty(p)) {
					ret.push(p);
				}
			}
		}
		return ret;
	};
	util.now = Date.now || function () {
		return new Date().getTime();
	};
})(seajs._util);
(function (util, data) {
	util.error = function () {
		throw join(arguments);
	};
	util.log = function () {
		if (data.config.debug && typeof console !== 'undefined') {
			console.log(join(arguments));
		}
	};
	function join(args) {
		return Array.prototype.join.call(args, ' ');
	}
})(seajs._util, seajs._data);
(function (util, data, fn, global) {
	var config = data.config;
	function dirname(path) {
		var s = path.match(/.*(?=\/.*$)/);
		return (s ? s[0] : '.') + '/';
	}
	function realpath(path) {
		path = path.replace(/([^:\/])\/+/g, '$1\/');
		if (path.indexOf('.') === -1) {
			return path;
		}
		var old = path.split('/');
		var ret = [],
		part,
		i = 0,
		len = old.length;
		for (; i < len; i++) {
			part = old[i];
			if (part === '..') {
				if (ret.length === 0) {
					util.error('Invalid path:', path);
				}
				ret.pop();
			} else if (part !== '.') {
				ret.push(part);
			}
		}
		return ret.join('/');
	}
	function normalize(url) {
		url = realpath(url);
		if (/#$/.test(url)) {
			url = url.slice(0, -1);
		} else if (url.indexOf('?') === -1 && !/\.(?:css|js)$/.test(url)) {
			url += '.js';
		}
		return url;
	}
	function parseAlias(id) {
		if (id.charAt(0) === '#') {
			return id.substring(1);
		}
		var alias;
		if (isTopLevel(id) && (alias = config.alias)) {
			var parts = id.split('/');
			var first = parts[0];
			if (alias.hasOwnProperty(first)) {
				parts[0] = alias[first];
				id = parts.join('/');
			}
		}
		return id;
	}
	var mapCache = {};
	function parseMap(url, map) {
		map = map || config['map'] || [];
		if (!map.length)
			return url;
		var ret = url;
		util.forEach(map, function (rule) {
			if (rule && rule.length > 1) {
				ret = ret.replace(rule[0], rule[1]);
			}
		});
		mapCache[ret] = url;
		return ret;
	}
	function unParseMap(url) {
		return mapCache[url] || url;
	}
	function getHost(url) {
		return url.replace(/^(\w+:\/\/[^\/]*)\/?.*$/, '$1');
	}
	function normalizePathname(pathname) {
		if (pathname.charAt(0) !== '/') {
			pathname = '/' + pathname;
		}
		return pathname;
	}
	var loc = global['location'];
	var pageUrl = loc.protocol + '//' + loc.host +
		normalizePathname(loc.pathname);
	if (~pageUrl.indexOf('\\')) {
		pageUrl = pageUrl.replace(/\\/g, '/');
	}
	function id2Uri(id, refUrl) {
		id = parseAlias(id);
		refUrl = refUrl || pageUrl;
		var ret;
		if (isAbsolute(id)) {
			ret = id;
		} else if (isRelative(id)) {
			id = id.replace(/^\.\//, '');
			ret = dirname(refUrl) + id;
		} else if (isRoot(id)) {
			ret = getHost(refUrl) + id;
		} else {
			ret = config.base + '/' + id;
		}
		return normalize(ret);
	}
	function isAbsolute(id) {
		return ~id.indexOf('://') || id.indexOf('//') === 0;
	}
	function isRelative(id) {
		return id.indexOf('./') === 0 || id.indexOf('../') === 0;
	}
	function isRoot(id) {
		return id.charAt(0) === '/' && id.charAt(1) !== '/';
	}
	function isTopLevel(id) {
		var c = id.charAt(0);
		return id.indexOf('://') === -1 && c !== '.' && c !== '/';
	}
	util.dirname = dirname;
	util.realpath = realpath;
	util.normalize = normalize;
	util.parseAlias = parseAlias;
	util.parseMap = parseMap;
	util.unParseMap = unParseMap;
	util.id2Uri = id2Uri;
	util.isAbsolute = isAbsolute;
	util.isTopLevel = isTopLevel;
	util.pageUrl = pageUrl;
})(seajs._util, seajs._data, seajs._fn, this);
(function (util, data) {
	var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
	var UA = navigator.userAgent;
	var isWebKit = ~UA.indexOf('AppleWebKit');
	util.getAsset = function (url, callback, charset) {
		var isCSS = /\.css(?:\?|$)/i.test(url);
		var node = document.createElement(isCSS ? 'link' : 'script');
		if (charset) {
			node.charset = charset;
		}
		assetOnload(node, callback);
		if (isCSS) {
			node.rel = 'stylesheet';
			node.href = url;
			head.appendChild(node);
		} else {
			node.async = 'async';
			node.src = url;
			currentlyAddingScript = node;
			head.insertBefore(node, head.firstChild);
			currentlyAddingScript = null;
		}
	};
	function assetOnload(node, callback) {
		if (node.nodeName === 'SCRIPT') {
			scriptOnload(node, cb);
		} else {
			styleOnload(node, cb);
		}
		var timer = setTimeout(function () {
				util.log('Time is out:', node.src);
				cb();
			}, data.config.timeout);
		function cb() {
			if (!cb.isCalled) {
				cb.isCalled = true;
				clearTimeout(timer);
				callback();
			}
		}
	}
	function scriptOnload(node, callback) {
		node.onload = node.onerror = node.onreadystatechange = function () {
			if (/loaded|complete|undefined/.test(node.readyState)) {
				node.onload = node.onerror = node.onreadystatechange = null;
				if (node.parentNode) {
					try {
						if (node.clearAttributes) {
							node.clearAttributes();
						} else {
							for (var p in node)
								delete node[p];
						}
					} catch (x) {}
					head.removeChild(node);
				}
				node = undefined;
				callback();
			}
		};
	}
	function styleOnload(node, callback) {
		if (node.attachEvent) {
			node.attachEvent('onload', callback);
		} else {
			setTimeout(function () {
				poll(node, callback);
			}, 0);
		}
	}
	function poll(node, callback) {
		if (callback.isCalled) {
			return;
		}
		var isLoaded;
		if (isWebKit) {
			if (node['sheet']) {
				isLoaded = true;
			}
		} else if (node['sheet']) {
			try {
				if (node['sheet'].cssRules) {
					isLoaded = true;
				}
			} catch (ex) {
				if (ex.code === 1000) {
					isLoaded = true;
				}
			}
		}
		setTimeout(function () {
			if (isLoaded) {
				callback();
			} else {
				poll(node, callback);
			}
		}, 1);
	}
	var currentlyAddingScript;
	var interactiveScript;
	util.getCurrentScript = function () {
		if (currentlyAddingScript) {
			return currentlyAddingScript;
		}
		if (interactiveScript && interactiveScript.readyState === 'interactive') {
			return interactiveScript;
		}
		var scripts = head.getElementsByTagName('script');
		for (var i = 0; i < scripts.length; i++) {
			var script = scripts[i];
			if (script.readyState === 'interactive') {
				interactiveScript = script;
				return script;
			}
		}
	};
	util.getScriptAbsoluteSrc = function (node) {
		return node.hasAttribute ? node.src : node.getAttribute('src', 4);
	};
	util.isOpera = ~UA.indexOf('Opera');
})(seajs._util, seajs._data);
(function (fn) {
	fn.Module = function (id, deps, factory) {
		this.id = id;
		this.dependencies = deps || [];
		this.factory = factory;
	};
})(seajs._fn);
(function (util, data, fn) {
	function define(id, deps, factory) {
		var argsLen = arguments.length;
		if (argsLen === 1) {
			factory = id;
			id = undefined;
		} else if (argsLen === 2) {
			factory = deps;
			deps = undefined;
			if (util.isArray(id)) {
				deps = id;
				id = undefined;
			}
		}
		if (!util.isArray(deps) && util.isFunction(factory)) {
			deps = parseDependencies(factory.toString());
		}
		if (id) {
			var url = util.id2Uri(id);
		} else if (document.attachEvent && !util.isOpera) {
			var script = util.getCurrentScript();
			if (script) {
				url = util.unParseMap(util.getScriptAbsoluteSrc(script));
			}
			if (!url) {
				util.log('Failed to derive URL from interactive script for:', factory.toString());
			}
		}
		var mod = new fn.Module(id, deps, factory);
		if (url) {
			util.memoize(url, mod);
			data.packageMods.push(mod);
		} else {
			data.anonymousMod = mod;
		}
	}
	function parseDependencies(code) {
		var pattern = /(?:^|[^.])\brequire\s*\(\s*(["'])([^"'\s\)]+)\1\s*\)/g;
		var ret = [],
		match;
		code = removeComments(code);
		while ((match = pattern.exec(code))) {
			if (match[2]) {
				ret.push(match[2]);
			}
		}
		return util.unique(ret);
	}
	function removeComments(code) {
		return code.replace(/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g, '\n').replace(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g, '\n');
	}
	fn.define = define;
})(seajs._util, seajs._data, seajs._fn);
(function (util, data, fn) {
	var slice = Array.prototype.slice;
	var RP = Require.prototype;
	function Require(id) {
		var context = this.context;
		var uri,
		mod;
		if (util.isObject(id)) {
			mod = id;
			uri = mod.id;
		} else if (util.isString(id)) {
			uri = RP.resolve(id, context);
			mod = data.memoizedMods[uri];
		}
		if (!mod) {
			return null;
		}
		if (isCircular(context, uri)) {
			util.log('Found circular dependencies:', uri);
			return mod.exports;
		}
		if (!mod.exports) {
			initExports(mod, {
				uri : uri,
				parent : context
			});
		}
		return mod.exports;
	}
	RP.resolve = function (ids, context) {
		if (util.isString(ids)) {
			return util.id2Uri(ids, (context || this.context || {}).uri);
		}
		return util.map(ids, function (id) {
			return RP.resolve(id, context);
		});
	};
	RP.async = function (ids, callback) {
		fn.load(ids, callback, this.context);
	};
	RP.load = function (uri, callback, charset) {
		util.getAsset(uri, callback, charset);
	};
	function createRequire(context) {
		var that = {
			context : context || {}
			
		};
		function require(id) {
			return Require.call(that, id);
		}
		require.constructor = Require;
		for (var p in RP) {
			if (RP.hasOwnProperty(p)) {
				(function (name) {
					require[name] = function () {
						return RP[name].apply(that, slice.call(arguments));
					};
				})(p);
			}
		}
		return require;
	}
	function initExports(mod, context) {
		var ret;
		var factory = mod.factory;
		mod.exports = {};
		delete mod.factory;
		delete mod.ready;
		if (util.isFunction(factory)) {
			ret = factory(createRequire(context), mod.exports, mod);
			if (ret !== undefined) {
				mod.exports = ret;
			}
		} else if (factory !== undefined) {
			mod.exports = factory;
		}
	}
	function isCircular(context, uri) {
		if (context.uri === uri) {
			return true;
		}
		if (context.parent) {
			return isCircular(context.parent, uri);
		}
		return false;
	}
	fn.Require = Require;
	fn.createRequire = createRequire;
})(seajs._util, seajs._data, seajs._fn);
(function (util, data, fn) {
	var fetchingMods = {};
	var callbackList = {};
	var memoizedMods = data.memoizedMods;
	var config = data.config;
	var RP = fn.Require.prototype;
	function preload(callback) {
		var preloadMods = config.preload;
		var len = preloadMods.length;
		if (len) {
			config.preload = preloadMods.slice(len);
			load(preloadMods, function () {
				preload(callback);
			});
		} else {
			callback();
		}
	}
	function load(ids, callback, context) {
		preload(function () {
			if (util.isString(ids)) {
				ids = [ids];
			}
			var uris = RP.resolve(ids, context);
			provide(uris, function () {
				var require = fn.createRequire(context);
				var args = util.map(uris, function (uri) {
						return require(data.memoizedMods[uri]);
					});
				if (callback) {
					callback.apply(null, args);
				}
			});
		});
	}
	function provide(uris, callback) {
		var unReadyUris = getUnReadyUris(uris);
		if (unReadyUris.length === 0) {
			return onProvide();
		}
		for (var i = 0, n = unReadyUris.length, remain = n; i < n; i++) {
			(function (uri) {
				if (memoizedMods[uri]) {
					onLoad();
				} else {
					fetch(uri, onLoad);
				}
				function onLoad() {
					preload(function () {
						var mod = memoizedMods[uri];
						if (mod) {
							var deps = mod.dependencies;
							if (deps.length) {
								deps = mod.dependencies = RP.resolve(deps, {
										uri : mod.id
									});
							}
							var m = deps.length;
							if (m) {
								deps = removeCyclicWaitingUris(uri, deps);
								m = deps.length;
							}
							if (m) {
								remain += m;
								provide(deps, function () {
									remain -= m;
									if (remain === 0)
										onProvide();
								});
							}
						}
						if (--remain === 0)
							onProvide();
					});
				}
			})(unReadyUris[i]);
		}
		function onProvide() {
			setReadyState(unReadyUris);
			callback();
		}
	}
	function fetch(uri, callback) {
		if (fetchingMods[uri]) {
			callbackList[uri].push(callback);
			return;
		}
		callbackList[uri] = [callback];
		fetchingMods[uri] = true;
		RP.load(util.parseMap(uri), function () {
			var mod = data.anonymousMod;
			if (mod) {
				if (!memoizedMods[uri]) {
					memoize(uri, mod);
				}
				data.anonymousMod = null;
			}
			mod = data.packageMods[0];
			if (mod && !memoizedMods[uri]) {
				memoizedMods[uri] = mod;
			}
			data.packageMods = [];
			if (fetchingMods[uri]) {
				delete fetchingMods[uri];
			}
			if (callbackList[uri]) {
				util.forEach(callbackList[uri], function (fn) {
					fn();
				});
				delete callbackList[uri];
			}
		}, data.config.charset);
	}
	function memoize(uri, mod) {
		mod.id = uri;
		memoizedMods[uri] = mod;
	}
	function setReadyState(uris) {
		util.forEach(uris, function (uri) {
			if (memoizedMods[uri]) {
				memoizedMods[uri].ready = true;
			}
		});
	}
	function getUnReadyUris(uris) {
		return util.filter(uris, function (uri) {
			var mod = memoizedMods[uri];
			return !mod || !mod.ready;
		});
	}
	function removeCyclicWaitingUris(uri, deps) {
		return util.filter(deps, function (dep) {
			return !isCyclicWaiting(memoizedMods[dep], uri);
		});
	}
	function isCyclicWaiting(mod, uri) {
		if (!mod || mod.ready) {
			return false;
		}
		var deps = mod.dependencies || [];
		if (deps.length) {
			if (~util.indexOf(deps, uri)) {
				return true;
			} else {
				for (var i = 0; i < deps.length; i++) {
					if (isCyclicWaiting(memoizedMods[deps[i]], uri)) {
						return true;
					}
				}
				return false;
			}
		}
		return false;
	}
	util.memoize = memoize;
	fn.load = load;
})(seajs._util, seajs._data, seajs._fn);
(function (host, util, data, fn) {
	var config = data.config;
	var noCachePrefix = 'seajs-ts=';
	var noCacheTimeStamp = noCachePrefix + util.now();
	var loaderScript = document.getElementById('seajsnode');
	if (!loaderScript) {
		var scripts = document.getElementsByTagName('script');
		for (var i = 0; i < scripts.length; i++) {
			if (scripts[i].src.match(/\/sea\.js\b/)) {
				loaderScript = scripts[i];
				break;
			}
		}
		if (!loaderScript) {
			loaderScript = scripts[scripts.length - 1];
		}
	}
	var loaderSrc = util.getScriptAbsoluteSrc(loaderScript) || util.pageUrl;
	var base = util.dirname(loaderSrc);
	util.loaderDir = base;
	var match = base.match(/^(.+\/)seajs\/[\d\.]+\/$/);
	if (match) {
		base = match[1];
	}
	config.base = base;
	var mainAttr = loaderScript.getAttribute('data-main');
	if (mainAttr) {
		if (util.isTopLevel(mainAttr)) {
			mainAttr = './' + mainAttr;
		}
		config.main = mainAttr;
	}
	config.timeout = 20000;
	fn.config = function (o) {
		for (var k in o) {
			var previous = config[k];
			var current = o[k];
			if (previous && k === 'alias') {
				for (var p in current) {
					if (current.hasOwnProperty(p)) {
						checkAliasConflict(previous[p], current[p]);
						previous[p] = current[p];
					}
				}
			} else if (previous && (k === 'map' || k === 'preload')) {
				if (!util.isArray(current)) {
					current = [current];
				}
				util.forEach(current, function (item) {
					if (item) {
						previous.push(item);
					}
				});
			} else {
				config[k] = current;
			}
		}
		var base = config.base;
		if (base && !util.isAbsolute(base)) {
			config.base = util.id2Uri('./' + base + '#');
		}
		if (config.debug === 2) {
			config.debug = 1;
			fn.config({
				map : [[/.*/, function (url) {
							if (url.indexOf(noCachePrefix) === -1) {
								url += (url.indexOf('?') === -1 ? '?' : '&') + noCacheTimeStamp;
							}
							return url;
						}
					]]
			});
		}
		if (config.debug) {
			host.debug = config.debug;
		}
		return this;
	};
	function checkAliasConflict(previous, current) {
		if (previous && previous !== current) {
			util.error('Alias is conflicted:', current);
		}
	}
})(seajs, seajs._util, seajs._data, seajs._fn);
(function (data, util, fn, global) {
	var config = data.config;
	var alias = {};
	var loaderDir = util.loaderDir;
	util.forEach(['base', 'map', 'text', 'json', 'coffee', 'less'], function (name) {
		name = 'plugin-' + name;
		alias[name] = loaderDir + name;
	});
	fn.config({
		alias : alias
	});
	if (~global.location.search.indexOf('seajs-debug') || ~document.cookie.indexOf('seajs=1')) {
		fn.config({
			debug : 2
		});
		config.preload.push('plugin-map');
	}
})(seajs._data, seajs._util, seajs._fn, this);
(function (host, data, fn) {
	fn.use = function (ids, callback) {
		fn.load(ids, callback);
	};
	var mainModuleId = data.config.main;
	if (mainModuleId) {
		fn.use([mainModuleId]);
	}
	(function (args) {
		if (args) {
			var hash = {
				0 : 'config',
				1 : 'use',
				2 : 'define'
			};
			for (var i = 0; i < args.length; i += 2) {
				fn[hash[args[i]]].apply(host, args[i + 1]);
			}
			delete host._seajs;
		}
	})((host._seajs || 0)['args']);
})(seajs, seajs._data, seajs._fn);
(function (host, data, fn, global) {
	if (host._seajs) {
		global.seajs = host._seajs;
		return;
	}
	host.config = fn.config;
	host.use = fn.use;
	var previousDefine = global.define;
	global.define = fn.define;
	host.noConflict = function (all) {
		global.seajs = host._seajs;
		if (all) {
			global.define = previousDefine;
			host.define = fn.define;
		}
		return host;
	};
	host.pluginSDK = {
		util : host._util,
		data : host._data
	};
	var debug = data.config.debug;
	if (debug) {
		host.debug = !!debug;
	}
	delete host._util;
	delete host._data;
	delete host._fn;
	delete host._seajs;
})(seajs, seajs._data, seajs._fn, this);
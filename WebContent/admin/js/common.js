(function($, window, undefined) {
	$.extend({
		now: function() {
			return new Date().getTime();
		},
		uuid: function() {
			var timestamp, count = 0, PREFFIX = '__uuid_';
			
			return function() {
				return PREFFIX + (timestamp || (timestamp = $.now())) + '_' + count++;
			};
		}(),
		isIE: function() {
			var cmpSymbol = {'>': 'gt','<': 'lt','>=': ' gte','<=': 'lte'};
			var cache = {}, isIE, rcmpAndVer =/([^\d]*)(\d+)$/;
			
			function format(ver) {
				if (!ver || !(ver = ('' + ver).match(rcmpAndVer))
						|| (ver[2] = parseInt(ver[2]) || 0) <= 0) {
					return 'IE';
				}
				return (cmpSymbol[ver[1]] || '') + ' IE ' + ver[2] ;
			}
			
			return function(ver) {
				var _isIE = isIE;
				if ((ver = format(ver)) == 'IE' && typeof _isIE == 'boolean'
					|| typeof (_isIE = cache[ver]) == 'boolean') {
						return _isIE;
				}
				
				var div = document.createElement('div');
				div.innerHTML = '<!--[if ' + ver + ']><div></div><![endif]-->';
				cache[ver] = _isIE = div.getElementsByTagName('div').length > 0;
				(_isIE || ver == 'IE') && (isIE = _isIE);
				return _isIE;
			};
		}(),
		tmpl : function () {
			var cache = {},
			rNotAlpha = /\W/,
			rwhitespace = /[\r\t\n]/g,
			rquot = /((^|%>)[^\t]*)'/g;
			var rsquot = /'/g,
			rvalue = /\t=(.*?)%>/g,
			SPACE = " ",
			START = "<%",
			END = "%>";
			var TAB = "\t",
			VALUE = "',$1,'",
			PUSH_END = "');",
			PUSH_START = "p.push('",
			CR = "\r",
			QUOT = "\\'";
			function fquot($0) {
				return $0.replace(rsquot, '\r');
			}
			return function (str, data) {
				var fn = !rNotAlpha.test(str) ?
					cache[str] = cache[str] ||
					$.tmpl(document.getElementById(str).innerHTML) :
					new Function("obj",
						"var p=[],print=function(){p.push.apply(p,arguments);};" +
						"with(obj){p.push('" +
						str.replace(rwhitespace, SPACE)
						.split(START).join(TAB)
						.replace(rquot, fquot)
						.replace(rvalue, VALUE)
						.split(TAB).join(PUSH_END)
						.split(END).join(PUSH_START)
						.split(CR).join(QUOT)
						 + "');}return p.join('');");
				return data ? fn(data) : fn;
			};
		}(),
		/**
		 * 统一任务管理
		 */
		task : function () {
			var tasks = [], taskId, INTERVAL_TIME = 125;
			/**
			 * 如果task返回false，则停止该任务
			 */
			function execTasks() {
				var len = tasks.length, i = 0, flag;
				while (i < len) {
					try {
						flag = tasks[i]();
					} catch(e) {}
					
					if (flag === false) {
						len--;
						tasks.splice(i, 1);
					} else {
						i++;
					}
				}
				stop();
			}
			
			function stop() {
				if (!tasks.length) {
					clearInterval(taskId);
					taskId = null;
				}
			}
			
			return {
				add : function (task) {
					if (!$.isFunction(task) || $.inArray(task, tasks) != -1) {
						return;
					}
					tasks.push(task);
					!taskId && (taskId = setInterval(execTasks, INTERVAL_TIME));
				},
				remove : function (task) {
					if (!$.isFunction(task) || (task = $.inArray(task, tasks)) == -1) {
						return;
					}
					tasks.splice(task, 1);
					stop();
				}
			};
		}(),
		string: function() {
			 var rnotAlpha = /[^\x00-\xff]/g;
			 
			 function getCount(words) {
                 var notAlpha = words.match(rnotAlpha);
                 return Math.ceil((words.length + (notAlpha && notAlpha.length || 0)) / 2);
             }
			 
			 return {
				 count: function(str) {
					 return typeof str == 'string' ? getCount(str) : 0;
				 }
			 };
		}(),
		html: function () {
			   var rdecodeEntity = /&quot;|&lt;|&gt;|&amp;|&nbsp;|&apos;|&#(\d+);|&#(\d+)/g;
			   var rencodeEntity = /['<> "&]/g;
			   var decodeEntities = {
			     '&quot;': '"',
			     '&lt;': '<',
			     '&gt;': '>',
			     '&amp;': '&',
			     '&nbsp;': ' '
			   };
			   var rhtmlSpace = /\u00a0/g;
			   var rbr = /<br\s*\/?>/ig;
			   var rlf = /\r?\n/g;
			   var rspace = /\s/g;
			   
			   var encodeEntities = {};
			   for (var i in decodeEntities) {
			    encodeEntities[decodeEntities[i]] = i;
			   }
			   
			   decodeEntities['&apos;'] =  '\''; 
			   encodeEntities['\''] = '&#39;'; //&apos; (IE不支持)
			   
			   function fdecodeEntity(matched,charCode,lastCharCode) {
			    if (!charCode && !lastCharCode) {
			     return decodeEntities[matched] || matched;
			    }
			    return String.fromCharCode(charCode || lastCharCode);
			   }
			   
			   function fencodeEntity(matched) {
			    return encodeEntities[matched];
			   }
            
			   return {
					encode: function(text) {
				    	return text ? ('' + text).replace(rencodeEntity, fencodeEntity)
				    			.replace(rlf, '<br/>').replace(rspace, '&nbsp;') : '';
				    },
				    decode: function(text) {
				    	return text ? ('' + text).replace(rbr, '\n')
				    			.replace(rdecodeEntity, fdecodeEntity).replace(rhtmlSpace, ' ') : '';
					 }
			   };
			}(),
			cookie: function() {
		        function encrypt(str) {
		            if (!str) {
		                return "";
		            }
		            var hash = 5381;
		            for (var i = 0, len = str.length; i < len; ++i) {
		                hash += (hash << 5) + str.charAt(i).charCodeAt();
		            }
		            return hash & 0x7fffffff;
		        }

		        return {
		            get:function (name) {
		                if (!name || !document.cookie) {
		                    return null;
		                }
		                var arr = document.cookie.match(new RegExp('(^| )' + encodeURIComponent(name) + '=([^;]*)'));
		                return arr ? decodeURIComponent(arr[2]) : null;
		            },
		            set:function (name, value, domain, path, millisec) {
		                var cookies = [];
		                cookies.push(encodeURIComponent(name) + '=' + encodeURIComponent(value));
		                //如果millisec不为null,undefined,false,'',0,其它情况由Date自己处理
		                if (millisec = parseInt(millisec)) {
		                    var expire = new Date();
		                    expire.setTime(expire.getTime() + millisec);
		                    cookies.push('expires=' + expire.toGMTString());
		                }
		                cookies.push('path=' + (path || '/'));
		                domain && cookies.push('domain=' + domain);
		                document.cookie = cookies.join(';');
		            },
		            remove:function (name, value, domain, path) {
		                this.set(name, '', domain, path, -Math.abs($.now()));
		            },
		            getBkn:function () {
		                return encrypt($.cookie.getSKey());
		            },
		            getSKey: function() {
		            	return $.cookie.get('skey');
		            },
		            getUin:function () {
		                return parseInt(($.cookie.get('uin') || '').substring(1, uin.length), 10) || 0;
		            }
		        };
		    }(),
			live: function() {
				var classes = {}, ids = {}, PRE_LIVE_ATTR = '___imweb_pre_live_';
				var rclass = /\.([^#.:\s]+)/,  rid = /#([^#.:\s]+)/, rspace = /\s+/g;
				
				function parseSelectors(type, selectors, listener, data, bubble) {
		            if (!selectors || typeof selectors != 'string' || !$.isFunction(listener)) {
		                return false;
		            }
		            var unbinded = !ids[type] && !classes[type];
		            if (typeof data == 'boolean') {
		                bubble = data;
		                data = null;
		            }
		            
		            selectors = selectors.split(',');
		            for (var i = 0, len = selectors.length; i < len; i++) {
		                var selector = $.trim(selectors[i]);
		                var id = selector.match(rid);
		                if (id) {
		                	var liveIds = ids[type];
		                	!liveIds && (ids[type] = liveIds = {});
		                    liveIds[id[1]] = {listener:listener, data:data, bubble:bubble};
		                } else {
		                    var className = selector.match(rclass);
		                    if (className) {
		                    	var liveClasses = classes[type];
		                    	!liveClasses && (classes[type] = liveClasses = {});
		                        liveClasses[className[1]] = {listener:listener, data:data, bubble:bubble};
		                    }
		                }
		            }
		            
		            return unbinded;
		        }
				
				function handleEvent(e) {
		            execEvents(getEvents(e.type, e.target), e);
		        }
				
				function execEvents(events, e, type) {
		            for (var i = 0, len = events.length; i < len; i++) {
		                var event = events[i];
		                event._event.listener.call(event.target, e,  event._event.data, type);
		            }
		        }
				
				 function getEvents(type, target) {
		             var data, className, clazz, list = [], 
		             liveIds = ids[type], liveClasses = classes[type], 
		             liveAttr = PRE_LIVE_ATTR + type;
		             //IE6 ，奇葩
		             while (target && target.nodeName != 'HTML' && target.getAttribute) {
		                 if (data = liveIds && liveIds[target.id]) {
		                     list.push({_event: data, target: target});
		                     if (!data.bubble) {
		                         return list;
		                     }
		                 } else if (className = target.className) {
		                     className = className.split(rspace);
		                     for (var i = 0, len = className.length; i < len; i++) {
		                         if (data = liveClasses && liveClasses[clazz = className[i]]) {
		                             list.push({_event: data, target: target});
		                             if (!data.bubble) {
		                                 return list;
		                             }
		                         }
		                     }
		                 }

		                 target = target.parentNode;
		             }

		             return list;

		         }
				 
				 function bindDocHover() {
					 
		             function hover(e) {
		                 var events = getEvents('hover',e.target), len;
		                 if (!(len = events.length)) {
		                     return;
		                 }
		                 var type = e.type == 'mouseout' ? 'mouseleave' : 'mouseenter';
		                 var relatedTarget = e.relatedTarget;
		                 while (relatedTarget) {
		                     for (var i = 0, len = events.length; i < len; i++) {
		                         if (events[i].target == relatedTarget) {
		                             events.splice(i, len - i);
		                             execEvents(events, e, type);
		                             return;
		                         }
		                     }
		                     relatedTarget = relatedTarget.parentNode;
		                 }

		                 execEvents(events, e, type)
		             }

		             $(document).bind('mouseover', hover).bind('mouseout', hover);
		         }
				
				return function(selectors, type, listener, data, bubble) {
					if (parseSelectors(type, selectors, listener, data, bubble)) {
						type == 'hover' ? bindDocHover() : $(document).bind(type, handleEvent);
					}
				};
			}(),
			localData : function () {
				var FILENAME = 'qun.qq.com.feeds';
				var rkey = /^[0-9A-Za-z_-]*$/, store;
				
				function createStore() {
					var store = document.createElement('link');
					store.style.display = 'none';
					store.id = FILENAME;
					document.getElementsByTagName('head')[0].appendChild(store);
					store.addBehavior('#default#userdata');
					return store;
				}
				
				function init() {
					if (store) {
						return store;
					}
					
					if (window.localStorage) {
						return (store = localStorage);
					}

					try {
						store = createStore();
						store.load(FILENAME);
					} catch (e) {}
					
					return store;
				}
				
				function isValidKey(key) {
					if (typeof key != 'string') {
						return false;
					}
					
					return rkey.test(key);
				}
				
				return {
					set : function (key, value) {
						var success = false;
						if (isValidKey(key) && init()) {
							try {
								value += '';
								if (window.localStorage) {
									store.setItem(key, value);
									success = true;
								} else {
									store.setAttribute(key, value);
									store.save(FILENAME);
									success = store.getAttribute(key) === value;
								}
							} catch (e) {}
						}
						
						return success;
					},
					get : function (key) {
						if (isValidKey(key) && init()) {
							try {
								return window.localStorage ? store.getItem(key) : store.getAttribute(key);
							} catch (e) {}
						}
						
						return null;
					},
					remove : function (key) {
						if (isValidKey(key) && init()) {
							try {
								window.localStorage ? store.removeItem(key) : store.removeAttribute(key);
								return true;
							} catch (e) {}
						}
						return false;
					}
				};
			}()
	});
	
	$.extend({
		range: function() {
			var selection, supported, PLACEHOLDER_ID = '___ie_insert_node__', 
			PLACEHOLDER_HTML = '<img id="' + PLACEHOLDER_ID + '" style="width:0;height:0;" />';
			var PLACEHOLDER_NODE = document.createElement('span'), refRange;
			
			function getRefRange() {
				return refRange || (refRange = createRange());
			}
			
			function supportsW3C() {
				if (typeof supported == 'boolean') {
					return supported;
				}
				return (supported = !!window.getSelection);
			}
			
			function getSelection() {
				if (!selection) {
					selection = document.selection ? document.selection : (window.getSelection && window.getSelection());
				}
				return selection;
			}
			/**
			 * firefox的range是联动的，只要range属性修改，对应的视图马上修改
			 */
			function getRange(createIfNull) {
				try {
			    	return getSelection() && (selection.getRangeAt ? (selection.rangeCount ? selection
			                .getRangeAt(0) : (createIfNull ? document.createRange() : null)) : selection.createRange());
			    } catch(e) {}
			}
			
			function setRange(range) {
				if(!range || !getSelection()){
		        	return;
		    	}
				if(selection.addRange){
	        		selection.removeAllRanges();
	                selection.addRange(range);
	        	}else if (range.select){
	        		range.select();
	        	}
			}
			
			function clearSelection() {
				if (!getSelection()) {
					return;
				}
				if (selection.removeAllRanges) {
					selection.removeAllRanges();
					return;
				}
				try{
					selection.empty();
				}catch(e){}
			}
			
			function selectNodeContents(elem, srcRange) {
				if (!elem) {
					return;
				}
				if (elem.select) {
					elem.select();
					return;
				}
				var range = srcRange || getRange(true);
				if (!range) {
					return;
				}
				
				if (range.selectNodeContents) {
					elem.nodeName == 'IMG' ? range.selectNode(elem) : range.selectNodeContents(elem);
				} else if (range.moveToElementText) {
                	try {
                		if (elem.nodeType == 1) {
                            range.moveToElementText(elem);
                        } else if (elem.nodeType == 3 && elem.parentNode) {//ie无法选择文本节点
                            elem.parentNode.insertBefore(PLACEHOLDER_NODE, elem);
                            range.moveToElementText(PLACEHOLDER_NODE);
                            range.moveEnd('character', elem.length);
                            PLACEHOLDER_NODE.parentNode.removeChild(PLACEHOLDER_NODE);
                        }
                	} catch(e) {}
				}
				
				!srcRange && setRange(range);
			}
			
			function cloneRange(range) {
				if (!range) {
					return range;
				}
				
				if (range.cloneRange) {
					return range.cloneRange();
				}
				if (range.duplicate) {
					return range.duplicate();
				}
			}
			
			function getContainer(range) {
                if (!range) {
                    return;
                }
                var elem;
                //对文本输入框的选中片段的父节点会取输入框的父节点，故需优先特殊判断
                if (isTextEditor(elem = document.activeElement)) {
                    return elem;
                }
                elem = range && (range.commonAncestorContainer || (range.parentElement && range.parentElement()));
                return elem && (elem.nodeType == 3 || elem.nodeName == 'IMG' ? elem.parentNode :  elem);
            }
            //firefox可能对隐藏的节点抛异常
            function isTextEditor(elem) {
            	if (elem) {
            		try {
                		return elem.nodeName == 'INPUT' || elem.nodeName == 'TEXTAREA';
                	} catch(e) {}
            	}
            	return false;
            }
			
			function releaseCapture() {
				releaseCapture = $.noop;
				$(document).mouseup(function(e) {
					document.body.releaseCapture();
				}).mouseout(function(e) {
					!e.relatedTarget && document.body.releaseCapture();
				});
			} 
			
			function contains(ancestor, elem) {
				if (!ancestor || !elem) {
					return false;
				}
				if(ancestor.compareDocumentPosition){//w3c
			        var res = ancestor.compareDocumentPosition(elem);
			        return res == 20 || res == 0;
			    }

			    return ancestor.contains && ancestor.contains(elem);//ie;
			}
			
			function partOf(range, elem) {
				return contains(elem, getContainer(range));
			}
			
			function pasteHTML(html, range) {
				try {
					 range.pasteHTML(html);
					 range.collapse(false);
					 range.select();
				} catch(e) {}
			}
			
			function insertNode(elem, range) {
				pasteHTML(PLACEHOLDER_HTML, range);
				var node = document.getElementById(PLACEHOLDER_ID);
				if (!node) {
					return;
				}
				node.parentNode.replaceChild(elem, node);
				selectNodeContents(elem, range);
				range.collapse(false);
				range.select();
			}
			
			function createRange() {
				return document.createRange ? document.createRange() : (getSelection() && selection.createRange());
			}
			
			function moveRange(refElem, range, type) {
				if (getRefRange() && refRange.setEndPoint) {
					selectNodeContents(refElem, refRange);
					range.setEndPoint(type, refRange);
				}
			}
			
			function getRangeFromNode(elem) {
				var range = getRange();
				return partOf(range, elem) ? range : null;
			}
			
			function setCursor(elem, start) {
				selectNodeContents(elem);
				if (range = $.range.get(elem)) {
					range.collapse(start);
					$.range.set(range);
				}
				elem.focus();
			}
			
			return {
				supportsW3C: supportsW3C,
				getSelection: getSelection,
				get: function(type) {
					if (!type || !type.nodeType) {
						return  getRange(type);
					}
					
					return getRangeFromNode(type);
				},
				partOf: partOf,
				set: setRange,
				clearSelection: clearSelection,
				clone: cloneRange,
				create: createRange,
				selectNodeContents: selectNodeContents,
				getContainer: getContainer,
				setStartBefore: function(refElem, range) {
					if (range.setStartBefore) {
						range.setStartBefore(refElem);
						return;
					}
					moveRange(refElem, range, $.range.START_TO_START);
				},
				setStartAfter: function(refElem, range) {
					if (range.setStartAfter) {
						range.setStartAfter(refElem);
						return;
					}
					moveRange(refElem, range, $.range.START_TO_END);
				},
				/**在IE中要首先调用setEnd,否则有问题, 其它光标开始位置一定要前于结束位置**/
				setEndBefore: function(refElem, range) {
					if (range.setEndBefore) {
						range.setEndBefore(refElem);
						return;
					}
					moveRange(refElem, range, $.range.END_TO_START);
				},
				setEndAfter: function(refElem, range) {
					if (range.setEndAfter) {
						range.setEndAfter(refElem);
						return;
					}
					moveRange(refElem, range, $.range.END_TO_END);
				},
				hasContents: function(range) {
					if (!range) {
						return false;
					}
					if (range.moveToElementText) {
						return !!range.htmlText
					}
					
					if (range.startOffset !== range.endOffset || range.startContainer != range.endContainer) {
						return true;
					}
					
					return (range = getContainer(range)).selectionStart != range.selectionEnd;
				},
				pasteHTML: function(html, range) {
					if (!(range = range || getRange())) {
						return;
					}
					 if(range.createContextualFragment){
						 range.deleteContents();
						 range.insertNode(html && html.nodeType ? html : range.createContextualFragment(html));
						 getSelection().removeAllRanges();
						 range.collapse(false);
						 selection.addRange(range);
					 }else if (range.pasteHTML){
						 //对range中有编辑和不可编辑的节点调用该方法会抛异常
						html && html.nodeType ? insertNode(html, range) : pasteHTML(html, range);
					 } 
				},
				preventBlur: function(e, elem) {
					if (elem && !getRangeFromNode(elem)) {
						return;
					}
					if (e.originalEvent.preventDefault) {
						e.originalEvent.preventDefault();
					} else if (document.body.setCapture) {
						document.body.setCapture();
						releaseCapture();
					}
				},
				contains: contains,
				end: function(elem) {
					setCursor(elem, false);
				},
				start: function(elem) {
					setCursor(elem, true);
				},
				compareBoundaryPoints: function(how, range, srcRange) {
					if (!range || !srcRange) {
						return;
					}
					if (range.compareBoundaryPoints) {
						return range.compareBoundaryPoints(how, srcRange);
					}
					if (range.compareEndPoints) {
						return range.compareEndPoints(how, srcRange);
					}
				},
				START_TO_START: window.Range ? Range.START_TO_START : 'StartToStart',
				END_TO_END: window.Range ? Range.END_TO_END : 'EndToEnd',
				START_TO_END: window.Range ? Range.START_TO_END : 'StartToEnd',
				END_TO_START: window.Range ? Range.END_TO_START :  'EndToStart'
			};
		}(),
		face: function() {
			var rfaceText = /\[\\(.{1,3})\]/g, rhtmlSpace = /\u00a0/g;
			var PREFFIX_FACE_URL = 'http://3.url.cn/qun/zone/common/img/face/';
			var FACE_TITLE = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙'
								, '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗'
								, '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻'
								, '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀'
								, '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电'
								, '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳'
								, '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头'
								, '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极', '潜水', '敬礼', '石化', '加油', '熬夜', '赢了', '输啦'
								, '火炬', '金牌', '坑爹', '伤不起', '亲', '裁判', '跨栏'];
			var rfaceTitle = new RegExp('\\[\\\\(' + FACE_TITLE.join('|') + ')\\]', 'g');
			var TITLE_INDEX = {}, URL_INDEX = {};
			var TOTAL_COUNT = FACE_TITLE.length;
			for (var i = 0; i < TOTAL_COUNT; i++) {
				TITLE_INDEX[FACE_TITLE[i]] = i;
			}
			
			function getTitleByUrl(url) {
				return (url && FACE_TITLE[getIndexByUrl(url)]) || '';
			}
			
			function getTitleByIndex(index) {
				return FACE_TITLE[index] || '';
			}
			
			function getIndexByUrl(url) {
				var index = URL_INDEX[url];
				if (index > -1) {
					return index;
				}
				url = url.substr(PREFFIX_FACE_URL.length);
				url = parseInt(parseInt(url.substring(0, url.length - 4)), 10);
				if (url >= 0 && url < TOTAL_COUNT) {
					return url;
				}
				return -1;
			}
			
			function isFace(url) {
				return getIndexByUrl(url) > -1;
			}
			
			function ffaceText(all, faceText) {
				var index = TITLE_INDEX[faceText];
				typeof index == 'undefined' && (index = parseInt(faceText, 10));
				if (index >= 0 && index < TOTAL_COUNT) {
					return '<img src="' + PREFFIX_FACE_URL + index + '.gif" />';
				}
				return all;
			}
			
			function ffaceTitle(all, title) {
				return '[\\' + TITLE_INDEX[title] + ']';
			}
			
			function getFaceText(url) {
				if (!url || (typeof url != 'string' && (url.nodeName != 'IMG' || 
						!(url = url.src))) || !isFace(url)) {
					return '';
				}
				
				return '[\\' + getIndexByUrl(url) + ']';
			}
			
			return {
				getText: getFaceText,
				getHTML: function(url) {
					var title = getTitleByIndex(url);
					if (title) {
						url = PREFFIX_FACE_URL + url + '.gif';
					} else {
						title = getTitleByUrl(url);
					}
					return '<img ' + ($.isIE() ? 'contentEditable="false" ' : '') + 'title="' + title 
					+ '" src="' + url + '">'
				},
				is: function(url) {
					
					return !(!url || (typeof url != 'string' && (url.nodeName != 'IMG' || !(url = url.src)))) && isFace(url);
				},
				encode: function(text) {
					return text == 'string' ? text.replace(rfaceText, ffaceText) : '';
				},
				decode: function(editor) {
					var child = editor.firstChild, text = [];
					while(child) {
						text.push(child.nodeName == 'BR' ? '\n' : (child.nodeType == 3 ? child.nodeValue : getFaceText(child)))
						child = child.nextSibling;
					}
					return text.join('').replace(rfaceTitle, ffaceTitle).replace(rhtmlSpace, ' ');
				},
				getTotalCount: function() {
					return TOTAL_COUNT;
				},
				getTitleByIndex: getTitleByIndex
			};
		}(),
		hideIfClickOthers: function(elem) {
        	var elems = [], selectors = [];
        	
        	function addEvents() {
        		addEvents = $.noop;
        		$(document).mousedown(function(e) {
        			var target = e.target;
        			for(var i = 0, len = elems.length; i < len; i++) {
        				if (!hasSelectors(target, selectors[i])) {
        					var elem = elems[i];
           				 	!$.range.contains(elem, target) && (elem.style.display = 'none');
        				}
        			}
                });
        	}
        	
        	function hasSelectors(target, selectors) {
        		if (selectors) {
        			var $target = $(target);
        			for(var i = 0, len = selectors.length; i < len; i++) {
        				var selector = selectors[i];
        				if ((selector.id && target.id == selector.id) ||
        						(selector.className && $target.hasClass(selector.className))) {
        					return true;
        				}
        			}
        		}
        		
        		return false;
        	}
        	
        	return function(elem, preventSelectors) {
                if (!elem) {
                	return;
                }
            	addEvents();
            	elems.push(elem);
            	var slts = [], selector;
            	if (preventSelectors && typeof preventSelectors == 'string') {
            		preventSelectors = preventSelectors.split(',');
            		for (var i = 0, len = preventSelectors.length; i < len; i++) {
            			if ((selector = $.trim(preventSelectors[i])) && selector.length > 1) {
            				slts.push(selector.indexOf('#') === 0 ? 
            						{id: selector.substr(1)} : {className: selector.substr(1)});
            			}
            		}
            	}
            	selectors.push(slts);
        	};
        }
	});
	
	$.extend({
		/**
		 * 设置按钮三态
		 * @param node 为jquery选择器或jquery对象
		 * @param state {hover: hoverClass,down: downClass}，其中hover，down必须至少有一个不为空
		 * @example $.setTristate($('#tristate'),{hover: 'hover'});$.setTristate('.tristate',{hover: 'hover',down: 'down'});
		 * $.setTristate('.tristate', 'hover', 'down'});
		 */
		setTristate : function () {
			var pressedNode, pressClass;
			
			function hover(e, data, type) {
				var that = $(this);
				if (type == 'mouseleave') {
					that.removeClass(data.hover);
					pressClass && pressedNode[0] == this && that.removeClass(pressClass);
				} else {
					that.addClass(data.hover);
					pressClass && pressedNode[0] == this && that.addClass(pressClass);
				}
			}
			
			function down(e, data) {
				$(document).bind('mouseup', clear).bind('mouseout', outOfDocument);
				(pressedNode = $(this)).addClass(pressClass = data.down);
				$.range.preventBlur(e);
			}
			
			function clear() {
				if (pressedNode) {
					pressedNode.removeClass(pressClass);
					$(document).unbind('mouseup', clear).unbind('mouseout', outOfDocument);
					pressedNode = pressClass = null;
				}
			}
			
			function outOfDocument(e) {
				!e.relatedTarget && clear();
			}
			
			return function (selector, state) {
				if (typeof state == 'string') {
					state = {
						hover : state,
						down : arguments[2]
					};
				}
					
				state.hover && $.live(selector, 'hover', hover, state, true);
				state.down && $.live(selector, 'mousedown', down, state);
			};
		}(),
		drag: function() {
			
			function addEvents(elem, drag, release, startEvent) {
				
				var clear = function(e) {
					release.call(elem, e, startEvent);
					$(document).unbind('.drag');
				};
				
				$(document).bind('mousemove.drag', function(e) {
					drag.call(elem, e, startEvent);
				}).bind('mouseup.drag', clear).bind('mouseout.drag', function(e) {
					!e.relatedTarget && clear(e);
				});
			}
			
			return {
				bind: function(elem, down, drag, release) {
					$(elem).unbind('.drag');
					!$.isFunction(down) && (down = $.noop);
					!$.isFunction(drag) && (drag = $.noop);
					!$.isFunction(release) && (release = $.noop);
					$(elem).bind('mousedown', function(e) {
						down.call(this,e);
						addEvents(this, drag, release, e);
						$.range.preventBlur(e);
					});
				},
				unbind: function(elem) {
					$(elem).unbind('.drag');
				},
				live: function(selector, down, drag, release) {
					!$.isFunction(down) && (down = $.noop);
					!$.isFunction(drag) && (drag = $.noop);
					!$.isFunction(release) && (release = $.noop);
					$.live(selector, 'mousedown', function(e) {
						down.call(this,e);
						addEvents(this, drag, release, e);
						$.range.preventBlur(e);
					});
				}
			};
		}(),
		wheel: function() {
			
			function getDirect(e) {
				e = e.originalEvent;
				return typeof e.wheelDelta == 'number' ? e.wheelDelta < 0 : e.detail > 0;
			}
			
			return {
				bind: function(elem, listener, bubble) {
					var l = function(e) {
						listener.call(this, e, getDirect(e));
						if (bubble === false) {
							e.stopPropagation();
							e.preventDefault();
						}
					};
					$(elem).bind('mousewheel.wheel', l)
					.bind('DOMMouseScroll.wheel', l);
				},
				unbind: function(elem) {
					$(elem).unbind('.wheel');
				},
				live: function(selector, listener, bubble) {
					var l = function(e) {
						listener.call(this, e, getDirect(e));
					};
					$.live(selector, 'mousewheel', l, bubble);
					$.live(selector, 'DOMMouseScroll', l, bubble);
				}
			};
		}(),
		scroll: function() {
			var cache = {}, CACHE_KEY = $.uuid(), top, curData, 
			pressed, curListener, hoverData, STRIDE = 100;
			
			function checkElements(ctn, scroller) {
				if (ctn.parentNode != scroller.parentNode) {
					throw new Error('ctn and scroller are not included in the same parent node.');
				}
			}
			
			function getCacheData(ctn, scroller) {
				var ctnKey = ctn.getAttribute(CACHE_KEY),
				scrollerKey =  scroller.getAttribute(CACHE_KEY), data;
				
				if (!ctnKey || !scrollerKey || ctnKey != scrollerKey) {
					ctnKey && (delete cache[ctnKey]);
					scrollerKey && (delete cache[scrollerKey]);
					ctnKey = $.uuid();
					ctn.setAttribute(CACHE_KEY, ctnKey);
					scroller.setAttribute(CACHE_KEY, ctnKey);
					data = cache[ctnKey] = {};
				} else if (!(data = cache[ctnKey])) {
					data = cache[ctnKey] = {};
				}
				return data;
			}
			
			function drag(e, startEvent) {
				var y = e.pageY - startEvent.pageY + top, ctnTop;
				if (y >= curData.maxScrollerTop) {
					y = curData.maxScrollerTop;
					ctnTop = curData.maxCtnTop;
				} else {
					y < 0 && (y = 0);
					ctnTop = curData.maxCtnTop * y / curData.maxScrollerTop;
				}
				curData.content.style.top = -ctnTop + 'px';
				curData.scroller.style.top = y + 'px';
				curData.listener.call(curData.content.parentNode, e, ctnTop);
			}
			
			function release() {
				pressed = curListener = null;
			}
			
			function pageDown(e) {
				if (pressed || !hoverData) {
					return;
				}
				var ctn = $(hoverData.content), scroller = $(hoverData.scroller),  
				top = getTop(ctn) -  (hoverData.page ? hoverData.containerHeight : STRIDE);
				ctn.css('top', (top = Math.max(-hoverData.maxCtnTop, top)) + 'px');
				scroller.css('top', hoverData.maxScrollerTop * -top / hoverData.maxCtnTop + 'px');
				hoverData.listener.call(hoverData.content.parentNode, e, -top);
			}
			
			function pageUp(e) {
				if (pressed || !hoverData) {
					return;
				}
				var ctn = $(hoverData.content), scroller = $(hoverData.scroller),  
				top = getTop(ctn) +  (hoverData.page ? hoverData.containerHeight : STRIDE);
				ctn.css('top', (top = Math.min(0, top)) + 'px');
				scroller.css('top', hoverData.maxScrollerTop * -top / hoverData.maxCtnTop + 'px');
				hoverData.listener.call(hoverData.content.parentNode, e, -top);
			}
			
			function getTop(elem) {
				return parseInt(elem.css('top')) || 0;
			}
			
			$(document).keydown(function(e) {
				!pressed && hoverData && !$.range.contains(hoverData.content, e.target) && e.preventDefault();
			}).keyup(function(e) {
				if (!hoverData || $.range.contains(hoverData.content, e.target)) {
					return;
				}
				if (e.keyCode == 38) {
					pageUp(e);
					return;
				}
				if (e.keyCode == 40) {
					pageDown(e);
					return;
				}
			});
			
			function updateData(data, ctn, scroller) {
				data.scroller = scroller;
				data.content = ctn;
				data.containerHeight = scroller.parentNode.offsetHeight;
				data.maxScrollerTop = data.containerHeight - scroller.offsetHeight;
				data.maxCtnTop = ctn.offsetHeight - data.containerHeight;
			}
			
			return {
				update: function(ctn, scroller, minHeight) {
					checkElements(ctn, scroller);
					var con = ctn.parentNode, ctnH = ctn.offsetHeight,
					conH = con.offsetHeight;
					if (ctnH <= conH) {
						scroller.style.display = 'none';
						return;
					}
					
					$(scroller).css({
						top: conH * getTop($(ctn)) / ctnH + 'px',
						height:  Math.max(parseInt(minHeight) || 16, conH * conH / ctnH) + 'px'
					});
					updateData(getCacheData(ctn, scroller), ctn, scroller);
				},
				bind: function(ctn, scroller, listener, page) {
					checkElements(ctn, scroller);
					if (typeof listener == 'boolean') {
						var temp = page;
						page = listener;
						listener = temp;
					}
					var data = getCacheData(ctn, scroller);
					data.page = page;
					data.listener = $.isFunction(listener) ? listener : $.noop;
					$.drag.bind(scroller, function(e) {
						pressed = true;
						curListener = listener;
						top = getTop($(scroller));
						curData = data;
						updateData(data, ctn, scroller);
					}, drag, release);
					$(ctn).bind('mouseenter.scroll', function(e) {
						updateData(data, ctn, scroller);
						hoverData = data;
					}).bind('mouseleave.scroll', function(e) {
						hoverData = null;
					});
					$.wheel.bind(ctn.parentNode, function(e, down) {
						updateData(data, ctn, scroller);
						hoverData = data;
						!pressed && (down ? pageDown() : pageUp());
					}, false);
				},
				unbind: function(ctn, scroller) {
					checkElements(ctn, scroller);
					$(ctn).add(scroller).unbind('.scroll');
					$.drag.unbind(scroller);
					$.wheel.unbind(ctn.parentNode);
					delete cache[scroller.getAttribute(CACHE_KEY)];
					delete cache[ctn.getAttribute(CACHE_KEY)];
				}
			};
		}()
	});
	
})(jQuery, window);
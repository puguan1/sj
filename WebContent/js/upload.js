(function($) {
	
	$.extend({
		upload: function() {
			var OLD_CURSOR_ATTR = $.uuid();
			function createUploadBtn() {
				var iframeId = 'target' + $.uuid();
				return $('<span style="overflow: hidden;display: inline-block;cursor: pointer;">\
				<form style="width: 280px;height: 280px;overflow: hidden;opacity: 0.01;filter: alpha(opacity=1);"  method="post"\
				enctype="multipart/form-data" target="' + iframeId + '">\
				<input name="filename" title="未选择文件" size="1" style="font-size: 600px;cursor: pointer;margin: -50px 0 0 -2430px;"\
				 name="filename" type="file" /></form> <iframe width="0" height="0" frameborder="0" style="width:0;height:0;border: 0;"\
				 src="about:blank;" id="' + iframeId + '" name="' + iframeId + '"></iframe></span>');
			}
			
			function addPostParam(name, value, form) {
				var input = form.find('input[name=' + name + ']');
				if (!input.length) {
					input = $('<input type="hidden" />').prependTo(form);
				}
				return input.attr({name: name, value: value});
			}
			
			function removePostParam(name, form) {
				 form.find('input[type=' + name + ']').remove();
			}
			
			function setDisabled(disabled, input, btn) {
				var inputCursor = input.attr(OLD_CURSOR_ATTR);
				var btnCursor = btn.attr(OLD_CURSOR_ATTR);
				if (disabled) {
					!inputCursor && input.attr(OLD_CURSOR_ATTR, input[0].style.cursor);
					!btnCursor && btn.attr(OLD_CURSOR_ATTR, btn[0].style.cursor);
					input.css('marginTop', '9999px');
					input[0].style.cursor = 'default';
					btn[0].style.cursor = 'default';
				} else {
					input.css('marginTop', '-50px');
					inputCursor && (input[0].style.cursor =  inputCursor);
					btnCursor && (btn[0].style.cursor =  btnCursor);
				}
			}
			
			function addPostParams(params, form) {
				for (var i in params) {
					addPostParam(i, params[i], form);
				}
			}
			
			function addEvent(node, type, listener) {
				if (node.addEventListener) {
					node.addEventListener(type, listener, false);
				} else if (node.attachEvent) {
					node.attachEvent('on' + type, listener);
				} else {
					node['on' + type] = listener;
				}
			}
			
			return {
				init: function(settings) {
					var btn = createUploadBtn();
					var form = btn.find('form');
					var postParams = {};
					if (settings.postParams) {
						for (var i in settings.postParams) {
							postParams[i] = settings.postParams[i];
						}
					}
					
					var setCursor = function(style) {
						btn[0].style.cursor = style;
						input[0].style.cursor = style;
					};
					
					settings.cursor && setCursor(settings.cursor);
					
					form.attr('action', settings.uploadUrl);
					var bindUploadEnd = function() {
						bindUploadEnd = null;
						$.isFunction(settings.uploadEnd) && (btn.find('iframe').bind('load', settings.uploadEnd));
					}
					var input = form.find('input[type=file]');
					//jquery处理IE的change有问题
					addEvent(input[0], 'change', function() {
						var file = input.val();
						if (!file) {
							return;
						}
						var submit = true;
						bindUploadEnd && bindUploadEnd();
						$.isFunction(settings.uploadStart) && (submit = settings.uploadStart(file));
						if (submit !== false) {
							//IE7会清空
							addPostParams(postParams, form);
							form.submit();
						}
						form[0].reset();
					});
					var setTitle = function(title) {
						title && input.attr('title', title)
					};
					settings.accept && input.attr('accept', settings.accept);
					setTitle(settings.title);
					setDisabled(settings.disabled, input, btn);
					settings.filePostName && input.attr('name', settings.filePostName);
					var placeholder = $('#' + settings.placeholderId);
					btn.attr({"id": settings.placeholderId, "class": placeholder.attr('class')});
					placeholder.replaceWith(btn);
					var ret = {
							addPostParam: function(name, value) {
								addPostParam(name, value, form);
							},
							removePostParam: function(name) {
								removePostParam(name, form);
							},
							setDisabled: function(disabled) {
								setDisabled(disabled, input, btn);
							},
							setCursor: setCursor,
							setTitle: setTitle,
							destory: function() {
								 btn.html('');
								 for (var i in ret) {
									 delete ret[i];
								 }
							}
						};
					return ret;
				}
			};
		}()
	});
	
})(jQuery);
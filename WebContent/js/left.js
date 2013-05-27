
 (function ($) {
	
	var navJumper = function () {

		// column info
		var cols = {
			'topMenu_1' : {
				'id' : 'topMenu_1',
				'name' : '公司介绍',
				'children' : [
					{
						'name' : '企业简介',
						'url' : '404.html'
					},
					{
						'name' : '核心价值观',
						'url' : '404.html'
					},
					{
						'name' : '组织架构',
						'url' : '404.html'
					},
					{
						'name' : '公司大事记',
						'url' : '404.html'
					}
				]
			},
			'topMenu_2' : {
				'id' : 'topMenu_2',
				'name' : '产品中心',
				'children' : [
					{
						'name' : '担保业务',
						'url' : '404.html'
					},
					{
						'name' : '融资顾问',
						'url' : '404.html'
					},
					{
						'name' : '资产管理',
						'url' : '404.html'
					},
					{
						'name' : '投资管理咨询',
						'url' : '404.html'
					},
					{
						'name' : '业务流程',
						'url' : '404.html'
					},
					{
						'name' : '表格下裁',
						'url' : '404.html'
					}
				]
			},
			'topMenu_3' : {
				'id' : 'topMenu_3',
				'name' : '行业动态',
				'children' : [
					{
						'name' : '企业新闻',
						'url' : '404.html'
					},
					{
						'name' : '最新行业动态',
						'url' : '404.html'
					},
					{
						'name' : '政策法规',
						'url' : '404.html'
					}
				]
			},
			'topMenu_4' : {
				'id' : 'topMenu_4',
				'name' : '人力资源',
				'children' : [
					{
						'name' : '人才观',
						'url' : '404.html'
					},
					{
						'name' : '招聘简章',
						'url' : '500.html'
					},
					{
						'name' : '简历投递',
						'url' : '404.html'
					}
				]
			},
			'topMenu_5' : {
				'id' : 'topMenu_5',
				'name' : '企业文化',
				'children' : [
					{
						'name' : '公司标识',
						'url' : '404.html'
					},
					{
						'name' : '经营理念',
						'url' : '404.html'
					},
					{
						'name' : '员工风采',
						'url' : '404.html'
					}
				]
			},
			'topMenu_6' : {
				'id' : 'topMenu_6',
				'name' : '战略联盟',
				'children' : [
					{
						'name' : '合作银行',
						'url' : '404.html'
					},
					{
						'name' : '小贷公司',
						'url' : '404.html'
					},
					{
						'name' : '典当公司',
						'url' : '404.html'
					},
					{
						'name' : '投资咨询管理公司',
						'url' : '404.html'
					},
					{
						'name' : 'PE',
						'url' : '404.html'
					}
				]
			},
			'topMenu_7' : {
				'id' : 'topMenu_7',
				'name' : '联系我们',
				'children' : [
					{
						'name' : '公司地址',
						'url' : '404.html'
					},
					{
						'name' : '服务电话',
						'url' : '404.html'
					}
				]
			}
		};

		// first page show the default column
		var defaultCol = 'mms_manage';

		// dom list to be fill
		var iframe = $('#contentIfr'),
			navPosition = $('#position'),
			fstSection = $('#fstSection'),
			scndSection = $('#scndSection'),
			navSection = $('#navSection'),
			navOpt = $('#navOpt');

		// top navigation operation
		function action (key) {
			if (cols.hasOwnProperty(key)) {
				var info = cols[key];
				// 状态切换
				changeState(info.id);
				// 导航栏
				nav(info);
				// 内容区展示
				jump(info.children[0].url);
				resizeIframe();
			}
		}
		
		function position (fstName, scndName, fShow) {
			fstSection.html(fstName);
			scndSection.html(scndName);
			fShow ? navPosition.show() : navPosition.hide();
		}

		function changeState (id) {
			$('.top_nav a').removeClass('selected');
			$('#' + id).addClass('selected');
		}

		// change navigation info
		function nav (info) {
			var isNotInit = !!info;
			info = info || cols[defaultCol];
			var name = info.name,
				children = info.children,
				shownChildren = children[0];
			// 导航栏
			navSection.html(name);
			navOpt.empty();
			for (var i = 0, len = children.length; i < len; i++) {
				var child = children[i];
				$('<li><a href="javascript:;" jumpurl="' + child.url + '">'
				+ child.name + '</a></li>').appendTo(navOpt);
			}
			isNotInit && navOpt.find('a').eq(0).addClass('selected');
			// 位置栏，未绑定事件
			position(name, shownChildren.name, isNotInit);
		}

		// left navigation operation
		function jump(url) {
			iframe.attr('src', url);
		}
		
		function resizeIframe () {
			iframe.width(navPosition.width());
		}
		
		function addEvents () {
			$('#topMenu_1').click(function () {
				if ($(this).hasClass('selected')) {
					return;
				}
				action('topMenu_1');
			});
			$('#topMenu_2').click(function () {
				if ($(this).hasClass('selected')) {
					return;
				}
				action('topMenu_2');
			});
			$('#topMenu_3').click(function () {
				if ($(this).hasClass('selected')) {
					return;
				}
				action('topMenu_3');
			});
			$('#topMenu_4').click(function () {
				if ($(this).hasClass('selected')) {
					return;
				}
				action('topMenu_4');
			});
			$('#topMenu_5').click(function () {
				if ($(this).hasClass('selected')) {
					return;
				}
				action('topMenu_5');
			});
			$('#topMenu_6').click(function () {
				if ($(this).hasClass('selected')) {
					return;
				}
				action('topMenu_6');
			});
			$('#topMenu_7').click(function () {
				if ($(this).hasClass('selected')) {
					return;
				}
				action('topMenu_7');
			});
			navOpt.find('a').live('click', function () {
				var me = $(this);
				// change state
				navOpt.find('a').removeClass('selected');
				me.addClass('selected');
				// jump
				var url = me.attr('jumpurl');
				jump(url);
				// position
				position(navSection.html(), me.html(), true);
				
				resizeIframe();
			});
			
			$(window).resize(function () {
				resizeIframe();
			});
		}
		addEvents();
		return {
			action : action,
			jump : jump,
			nav : nav,
			addEvents : addEvents
		};
	}();
	$.navJumper=navJumper;
})($);
$.navJumper.action("topMenu_3");
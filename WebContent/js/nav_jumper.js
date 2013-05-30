
define('navJumper', function (requires, exports, module) {
	
	var navJumper = function () {

		// column info
		var cols = {
			'home' : {
				'id' : 'home',
				'name' : '首页',
				'con' : 'content',
				'template' : 'home_content'
			},
			'introduce' : {
				'id' : 'introduce',
				'name' : '公司介绍',
				'con' : 'detail',
				'children' : [
					{
						'name' : '企业简介',
						'template' : 'text_content'
					},
					{
						'name' : '核心价值观',
						'template' : 'text_content'
					},
					{
						'name' : '组织架构',
						'template' : 'text_content'
					},
					{
						'name' : '公司大事记',
						'template' : 'text_content'
					}
				]
			},
			'product' : {
				'id' : 'product',
				'name' : '产品中心',
				'con' : 'detail',
				'children' : [
					{
						'name' : '担保业务',
						'template' : 'text_content'
					},
					{
						'name' : '融资顾问',
						'template' : 'text_content'
					},
					{
						'name' : '资产管理',
						'template' : 'text_content'
					},
					{
						'name' : '投资管理咨询',
						'template' : 'text_content'
					},
					{
						'name' : '业务流程',
						'template' : 'text_content'
					},
					{
						'name' : '表格下载',
						'template' : 'download_content'
					}
				]
			},
			'news' : {
				'id' : 'news',
				'name' : '行业动态',
				'con' : 'detail',
				'children' : [
					{
						'name' : '企业新闻',
						'template' : 'indus_news'
					},
					{
						'name' : '最新行业动态',
						'template' : 'indus_news'
					},
					{
						'name' : '政策法规',
						'template' : 'indus_news'
					}
				]
			},
			'resource' : {
				'id' : 'resource',
				'name' : '人力资源',
				'con' : 'detail',
				'children' : [
					{
						'name' : '人才观',
						'template' : 'text_content'
					},
					{
						'name' : '招聘简章',
						'template' : 'text_content'
					},
					{
						'name' : '简历投递',
						'template' : 'text_content'
					}
				]
			},
			'culture' : {
				'id' : 'culture',
				'name' : '企业文化',
				'con' : 'detail',
				'children' : [
					{
						'name' : '公司标识',
						'template' : 'text_content'
					},
					{
						'name' : '经营理念',
						'template' : 'text_content'
					},
					{
						'name' : '员工风采',
						'template' : 'indus_news'
					}
				]
			},
			'alliance' : {
				'id' : 'alliance',
				'name' : '战略联盟',
				'con' : 'detail',
				'children' : [
					{
						'name' : '合作银行',
						'template' : 'partner'
					},
					{
						'name' : '小贷公司',
						'template' : 'partner'
					},
					{
						'name' : '典当公司',
						'template' : 'partner'
					},
					{
						'name' : '投资咨询管理公司',
						'template' : 'partner'
					},
					{
						'name' : 'PE',
						'template' : 'partner'
					}
				]
			},
			'contact' : {
				'id' : 'contact',
				'name' : '联系我们',
				'con' : 'detail',
				'children' : [
					{
						'name' : '公司地址',
						'template' : 'text_content'
					},
					{
						'name' : '服务电话',
						'template' : 'text_content'
					}
				]
			}
		};

		// first page show the default column
		var defaultCol = 'home';

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
			$('#mmsManage').click(function () {
				if ($(this).hasClass('selected')) {
					return;
				}
				action('mms_manage');
			});
			$('#recordQuery').click(function () {
				if ($(this).hasClass('selected')) {
					return;
				}
				action('record_query');
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

		return {
			action : action,
			jump : jump,
			nav : nav,
			addEvents : addEvents
		};
	}();

	
	exports.init = function () {
		// initial default column
		navJumper.nav();

		// add navigation events
		navJumper.addEvents();
	};
});

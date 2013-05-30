
define('home_loader', function (requires, exports, module) {
	
	var homeLoader = function () {

		var HTML_CONTENT_TEMPLATE = '<div class="introduce">\
										<img src="img/introduce.jpg" class="intro_thumb" />\
										<p class="column">公司介绍 / Company</p>\
										<p class="intro_info">湖北顺济担保有限公司创立于2007年4月13日，系经湖北省工商行政管理局批准成立的企业法人，注册资本为壹亿元人民币，是一家按市场化机制运作的专业担保投资公司，公司实行以董事会为领导核心的总经理负责制，以“诚信、稳健、创新、超越”为宗旨，服务中小企业及个人融资为市场定位，为客户融资贷款提供各种担保服务。</p>\
										<a href="javascript:;" class="more" title="查看更多"></a>\
									</div>\
									<ul class="product">\
										<li class="selected warranty">\
											<a href="javascript:;" class="product_name">担保业务</a>\
											<div class="product_intro">\
												<div class="product_thumb_con">\
													<img src="img/pro_thumb.jpg">\
												</div>\
												<p class="product_decs">中小企业担保业务指贷款银行向借款人发放用于生产和经营活动中资金周转所需的人民币贷款，期限一般为一年， 最长不超过三年（贷款不得用于国家法律法规明文禁止经营的项目，不得用于证券及股东权益性投资），并由融众公司为此笔贷款提供连带责任保证担保。</p>\
											</div>\
										</li>\
										<li class="finance">\
											<a href="javascript:;" class="product_name">融资顾问</a>\
											<div class="product_intro">\
												<div class="product_thumb_con">\
													<img src="img/pro_thumb.jpg">\
												</div>\
												<p class="product_decs">一直以帮助客户全面提升竞争力为使命，并致力于为客户创造价值，到目前为止公司的服务范围包括：商业计划书和可行性研究报告撰写服务、园区与产业规划咨询、投融资咨询、兼并收购重组咨询、财富管理及关联业务。</p>\
											</div>\
										</li>\
										<li class="manage">\
											<a href="javascript:;" class="product_name">资产管理</a>\
											<div class="product_intro">\
												<div class="product_thumb_con">\
													<img src="img/pro_thumb.jpg">\
												</div>\
												<p class="product_decs">资产管理是指委托人将自己的资产交给受托人，由受托人为委托人提供理财服务的行为，为客户获取投资收益。在国内资产管理又称作代客理财。</p>\
											</div>\
										</li>\
										<li class="consult">\
											<a href="javascript:;" class="product_name">投资咨询管理</a>\
											<div class="product_intro">\
												<div class="product_thumb_con">\
													<img src="img/pro_thumb.jpg">\
												</div>\
												<p class="product_decs"></p>\
											</div>\
										</li>\
										<li class="flow">\
											<a href="javascript:;" class="product_name">业务流程</a>\
											<div class="product_intro">\
												<div class="product_thumb_con">\
													<img src="img/pro_thumb.jpg">\
												</div>\
												<p class="product_decs">1、业务受理与担保立项（填写《担保申请书》并缴纳立项手续费；2、项目调查；3、项目审查；4、会议评审和项目审批(并缴纳评审费)；5、本公司向贷款行出具《担保意向函》；6、本公司与贵司签订《担保服务协议》及各《反担保合同》；7、缴纳担保费；8、进行抵押（质押）登记；9、本公司与贷款银行签订正式《保证合同》；10、银行发放贷款；11、保后管理；12、担保项目终止</p>\
											</div>\
										</li>\
										<li class="download">\
											<a href="javascript:;" class="product_name">表格下载</a>\
											<div class="product_intro">\
												<div class="product_thumb_con">\
													<img src="img/pro_thumb.jpg">\
												</div>\
												<p class="selected product_decs">\
													1.<a href="javascript:;" class="download_list">所需材料清单.doc</a>\
												</p>\
											</div>\
										</li>\
									</ul>\
									<div class="com_news">\
										<a href="javascript:;" class="com_news_left" title="上一个"></a>\
										<a href="javascript:;" class="com_news_right" title="下一个"></a>\
										<div class="com_news_con">\
											<img src="img/com_news_thumb.jpg" class="com_news_thumb" />\
											<p class="com_news_title ellipsis">顺济担保安心债权基金</p>\
											<p class="com_news_desc">流动性好、认购起点低流动性好、认购起点低流动性好、认购起点低流动性好、认购起点低流动性好、认购起点低</p>\
										</div>\
									</div>\
									<div class="portal">\
										<div class="tool">\
											<span class="tool_wording">实用工具：</span>\
											<select class="tool_list">\
												<option value="0">请选择工具</option>\
											</select>\
										</div>\
										<a href="javascript:;" class="oa_portal"><span>OA</span> 系统登录</a>\
										<a href="javascript:;" class="crm_portal"><span>CRM</span> 系统登录</a>\
									</div>\
									<div class="staff">\
										<img src="img/staff.jpg" class="staff_thumb" />\
										<p class="column">员工风采 / Staff Style</p>\
										<p class="staff_info">湖北顺济担保有限公司</p>\
										<a href="javascript:;" class="more" title="查看更多"></a>\
									</div>\
									<div class="indus_news">\
										<div class="indus_news_top">\
											<p class="column">行业动态 / News</p>\
											<a class="indus_news_more" href="javascript:;">更多>></a>\
										</div>\
										<ul class="indus_news_list">\
											<li>\
												<a class="indus_news_item ellipsis" href="javascript:;">热烈祝贺湖北顺济担保有限公司与投资委员会专家签署合作协议</a>\
												<span class="indus_news_time">2013-04-17</span>\
											</li>\
											<li>\
												<a class="indus_news_item ellipsis" href="javascript:;">热烈祝贺湖北顺济担保有限公司与投资委员会专家签署合作协议</a>\
												<span class="indus_news_time">2013-04-17</span>\
											</li>\
											<li>\
												<a class="indus_news_item ellipsis" href="javascript:;">热烈祝贺湖北顺济担保有限公司与投资委员会专家签署合作协议</a>\
												<span class="indus_news_time">2013-04-17</span>\
											</li>\
											<li>\
												<a class="indus_news_item ellipsis" href="javascript:;">热烈祝贺湖北顺济担保有限公司与投资委员会专家签署合作协议</a>\
												<span class="indus_news_time">2013-04-17</span>\
											</li>\
											<li>\
												<a class="indus_news_item ellipsis" href="javascript:;">热烈祝贺湖北顺济担保有限公司与投资委员会专家签署合作协议</a>\
												<span class="indus_news_time">2013-04-17</span>\
											</li>\
										</ul>\
									</div>\
									<div class="talents">\
										<p class="column">人才观 / View of talents</p>\
										<p class="talents_desc">公司十分重视人才的培养与选拔，一直把“吸纳人才、善用人才， 发展人才”作为企业的一项战略任务。<br />在人才的培养上，公司建立了一套完善、系统的培训体系，承诺为每一位员工在业务技能和工作能力上全方位发展提供各种类型的培训，并设计相应的绩效考核与奖罚管理办法，为员工奖励、薪酬、晋升提供客观、可靠的依据。<br />在用人机制上，公司一贯坚持“唯贤是举、量才使用”的用人之道。实行竞争上岗和末位淘汰制，真正做到能者上、平者让、庸者下，公平竞争，优胜劣汰。</p>\
										<a href="javascript:;" class="talents_more">了解更多</a>\
									</div>'

		var PARTNER_TEMPLATE = '<ul class="partner_list">\
									<li><a href="javascript:;"><img src="img/partner.jpg" class="partner_img"></a></li>\
									<li><a href="javascript:;"><img src="img/partner.jpg" class="partner_img"></a></li>\
									<li><a href="javascript:;"><img src="img/partner.jpg" class="partner_img"></a></li>\
									<li><a href="javascript:;"><img src="img/partner.jpg" class="partner_img"></a></li>\
									<li><a href="javascript:;"><img src="img/partner.jpg" class="partner_img"></a></li>\
									<li><a href="javascript:;"><img src="img/partner.jpg" class="partner_img"></a></li>\
									<li><a href="javascript:;"><img src="img/partner.jpg" class="partner_img"></a></li>\
								</ul>';

		function getSourceList (data) {
			var _callback = function () {
				$('#content').html($.tmpl(HTML_CONTENT_TEMPLATE, {}));
				$('#partner').append($.tmpl(PARTNER_TEMPLATE, {}));
			};
			$.ajax({
				url : '/cgi-bin/getSourceList',
				type : 'get',
				data : data,
				success : _callback,
				error : _callback,
				dataType: 'text'
			});
		}

		return {
			load : function () {
				var cols = [1, 5, 6, 7, 8, 9, 10, 11, 12, 14, 20, 25, 26, 27];
				getSourceList({
					type : cols.join('-')
				});
			}
		};
	}();

	
	exports.init = function () {
		// initial default column
		homeLoader.load();
	};
});

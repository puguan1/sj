
(function () {
	
	var homeLoader = function () {

		var HTML_CONTENT_TEMPLATE = '<div class="introduce">\
										<img src="<%=intro_thumb%>" class="intro_thumb" />\
										<p class="column">公司介绍 / Company</p>\
										<p class="intro_info"><%=intro_desc%></p>\
										<a href="introduce.html" class="more" title="查看更多"></a>\
									</div>\
									<ul class="product">\
										<li class="selected warranty">\
											<a href="javascript:;" class="product_name">担保业务</a>\
											<div class="product_intro">\
												<div class="product_thumb_con">\
													<img src="<%=product_thumb%>">\
												</div>\
												<p class="product_decs"><%=product_desc%></p>\
											</div>\
										</li>\
										<li class="finance">\
											<a href="javascript:;" class="product_name">融资顾问</a>\
											<div class="product_intro">\
												<div class="product_thumb_con">\
													<img src="<%=finance_thumb%>">\
												</div>\
												<p class="product_decs"><%=finance_desc%></p>\
											</div>\
										</li>\
										<li class="manage">\
											<a href="javascript:;" class="product_name">资产管理</a>\
											<div class="product_intro">\
												<div class="product_thumb_con">\
													<img src="<%=manage_thumb%>">\
												</div>\
												<p class="product_decs"><%=manage_desc%></p>\
											</div>\
										</li>\
										<li class="consult">\
											<a href="javascript:;" class="product_name">投资咨询管理</a>\
											<div class="product_intro">\
												<div class="product_thumb_con">\
													<img src="<%=consult_thumb%>">\
												</div>\
												<p class="product_decs"><%=consult_desc%></p>\
											</div>\
										</li>\
										<li class="flow">\
											<a href="javascript:;" class="product_name">业务流程</a>\
											<div class="product_intro">\
												<div class="product_thumb_con">\
													<img src="<%=flow_thumb%>">\
												</div>\
												<p class="product_decs"><%=flow_desc%></p>\
											</div>\
										</li>\
										<li class="download">\
											<a href="javascript:;" class="product_name">表格下载</a>\
											<div class="product_intro">\
												<div class="product_thumb_con">\
													<img src="<%=download_thumb%>">\
												</div>\
												<p class="selected product_decs">\
													<%for (var i = 0, len = download_list.length; i < len; i++) {%>\
													<%=i+1%>.<a href="<%=download_list[i].url%>" target="_blank" class="download_list"><%=download_list[i].title%></a><br />\
													<%}%>\
												</p>\
											</div>\
										</li>\
									</ul>\
									<div class="com_news">\
										<a href="javascript:;" class="com_news_left disabled" id="comNewsLeft" title="上一个"></a>\
										<a href="javascript:;" class="com_news_right <%=com_news.length > 1 ? \'\' : \'disabled\'%>" id="comNewsRight" title="下一个"></a>\
										<div class="com_news_con" id="comNewsCon" nid="<%=com_news[0].id%>">\
											<img id="comNewsThumb" src="<%=com_news[0].thumb%>" class="com_news_thumb" />\
											<p id="comNewsTitle" class="com_news_title ellipsis"><%=com_news[0].title%></p>\
											<p id="comNewsDesc" class="com_news_desc"><%=com_news[0].desc%></p>\
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
										<img src="<%=staff_thumb%>" class="staff_thumb" />\
										<p class="column">员工风采 / Staff Style</p>\
										<a href="<%=\'staff_detail.html?id=\' + staffid%>" class="staff_info"><%=staff_title%></a>\
										<a href="staff.html" class="more" title="查看更多"></a>\
									</div>\
									<div class="indus_news">\
										<div class="indus_news_top">\
											<p class="column">行业动态 / News</p>\
											<a class="indus_news_more" href="indus_news.html">更多>></a>\
										</div>\
										<ul class="indus_news_list">\
											<%for (var i = 0, len = indus_news_list.length; i < len; i++) {%>\
											<li>\
												<a class="indus_news_item ellipsis" href="<%=\'indus_new_detail.html?id=\' + indus_news_list[i].id%>"><%=indus_news_list[i].title%></a>\
												<span class="indus_news_time"><%=indus_news_list[i].time%></span>\
											</li>\
											<%}%>\
										</ul>\
									</div>\
									<div class="talents">\
										<p class="column">人才观 / View of talents</p>\
										<p class="talents_desc"><%=talents%></p>\
										<a href="talents.html" class="talents_more">了解更多</a>\
									</div>'

		var PARTNER_TEMPLATE = '<ul class="partner_list">\
									<% for (var i = 0, len = partnerList.length; i < len; i++) {%>\
										<li><a href="<%=partnerList[i].content%>"><img src="<%=partnerList[i].thumb%>" title="<%=partnerList[i].title%>" class="partner_img"></a></li>\
									<% } %>\
								</ul>';

		function adapter (data) {
			data = eval('(' + data + ')');
			if (data.ec == 0) {
				var contents = data.ls;
				for (var i = 0, len = contents.length; i < len; i++) {
					process(contents[i]);
				}
			}
		}

		var result = {};

		function process (ctn) {
			switch (ctn.type) {
				case "1":
					result.intro_thumb = ctn.logo;
					result.intro_desc = ctn.title;
					break;
				case "5":
					result.product_thumb = ctn.logo;
					result.product_desc = ctn.title;
					break;
				case "6":
					result.finance_thumb = ctn.logo;
					result.finance_desc = ctn.title;
					break;
				case "7":
					result.manage_thumb = ctn.logo;
					result.manage_desc = ctn.title;
					break;
				case "8":
					result.consult_thumb = ctn.logo;
					result.consult_desc = ctn.title;
					break;
				case "9":
					result.flow_thumb = ctn.logo;
					result.flow_desc = ctn.title;
					break;
				case "10":
					result.download_thumb = ctn.logo;
					result.download_list = result.download_list || [];
					result.download_list.push({
						url : ctn.content,
						title : ctn.title
					})
					break;
				case "11":
					result.com_news = result.com_news || [];
					result.com_news.push({
						id : ctn.id,
						thumb : ctn.logo,
						title : ctn.title,
						desc : ctn.content ,
						time : ctn.time
					});
					break;
				case "12":
					result.indus_news_list = result.indus_news_list || [];
					result.indus_news_list.push({
						title : ctn.title,
						time : ctn.time,
						id : ctn.id
					});
					break;
				case "14":
					result.talents = ctn.title;
					break;
				case "19":
					if (!result.time || result.time < ctn.time) {
						result.staff_thumb = ctn.logo;
						result.staffid = ctn.id;
						result.staff_title = ctn.title;
						result.time = ctn.time;
					}
					break;
				case "20":
					result.partnerList = result.partnerList || [];
					result.partnerList.push({
						content : ctn.content,
						title : ctn.title,
						thumb : ctn.logo
					});
					break;
				case "25":
					result.address = ctn.content;
					break;
				case "26":
					result.phone = ctn.content;
					break;
				default:
					break;
			}
		}


		function getSourceList (data) {
			var _callback = function (data) {
				adapter(data);
				result.com_news.sort(function (news1, news2) {
					if (news1.time <= news2.time) {
						return 1;
					}
					return news1.time < news2.time ? 1 : -1;
				});
				$('#content').html($.tmpl(HTML_CONTENT_TEMPLATE, result));
				$('#partner').append($.tmpl(PARTNER_TEMPLATE, result));
				$('#address').html(result.address);
				$('#phone').html(result.phone);
				addEvents();
			};
			$.ajax({
				url : 'cgi-servelet/getSourceList',
				type : 'get',
				data : data,
				success : _callback,
				error : _callback,
				dataType: 'text'
			});
		}

		function addEvents () {
			$('.product').children('li').click(function () {
				$('.product').children('li').removeClass('selected');
				$(this).addClass('selected');
			});
			
			$('#comNewsCon').click(function () {
				window.location.href = "com_news_detail.html?id=" + $(this).attr('nid');
			});


			function indexOfNews (nid) {
				for (var i = 0, len = result.com_news.length; i < len; i++) {
					if (result.com_news[i].id == nid) {
						break;
					}
				}
				return i;
			}

			$('#comNewsLeft').click(function () {
				var index = indexOfNews($('#comNewsCon').attr('nid'));
				var news = result.com_news[index - 1];
				$('#comNewsCon').attr('nid', news.id);
				$('#comNewsThumb').html(news.thumb);
				$('#comNewsTitle').html(news.title);
				$('#comNewsDesc').html(news.desc);
				if (index == 1) {
					$(this).hide();
				}
				$('#comNewsRight').show();
			});

			$('#comNewsRight').click(function () {
				var index = indexOfNews($('#comNewsCon').attr('nid'));
				var news = result.com_news[index + 1];
				$('#comNewsCon').attr('nid', news.id);
				$('#comNewsThumb').html(news.thumb);
				$('#comNewsTitle').html(news.title);
				$('#comNewsDesc').html(news.desc);
				if (index == result.com_news.length - 2) {
					$(this).hide();
				}
				$('#comNewsLeft').show();
			});
		}

		return {
			load : function () {
				var cols = [1, 5, 6, 7, 8, 9, 10, 11, 12, 14, 19, 20, 21, 22, 23, 24, 25, 26, 27];
				getSourceList({
					type : cols.join('-'),
					v : new Date() - 0
				});
			}
		};
	}();

	// initial default column
	homeLoader.load();
})();

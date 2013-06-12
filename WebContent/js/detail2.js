(function () {
	var DOWNLOAD_TEMPLATE = '<ul class="download_list">\
								<%for (var i = startIndex, len = Math.min(startIndex + MAX_NUM, list.length); i < len; i++) {%>\
								<li>\
									<a href="<%=list[i].url%>" target="_blank" class="download_item"><%=list[i].title%></a>\
								</li>\
								<% } %>\
							</ul>';
	var COM_NEWS_TEMPLATE = '<ul class="com_news_list">\
									<%var idlist = []; for (var i = startIndex, len = Math.min(startIndex + MAX_NUM, list.length); i < len; i++) {idlist.push(list[i].id);%>\
									<li class="com_news_item" nid="<%=list[i].id%>">\
										<div class="thumb"><img src="<%=list[i].url%>" /></div>\
										<h3><%=list[i].title%></h3>\
										<div class="com_news_time"><%=list[i].time%></div>\
									</li>\
									<% } $.cookie.set("com_news", idlist.join("-")); %>\
								</ul>';
	var INDUS_NEWS_TEMPLATE = '<ul class="indus_news_list">\
									<%var idlist = []; for (var i = startIndex, len = Math.min(startIndex + MAX_NUM, list.length); i < len; i++) {idlist.push(list[i].id);%>\
									<li>\
										<a class="indus_news_item ellipsis" nid="<%=list[i].id%>" href="javascript:;" title="<%=list[i].title%>"><%=list[i].title%></a>\
										<span class="indus_news_time"><%=list[i].time%></span>\
									</li>\
									<% } $.cookie.set("indus_news", idlist.join("-")); %>\
								</ul>';

	var POLICY_TEMPLATE = '<ul class="indus_news_list">\
									<%var idlist = []; for (var i = startIndex, len = Math.min(startIndex + MAX_NUM, list.length); i < len; i++) {idlist.push(list[i].id);%>\
									<li>\
										<a class="indus_news_item ellipsis" nid="<%=list[i].id%>" href="javascript:;" title="<%=list[i].title%>"><%=list[i].title%></a>\
										<span class="indus_news_time"><%=list[i].time%></span>\
									</li>\
									<% } $.cookie.set("policy_news", idlist.join("-")); %>\
								</ul>';
	
	var STAFF_TEMPLATE = '<ul class="indus_news_list">\
									<%var idlist = []; for (var i = startIndex, len = Math.min(startIndex + MAX_NUM, list.length); i < len; i++) {idlist.push(list[i].id);%>\
									<li>\
										<a class="indus_news_item ellipsis" nid="<%=list[i].id%>" href="javascript:;" title="<%=list[i].title%>"><%=list[i].title%></a>\
										<span class="indus_news_time"><%=list[i].time%></span>\
									</li>\
									<% } $.cookie.set("staff_news", idlist.join("-")); %>\
								</ul>';

	var indexDirectory = {
		"download.html" : {
			type : "12",
			MAX_NUM : 15,
			TEMPLATE : DOWNLOAD_TEMPLATE
		},
		"com_news.html" : {
			type : "14",
			MAX_NUM : 5,
			TEMPLATE : COM_NEWS_TEMPLATE,
			itemClass : 'com_news_item',
			detailUrl : 'com_news_detail.html'
		},
		"indus_news.html" : {
			type : "15",
			MAX_NUM : 15,
			TEMPLATE : INDUS_NEWS_TEMPLATE,
			itemClass : 'indus_news_item',
			detailUrl : 'indus_news_detail.html'
		},
		"policy.html" : {
			type : "16",
			MAX_NUM : 15,
			TEMPLATE : POLICY_TEMPLATE,
			itemClass : 'indus_news_item',
			detailUrl : 'policy_detail.html'
		},
		"staff.html" : {
			type : "24",
			MAX_NUM : 15,
			TEMPLATE : STAFF_TEMPLATE,
			itemClass : 'indus_news_item',
			detailUrl : 'staff_detail.html'
		}
	};

	function getPageParam () {
		var pageName = window.location.href.match(/\w*?.html/)[0];
		return indexDirectory[pageName];
	}

	var params = getPageParam();
	// global
	startIndex = 0, MAX_NUM = params.MAX_NUM, curPage = 1;
	var PAGER_TEMPLATE = '<% var pages = Math.ceil(num / MAX_NUM); \
							if (pages > 1) {%>\
							<div class="pager">\
								<a href="javascript:;" class="first_pager <%=curPage == 1 ? \'first_pager_dis\' : \'\'%>" id="firstPager" title="第一页"></a>\
								<a href="javascript:;" class="prev_pager <%=curPage == 1 ? \'prev_pager_dis\' : \'\'%>" id="prevPager" title="上一页"></a>\
								<% for (var i = Math.min(curPage, pages - 9 <= 1 ? 1 : pages - 9), len = Math.min(9 + curPage, pages); i <= len; i++) {%>\
								<a href="javascript:;" class="number_pager <%=curPage == i ? \'selected\' : \'\'%>"><%=i%></a>\
								<% } %>\
								<a href="javascript:;" class="next_pager <%=curPage == pages ? \'next_pager_dis\' : \'\'%>" id="nextPager" title="下一页"></a>\
								<a href="javascript:;" class="last_pager <%=curPage == pages ? \'last_pager_dis\' : \'\'%>" id="lastPager" title="最后一页"></a>\
							</div>\
						<%}%>';
	function fillDetail (list) {
		$('#detail').html($.tmpl(params.TEMPLATE, {
			list : list
		}) + $.tmpl(PAGER_TEMPLATE, {
			num : list.length
		}));
	}
	var callback = function (data) {
		data = eval('(' + data + ')');
		if (data.ec == 0) {
			var contents = data.ls;
			var list = [];
			for (var i = 0, len = contents.length; i < len; i++) {
				switch (contents[i].type) {
					case params.type:
						list.push({
							id : contents[i].id,
							title : contents[i].title,
							time : contents[i].time,
							url : contents[i].logo
						});
						break;
					case "37":
						$('#banner img').attr({
							'src' : contents[i].logo,
							'nid' : contents[i].id
						});
						break;
					default:
						break;
				}
			}
			
			fillDetail(list);


			params.itemClass && $.live('.' + params.itemClass, 'click', function () {
				window.location.href = params.detailUrl + "?id=" + $(this).attr('nid');
			});

			$.live('.first_pager', 'click', function () {
				if ($(this).hasClass('first_pager_dis')) {
					return;
				}
				curPage = 1;
				startIndex = (curPage - 1) * MAX_NUM;
				fillDetail(list);
			});

			$.live('.prev_pager', 'click', function () {
				if ($(this).hasClass('prev_pager_dis')) {
					return;
				}
				curPage--;
				startIndex = (curPage - 1) * MAX_NUM;
				fillDetail(list);
			});

			$.live('.next_pager', 'click', function () {
				if ($(this).hasClass('next_pager_dis')) {
					return;
				}
				curPage++;
				startIndex = (curPage - 1) * MAX_NUM;
				fillDetail(list);
			});

			$.live('.last_pager', 'click', function () {
				if ($(this).hasClass('last_pager_dis')) {
					return;
				}
				curPage = Math.ceil(list.length / MAX_NUM);
				startIndex = (curPage - 1) * MAX_NUM;
				fillDetail(list);
			});
			$.live('.number_pager', 'click', function () {
				if ($(this).hasClass('selected')) {
					return;
				}
				curPage = $(this).html();
				startIndex = (curPage - 1) * MAX_NUM;
				fillDetail(list);
			});
		}
	};
	$.ajax({
		url : 'cgi-servelet/getSourceList',
		type : 'get',
		data : { type : params.type + "-37", v : new Date() - 0 },
		success : callback,
		error : callback,
		dataType: 'text'
	});
})();

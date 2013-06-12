(function () {

	var indexDirectory = {
		"com_news_detail.html" : {
			cookiename : "com_news",
			selfUrl : "com_news_detail.html"
		},
		"indus_news_detail.html" : {
			cookiename : "indus_news",
			selfUrl : "indus_news_detail.html"
		},
		"policy_detail.html" : {
			cookiename : "policy_news",
			selfUrl : "policy_detail.html"
		},
		"staff_detail.html" : {
			cookiename : "staff_news",
			selfUrl : "staff_detail.html"
		}
	};

	function getPageParam () {
		var pageName = window.location.href.match(/\w*?.html/)[0];
		return indexDirectory[pageName];
	}

	var params = getPageParam();

	var id = parseInt($.query('id')), pid, nid;
	var idlist = $.cookie.get(params.cookiename);
	idlist = idlist.split('-');
	var index = -1;
	if (Array.prototype.indexOf) {
		index = Array.prototype.indexOf.call(idlist, id + '');
	} else {
		for (var i = 0, len = idlist.length; i < len; i++) {
			if (idlist[i] == id) {
				index = i;
				break;
			}
		}
	}
	if (index > -1) {
		pid = idlist[index - 1];
		nid = idlist[index + 1];
	}
	function getSourceInfo (id, callback) {
		$.ajax({
			url : 'cgi-servelet/getSourceInfo',
			type : 'get',
			data : { id : id, v : new Date() - 0 },
			success : callback,
			error : callback,
			dataType: 'text'
		});
	}

	function getSourceList (callback) {
		$.ajax({
			url : 'cgi-servelet/getSourceList',
			type : 'get',
			data : { type : "37", v : new Date() - 0 },
			success : callback,
			error : callback,
			dataType: 'text'
		});
	}
	
	getSourceList(function (data) {
		data = eval('(' + data + ')');
		if (data.ec == 0) {
			var contents = data.ls;
			var list = [];
			for (var i = 0, len = contents.length; i < len; i++) {
				switch (contents[i].type) {
					case "37":
						var img = $('#banner img').attr({
							'src' : contents[i].logo,
							'nid' : contents[i].id
						});
						if (contents[i].link) {
							var link = contents[i].link;
							img.unbind('click').css('cursor', 'pointer').click(function () {
								window.location.href = link.match(/^http:\/\//) ? link : 'http://' + link;
							});
						}
						break;
					default:
						break;
				}
			}
		}
	});

	getSourceInfo(id, function (data) {
		data = eval('(' + data + ')');
		if (data.ec == 0 && data.info) {
			var info = data.info;
			$("#detailTitle").html(info.title);
			$("#newsTime").html(info.time);
			$("#newsContent").html(info.content);
		}
	});

	pid && getSourceInfo(pid, function (data) {
		data = eval('(' + data + ')');
		if (data.ec == 0 && data.info) {
			var info = data.info;
			$('#prevNews').html('上一篇：' + info.title).attr('nid', info.id).show();
			$('#prevNews').click(function () {
				window.location.href = params.selfUrl + "?id=" + $(this).attr('nid')
			});
		}
	});

	nid && getSourceInfo(nid, function (data) {
		data = eval('(' + data + ')');
		if (data.ec == 0 && data.info) {
			var info = data.info;
			$('#nextNews').html('下一篇：' + info.title).attr('nid', info.id).show();
			$('#nextNews').click(function () {
				window.location.href = params.selfUrl + "?id=" + $(this).attr('nid')
			});
		}
	});
})();
(function () {
	var DOWNLOAD_TEMPLATE = '<ul class="partner_list">\
								<%for (var i = 0, len = partner_list.length; i < len; i++) {%>\
								<li>\
									<a href="<%=partner_list[i].url%>" title="<%=partner_list[i].title%>" target="_blank"><img src="<%=partner_list[i].thumb%>" class="partner_img"></a>\
								</li>\
								<% } %>\
							</ul>';
	
	var indexDirectory = {
		"alliance_bank.html" : "26",
		"micro_lend.html" : "27",
		"pawnshop.html" : "28",
		"consult_mng.html" : "29",
		"pe.html" : "30"
	};

	function fillDetail (list) {
		$('#detail').html($.tmpl(DOWNLOAD_TEMPLATE, {
			partner_list : list
		}));
	}

	function getPageParam () {
		var pageName = window.location.href.match(/\w*?.html/)[0];
		return indexDirectory[pageName];
	}

	var index = getPageParam();

	var _callback = function (data) {
		data = eval('(' + data + ')');
		if (data.ec == 0) {
			var contents = data.ls;
			var list = [];
			for (var i = 0, len = contents.length; i < len; i++) {
				switch (contents[i].type) {
					case index:
						list.push({
							title : contents[i].title,
							thumb : contents[i].logo,
							url : contents[i].link
						});
						break;
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
			
			fillDetail(list);
		}
	};
	$.ajax({
		url : 'cgi-servelet/getSourceList',
		type : 'get',
		data : { type : index + "-37", v : new Date() - 0 },
		success : _callback,
		error : _callback,
		dataType: 'text'
	});
})();
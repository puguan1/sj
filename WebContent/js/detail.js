(function () {
	var indexDirectory = {
		"introduce.html" : "2",
		"value.html" : "3",
		"department.html" : "4",
		"event.html" : "5",
		"warranty.html" : "7",
		"finance.html" : "8",
		"manage.html" : "9",
		"consult.html" : "10",
		"flow.html" : "11",
		"download.html" : "12",
		"com_news.html" : "14",
		"indus_news.html" : "15",
		"policy.html" : "16",
		"talents.html" : "18",
		"recruitment.html" : "19",
		"jobs.html" : "20",
		"com_logo.html" : "22",
		"concept.html" : "23",
		"staff.html" : "24",
		"alliance_bank.html" : "26",
		"micro_lend.html" : "27",
		"pawnshop.html" : "28",
		"consult_mng.html" : "29",
		"pe.html" : "30",
		"address.html" : "32",
		"phone.html" : "33"
	}

	function getPageIndex () {
		var pageName = window.location.href.match(/\w*?.html/)[0];
		return indexDirectory[pageName];
	}

	$.ajax({
		url : 'cgi-servelet/getSourceList',
		type : 'get',
		data : { type : getPageIndex() + "-37", v : new Date() - 0 },
		success : function (data) {
			data = eval('(' + data + ')');
			if (data.ec == 0 && data.ls) {
				for (var i = 0, len = data.ls.length; i < len; i++) {
					var content = data.ls[i];
					if (content.type == '37') {
						var img = $('#banner img').attr({
							'src' : content.logo,
							'nid' : content.id
						});
						if (content.link) {
							var link = content.link;
							img.unbind('click').css('cursor', 'pointer').click(function () {
								window.location.href = link.match(/^http:\/\//) ? link : 'http://' + link;
							});
						}
					} else {
						$.ajax({
							url : 'cgi-servelet/getSourceInfo',
							type : 'get',
							data : { id : content.id, v : new Date() - 0 },
							success : function (data) {
								data = eval('(' + data + ')');
								if (data.ec == 0 && data.info) {
									$('#detail .text').html(data.info.content);
								}
							},
							dataType: 'text'
						});
					}	
				}
			}
		},
		dataType: 'text'
	});
})();
(function () {
	var indexDirectory = {
		"introduce.html" : "1",
		"value.html" : "2",
		"department.html" : "3",
		"event.html" : "4",
		"warranty.html" : "5",
		"finance.html" : "6",
		"manage.html" : "7",
		"consult.html" : "8",
		"flow.html" : "9",
		"download.html" : "10",
		"com_news.html" : "11",
		"indus_news.html" : "12",
		"policy.html" : "13",
		"talents.html" : "14",
		"recruitment.html" : "15",
		"jobs.html" : "16",
		"com_logo.html" : "17",
		"concept.html" : "18",
		"staff.html" : "19",
		"alliance_bank.html" : "20",
		"micro_lend.html" : "21",
		"pawnshop.html" : "22",
		"consult_mng.html" : "23",
		"pe.html" : "24",
		"address.html" : "25",
		"phone.html" : "26"
	}

	function getPageIndex () {
		var pageName = window.location.href.match(/\w*?.html/)[0];
		return indexDirectory[pageName];
	}


	var index = getPageIndex();
	var _callback = function (data) {
		data = eval('(' + data + ')');
		if (data.ec == 0) {
			var contents = data.ls;
			for (var i = 0, len = contents.length; i < len; i++) {
				switch (contents[i].type) {
					case index:
						$('#detail .text').html(contents[i].content);
						break;
					case "25":
						$('#address').html(contents[i].title);
						break;
					case "26":
						$('#phone').html(contents[i].title);
						break;
					default:
						break;
				}
			}
		}
	};
	$.ajax({
		url : 'cgi-servelet/getSourceList',
		type : 'get',
		data : { type : index + "-25-26", v : new Date() - 0 },
		success : _callback,
		error : _callback,
		dataType: 'text'
	});

})();
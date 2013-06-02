
(function($){
	var getSourceCgi="../cgi-servelet/getSourceList";
	var showData=function(data){
		var t = template('tmpl1');
		$("#showData").html(t(data));
		console.log(t(data));
	};
	var getData=function(type){
		var param={};
		param.type=type;
		$.get(getSourceCgi,param,function(data){
			if(data&&data.ec==0){
				showData(data);
			}else{
				alert("数据添加失败");
			}
		},"json");
	};
	//var data={ls:[{"content":"hello xx0","id":"1369846396823","logo":"http://127.0.0.1/sj/img/logo.png","pv":0,"time":"2013-05-30 00:53","title":"111","type":"0","writer":""}]};
	getData(1);
	$.getData=getData;
})($)

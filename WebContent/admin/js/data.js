
(function($){
	var getSourceCgi="../cgi-servelet/getSourceList";
	var delDataCgi="../cgi-servelet/delSource";
	var showData=function(data){
		var t = template('tmpl1');
		$("#showData").html(t(data));
		//console.log(t(data));
	};
	var getData=function(type,pageNow,pageSize){
		var param={};
		param.type=type;
		param.pageNow=pageNow||1;
		param.pageSize=pageSize||2;
		$.get(getSourceCgi,param,function(data){
			if(data&&data.ec==0){
				data.typeName=$.getMenuNameByType(type);
				data.type=type;
				showData(data);
			}else{
				alert("获取数据失败");
			}
		},"json");
	};
	/**
	** 删除数据
	**/
	var delData=function(id){
		var param={};
		param.ids=id;
		$.get(delDataCgi,param,function(data){
			if(data&&data.ec==0){
				alert("删除成功");
			}else{
				alert("删除失败");
			}
		},"json");
	};
	var showAddEditor=function(type){

	};
	getData(1);
	$.getData=getData;
	$.delData=delData;
	$.showAddEditor=showAddEditor();
})($)

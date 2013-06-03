
(function($){
	var getSourceCgi="../cgi-servelet/getSourceList";
	var delDataCgi="../cgi-servelet/delSource";
	var defaultPageSize=5;//默认的页数
	var dataCache={};//每次拉取的数据缓存一下
	var getDataFromCacheById=function(id){
		var data=dataCache.ls;
		for(var i=0,l=data.length;i<l;i++){
			if(data[i].id==id){
				return data[i];
			}
		}
		return null;
	};
	var showData=function(data){
		var t = template('tmpl1');
		$("#showData").html(t(data));
		//console.log(t(data));
	};
	var getData=function(type,pageNow,pageSize){
		var param={};
		param.type=type;
		param.pageNow=pageNow||1;
		param.pageSize=pageSize||defaultPageSize;
		$.get(getSourceCgi,param,function(data){
			if(data&&data.ec==0){
				data.typeName=$.getMenuNameByType(type);
				data.type=type;
				showData(data);
				dataCache=data;
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
	var modData=function(){

	};
	var showAddEditor=function(id){
		var data=getDataFromCacheById(id);
		if(data){
			var title=data.title;
			var logo=data.logo;
			var content=data.content;
			$.editor.setTitle(title);
			$.editor.setContent(decodeURIComponent(decodeURIComponent(content)));
		}
	};
	getData(1);
	$.getData=getData;
	$.delData=delData;
	$.showAddEditor=showAddEditor;
})($)

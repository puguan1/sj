
(function($){
	var getSourceCgi="../cgi-servelet/getSourceList";
	var delDataCgi="../cgi-servelet/delSource";
	var addDataCgi="../cgi-servelet/addSource";
	var modDataCgi="../cgi-servelet/modSource";
	var defaultPageSize=5;//默认的页数
	var dataCache={};//每次拉取的数据缓存一下
	var lastParams={};//上次拉去数据的参数，操作数据后重新拉
	var editorType="add";
	var modId="";//修改记录的id
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
		lastParams=param;
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
	var refresh=function(){
		getData(lastParams.type,lastParams.pageNow,lastParams.pageSize);
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
				refresh();
			}else{
				alert("删除失败");
			}
		},"json");
	};
	var addData=function(param){
		$.post(addDataCgi,param,function(data){
				if(data&&data.ec==0){
					alert("数据添加成功");
					refresh();
				}else{
					alert("数据添加失败");
				}
		},"json");
	};
	var modData=function(param){
		param.id=modId;
		$.post(modDataCgi,param,function(data){
				if(data&&data.ec==0){
					alert("数据修改成功");
					refresh();
				}else{
					alert("数据修改失败");
				}
		},"json");
	};
	var showAddEditor=function(id){
		modId=id;
		var data=getDataFromCacheById(id);
		if(data){
			var title=data.title;
			var logo=data.logo;
			var content=data.content;
			$.editor.setTitle(title);
			$.editor.setContent(decodeURIComponent(content));
			editorType="mod";
		}else{
			$.editor.setTitle("");
			$.editor.setContent("");
			editorType="add";
		}
	};
	var getEditorType=function(){
		return editorType;
	};
	getData(2);
	$.getData=getData;
	$.delData=delData;
	$.addData=addData;
	$.modData=modData;
	$.getEditorType=getEditorType;
	$.showAddEditor=showAddEditor;
})($)

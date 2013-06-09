
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
	var defaultType="2";//默认的type
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
		var t = 'tmpl1';
		if(data.type=="12"){
			 t = 'tmpl2';
			 $("#editor_wrap").hide();
			 $("#title_wrap").hide();
			 $("#resource").html("表格：");
		}else{
			 $("#editor_wrap").show();
			  $("#title_wrap").show();
			 $("#resource").html("图片：");
		}
		$("#showData").html(txTpl(t,data));
		//console.log(t(data));
	};
	var getData=function(type,pageNow,pageSize){
		var param={};
		param.type=type;
		param.pageNow=pageNow||1;
		param.pageSize=pageSize||defaultPageSize;
		param.t=Math.random();
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
		$.editor.clear();
		$.resetEditorType();
		
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
			$.editor.setLogo(logo);
			$.editor.setContent(content);
			editorType="mod";
		}else{
			$.editor.setTitle("");
			$.editor.setLogo("");
			$.editor.setContent("");
			editorType="add";
		}
		$("#title").focus();
	};
	var getEditorType=function(){
		return editorType;
	};
	var resetEditorType=function(){
		editorType="add";
	};
	getData(defaultType);
	$.addSourceType=defaultType;
	$.getData=getData;
	$.delData=delData;
	$.addData=addData;
	$.modData=modData;
	$.getEditorType=getEditorType;
	$.resetEditorType=resetEditorType;
	$.showAddEditor=showAddEditor;
})($)

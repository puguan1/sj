
(function($){
	var menuIdPrefix="_menu_";
	var menuParent;
	var lastClick=null;//上次点击的节点
	var menuData=[
		 {"id":"34","pid":"","name":"首页","type":"34"}

		,{"id":"25","pid":"34","name":"战略联盟","type":"25"}
		,{"id":"36","pid":"34","name":"主页banner","type":"36"}
		,{"id":"37","pid":"34","name":"子页banner","type":"37"}
		,{"id":"38","pid":"34","name":"引导页banner","type":"38"}
		
		,{"id":"1","pid":"","name":"公司介绍","type":"1"}

		,{"id":"2","pid":"1","name":"企业简介","type":"2"}
		,{"id":"3","pid":"1","name":"核心价值观","type":"3"}
		,{"id":"4","pid":"1","name":"组织架构","type":"4"}
		,{"id":"5","pid":"1","name":"公司大事记","type":"5"}

		,{"id":"6","pid":"","name":"产品中心","type":"6"}

		,{"id":"7","pid":"6","name":"担保业务","type":"7"}
		,{"id":"8","pid":"6","name":"融资顾问","type":"8"}
		,{"id":"9","pid":"6","name":"资产管理","type":"9"}
		,{"id":"10","pid":"6","name":"投资管理咨询","type":"10"}
		,{"id":"11","pid":"6","name":"业务流程","type":"11"}
		,{"id":"12","pid":"6","name":"表格下裁","type":"12","isFile":"1"}

		,{"id":"13","pid":"","name":"行业动态","type":"13"}

		,{"id":"14","pid":"13","name":"企业新闻","type":"14"}
		,{"id":"15","pid":"13","name":"最新行业动态","type":"15"}
		,{"id":"16","pid":"13","name":"政策法规","type":"16"}

		,{"id":"17","pid":"","name":"人力资源","type":"17"}

		,{"id":"18","pid":"17","name":"人才观","type":"18"}
		,{"id":"19","pid":"17","name":"招聘简章","type":"19"}
		,{"id":"20","pid":"17","name":"简历投递","type":"20"}

		,{"id":"21","pid":"","name":"企业文化","type":"21"}

		,{"id":"22","pid":"21","name":"公司标识","type":"22"}
		,{"id":"23","pid":"21","name":"经营理念","type":"23"}
		,{"id":"24","pid":"21","name":"员工风采","type":"24"}

		//,{"id":"25","pid":"","name":"战略联盟","type":"25"}

		,{"id":"26","pid":"25","name":"合作银行","type":"26"}
		,{"id":"27","pid":"25","name":"小贷公司","type":"27"}
		,{"id":"28","pid":"25","name":"典当公司","type":"28"}
		,{"id":"29","pid":"25","name":"投资咨询管理公司","type":"29"}
		,{"id":"30","pid":"25","name":"PE","type":"30"}

		,{"id":"31","pid":"","name":"联系我们","type":"31"}

		,{"id":"32","pid":"31","name":"公司地址","type":"32"}
		,{"id":"33","pid":"31","name":"服务电话","type":"33"}
	

	];
	var getChildData=function(pid){
		var result=[];
		for(var i=0,l=menuData.length;i<l;i++){
			var m=menuData[i];
			if(m.pid==pid){
				result.push(m);
			}
		}
		return result;

	}
	var createMenu=function(pDom){
		if(typeof pDom=="string"){
			pDom=$("#"+pDom);
		}
		menuParent=pDom;
		var pid=pDom.attr("id");
		if(pid.indexOf(menuIdPrefix)!=-1){
			pid=pid.replace(menuIdPrefix,"")
		}else{
			pid="";
		}
		var data=getChildData(pid);
		for(var i=0,l=data.length;i<l;i++){
			var m=data[i];
			var isLeaf=0;
			if(m.pid){
				isLeaf=1;//叶子节点
			}
			pDom.append("<div type="+(m.tpye||m.id) +" style='display:"+(isLeaf==1?"none":"")+"'  class='"+(isLeaf==1?"leafMenu":"directoryMenu")+"' isLeaf="+isLeaf+" id="+(menuIdPrefix+m.id)+">"+m.name+"</div>")
		}
		addMenuEvents();
	};
	var expandMenu=function(menu){
		//当前为展开，就收拢
		var speed=500;
		if(menu.attr("expand")=="1"){
			menu.children("div").hide(speed);
			menu.attr("expand","0")
		}else{
			if(menu.attr("hasCreate")=="1"){

			}else{
				createMenu(menu);
				menu.attr("hasCreate","1")
			}
			menu.children("div").show(speed);
			menu.attr("expand","1")
		}
	};
	var addMenuEvents=function(){
		if(menuParent){
			menuParent.click(function(e){
				//叶子节点
				if($(e.target).attr("isLeaf")=="1"){
					if(lastClick){
						lastClick.attr("class","leafMenu unselected")
					}
					lastClick=$(e.target);
					$(e.target).siblings().attr("class","leafMenu unselected")
					$(e.target).attr("class","leafMenu selected")
					var type=$(e.target).attr("type");
					if(type!=""){
						$.getData(type);
						$.addSourceType=type;//外面使用
					}
					$.editor.clear();
					$.resetEditorType();
				}else{
					expandMenu($(e.target));
				}
				
				e.stopPropagation();
			});
/*			menuParent.bind("mouseover",function(e){
				var menu=$(e.target);
				if(menu.attr("isLeaf")=="1"){
				}else{
					if(menu.attr("hasCreate")=="1"){
					}else{
						createMenu(menu);
						menu.attr("hasCreate","1")
					}
				}
				e.stopPropagation();
			});*/
		}
	};
	var getMenuNameByType=function(type){
		for(var i=0,l=menuData.length;i<l;i++){
			if(menuData[i]["type"]==type){
				return menuData[i]["name"];
			}
		}
		return "";
	};
	$.createMenu=createMenu;
	$.getMenuNameByType=getMenuNameByType;
})($)
$.createMenu("leftMenu");
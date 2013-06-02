
(function($){
	var menuIdPrefix="_menu_";
	var menuParent;
	var menuData=[
		{"id":"1","pid":"","name":"公司介绍","type":""}

		,{"id":"2","pid":"1","name":"企业简介","type":""}
		,{"id":"3","pid":"1","name":"核心价值观","type":""}
		,{"id":"4","pid":"1","name":"组织架构","type":""}
		,{"id":"5","pid":"1","name":"公司大事记","type":""}

		,{"id":"6","pid":"","name":"产品中心","type":""}

		,{"id":"7","pid":"6","name":"担保业务","type":""}
		,{"id":"8","pid":"6","name":"融资顾问","type":""}
		,{"id":"9","pid":"6","name":"资产管理","type":""}
		,{"id":"10","pid":"6","name":"投资管理咨询","type":""}
		,{"id":"11","pid":"6","name":"业务流程","type":""}
		,{"id":"12","pid":"6","name":"表格下裁","type":""}

		,{"id":"13","pid":"","name":"行业动态","type":""}

		,{"id":"14","pid":"13","name":"企业新闻","type":""}
		,{"id":"15","pid":"13","name":"最新行业动态","type":""}
		,{"id":"16","pid":"13","name":"政策法规","type":""}

		,{"id":"17","pid":"","name":"人力资源","type":""}

		,{"id":"18","pid":"17","name":"人才观","type":""}
		,{"id":"19","pid":"17","name":"招聘简章","type":""}
		,{"id":"20","pid":"17","name":"简历投递","type":""}

		,{"id":"21","pid":"","name":"企业文化","type":""}

		,{"id":"22","pid":"21","name":"公司标识","type":""}
		,{"id":"23","pid":"21","name":"经营理念","type":""}
		,{"id":"24","pid":"21","name":"员工风采","type":""}

		,{"id":"25","pid":"","name":"战略联盟","type":""}

		,{"id":"26","pid":"25","name":"合作银行","type":""}
		,{"id":"27","pid":"25","name":"小贷公司","type":""}
		,{"id":"28","pid":"25","name":"典当公司","type":""}
		,{"id":"29","pid":"25","name":"投资咨询管理公司","type":""}
		,{"id":"30","pid":"25","name":"PE","type":""}

		,{"id":"31","pid":"","name":"联系我们","type":""}

		,{"id":"32","pid":"31","name":"公司地址","type":""}
		,{"id":"33","pid":"31","name":"服务电话","type":""}

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
			pDom.append("<div type="+(m.tpye||m.id) +" class='"+(isLeaf==1?"leafMenu":"directoryMenu")+"' isLeaf="+isLeaf+" id="+(menuIdPrefix+m.id)+">"+m.name+"</div>")
		}
		addMenuEvents();
	};
	var expandMenu=function(menu){
		//当前为展开，就收拢
		if(menu.attr("expand")=="1"){
			menu.children("div").hide();
			menu.attr("expand","0")
		}else{
			if(menu.attr("hasCreate")=="1"){

			}else{
				createMenu(menu);
				menu.attr("hasCreate","1")
			}
			menu.children(".div").show();
			menu.attr("expand","1")
		}
	};
	var addMenuEvents=function(){
		if(menuParent){
			menuParent.click(function(e){
				//叶子节点
				if($(e.target).attr("isLeaf")=="1"){
					$(e.target).siblings().attr("class","leafMenu unselected")
					$(e.target).attr("class","leafMenu selected")
					var type=$(e.target).attr("type");
					if(type){
						$.getData(type);
					}
				}else{
					expandMenu($(e.target));
				}
				
				e.stopPropagation();
			})
		}
	}
	$.createMenu=createMenu;
})($)
$.createMenu("leftMenu");
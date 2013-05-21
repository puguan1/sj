(function($){
	var menuItems=["首页","公司介绍","产品中心","行业动态","人力资源","企业文化","战略联盟","联系我们"];
	var defaultMenu="公司介绍";
	var menuStyle={"default":"default","hover":"hover","active":"active"};
	var menuEvent=function(e){
		var menus=$("#headerMenu a");
		for(var i=0,l=menus.length;i<l;i++){
			if(e.target.innerHTML==menus.get(i).innerHTML){
				menus.get(i).className=menuStyle["active"];
			}else{
				menus.get(i).className=menuStyle["default"];
			}
		}
	};
	var createHeader=function(parentId){
		var domHeader=document.createElement("div");
		var domHeaderTopLine=document.createElement("div");
		domHeaderTopLine.className="headerTopLine";
		var domHeaderBottom=document.createElement("div");
		domHeaderBottom.className="headerBottom";
		var domHeaderleftLogo=document.createElement("div");
		domHeaderleftLogo.className="headerLeftLogo";
		var domHeaderMenu=document.createElement("div");
		domHeaderMenu.className="headerMenu";
		domHeaderMenu.id="headerMenu";
		for(var i=0,l=menuItems.length;i<l;i++){
			var　menuItem=document.createElement("a");
			menuItem.innerHTML=menuItems[i];
			if(menuItems[i]==defaultMenu){
				menuItem.className=menuStyle["active"];
			}else{
				menuItem.className=menuStyle["default"];
			}
			menuItem.setAttribute("href","javascript:void(0);");
			domHeaderMenu.appendChild(menuItem);
		}
		domHeaderBottom.appendChild(domHeaderleftLogo);
		domHeaderBottom.appendChild(domHeaderMenu);
		domHeader.appendChild(domHeaderTopLine);
		domHeader.appendChild(domHeaderBottom);
		
		document.getElementById(parentId).appendChild(domHeader);

		$("#headerMenu").bind("click",menuEvent);
	};
	$.createHeader=createHeader;
	$.menuItems=menuItems;
})($);
(function($){
	var createBottom=function(parentId){
		var domBottom=document.createElement("div");
		var domBottomMenu=document.createElement("div");
		var menuItems=$.menuItems;
		for(var i=0,l=menuItems.length;i<l;i++){
			var　menuItem=document.createElement("a");
			menuItem.innerHTML=menuItems[i];
			menuItem.setAttribute("href","javascript:void(0);");
			domBottomMenu.appendChild(menuItem);
		}
		var domBottomAddress=document.createElement("div");
		domBottomAddress.innerHTML="公司地址：武汉市建设大道535号新中华大厦20层 邮编：430000 tel:(027)85234008 FAX:(027)85545190";
		var domBottomCopyright=document.createElement("div");
		domBottomCopyright.innerHTML="©Copyright:2009-2013 All Rights Reserved.鄂ICP备11067463号";
		domBottom.appendChild(domBottomMenu);
		domBottom.appendChild(domBottomAddress);
		domBottom.appendChild(domBottomCopyright);
		document.getElementById(parentId).appendChild(domBottom);
	};
	$.createBottom=createBottom;
})($);	
$.createHeader("header");
$.createBottom("bottom");


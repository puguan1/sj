/**
	mail:2889887004@qq.com(qqqqqq)
	github:puguan1
	pwd:qqqqqq1
**/
(function($){
	var initEditor=function(){
		$.sceditor.command.set("upload", {
			tooltip: "Insert the letter a"
		});
		// Replace all textarea's with SCEditor
		$("textarea").sceditor({
			plugins: "bbcode",
			locale:"cn",
			//toolbar: "bold,italic,underline|upload",
			toolbarExclude:"youtube,ltr,rtl,code,quote,emoticon,print,maximize,source,date,time,horizontalrule",//要去掉的菜单
			skipLastLineBreak:true,
		    style: "css/jquery.sceditor.default.css",
		    width:780,
		    height:400
			 });
		//$('textarea').sceditor('instance').val('');
		initUpload();

	};
	var newsLogo="";
	var initUpload=function(){

		var uploadBotton=$(".sceditor-toolbar");
		uploadBotton.append("<span id='uploadBotton' class='uploadBotton'></span>")

		var upload = $.upload.init({uploadUrl: '../cgi-bin/upload',
			placeholderId:'uploadBotton', 
			placeholderClass:'upload', 
			filePostName: 'file', 
			disabled: false,
			postParams: {
			   'requestAllowedTypes': '1'
			},
			uploadStart: function(file) {
				upload.setDisabled(true);
			},
			uploadEnd: function() {
				upload.setDisabled(false);
				try {
					var result=this.contentWindow.document.body.innerHTML;
					result=result.match(/{\"ec\":(\d),\"imgId\":\"([\w .]+)\"}/);
					var ec=result[1];
					var imgId=result[2];
					switch(ec){
						case "0":
							$('textarea').sceditor('instance').insert("<img style='maxWidth:600px;maxHeight:500px;' src='/sj/uploadImages/"+imgId+"' />");
							break;
						default:
							alert("图片上传失败")
					}
					
				} catch(e) {
					alert(e.message);
				}
			},
			title: 'upload'
		});
		var uploadLogo = $.upload.init({uploadUrl: '../cgi-bin/upload',
			placeholderId:'uploudLogo', 
			placeholderClass:'upload', 
			filePostName: 'file', 
			disabled: false,
			postParams: {
			   'requestAllowedTypes': '1'
			},
			uploadStart: function(file) {
				upload.setDisabled(true);
			},
			uploadEnd: function() {
				upload.setDisabled(false);
				try {
					var result=this.contentWindow.document.body.innerHTML;
					result=result.match(/{\"ec\":(\d),\"imgId\":\"([\w .]+)\"}/);
					var ec=result[1];
					var imgId=result[2];
					switch(ec){
						case "0":
							newsLogo='/sj/uploadImages/'+imgId;
							$("#logo").val(newsLogo);
							break;
						default:
							alert("图片上传失败")
					}
					
				} catch(e) {
					alert(e.message);
				}
			},
			title: 'upload'
		});
	};
	var getTitle=function(){
		return $("[id=title]").get(0).value;
	};
	var setTitle=function(title){
		$("#title").get(0).value=title;
	};
	var getType=function(){
		return $.addSourceType||"1";
	};
	var getContent=function(){
		return $('textarea').sceditor('instance').val();
	};
	var setContent=function(content){
		$('textarea').sceditor('instance').val(content);
	};
	var getLogo=function(){
		return newsLogo;
	};
	var setLogo=function(logo){

	};

	var submit=function(){
		var param={};
		param.title=getTitle();
		param.type=getType();
		param.content=getContent();
		param.logo=getLogo();
		if($.getEditorType()=="add"){
			$.addData(param);
		}else{
			$.modData(param);
		}
		
		
	};
	var bindEvent=function(){
		$("#submit").bind("click",function(){submit();});
		//$("body").bind("click",function(){$('textarea').sceditor('instance').insert("fuck")});
	};
	initEditor();
	bindEvent();

	var editor=function(){
		return{
			setTitle:setTitle,
			setLogo:setLogo,
			setContent:setContent,
			getTitle:getTitle,
			getLogo:getLogo,
			getContent:getContent
		}
	}();
	$.editor=editor;
})($);


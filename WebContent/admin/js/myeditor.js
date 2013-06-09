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
		$("#editor").sceditor({
			plugins: "bbcode",
			locale:"cn",
			//toolbar: "bold,italic,underline|upload",
			toolbarExclude:"youtube,ltr,rtl,code,quote,emoticon,print,maximize,source,date,time,horizontalrule",//要去掉的菜单
			skipLastLineBreak:true,
		    style: "css/jquery.sceditor.default.css",
		    width:780,
		    height:400
			 });
		//$('#editor').sceditor('instance').val('');
		initUpload();

	};
	var inArray=function(array,item){
		for(var i=0,l=array.length;i<l;i++){
			if(array[i].toLowerCase()==item.toLowerCase()){
				return true;
			}
		}
		return false;
	};
	var newsLogo="";
	var initUpload=function(){

		var uploadBotton=$(".sceditor-toolbar");
		uploadBotton.append("<span id='uploadBotton' class='uploadBotton'></span>")

		var upload = $.upload.init({uploadUrl: '../cgi-bin/upload',
			placeholderId:'uploadBotton', 
			placeholderClass:'upload', 
			title:"上传图片",
			filePostName: 'file', 
			disabled: false,
			postParams: {
			   'requestAllowedTypes': '1'
			},
			uploadStart: function(file) {
				var fileType=file.substr(file.lastIndexOf(".")+1);
				var fileName=file.substr(file.lastIndexOf("\\")+1);
				var types=["jpg","jpeg","gif","bmp","png"];
				if(!inArray(types,fileType)){
					alert("文件格式有误,请选择正确的图片格式，支持"+types.join(","));
					return false;
				}else{
					upload.setDisabled(true);
				}
			},
			uploadEnd: function() {
				upload.setDisabled(false);
				try {
					var result=this.contentWindow.document.body.innerHTML;
					result=result.match(/{\"ec\":(\d)+,\"(imgId|msg)\":\"([\w\W]+)\"}/);
					if(!result){
						alert("图片上传失败");
						return;
					}
					var ec=result[1];
					var imgId=result[3];
					switch(ec){
						case "0":
							$('#editor').sceditor('instance').insert("<img style='max-width:600px;max-height:500px;' src='/sj/uploadImages/"+imgId+"' />");
							break;
						default:
							alert(result[3]||"图片上传失败");
					}
					
				} catch(e) {
					//alert(e.message);
				}
			}
		});
		var uploadLogo = $.upload.init({uploadUrl: '../cgi-bin/upload',
			placeholderId:'uploudLogo', 
			placeholderClass:'upload', 
			title:"上传图片",
			filePostName: 'file', 
			disabled: false,
			postParams: {
			   'requestAllowedTypes': '1'
			},
			uploadStart: function(file) {
				var fileType=file.substr(file.lastIndexOf(".")+1);
				var fileName=file.substr(file.lastIndexOf("\\")+1);
				var types=["jpg","jpeg","gif","bmp","png"]
				if(getType()=="12"){
					//types=["xls","doc"]
					setTitle(fileName);
				}
				if(!inArray(types,fileType)&&getType()!="12"){
					alert("文件格式有误,请选择正确的图片格式，支持"+types.join(","));
					return false;
				}else{
					upload.setDisabled(true);
				}
				
			},
			uploadEnd: function() {
				upload.setDisabled(false);
				try {
					var result=this.contentWindow.document.body.innerHTML;
					result=result.match(/{\"ec\":(\d)+,\"(imgId|msg)\":\"([\w\W]+)\"}/);
					if(!result){
						alert("图片上传失败");
						return;
					}
					var ec=result[1];
					var imgId=result[3];
					switch(ec+""){
						case "0":
							newsLogo='/sj/uploadImages/'+imgId;
							setLogo(newsLogo);
							break;
						default:
							alert(result[3]||"图片上传失败");
					}
					
				} catch(e) {
					//alert(e.message);
				}
			}
		});
	
	};
	
	var getTitle=function(){
		return $("[id=title]").val();
	};
	var setTitle=function(title){
		$("#title").val(title);
	};
	var getType=function(){
		return $.addSourceType||"1";
	};
	var getContent=function(){
		return $('#editor').sceditor('instance').val();
	};
	var setContent=function(content){
		$('#editor').sceditor('instance').val(content);
	};
	var getLogo=function(){
		return $("#logo").val();
	};
	var setLogo=function(logo){
		$("#logo").val(logo);
	};
	var clear=function(){
		setTitle("");
		setLogo("");
		setContent("");
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
		//$("body").bind("click",function(){$('#editor').sceditor('instance').insert("fuck")});
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
			getContent:getContent,
			clear:clear
		}
	}();
	$.editor=editor;
})($);


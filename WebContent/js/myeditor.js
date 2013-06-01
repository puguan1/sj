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
			toolbarExclude:"youtube,ltr,rtl,code,quote,emoticon,print,maximize,source",//要去掉的菜单
		    style: "../css/jquery.sceditor.default.css",
		    width:980,
		    height:500
			 });
		//$('textarea').sceditor('instance').val('');
		initUpload();

	};
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
							$('textarea').sceditor('instance').insert("<img src='/images/"+imgId+"' />");
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
		return encodeURIComponent($("[id=title]").get(0).value);
	};
	var getType=function(){
		return $("[id=type]").get(0).value;
	};
	var getContent=function(){
		return encodeURIComponent($('textarea').sceditor('instance').val());
	};
	var getLogo=function(){
		return "";
	};
	var preview=function(){
		var form=document.createElement("form");
		form.setAttribute("action","http://id.qq.com");
		form.setAttribute("target","_blank");
		form.setAttribute("method","post");
		form.style.display="none";
		var inputTitle=document.createElement("input");
		inputTitle.setAttribute("name","title");
		inputTitle.setAttribute("value",getTitle());
		var inputType=document.createElement("input");
		inputType.setAttribute("name","type");
		inputType.setAttribute("value",getType());
		var inputContent=document.createElement("input");
		inputContent.setAttribute("name","content");
		inputContent.setAttribute("value",getContent());
		form.appendChild(inputTitle);
		form.appendChild(inputType);
		form.appendChild(inputContent);
		document.body.appendChild(form);
		form.submit({'a':1});
	};
	var submit=function(){
		var param={};
		param.title=getTitle();
		param.type=getType();
		param.content=getContent();
		param.logo=getLogo();
		var submitUrl="../cgi-servelet/addSource";
		$.post(submitUrl,param,function(data){
				if(data&&data.ec==0){
					alert("数据添加成功");
				}else{
					alert("数据添加失败");
				}
		},"json");
		
	};
	var bindEvent=function(){
		$("#submit").bind("click",function(){submit();});
		//$("body").bind("click",function(){$('textarea').sceditor('instance').insert("fuck")});
	};
	initEditor();
	bindEvent();
})($);


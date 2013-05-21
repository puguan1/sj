(function($){
	$.getUrlParam = function(name)
	{
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) return decodeURIComponent(r[2]); return null;
	}
	})($);
(function($){
	
	var detailsUrl="/cgi-bin/details";
	var getDetails=function(id){
		$.get(detailsUrl,{"id":id},function(data){
			$("#details").attr("innerHTML",data.content);
		});
	};
	var id=$.getUrlParam("id");
	getDetails(id);
})($);	



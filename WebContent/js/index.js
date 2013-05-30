
(function (window, undefined) {

	// seajs.use('home_loader', function (homeLoader) {
	// 	homeLoader.init();
	// });

	// seajs.use('request_center', function (requestCenter) {
	// 	requestCenter.init();
	// });

	$('.product').children('li').click(function () {
		$('.product').children('li').removeClass('selected');
		$(this).addClass('selected');
	});
	
})(window);

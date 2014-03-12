$(document).ready(function() {

	var flashReady = function() {

		$("#play").on('click', function() {
			
			flash.connect('rtmp://localhost');

		});
	};

})//end document
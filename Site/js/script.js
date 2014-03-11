$(document).ready(function() {

	// COLORING CURRENT PAGE
	$(document).ready(function(){
	    $('#navUL a').each(function(index) {
	        if(this.href.trim() == window.location)
	            $(this).addClass("selected");
	    });
	});

})//end document
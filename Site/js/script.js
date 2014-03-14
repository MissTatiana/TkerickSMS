/*			=			=			=			=			=
				Conseqour - Elearning
				Tatiana Kerick
=			=			=			=			=			*/

var flashReady = function() {

	//PLAY BUTTON
	$(".play").on('click', function() {
		
		flash.connect('rtmp://localhost/SMSServer/');
		$(".play").attr('data-status', "1");

	});//play

	//RECORD BUTTON
	$(".record").on('click', function() {

	});//record

}; //flash ready

var connected = function(success, error) {
		
	if(success == true) {
		if($(".play").attr("data-status") == 1) {
			console.log('this is working');
			flash.startPlaying('startrekintodarkness_vp6.flv');
		}
		else {
			console.log('not the right data-status');
		}
	}
	else {
		console.log('shits broke');
	}



};//connected

var seekTime = function(time) {
	//playing back a video, called 30 times/second
};//seekTime

var getDuration = function(duration) {
	//playback of a video determined
};//getDuration

var recordingError = function(message, code) {
	//if there is an error while recording
};//recordingError

var globalError = function(message) {
	//if there is a flash error
};//globalError


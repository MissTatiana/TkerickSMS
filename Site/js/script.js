/*			=			=			=			=			=
				Conseqour - Elearning
				Tatiana Kerick
=			=			=			=			=			*/


var played = 0
var playPause = 0
var flashReady = function() {

	//PLAY BUTTON
	$(".play").on("click", function() {
		
		if(played == 0) {
			flash.connect("rtmp://localhost/SMSServer/");
		
			played = 1
			$("#playBtn").attr("src", "assets/img/icons/pause.png")
		}
		else { 
			flash.playPause();

			//logic for play/pause buttons
			playPause++;
			if(playPause % 2 === 0 ) {
				$("#playBtn").attr("src", "assets/img/icons/pause.png");
			}
			else {
				$("#playBtn").attr("src", "assets/img/icons/play.png");
			}
			
		}

	});//play

	//RECORD BUTTON
	$(".record").on("click", function() {

	});//record

}; //flash ready

var connected = function(success, error) {
		
	if(success == true) {
		if(played == 1) {
			console.log("this is working");
			flash.startPlaying("startrekintodarkness_vp6.flv");
		}	
	}
	else {
		console.log("shits broke");
	}

};//connected

var currentTime = 0;
var seekTime = function(time) {
	//playing back a video, called 30 times/second
	//time is the current time of the video

	//black bar w = 300px
	var xpos = time/durLength * 300;
	currentTime = xpos/300 * durLength;
	$("#playedBar").attr("width", xpos);
	console.log(xpos);
	document.getElementById("playedBar").style.width = xpos + "px";
	//$("#playedBar").attr("width", xpos + "px");

};//seekTime

var durLength = 0;
var getDuration = function(duration) {
	//playback of a video determined
	durLength = duration;
};//getDuration

var recordingError = function(message, code) {
	//if there is an error while recording
};//recordingError

var globalError = function(message) {
	//if there is a flash error
};//globalError


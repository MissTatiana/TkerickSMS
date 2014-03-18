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
		console.log("Not connected");
	}

};//connected


//DURATION OF VIDEO
var durLength = 0;
var getDuration = function(duration) {
	//playback of a video determined
	
	durLength = duration;
	console.log(durLength);

	//CLICK TO CERTAIN POINT IN VIDEO
	$("#play").on("click", function(a) {
		xpos = a.pageX - $(this).offset().left;
		currentTime = xpos/300 * duration; 
		console.log(currentTime);
		flash.setTime(currentTime);
	});//play click

};//getDuration

//PROGRESS OF VIDEO
var currentTime = 0;
var seekTime = function(time) {
	//playing back a video, called 30 times/second
	//time is the current position of the time during the play of the video
	var xpos = time/durLength * 300;
	//set the width of the bar showing progress
	$(".playedBar").width(xpos);

};//seekTime


var recordingError = function(message, code) {
	//if there is an error while recording
};//recordingError

var globalError = function(message) {
	//if there is a flash error
};//globalError


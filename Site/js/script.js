/*			=			=			=			=			=
				Conseqour - Elearning
				Tatiana Kerick
=			=			=			=			=			*/

var userPic = "";

//toggle volume adjuster
$(".volumeBtn").on("click", function(b) {
	b.preventDefault;
	$("#volume").toggle();
});//volume click


var played = 0;
var playPause = 0;

var recorded = 0;
var recordClick = 0;

var selectedCam = 0;
var selectedMicro = 0;

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

	//VOLUME
	$("#volume").on("click", function(c) {
		c.preventDefault();
		flash.getVolume();

		var volClick = c.pageY - $(this).offset().top;
		flash.setVolume(1- (volClick / 90));

		var volumed = ((volClick / 90)) * 90;
		$(".volumeSet").height(volumed);


	});//volumeBtn click

	//RECORD BUTTON
	$(".record").on("click", function() {

		//stop video from playing
		if(played != 0) {
			flash.stopPlaying();
			played = 0
			$("#playBtn").attr("src", "assets/img/icons/play.png");
		}

		if(recorded  == 1) {
			$("#recordBtn").attr("src", "assets/img/icons/record.png");
			flash.stopRecording();
			console.log('stopping..');
			recorded = 2;
		}
		else {
			flash.connect("rtmp://localhost/SMSServer/");
			recorded = 1;
			$("#recordBtn").attr("src", "assets/img/icons/record_stop.png");
		}
		

	});//record




	//CAMERAS AND MICROPHONES

	var camOptions = flash.getCameras();
	console.log(camOptions);
	$.each(camOptions, function(j, object) {
		$(".camOptions").append("<a href='#' data-cam=" + j + " class='selectedCam'>" + object + "</a>")
	})

	var showCameraList = 0;
	$("#cameraList").hide();
	$(".camSet").on("click", function(d) {
		d.preventDefault();

		showCameraList++;
		console.log(showCameraList);

		if(showCameraList % 2 === 0) {
			$("#cameraList").hide();
		}
		else {
			$("#cameraList").show();
		}

	});//camset

	$(".selectedCam").on("click", function(f) {
		selectedCam = $(this).attr("data-cam");
		console.log("selected Cam: " + selectedCam);
	});//selectedCam

	var microOptions = flash.getMicrophones();
	console.log(microOptions);
	$.each(microOptions, function(i, object) {
		$(".microOptions").append("<a href='#' data-micro=" + i + " class='selectedMicro'>" + object + "</a>")
	})

	var showMicroList = 0;
	$("#microList").hide();
	$(".micSet").on("click", function(e) {
		e.preventDefault(); 

		showMicroList++;
		console.log(showMicroList);

		if(showMicroList % 2 === 0) {
			$("#microList").hide();
		}
		else {
			$("#microList").show();
		}
	});//micSet

	$(".selectedMicro").on("click", function(g) {
		selectedMicro = $(this).attr("data-micro");
		console.log("select micro: " + selectedMicro);
	});//selectedMicro

}; //flash ready

var connected = function(success, error) {
		
	if(success == true) {
		if(played == 1) {
			console.log("this is working");
			flash.startPlaying("startrekintodarkness_vp6.flv");
		}

		if(recorded == 1) {
			console.log("recording...");
			var filename = "Conseqour_Recorded_Video";

			flash.startRecording(filename, selectedCam, selectedMicro);
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


/*	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=
					Firebase
=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	*/

var loggedOn = 0;
var user = "";
var userImg = "";

var chatRef = new Firebase('https://torid-fire-6703.firebaseio.com/');
var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
	if(error) {
		//an error occured while attempting login
		console.log(error);
	}
	else if(user) {
		//user authenticated with Firebase
		console.log("User ID: " + user.id + ", Provider: " + user.provider);

		$(".loginIcon").css("display", "none");

		$(".popup").append(
			"<h3>You've signed in with " + user.provider + "</h3>"
		);	

		/*	=	=	=	CHATTING (only accessable if logged in)	=	=	=	*/

		$("#comment").keypress(function(k) {
			if(k.keyCode == 13) {
				k.preventDefault();
				var img = $(".userImg");
				var name = user.name;
				var comment = $("#comment").val()
				chatRef.push({name: name, text: comment});
				$("#comment").val('')
			}
		});//comment keypress

		chatRef.on('child_added', function(snapshot) {
			var message = snapshot.val();
			displayChatMessage(message.name, message.text);
		});

		function displayChatMessage(name, text) {
			$("<div class='chatText' />").text(text).prepend(
				$("<p class='chatName' />").text(name + ": ")).appendTo($("#commentList"));
			$("#commentList")[0].scrollTop = $("#commentList")[0].scrollHeight;
		};
		
	}
	else {
		//user is logged out
		$("#commentField").css("display", "none");
		$("#commentFieldNotLog").css("visibility", "visible");
	}
})

//Login with facebook
$("#facebook").on("click", function(h) {
	h.preventDefault();
	auth.login('facebook');
	loggedOn = 1;
	console.log('logged in with facebook, Logged Status: ' + loggedOn);
});//facebook

//Login with Tiwtter
$("#twitter").on("click", function(i) {
	i.preventDefault();
	auth.login('twitter');
	loggedOn = 1;
	console.log('logged in with twitter, Logged Status: ' + loggedOn);
});//twitter






//LOGOUT
$("#logoutLink").on("click", function(j) {
	j.preventDefault();
	console.log('logout');
	auth.logout();
	location.reload();
});



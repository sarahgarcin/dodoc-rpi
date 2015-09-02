jQuery(document).ready(function($) {

	var serverBaseUrl = document.domain;
	var domainUrl = window.location.href;
	var host = window.location.host;
	var socket = io.connect();
	var sessionId = '';
	var time;
	console.log(host);
	/**
	* Events
	*/
	/* sockets */
	socket.on('connect', onSocketConnect);
	socket.on('error', onSocketError);
	socket.on('listMedias', ondisplayMedias);
	socket.on('displayNewImage', displayNewImage);
	socket.on('displayNewStopMotion', displayNewStopMotion);
	socket.on('displayNewVideo', displayNewVideo);
	socket.on('displayNewAudio', displayNewAudio);


	//socket.emit('newUserSelect', {id: socket.io.engine.id, name: app.session});
	//ondisplayMedias();

	/**
	* handlers
	*/
	/* sockets */


	function onSocketConnect() {
		sessionId = socket.io.engine.id;
		console.log('Connected ' + sessionId);
		socket.emit('newUserSelect', {id: sessionId, name: app.session});
	};
	function onSocketError(reason) {
		console.log('Unable to connect to server', reason);
	};

	function ondisplayMedias(array, json){
		$('.container-flux .content ul li').remove();
		for (var i = 0; i < array.length; i++) {    	
	    	var extension = array[i].split('.').pop();
	    	var identifiant =  array[i].replace("." + extension, "");
	    	timestampToDate(parseFloat(identifiant));

	    	var thismediaElement;

			if(extension == "jpg"){
				thismediaElement = "<li class='media images-bibli' id='"+ identifiant+"'' ><img src='https://"+host+"/" + app.session + "/" + array[i] + "'><h3 class='mediaTitre'>" +time+ "</h3></li>";
				prependAndFormat( "photos", thismediaElement);
			}
			if(extension == "webm"){
				thismediaElement = "<li class='media videos-bibli' id='"+ identifiant+"'' ><video class='video-js vjs-default-skin vjs-big-play-centered' src='https://"+host+"/" + app.session + "/" + array[i] + "' preload='none' poster='https://"+host + "/"+app.session + "/"+identifiant +"-thumb.png'></video><h3 class='mediaTitre'>" +time+ "</h3></li>";
				prependAndFormat( "video", thismediaElement);
			}
			if(extension == "mp4"){
				thismediaElement = "<li class='media stopmotion-bibli' id='"+ identifiant+"'' ><video class='video-js vjs-default-skin vjs-big-play-centered' src='https://"+host+"/" + app.session + "/" + array[i] + "' preload='none' poster='https://"+host + "/"+app.session + "/"+identifiant +"-thumb.png'></video><h3 class='mediaTitre'>" +time+ "</h3></li>";
				prependAndFormat( "video", thismediaElement);
			}
			if(extension == "wav"){
				thismediaElement = "<li class='media sons-bibli' id='"+ identifiant+"'' ><audio src='https://"+host+"/" + app.session + "/" + array[i] + "' preload='none' controls></audio><h3 class='mediaTitre'>" +time+ "</h3></li>";
				prependAndFormat( "audio", thismediaElement);
			}

		}
	}
	console.log( "https://"+host + "/"+app.session);
	function displayNewImage(req){
		var identifiant = req.name;
		timestampToDate(identifiant);
		var thisStringToAdd = "<li class='media images-bibli' id='"+ req.title+"'' ><img src='https://"+host+"/" + app.session + "/" + req.file + "'><h3 class='mediaTitre'>" +time+ "</h3></li>";
		prependAndFormat( "jpg", thisStringToAdd);
	}

	function displayNewStopMotion(req){
		var identifiant = req.name;
		timestampToDate(identifiant);
		console.log( "https://"+host + "/"+app.session + "/"+identifiant +"-thumb.png");
		var thisStringToAdd = "<li class='media motion-bibli' id='"+ req.title+"'' ><video class='video-js vjs-default-skin vjs-big-play-centered' src='https://"+host+"/" + app.session + "/" + req.file + "' preload='none' poster='https://"+host + "/"+app.session + "/"+identifiant +"-thumb.png'></video><h3 class='mediaTitre'>" +time+ "</h3></li>";
		prependAndFormat( "video", thisStringToAdd);
	}

	function displayNewVideo(req){
		var identifiant = req.name;
		timestampToDate(identifiant);
		var thisStringToAdd = "<li class='media videos-bibli' id='"+ req.title+"'' ><video  class='video-js vjs-default-skin vjs-big-play-centered' src='https://"+host+"/" + app.session + "/" + req.file + "' preload='none' poster='https://"+host + "/"+app.session + "/"+identifiant +"-thumb.png'></video><h3 class='mediaTitre'>" +time+ "</h3></li>";
		prependAndFormat( "video", thisStringToAdd);
	}

	function displayNewAudio(req){
		var identifiant = req.name;
		timestampToDate(identifiant);
		var thisStringToAdd = "<li class='media audio-bibli' id='"+ req.title+"'' ><audio src='https://"+host+"/" + app.session + "/" + req.file + "' preload='none' controls><h3 class='mediaTitre'>" +time+ "</h3></li>";
		prependAndFormat( "wav", thisStringToAdd);
	}


	function timestampToDate(timestamp){
    	var date = new Date(timestamp);
		// hours part from the timestamp
		var hours = date.getHours();
		// minutes part from the timestamp
		var minutes = "0" + date.getMinutes();
		// seconds part from the timestamp
		var seconds = "0" + date.getSeconds();

		// will display time in 10:30:23 format
		time = hours + 'h' + minutes.substr(minutes.length-2);
		//console.log(time);
	}

	function prependAndFormat( mediaType, stringToAdd) {
		$stringToAdd = $(stringToAdd);


		// if( mediaType == "audio" ) {
		// 	console.log("audio");
		//     $stringToAdd.find("audio").mediaelementplayer({
		//         alwaysShowControls: true,
		//         features: ['playpause', 'progress', 'volume'],
		//         audioVolume: 'vertical',
		//         audioWidth: 740,
		//         audioHeight: 0
		//     });
		// }
		// if( mediaType == "video" ) {
		// 	console.log("video");
		//     $stringToAdd.find("video").mediaelementplayer({
		//         alwaysShowControls: true,
		//         features: ['playpause', 'progress', 'volume'],
		//         audioVolume: 'vertical',
		//         videoWidth: 740,
		//         videoHeight: 623
		//     });					
		// }

		if( mediaType == "video" ) {
			$stringToAdd.prepend( "<div class='videoButton'></div>")	
		}

		$('.container-flux .content ul').prepend( $stringToAdd);

	}
});
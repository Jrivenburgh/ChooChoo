$(document).ready(function () {
	var config = {
        apiKey: "AIzaSyCS93hpuJz7RbH41JtKYDvkQj0CC84bRVg",
        authDomain: "choo-choo-2a10d.firebaseapp.com",
        databaseURL: "https://choo-choo-2a10d.firebaseio.com",
        projectId: "choo-choo-2a10d",
        storageBucket: "",
        messagingSenderId: "737893898187"
	};
	firebase.initializeApp(config);
	var database = firebase.database();

	$("#addTrainBtn").on("click", function () {
		var trainname = $('#trainNameInput').val().trim();
		var destination = $('#destinationInput').val().trim();
		var time = $('#trainTimeInput').val().trim();
		var frequency = $('#frequencyInput').val().trim();
		database.ref().push({
			name: trainname,
			dest: destination,
			time: time,
			freq: frequency,
		});
	});
	database.ref().on("child_added", function (childSnapshot) {
		var name = childSnapshot.val().name,
		dest = childSnapshot.val().dest,
		time = childSnapshot.val().time,
		frequency = childSnapshot.val().freq,
		frequency = parseInt(frequency),
		currentTime = moment(),
		dConverted = moment(childSnapshot.val().time, 'HH:mm').subtract(1, 'years'),
		trainTime = moment(dConverted).format('HH:mm'),
		tConverted = moment(trainTime, 'HH:mm').subtract(1, 'years'),
		timeDifference = moment().diff(moment(tConverted), 'minutes'),
		timeLeft = timeDifference % frequency,
		minsAway = frequency - timeLeft,
		nextTrain = moment().add(minsAway, 'minutes');
		$('#trainTable').append(
			"<tr><td id='train'>" + childSnapshot.val().name +
			"</td><td id='destination'>" + childSnapshot.val().dest +
			"</td><td id='frequency'>" + childSnapshot.val().freq +
			"</td><td id='nextarrival'>" + moment(nextTrain).format("HH:mm") +
			"</td><td id='minutesaway'>" + minsAway + ' minutes' + "</td></tr>");
	});
});
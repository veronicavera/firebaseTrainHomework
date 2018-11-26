// Initialize Firebase
var config = {
apiKey: "AIzaSyCniZw1TCb41Qq4OEd-04xEeRCHZ8kFyxY",
authDomain: "trainhomework-4804a.firebaseapp.com",
databaseURL: "https://trainhomework-4804a.firebaseio.com",
projectId: "trainhomework-4804a",
storageBucket: "trainhomework-4804a.appspot.com",
messagingSenderId: "515889379598"
};
firebase.initializeApp(config);

var database = firebase.database();

// adding train info
$("#add-train-btn").on("click", function(event) {
event.preventDefault();

// grabs user input
var trainName = $("#train-name-input").val().trim();
var trainDest = $("#destination-input").val().trim();
var trainFirst = $("#first-train-input").val().trim();
var trainFreq = $("#frequency-input").val().trim();

// Creates local "temporary" object for holding train data
var newTrain = {
    name: trainName,
    dest: trainDest,
    first: trainFirst,
    freq: trainFreq
};

// Uploads train data to the database
database.ref().push(newTrain);

// Logs everything to console
console.log(newTrain.name);
console.log(newTrain.dest);
console.log(newTrain.first);
console.log(newTrain.freq);

alert("Train successfully added");

// Clears all of the text-boxes
$("#train-name-input").val("");
$("#destination-input").val("");
$("#first-train-input").val("");
$("#frequency-input").val("");
});

// 3. Create Firebase event for adding train info to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
console.log(childSnapshot.val());

// Store everything into a variable.
var trainName = childSnapshot.val().name;
var trainDest = childSnapshot.val().dest;
var trainFirst = childSnapshot.val().first;
var trainFreq = childSnapshot.val().freq;

// train Info
console.log(trainName);
console.log(trainDest);
console.log(trainFirst);
console.log(trainFreq);



var timeArr = trainFirst;
var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
var maxMoment = moment.max(moment(), trainTime);
var trainMinutes;
var trainArrival;

if (maxMoment === trainTime) {
  trainArrival = trainTime.format("hh:mm A");
  trainMinutes = trainTime.diff(moment(), "minutes");
} else {
  var differenceTimes = moment().diff(trainTime, "minutes");
  var trainRemainder = differenceTimes % trainFreq;
  trainMinutes = trainFreq - trainRemainder;
  tArrival = moment().add(trainMinutes, "m").format("hh:mm A");
}


// Create the new row
var newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(trainDest),
  $("<td>").text(trainFreq),
  $("<td>").text(trainArrival),
  $("<td>").text(trainMinutes)
);

// Append the new row to the table
$("#train-table > tbody").append(newRow);
});
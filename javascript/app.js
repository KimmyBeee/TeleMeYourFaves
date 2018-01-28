//Array for first set of buttons of my fave TV
var tvShows =["Adventure Time", "Mindhunter", "Empire", "Game of Thrones", "The Wire"];

function makeButtons()	{
//Dump made buttons out of the div to avoid repeat buttons when called upon
	$("#tvshow-buttons").empty();

//Loop through the array of tv shows
	for (var i = 0; i < tvShows.length; i++)	{
//Create a button
		var newButton = $("<button>");
//Add a class
		newButton.addClass("tvshow");
//Add a data-value "name" with index number of where it is in the array
		newButton.attr("data-name", tvShows[i]);
//Grabbing the value of "name" for the tvshow and using that value for the text on the button
		newButton.text(tvShows[i]);
//Add the named button to html
		$("#tvshow-buttons").append(newButton);
	}
}

//Make the buttons functional with a click function
$("#find-tvshow").on("click", function(event)	{
	
	event.preventDefault();
	
	var tvShow = $("#tvshow-input").val().trim();
	
	makeButtons();

	var queryURL
});

makeButtons();
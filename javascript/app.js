//Array for first set of buttons of my fave TV
var tvShows =["Adventure Time", "Mindhunter", "Empire", "Game of Thrones", "The Wire"];

function displayGifs()	{
	$("#gif-theatre").empty();
	var tvShow = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=Bp3nrGa25U3WAujs5nJ0y2qyHbrkHX1A&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);

		for (var i = 0; i < response.data.length; i++)	{
			var newDiv = $("<div class='flex'>");
			var newImg = $("<img>");
			// var ratingP = $("<p>");
			var rating = response.data[i].rating;
			 // $("<p>").text("Rating: " + response.data[i].rating);
			var still = response.data[i].images.fixed_height_still.url
			var moving = response.data[i].images.fixed_height.url

			newImg.addClass("gifs");
			newImg.attr("src", still);
			newImg.attr("data-state", "still");
			newImg.attr("data-still", still);
			newImg.attr("data-moving", moving);
			// ratingP.attr("data-rating", rating);
			// $("#gifs").prepend(rating);
			$(newDiv).append(newImg);
			$(newDiv).append("<p> Rating: " + rating + "</p>");
			$("#gif-theatre").append(newDiv);

			// debugger;
			// var rating = $("<p>");

			// var pOne = $("<p>").text("Rating: " + response.data[i].rating);

			// $("#gif-theatre").prepend(pOne);
		}

		
	});
}

	$(document).on("click", ".gifs", function()	{
		if ($(this).attr("data-state") === "still") {
			$(this).attr("src", $(this).attr("data-moving"));
			$(this).attr("data-state", "moving")
		} else if ($(this).attr("data-state") === "moving") {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still")
		}

	})


function makeButtons()	{
//Dump made buttons out of the div to avoid repeat buttons when called upon
	$("#tvshow-buttons").empty();
	$("#gif-theatre").empty();
	$("#tvshow-input").val(" ");

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
//Prevent the page from automatically reloading with each new button	
	event.preventDefault();
//Takes text from input field	
	var tvShow = $("#tvshow-input").val().trim();
//Adds movie from textbox to the array tvShows
	tvShows.push(tvShow);
//Call on the function that cycle through the array and manifests buttons		
	makeButtons();
});

//Add click listener to all my tvshow buttons as they are made
$(document).on("click", ".tvshow", displayGifs);

makeButtons();
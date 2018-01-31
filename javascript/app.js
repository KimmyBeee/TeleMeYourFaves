//Array for first set of buttons of my fave TV
var tvShows =["Adventure Time", "Mindhunter", "Empire", "Game of Thrones", "The Wire"];

//Funtion that pulls gifs from Giphy and displays them on the screen
function displayGifs()	{
//Empty the div where gifs display so the only gifs showing are the most recently called
	$("#gif-theatre").empty();
//Variable that hold the value of the button name
	var tvShow = $(this).attr("data-name");
//Variable holding the gif request that goes to giphy and returns 10 gifs usung the name of the tvshow
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=Bp3nrGa25U3WAujs5nJ0y2qyHbrkHX1A&limit=10";
	
//The actual call that goes to giphy using the variable query URL and the specified retirieved method "get"
	$.ajax({
		url: queryURL,
		method: "GET"
//Function that logs the results from the query as response
	}).done(function(response) {
		console.log(response);
//For all gif results...
		for (var i = 0; i < response.data.length; i++)	{
//...create a div with class flex to hold the gif and it's rating
			var newDiv = $("<div class='flex'>");
//Create a new img tag in which the gif will post
			var newImg = $("<img>");	
//Create variables for the rating and the location of the moving and still versions of the giff	
			var rating = response.data[i].rating;
			var still = response.data[i].images.fixed_height_still.url
			var moving = response.data[i].images.fixed_height.url
//Attach the class of gifs to gifs
			newImg.addClass("gifs");
//Create the data-value of source, state and type of state and attach the associated variables
			newImg.attr("src", still);
			newImg.attr("data-state", "still");
			newImg.attr("data-still", still);
			newImg.attr("data-moving", moving);

//Attach the gif with all it's new information to the div made earlier			
			$(newDiv).append(newImg);
//Attach the rating onto the div
			$(newDiv).append("<p> Rating: " + rating + "</p>");
//Display it on the screen with the part of the screen associated with the id of gif-theatre in the html
			$("#gif-theatre").append(newDiv);	
		}	
	});
}
//Create a click function for what happen when you clock on the gif
	$(document).on("click", ".gifs", function()	{
//All the gifs post represented by an unmoving excerpt, if it is indead still when you click on it...
		if ($(this).attr("data-state") === "still") {
//...change it to moving by switching to the moving URL
			$(this).attr("src", $(this).attr("data-moving"));
//And have the state of it switch also to reflect that it is now in a moving state
			$(this).attr("data-state", "moving")
//If the gif URL and "state" is in moving when you click on it...
		} else if ($(this).attr("data-state") === "moving") {
//...swith the URL to the still URL...
			$(this).attr("src", $(this).attr("data-still"));
//Make the data-state reflect the swith to still
			$(this).attr("data-state", "still")
		}
	});


function makeButtons()	{
//Dump made buttons out of the div to avoid repeat buttons when button array is looped through to create buttons
	$("#tvshow-buttons").empty();
//Clear out the place in the screen where the gifs display so only most recently searched gifs show
	$("#gif-theatre").empty();
//Clear all writings out of the text input field box in the user input/search section
	$("#tvshow-input").val(" ");


//Loop through the array of tv shows
	for (var i = 0; i < tvShows.length; i++)	{
//Array of colors for buttons (couldn't get it to work)
		// var btnColor = ["#34e20d", "#f2ba13", "#84dcf4", "#f48309", "#aa09ea"]
//Create a button
		var newButton = $("<button>");
//Assign on of 5 colors randomly to new button (couldn't get it to work)
		// $("<button>").css("background-color", btnColor[Math.floor(Math.random * 5)]);
//Add a class
		newButton.addClass("tvshow");
//Add a data-value "name" with index number of where it is in the array
		newButton.attr("data-name", tvShows[i]);
//Grabbing the value of "name" for the tvshow and using that value for the text on the button
		newButton.text(tvShows[i]);
//Add the named button to html
		$("#tvshow-buttons").append(newButton);
//This is where I tried to get css to randomly color my buttons as they are made and I couldn't get it to work
		// $("#tvshow-buttons").css("background-color", btnColor[Math.floor(Math.random * 5)]);
		// console.log()
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

//Start the process of making buttons all over again
makeButtons();
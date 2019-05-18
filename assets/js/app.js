$(document).ready(function(){//I need jquery to run!
	console.log("testing...");
// Initial array of animals
var animals = ["Cat", "Dog", "Rabbit", "Skunk","Goldfish"];
 // Function for dumping the JSON content for each button into the div
 function displayAnimalInfo() {
	 console.log("displayAnimalInfo")

	var animal = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&apikey=nxrlR10chy2HicweYxWaZClA5qO1VfVV&limit=10"
	;

	$.ajax({
	  url: queryURL,
	  method: "GET"
	}).then(function(response) {
		console.log(response);
	  //$("#Animal-view").text(JSON.stringify(response));

	  var results = response.data;
	  $("#Animal-view").empty();
	  // Looping through each result item
	  for (var i = 0; i < results.length; i++) {

		// Creating and storing a div tag
		var animalDiv = $("<div>");

		// Creating a paragraph tag with the result item's rating
		var p = $("<p>").text("Rating: " + results[i].rating);

		// Creating and storing an image tag
		var animalImage = $("<img>");
		// Setting the src attribute of the image to a property pulled off the result item
		animalImage.attr("src", results[i].images.fixed_height.url);

		animalImage.attr("class","gif");
		animalImage.attr("data-still",results[i].images.fixed_height_still.url);
		animalImage.attr("data-animate",results[i].images.fixed_height.url);
		animalImage.attr("data-state","still");
		

		
		

		// Appending the paragraph and image tag to the animalDiv
		animalDiv.append(p);
		animalDiv.append(animalImage);

		// Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
		$("#Animal-view").prepend(animalDiv);
	  }
	});
  }

  $(document).on("click", ".gif", function() {
	// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
	var state = $(this).attr("data-state");
	console.log(this)
	// If the clicked image's state is still, update its src attribute to what its data-animate value is.
	// Then, set the image's data-state to animate
	// Else set src to the data-still value
	if (state === "still") {
	  $(this).attr("src", $(this).attr("data-animate"));
	  $(this).attr("data-state", "animate");
	  console.log("animate");
	} else {
	  $(this).attr("src", $(this).attr("data-still"));
	  $(this).attr("data-state", "still");
	  console.log("still");
	}
  });

 // Function for displaying animals data
 function renderButtons() {

	// Deleting the buttons prior to adding new animals
	// (this is necessary otherwise you will have repeat buttons)
	$("#buttons-view").empty();

	// Looping through the array of movies
	for (var i = 0; i < animals.length; i++) {

	  // Then dynamically generating buttons for each animal in the array
	  // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
	  var a = $("<button>");
	  // Adding a class of animal to our button
	  a.addClass("animal");
	  // Adding a data-attribute
	  a.attr("data-name", animals[i]);
	  // Providing the initial button text
	  a.text(animals[i]);
	  // Adding the button to the buttons-view div
	  $("#buttons-view").append(a);
	}
  }

  // This function handles events where one button is clicked
  $("#add-animal").on("click", function(event) {
	event.preventDefault();

	// This line grabs the input from the textbox
	var movie = $("#animal-input").val().trim();

	// Adding the animals from the textbox to our array
	animals.push(movie);
	console.log(animals);

	// Calling renderButtons which handles the processing of our movie array
	renderButtons();
  });

  // Function for displaying the movie info
  // Using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements
  $(document).on("click", ".animal", displayAnimalInfo);

  // Calling the renderButtons function to display the initial buttons
  renderButtons();


	
	/*var createButton = function(name){
	var button = $('<button>');
	button.text(name);
	$('.button-container').append(button);
}

var createButtonsFromArr = function(arr){
	for(var i=0;i<arr.length;i++){
		createButton(arr[i]);

	}
}

//$('.button-container').append();
*/
});
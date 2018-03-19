


// APIKEY

var animals = ["Dog", "Cat", "Capybara", "Lion", "Hamster"];

// Function for dumping the JSON content for each button into the div
function displayAnimalGifs() {

  // YOUR CODE GOES HERE!!! HINT: You will need to create a new div to hold the JSON.
  var animalName = $(this).attr('data-name');

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=dc6zaTOxFJmzC&limit=10";



  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var results = response.data;

    console.log(response);


    for (var i = 0; i < results.length; i++) {

      var animalDiv = $("<div class='item'>");

      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      var still = results[i].images.original_still;

      var f = $("<img>");
      f.attr("src", results[i].images.original_still.url);

      var animalImage = $("<img class='animalGif'>");
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalImage.attr("data-animate", results[i].images.fixed_height.url);
      animalImage.attr("data-still", results[i].images.fixed_height_still.url);
      animalImage.attr("data-state", "still")
      animalImage.addClass("animalImage img-fluid");

      animalDiv.prepend(animalImage);
      animalDiv.append(p);

      $("#gifs-appear-here").prepend(animalDiv);
    }

    // MAKE THE GIFS START STILL THEN ANIMATE

  }).then(function (response) {
    $(".animalGif").on("click", function () {
      console.log("workin")


      var state = $(this).attr("data-state");


      if (state == "still") {

        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", "animate")

      }


      else if (state == "animate") {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still")
      }

    });


  });
}


// Function for displaying movie data
function renderButtons() {

  // Deleting the buttons prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttonHolder").empty();


  // Looping through the array of animals
  for (var i = 0; i < animals.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie to our button
    a.addClass("animal");
    // Adding a data-attribute
    a.attr("data-name", animals[i]);
    // Providing the initial button text
    a.text(animals[i]);
    // Adding the button to the buttons-view div
    $("#buttonHolder").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function (event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var animalInput = $("#animal-input").val().trim();

  // The movie from the textbox is then added to our array
  animals.push(animalInput);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();



});




// Generic function for displaying the movieInfo
$(document).on("click", ".animal", displayAnimalGifs);


// Calling the renderButtons function to display the intial buttons
renderButtons();



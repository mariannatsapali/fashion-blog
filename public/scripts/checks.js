

// Event listener for form submission
document
  .getElementsByName("newForm")[0]
  .addEventListener("submit", function (event) {
    // Perform checks on form input fields
    var titleInput = document.getElementsByName("newContentTitle")[0].value;
    var authorInput = document.getElementsByName("newContentAuthor")[0].value;
    var categoryInput =
      document.getElementsByName("newContentCategory")[0].value;
    var imageUrlInput =
      document.getElementsByName("newContentImageUrl")[0].value;

    // Check if any of the validation checks fail
    if (
      !minCharsCheck(titleInput, 1, "title") ||
      !minCharsCheck(authorInput, 1, "author") ||
      !minCharsCheck(categoryInput, 1, "category") ||
      !isImageLinkValid(imageUrlInput, "imageUrl")
    ) {
      // Prevent form submission
      console.log("Form submission prevented due to validation errors.");
      var errorMessage = document.getElementById("formErrorMessage");
      errorMessage.innerHTML =
        "Validation failed. Please check the form for errors.";
      event.preventDefault();
    }
  });

// Event listener for input in the title field
document
  .getElementsByName("newContentTitle")[0]
  .addEventListener("input", function () {
    var input = this.value;
    minCharsCheck(input, 1, "title");
  });

// Event listener for input in the author field
document
  .getElementsByName("newContentAuthor")[0]
  .addEventListener("input", function () {
    var input = this.value;
    minCharsCheck(input, 1, "author");
  });

// Event listener for input in the category field
document
  .getElementsByName("newContentCategory")[0]
  .addEventListener("input", function () {
    var input = this.value;
    minCharsCheck(input, 1, "category");
  });

// Event listener for input in the image URL field
document
  .getElementsByName("newContentImageUrl")[0]
  .addEventListener("input", function () {
    var input = this.value;
    isImageLinkValid(input, "imageUrl");
  });

// Function to check if a string has at least a certain number of characters
var minCharsCheck = function (input, minChars, name) {
  var errorMessage = document.getElementById(name + "ErrorMessage");
  var checkIcon = document.getElementById(name + "CheckIcon");

  if (input.trim().length >= minChars) {
    // Clear the error message if the input is valid
    errorMessage.textContent = "";
    checkIcon.innerHTML = "&#10004;"; // Checkmark symbol
    return true;
  } else {
    // Display an error message
    errorMessage.textContent =
      "Field must be at least " + minChars + " character(s) long";
    checkIcon.innerHTML = "&#128473"; // Cross symbol
    return false;
  }
};

// Function to check if the provided URL is a valid image link
var isImageLinkValid = function (url, name) {
  var errorMessage = document.getElementById(name + "ErrorMessage");
  var checkIcon = document.getElementById(name + "CheckIcon");
  // Define a regular expression to match common image file extensions
  var imageLinkRegex = /^https:\/\/.*\.(jpeg|jpg|gif|png|bmp)$/i;

  // Test if the URL matches the regular expression
  if (imageLinkRegex.test(url)) {
    errorMessage.textContent = "";
    checkIcon.innerHTML = "&#10004;"; // Checkmark symbol
    return true;
  } else {
    // Display an error message
    errorMessage.textContent =
      "Image link is not in the right format: It must start with 'https://' and have a valid image extension (jpeg, jpg, gif, png, bmp).";
    checkIcon.innerHTML = "&#128473"; // Cross symbol
    return false;
  }
};

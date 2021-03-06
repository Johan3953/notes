$(document).ready(function() { 
  // Getting references to our form and input
  var signUpForm = $("form.signUp");
  var emailInput = $("input#signUpEmail");
  var passwordInput = $("input#signUpPassword");
  // When the signup button is clicked, we validate the email and password are not blank
  $(".btn-create").on("click", function(event) { 
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      console.log("error");
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });
  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    }).then(function(data) {
      window.location.href = "/notes";
    });
  }
});
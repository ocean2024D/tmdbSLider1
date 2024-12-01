

//POPUP register

let modalSignIn = document.getElementById("myModal");
let signInButton = document.getElementById("signinBtn");
let RegisterSpanClose = document.getElementsByClassName("close")[0];
signInButton.onclick = function () {
  modalSignIn.style.display = "block";
};
RegisterSpanClose.onclick = function () {
  modalSignIn.style.display = "none";
};
window.onclick = function (window) {
  if (window.target == modalSignIn ) {
    modalSignIn.style.display = "none";
  }
};

//////////////////////////////////////////////////////////////////////




document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();

  let username = document.getElementById("username");
  let password = document.getElementById("password");
   
  let usernameVal = username.value;
  let passwordVal = password.value;
 
let userRegex=/^[a-zA-Z_-]{3,16}$/;

  console.log(usernameVal);
  console.log(passwordVal);


  if (passwordVal.includes(" ")) {

  alert("not allowed empty spaces");
    password.style.backgroundColor="red"
    valid = false;
  } else if (
    passwordVal.length >= 8 &&
    passwordVal.length <= 15 &&
   passwordVal != " "
  ) {

   
    password.style.backgroundColor = "green";
  } else {
    valid = false;
    alert("Password error: should be between 8-15 characters.");
   password.style.backgroundColor="red"
   console.log(passwordVal)
  }



  let isLowerCase = true;
  for (let i = 0; i < usernameVal.length; i++) {
    if (usernameVal[i] !== usernameVal[i].toLowerCase()) {
      isLowerCase = false;
    }
  }

  if (usernameVal.length >= 5 && usernameVal.length <= 10 && isLowerCase && usernameVal.match(userRegex)) {
 alert("Username is valid.");
  
      username.style.backgroundColor="green"
  } else if (
    usernameVal.length >= 5 &&
    usernameVal.length <= 10 &&
    !isLowerCase
  ) {
   alert("Username must contain only lowercase letters.");
          username.style.backgroundColor="red"
  } else {
    valid = false;
 alert("Username error: should be between 5-10 characters.");
    username.style.backgroundColor="red"
  }
 
});
 

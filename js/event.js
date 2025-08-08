// Checking to see what page is loaded in.
const loadedPage = location.href.substring(location.href.lastIndexOf("/") + 1);

// Displaying the correct pages and sections on initial page loads.
if (loadedPage === "#homeContainer") {
  $("#deckContainer").hide();
  $("#poolContainer").fadeIn();
  $(".materialContainer").hide();
} else {
  $("#poolContainer").hide();
  $("#deckContainer").fadeIn();
  $(".materialContainer").hide();
}

if (loadedPage === "#deckContainer") {
  $("#poolContainer").hide();
  $("#deckContainer").fadeIn();
}

if (loadedPage === "#poolContainer") {
  $("#deckContainer").hide();
  $("#poolContainer").fadeIn();
}

// Listening for button clicks for page links (with jQuery)
$("[data-button='home-page']").click(function () {
  if ($("#deckContainer").is(":visible")) {
    $("#deckContainer").hide();
    $("#poolContainer").fadeIn();
  }
});

$("[data-button='pool-page']").click(function () {
  if ($("#deckContainer").is(":visible")) {
    $("#deckContainer").hide();
    $("#poolContainer").fadeIn();
  }
});

$("[data-button='deck-page']").click(function () {
  if ($("#poolContainer").is(":visible")) {
    $("#poolContainer").hide();
    $("#deckContainer").fadeIn();
  } else {
    $("#poolContainer").hide();
    $("#deckContainer").fadeIn();
  }
});

$("[data-button='contact-page']").click(function () {
  console.log("contact page");
});

$("[data-button='portfolio-page']").click(function () {
  console.log("portfolio page");
});

// Listening for button clicks of the sections (with jQuery)
$(".poolMaterial").click(function (e) {
  $(".workContainer").hide();
  $(".materialContainer").fadeIn();
});

$(".poolWork").click(function (e) {
  $(".materialContainer").hide();
  $(".workContainer").fadeIn();
});

$(".deckMaterial").click(function (e) {
  $(".workContainer").hide();
  $(".materialContainer").fadeIn();
});

$(".deckWork").click(function (e) {
  $(".materialContainer").hide();
  $(".workContainer").fadeIn();
});

// Listening for button clicks of the end of page button (with jQuery)
$("[data-button='moveToDeckPage']").click(function () {
  if ($("#poolContainer").is(":visible")) {
    $("#poolContainer").hide();
    $("#deckContainer").fadeIn();
  } else {
    $("#deckContainer").hide();
    $("#poolContainer").fadeIn();
  }
});

$("[data-button='moveToPoolPage']").click(function () {
  if ($("#poolContainer").is(":visible")) {
    $("#poolContainer").hide();
    $("#deckContainer").fadeIn();
  } else {
    $("#deckContainer").hide();
    $("#poolContainer").fadeIn();
  }
});

// ? Things that may be done later:
// 1) Using jQuery to apply the Active class to section buttons.
// 2) Does the scrolling to top of page if necessary

// ? Footer provided by: Austin Paquette
// ? Codepen to footer: https://codepen.io/pqt/pen/bNByOj
// INITIATE THE FOOTER
siteFooter();
// COULD BE SIMPLIFIED FOR THIS PEN BUT I WANT TO MAKE IT AS EASY TO PUT INTO YOUR SITE AS POSSIBLE
$(window).resize(function () {
  siteFooter();
});

function siteFooter() {
  var siteContent = $("#site-content");
  var siteContentHeight = siteContent.height();
  var siteContentWidth = siteContent.width();

  var siteFooter = $("#site-footer");
  var siteFooterHeight = siteFooter.height();
  var siteFooterWidth = siteFooter.width();

  console.log("Content Height = " + siteContentHeight + "px");
  console.log("Content Width = " + siteContentWidth + "px");
  console.log("Footer Height = " + siteFooterHeight + "px");
  console.log("Footer Width = " + siteFooterWidth + "px");

  siteContent.css({
    "margin-bottom": siteFooterHeight + 80,
  });
}

// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDZsEOsX9wHMf4AzVXlhfeLgfErwpOml1w",
  authDomain: "abn-contact-form.firebaseapp.com",
  databaseURL: "https://abn-contact-form-default-rtdb.firebaseio.com/",
  projectId: "abn-contact-form",
  storageBucket: "abn-contact-form.appspot.com",
  messagingSenderId: "447003370012",
  appId: "1:447003370012:web:a70da1f7ba41c080d535d9",
  measurementId: "G-GMBB7EW8S5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// Reference messages collection
const messagesRef = firebase.database().ref("messages");

// Listen for form submit
$("#contactForm").on("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  // Get values
  const firstName = getInputVal("first-name");
  const lastName = getInputVal("last-name");
  const email = getInputVal("email");
  const phone = getInputVal("phone");
  const message = getInputVal("message");

  const content = [firstName, lastName, email, phone, message];
  console.log(content);

  // Save message
  saveMessage(firstName, lastName, email, phone, message);

  // Show alert for contact form
  $(".alert").css({ display: "block" });

  // Hide alert after 5 seconds
  setTimeout(function () {
    $(".alert").css({ display: "none" });
  }, 5000);

  // Clear form
  $("#contactForm")[0].reset();
}

// Function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(firstName, lastName, email, phone, message) {
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    message: message,
  });
}

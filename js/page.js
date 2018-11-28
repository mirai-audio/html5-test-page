var submittedForms = {},
    hookedForms = [],
    loaderTrigger;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadHook);
} else {
  loadHook();
}

function formHook(event) {
  event.preventDefault();
  var object = {},
      FD = new FormData(event.target),
      formId = event.target.getAttribute("id");

  for (var pair of FD.entries()) {
    var key = pair[0], value = pair[1];

    if (object[key] && object[key].constructor === Array){
      object[key].push(value);
    } else if (object[key]) {
      object[key] = [object[key], value];
    } else {
      object[key] = value;
    }
  }

  submittedForms[formId] = object;
}

function loadHook(event) {
  var allForms = document.querySelectorAll("form.hook-form");
  for (var i = 0; i < allForms.length; i++) {
    allForms[i].addEventListener("submit", formHook);
    hookedForms.push(allForms[i].getAttribute("id"));
  }
}

function pageSwitch() {
  if (window.location.pathname === "/") {
    window.location.pathname = "/iframe.html";
  } else if (window.location.pathname === "/iframe.html"){
    window.location.pathname = "/";
  }
}

function loader() {
  document.getElementById("loader").style.display = "block";
  loaderTrigger = setTimeout(hide, 5000);
}

function hide() {
  document.getElementById("loader").style.display = "none";
}

var submittedForms = {},
    formHook,
    loadHook;

formHook = function(event) {
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

loadHook = function(event) {
  var allForms = document.querySelectorAll(".hook-form");
  for (var i = 0; i < allForms.length; i++) {
    allForms[i].addEventListener("submit", formHook);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadHook);
} else {
  loadHook(null);
}

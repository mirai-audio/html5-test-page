var submittedForms = {},
    hookedForms = [];

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

function getForm(id, timeout = 3) {
  if (submittedForms[id] != null) {
    return submittedForms[id];
  } else if (!hookedForms.includes(id) || timeout == 0) {
    return null;
  } else {
    setTimeout(getForm(id, timeout - 0.25), 250);
  }
}

window.addEventListener("hashchange", hashHandler, false);
window.addEventListener("load", hashHandler, false);

function hashHandler() {
  const urlObj = new URL(window.location.href);
  if (location.hash === "#story") {
    UrlMapping["#story"]();
  } else if (location.hash === "#report") {
    UrlMapping["#report"]();
  } else if (location.hash === "#share") {
    UrlMapping["#share"]();
  } else if (urlObj.searchParams.has("id")) {
    let id = urlObj.searchParams.get("id");
    UrlMapping["?id="]();
  } else if (location.hash === "") {
    UrlMapping[""]();
  } else if (location.hash === "#") {
    UrlMapping["#"]();
  }
}

var UrlMapping = {
  "": function () {
    homePageDisplay();
  },
  "#": function () {
    homePageDisplay();
  },
  "#story": function () {
    projectDisplay(new URL(window.location.href).searchParams.get("id"));
  },
  "?id=": function () {
    window.location.replace(new URL(window.location.href).toString() + "#story");
  },
  "#report": function () {
    projectDisplay(new URL(window.location.href).searchParams.get("id"));
  },
  "#share": function () {
    projectDisplay(new URL(window.location.href).searchParams.get("id"));
  },
};

window.onhashchange = hashHandler;
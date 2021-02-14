window.addEventListener("hashchange", hashHandler, false);
window.addEventListener("load", hashHandler, false);

function hashHandler() {
  const urlObj = new URL(window.location.href);
  console.log(urlObj.toString());
  if(location.hash === "#search") {
    let size = urlObj.searchParams.get("size");
    let pagenum = urlObj.searchParams.get("nextPage");
    let q = urlObj.searchParams.get("keywords");
    let country = urlObj.searchParams.get("countryRegion");
    let theme = urlObj.searchParams.get("theme");
    console.log('aeeeeeeeeee');
    console.log(country, theme);
    UrlMapping["#search"](size, pagenum, q, country, theme);
  } else if (location.hash === "#story") {

    UrlMapping["#story"](new URL(window.location.href).searchParams.get("id"));

  } else if (location.hash === "#reports") {

    UrlMapping["#reports"](new URL(window.location.href).searchParams.get("id"));

  } else if (location.hash === "#share") {

    UrlMapping["#share"](new URL(window.location.href).searchParams.get("id"));

  } else if (urlObj.searchParams.has("id")) {

    window.location.replace(new URL(window.location.href).toString() + "#story");

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
  "#story": function (id) {
    let story = new Story();
    story.projectDisplay(id);
  },
  "?id=": function (link) {

  },
  "#reports": function (id) {
    let reports = new Reports();
    reports.projectDisplay(id);
  },
  "#share": function (id) {
    let share = new Share();
    share.projectDisplay(id);
  },
  "#search": function (size, pageNum, q, country, themer) {
    new ExplorePG(size, pageNum, q, country, themer).searchResultDisplay();
  }
};

window.onhashchange = hashHandler;
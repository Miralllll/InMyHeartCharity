async function getExploreCols() {
  const res = await fetch(
    "https://api.globalgiving.org/api/public/projectservice/featured/projects/summary?api_key=27c355cb-4b3d-417d-a001-bb8623b0ab89"
  );
  const result = await res.text();
  var parser = new DOMParser();
  var xml = parser.parseFromString(result, "text/xml");
  const jsonRes = converterXMLToJson(xml);
  var cols = document.querySelector("div.three_col_info").querySelectorAll("div");
  var myCount = new Map();
  var myThem = new Map();
  for (let i = 0; i < jsonRes.projects.project.length; i += 1) {
    myCount.set(jsonRes.projects.project[i].countries.country.iso3166CountryCode, jsonRes.projects.project[i].countries.country.name);
  }
  for (let i = 0; i < jsonRes.projects.project.length; i += 1) {
    if(jsonRes.projects.project[i].themes.theme[0] === undefined){
      myThem.set(jsonRes.projects.project[i].themes.theme.id, jsonRes.projects.project[i].themes.theme.name);
    } else {
      myThem.set(jsonRes.projects.project[i].themes.theme[0].id, jsonRes.projects.project[i].themes.theme[0].name);
    }
  }
  for (let key of myCount.keys()) {
    cols[1].innerHTML += `<a name="` + key + `">` + myCount.get(key) + `</a>`;
  }
  for (let key of myThem.keys()) {
    cols[0].innerHTML += `<a name="` + key + `">` + myThem.get(key) + `</a>`;
  }
  var allLinks = document.querySelector("div.explore_show").querySelectorAll("a")
  for (let i = 0; i < allLinks.length; i += 1) {
    allLinks[i].addEventListener("click", linksListeners);
  }
}

function linksListeners() {
  console.log(this.name);
  const urlStr = document.location.protocol +"//"+ document.location.hostname + document.location.pathname;
  const urlObj = new URL(urlStr);
  urlObj.searchParams.set("size", 10);
  urlObj.searchParams.set("nextPage", 1);
  if(this.name === "") {
  }else if(this.name.length == 2) {
    urlObj.searchParams.set("countryRegion", this.name);
  } else {
    urlObj.searchParams.set("theme", this.name);
  }
  window.location.replace(urlObj.toString() + "#search");
}

getExploreCols();

function exploreListen() {
  $(document).ready(function () {
    $(".search").mouseenter(function () {
      infoUpdate();
      $("#explore_show").stop().show();
    });

    $("#explore_show").mouseleave(function () {
      if (!$("#explore_show").is(":hover")) {
        $("#explore_show").hide();
      }
    });
  });
}
exploreListen();

function infoUpdate() {
  let element = document.querySelector("#logo-side > div.search");
  let hidden_elem = document.getElementById("explore_show");
  left = getCoords(element).left;
  hidden_elem.style.left = "" + left + "px";
}

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
}
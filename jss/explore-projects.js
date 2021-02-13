async function getExploreCols() {
  const res = await fetch(
    "https://api.globalgiving.org/api/public/projectservice/featured/projects/summary?api_key=27c355cb-4b3d-417d-a001-bb8623b0ab89"
  );
  const result = await res.text();
  var parser = new DOMParser();
  var xml = parser.parseFromString(result, "text/xml");
  const jsonRes = converterXMLToJson(xml);
  var cols = document.querySelector("div.three_col_info").querySelectorAll("div");
  var mySetCount = new Set();
  var mySetThem = new Set();
  for (let i = 0; i < jsonRes.projects.project.length; i += 1) {
    // fixed part
    mySetCount.add(jsonRes.projects.project[i].country);
    console.log(mySetCount.size);
    mySetThem.add(jsonRes.projects.project[i].themeName);
  }
  for (let country of mySetCount) {
    cols[1].innerHTML += `<a href="#">` + country + `</a>`;
  }
  for (let theme of mySetThem) {
    cols[0].innerHTML += `<a href="#">` + theme + `</a>`;
  }
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
async function getProjectInfo(id) {
  const res = await fetch(
    "https://api.globalgiving.org/api/public/projectservice/projects/" +
      id +
      "?api_key=27c355cb-4b3d-417d-a001-bb8623b0ab89"
  );
  const result = await res.text();
  var parser = new DOMParser();
  var xml = parser.parseFromString(result, "text/xml");
  const jsonRes = converterXMLToJson(xml);
  var top_info = document.querySelectorAll("div.three_div");
  let first = top_info[0];
  let div_three = first.querySelector("div.margin-add").querySelectorAll("div");
  console.log(jsonRes.project);
  div_three[0].querySelector("p").innerHTML = jsonRes.project.themeName;
  div_three[1].querySelector("p").innerHTML = jsonRes.project.contactCountry;
  div_three[2].querySelector("p").innerHTML = "Project #" + id;
  let second = top_info[1];
  second.querySelector("div").querySelector("p").innerHTML =
    jsonRes.project.title;
  let third = top_info[2];
  third.querySelector("div").querySelector("p").innerHTML =
    jsonRes.project.organization.name;
}

var index = 0;
var totalSlides = 0;
var currProjId = 0;

async function getProjectGallery(id) {
  const res = await fetch(
    "https://api.globalgiving.org/api/public/projectservice/projects/" +
      id +
      "/imagegallery?api_key=27c355cb-4b3d-417d-a001-bb8623b0ab89"
  );
  const result = await res.text();
  var parser = new DOMParser();
  var xml = parser.parseFromString(result, "text/xml");
  const jsonRes = converterXMLToJson(xml);
  totalSlides = jsonRes.images.image.length;
  if (totalSlides == undefined) {
    document.querySelector("div.right-slide").style.display = "none";
    document.querySelector("div.left-slide").style.display = "none";
    document.querySelector("div.curr-active").querySelector("img").src =
      jsonRes.images.image.imagelink[4].url;
  } else {
    currProjId = id;
    index = 0;
    displayCurrImage(0);
  }
}

async function displayCurrImage(index) {
  const res = await fetch(
    "https://api.globalgiving.org/api/public/projectservice/projects/" +
      currProjId +
      "/imagegallery?api_key=27c355cb-4b3d-417d-a001-bb8623b0ab89"
  );
  const result = await res.text();
  var parser = new DOMParser();
  var xml = parser.parseFromString(result, "text/xml");
  const jsonRes = converterXMLToJson(xml);
  document.querySelector("div.curr-active").querySelector("img").src =
    jsonRes.images.image[index].imagelink[4].url;
}

checkElement("div.right-slide", function () {
  document.querySelector("div.right-slide").addEventListener(
    "click",
    function () {
      index++;
      if (index == totalSlides) {
        index = 0;
      }
      displayCurrImage(index);
    },
    false
  );
});
checkElement("div.left-slide", function () {
  document.querySelector("div.left-slide").addEventListener(
    "click",
    function () {
      if (index == 0) {
        index = totalSlides - 1;
      } else {
        index--;
      }
      displayCurrImage(index);
    },
    false
  );
});
function projectDisplay(id) {
  const project_html = `
        <div id="project-info">
            <div class="project-general">
                <div class="three_div">
                    <div class="margin-add">
                        <div class="threeiaa">
                            <p>ggg</p>
                        </div>
                        <div class="threeiaa">
                            <p>ggg</p>
                        </div>
                        <div class="threeiaa">
                            <p>ggg</p>
                        </div>
                    </div>
                    
                </div>
                <div class="three_div">
                    <div id="title">
                        <p>ggg</p>
                    </div>
                </div>
                <div class="three_div">
                    <div id="by-who">
                        <p>ggg</p>
                    </div>
                </div>
            </div>
            <div class="image-slider">
                <div class="slider-items">
                    <div class="curr-active">
                        <img src=""/>
                    </div>
                </div>
                <div class="left-slide">&lt;</div>
                <div class="right-slide">&gt;</div>
            </div>
        </div>
    `;
  currentMainRemove();
  document.querySelector("div.main").innerHTML = project_html;
  getProjectInfo(id);
  getProjectGallery(id);
}

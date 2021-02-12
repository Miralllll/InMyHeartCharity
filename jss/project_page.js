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
  div_three[0].querySelector("p").innerHTML = jsonRes.project.themeName;
  div_three[1].querySelector("p").innerHTML = jsonRes.project.contactCountry;
  div_three[2].querySelector("p").innerHTML = "Project #" + id;
  let second = top_info[1];
  second.querySelector("div").querySelector("p").innerHTML =
    jsonRes.project.title;
  let third = top_info[2];
  third.querySelector("div").querySelector("span").innerHTML =
    jsonRes.project.organization.name;
  document.querySelector("span.collected-num").innerHTML =
    "$" + jsonRes.project.funding;
  document.querySelector("span.goal-num").innerHTML =
    "$" + jsonRes.project.goal;
  console.log(jsonRes.project);
  document.querySelector("div.donation-num").querySelector("span").innerHTML =
    jsonRes.project.numberOfDonations;
  document.querySelector("div.stayed-money").querySelector("span").innerHTML =
    "$" + jsonRes.project.remaining;
  document.querySelector("div.filled").style.width =
    (jsonRes.project.funding / jsonRes.project.goal) * 100 + "%";
  document.querySelector("p.summary").innerHTML = jsonRes.project.summary;
  console.log(jsonRes.project.activites);
  document.querySelector("p.challenge").innerHTML = jsonRes.project.need;
  document.querySelector("p.solution").innerHTML = jsonRes.project.activities;
  document.querySelector("p.impact").innerHTML = jsonRes.project.longTermImpact;
  document.querySelector("div.project-container").querySelector("a").href =
    jsonRes.project.additionalDocumentation;
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
    document
      .querySelector("div.curr-active")
      .querySelector("div.img-some")
      .querySelector("img").src = jsonRes.images.image.imagelink[4].url;
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
  document
    .querySelector("div.curr-active")
    .querySelector("div.img-some")
    .querySelector("img").src = jsonRes.images.image[index].imagelink[4].url;
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

async function displaySummary(id) {
  const res = await fetch(
    "https://api.globalgiving.org/api/public/projectservice/projects/" +
      id +
      "/summary?api_key=27c355cb-4b3d-417d-a001-bb8623b0ab89"
  );
  const result = await res.text();
  var parser = new DOMParser();
  var xml = parser.parseFromString(result, "text/xml");
  const jsonRes = converterXMLToJson(xml);
  console.log(jsonRes.project);
}

checkElement("a.icon", function () {
  document.querySelector("a.icon").addEventListener("click", function () {
    var x = document.getElementById("myTopnav");
    if (x.className === "proj-nav") {
      x.className += " responsive";
    } else {
      x.className = "proj-nav";
    }
  });
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
                        By <span>ggg</span>
                    </div>
                </div>
                <hr class="hr-line">
            </div>
            <div class="wrapper-image-donate">
              <div class="image-donate">
                  <div class="slider">
                      <div class="image-slider">
                          <div class="slider-items">
                              <div class="curr-active">
                                  <div class="img-some"><img src=""/></div>
                              </div>
                          </div>
                          <div class="left-slide">&lt;</div>
                          <div class="right-slide">&gt;</div>
                      </div>
                  </div>
                  <div class="donate">
                      <div class="collected"> <span class="collected-num"> </span>  raised of  <span class="goal-num"> </span>  goal</div>
                      <div class="percent-bar">
                          <div class="filled"> </div>
                      </div>
                      <div>
                          <div class="donation-num"> <span> </span> donations </div>
                          <div class="stayed-money"> <span> </span> to go </div>
                      </div>
                      <div id="join">
                          <button class="new-some button-white-indigo font donateBtn">Donate Once</button>
                      </div>
                      <div id="join">
                          <button class="new-some button-white-indigo font donateBtn">Donate Monthly</button>
                      </div>
                  </div>
              </div>
            </div>
            <div class="wrapper-proj-nav">
                <div class="proj-nav" id="myTopnav">
                  <a href="#story" class="story">STORY</a>
                  <a href="#reports">REPORTS</a>
                  <a href="#photos">PHOTOS</a>
                  <a href="#share">SHARE</a>
                  <a href="javascript:void(0);" class="icon">
                    <i class="fa fa-bars" style="margin: 0; padding: 0; font-size: 22px;"></i>
                  </a>
                </div>
            </div>
            <div class="project-container">
              <p class="pr-title"> Summary </p>
              <p class="summary text"> </p>
              <p class="pr-title"> Challenge </p>
              <p class="challenge text"> </p>
              <p class="pr-title"> Solution </p>
              <p class="solution text"> </p>
              <p class="pr-title"> Long-Term Impact </p>
              <p class="impact text"> </p>
              <p class="pr-title"> Additional Documentation </p>
              <a class="text" href="#document"> This project has provided additional documentation in a PDF file (projdoc.pdf). <a>
            </div>
        </div>
    `;
  currentMainRemove();
  document.querySelector("div.main").innerHTML = project_html;
  getProjectInfo(id);
  getProjectGallery(id);
  displaySummary(id);
}

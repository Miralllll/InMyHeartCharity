async function getRandomTopPrograms() {
  const res = await fetch(
    "https://api.globalgiving.org/api/public/projectservice/featured/projects/summary?api_key=27c355cb-4b3d-417d-a001-bb8623b0ab89"
  );
  const result = await res.text();
  var parser = new DOMParser();
  var xml = parser.parseFromString(result, "text/xml");
  const jsonRes = converterXMLToJson(xml);
  var topFive = document.querySelectorAll("div.container");
  for (let i = 0; i < topFive.length; i += 1) {
    console.log(jsonRes.projects.project[i]);
    var imgLink = jsonRes.projects.project[i].imageLink;
    var title = jsonRes.projects.project[i].title;
    var projectId = jsonRes.projects.project[i].id;
    topFive[i].querySelector("img.full-img").src = imgLink;
    console.log(title);
    topFive[i]
      .querySelector("div.bottom-left")
      .querySelector("a").innerHTML = title;
    var projectLink =
      "file:///C:/Users/99555/Desktop/WebProj/InMyHeartCharity/htmls/home_page.html#" +
      projectId;
    topFive[i]
      .querySelector("div.bottom-left")
      .querySelector("a").href = projectLink;
    // console.log(
    //   topFive[i].querySelector("div.centered").querySelector("button").onclick
    // );
  }
}

function rafAsync() {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve); //faster than set time out
  });
}

function checkElement(selector) {
  if (document.querySelector(selector) === null) {
    return rafAsync().then(() => checkElement(selector));
  } else {
    getRandomTopPrograms();
    return Promise.resolve(true);
  }
}

checkElement("#topfive-pictures");

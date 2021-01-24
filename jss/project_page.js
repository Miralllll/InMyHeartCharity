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
</div>
    `;
  currentMainRemove();
  document.querySelector("div.main").innerHTML = project_html;
  getProjectInfo(id);
}

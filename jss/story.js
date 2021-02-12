class Story {
  projectDisplay(id) {
    this.id = id;
    projectDisplay(id);
    colorControl("story");
    const project_cont_html = `
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
        `;
    currProjContainerRemove();
    document.querySelector(
      "div.project-container"
    ).innerHTML = project_cont_html;
    this.getProjectInfo();
  }

  async getProjectInfo() {
    const res = await fetch(
      "https://api.globalgiving.org/api/public/projectservice/projects/" +
        this.id +
        "?api_key=27c355cb-4b3d-417d-a001-bb8623b0ab89"
    );
    const result = await res.text();
    var parser = new DOMParser();
    var xml = parser.parseFromString(result, "text/xml");
    const jsonRes = converterXMLToJson(xml);
    document.querySelector("p.summary").innerHTML = jsonRes.project.summary;
    console.log(jsonRes.project.activites);
    document.querySelector("p.challenge").innerHTML = jsonRes.project.need;
    document.querySelector("p.solution").innerHTML = jsonRes.project.activities;
    document.querySelector("p.impact").innerHTML =
      jsonRes.project.longTermImpact;
    document.querySelector("div.project-container").querySelector("a").href =
      jsonRes.project.additionalDocumentation;
  }
}

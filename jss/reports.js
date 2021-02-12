class Reports {
  projectDisplay(id) {
    this.id = id;
    projectDisplay(id);
    colorControl("reports");
    this.example = `
            <div class="report">
                <p class="indigo-color pr-title"> </p>
                <div class="mmmm"> </div>
            </div>
        `;
    this.all = ``;
    currProjContainerRemove();
    this.getProjectInfo();
  }

  async getProjectInfo() {
    const res = await fetch(
      "https://api.globalgiving.org/api/public/projectservice/projects/" +
        this.id +
        "/reports?api_key=27c355cb-4b3d-417d-a001-bb8623b0ab89"
    );
    const result = await res.text();
    var parser = new DOMParser();
    var xml = parser.parseFromString(result, "text/xml");
    const jsonRes = converterXMLToJson(xml);
    for (let i = 0; i < jsonRes.feed.entry.length; i++) {
      this.all += this.example;
    }
    document.querySelector("div.project-container").innerHTML = this.all;
    let reports = document
      .querySelector("div.project-container")
      .querySelectorAll("div.report");
    for (let i = 0; i < reports.length; i++) {
      let report = reports[i];
      report.querySelector("p.pr-title").innerHTML =
        jsonRes.feed.entry[i].title;
      report.querySelector("div.mmmm").innerHTML =
        jsonRes.feed.entry[i].content;
    }
  }
}

class ExplorePG {
  size = 10;
  pageNum = 1;
  q = "";
  constructor(size, pageNum, q, country, theme) {
    if (size !== null) this.size = size;
    if (pageNum !== null) this.pageNum = pageNum;
    if (q !== null) this.q = q;
    this.country = country;
    this.theme = theme;
    console.log(this.size, this.pageNum, this.q, this.country, this.theme);
  }

  expanded = false;

  regionCheckBox(which) {
    let element = document.querySelector("div." + which + "selectBox");
    let hidden_elem = document.querySelector("div." + which + "checkboxes");
    let cords = getCoords(element);
    let bottom = cords.bottom;
    let left = cords.left;
    hidden_elem.style.top = "" + (bottom - 1) + "px";
    hidden_elem.style.left = "" + left + "px";
    hidden_elem.style.width = "" + (cords.right - left - 2) + "px";
  }

  showCheckboxes() {
    let thisss = this;
    document
      .querySelector("div.RG")
      .addEventListener("mouseover", function () {
        var checkboxes = document.getElementById("RGcheckboxes");
          thisss.regionCheckBox("RG");
          checkboxes.style.display = "block";
          this.expanded = true;
      });
      document
      .querySelector("div.RG")
      .addEventListener("mouseout", function () {
        var checkboxes = document.getElementById("RGcheckboxes");
          checkboxes.style.display = "none";
          this.expanded = false;
      });
      document
      .querySelector("div.TH")
      .addEventListener("mouseover", function () {
        var checkboxes = document.getElementById("THcheckboxes");
        
          thisss.regionCheckBox("TH");
          checkboxes.style.display = "block";
          this.expanded = true;
      });
      document
      .querySelector("div.TH")
      .addEventListener("mouseout", function () {
        var checkboxes = document.getElementById("THcheckboxes");
          checkboxes.style.display = "none";
          this.expanded = false;
      
      });
  }

  async fetchRGListCheckboxes() {
    const res = await fetch(
      "https://api.globalgiving.org/api/public/projectservice/regions?api_key=27c355cb-4b3d-417d-a001-bb8623b0ab89"
    );
    const result = await res.text();
    var parser = new DOMParser();
    var xml = parser.parseFromString(result, "text/xml");
    const jsonRes = converterXMLToJson(xml);
    var checkboxes = document.querySelector("div.RGcheckboxes");
    for(let i=0; i<jsonRes.regions.region.length - 1; i++){
      console.log(jsonRes.regions.region[i].name);
      const ress = await fetch(
        "https://api.globalgiving.org/api/public/projectservice/regions/" + jsonRes.regions.region[i].name + "/countries/projects/count?api_key=27c355cb-4b3d-417d-a001-bb8623b0ab89"
      );
      const resultt = await ress.text();
      var parser = new DOMParser();
      var xml = parser.parseFromString(resultt, "text/xml");
      const jsonRess = converterXMLToJson(xml);
      let arrrr = jsonRess;
      arrrr = arrrr.regions;
      arrrr = arrrr.region.countries.country;
      console.log(arrrr);
      for(let j=0; j<arrrr.length; j++){
        if(arrrr[i] !== undefined) {
          checkboxes.innerHTML += `
          <label for="` + arrrr[j].iso3166CountryCode + `">
          <input type="checkbox" id="one" />` + arrrr[j].name + `</label>
        `;
        }
      }
    }
  }

  async fetchTHListCheckboxes() {
    const res = await fetch(
      "https://api.globalgiving.org/api/public/projectservice/themes?api_key=27c355cb-4b3d-417d-a001-bb8623b0ab89"
    );
    const result = await res.text();
    var parser = new DOMParser();
    var xml = parser.parseFromString(result, "text/xml");
    const jsonRes = converterXMLToJson(xml);
    var checkboxes = document.querySelector("div.THcheckboxes");
    for(let i=0; i<jsonRes.themes.theme.length; i++){
      checkboxes.innerHTML += `
          <label for="` + jsonRes.themes.theme[i].id + `">
          <input type="checkbox" id="one" />` + jsonRes.themes.theme[i].name + `</label>
        `;
    }
  }

  searchResultDisplay() {
    this.searchInput();
    const search_html = `
    <div class="explore-pg-cont">
      <p> Explore Projects </p>
    </div>
    <div class="center row-parent" style="min-height:100px; padding:0; margin: 0;">
        <div class="center field">
            <input type="text" class="form__field searchtxt" maxlength="200">
        </div>
        <div class="center ">
          <button class="button-white-indigo" type="submit" style="width: 130px !important; font-size:20px; border-radius: 12px; margin-right: 40px;">Search</button>
        </div>
        <div class="RG multiselect center">
          <div class="RGselectBox centerrr">
            <a>
              <option>&gt COUNTRY/REGION</option>
            </a>
            <div class="overSelect"></div>
          </div>
          <div id="RGcheckboxes" class="RGcheckboxes">
          </div>
        </div>
        <div class="TH multiselect center">
          <div class="THselectBox centerrr">
            <a>
              <option>&gt THEME</option>
            </a>
            <div class="overSelect"></div>
          </div>
          <div id="THcheckboxes" class="THcheckboxes">
            <label for="one">
            <input type="checkbox" id="one" />First checkbox</label>
          </div>
        </div>
        <a  class="center" href="#"> Clear All </a>
      </div>
    <div class="keyyyys"">
      <div class="items">
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
        <div class="item">4</div>
        <div class="item">5</div>
        <div class="item">6</div>
        <div class="item">7</div>
      </div>
    </div>
        `;
    currentMainRemove();
    document.querySelector("div.main").innerHTML = search_html;
    this.showCheckboxes();
    let thisss = this;
    this.fetchRGListCheckboxes();
    this.fetchTHListCheckboxes();
  }

  async searchInput() {
    var str =
      "https://api.globalgiving.org/api/public/services/search/projects/summary?api_key=27c355cb-4b3d-417d-a001-bb8623b0ab89";
    if (this.q !== "") {
      str += "&q=" + this.q;
    } else {
      str += "&q=*";
    } 
    str += "&start=" + (this.pageNum - 1);
    if (this.country !== null && this.theme !== null) {
      str += "&filter=country:" + this.country + ",theme=" + this.theme;
    } else if (this.country !== null) {
      str += "&filter=country:" + this.country;
    } else if (this.theme !== null) {
      str += "&filter=theme:" + this.theme;
    }
    const res = await fetch(str);
    const result = await res.text();
    var parser = new DOMParser();
    var xml = parser.parseFromString(result, "text/xml");
    const jsonRes = converterXMLToJson(xml);
    console.log(str);
    console.log(jsonRes);
  }
}

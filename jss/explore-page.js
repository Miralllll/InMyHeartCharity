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
    hidden_elem.style.left = "" + (left) + "px";
    hidden_elem.style.width = "" + (cords.right - left - 2) + "px";
  }

  showCheckboxes() {
    let thisss = this;
    document.querySelector("div.RGselectBox").addEventListener("click", function () {
      var checkboxes = document.getElementById("RGcheckboxes");
      if (!this.expanded) {
        thisss.regionCheckBox("RG");
        checkboxes.style.display = "block";
        this.expanded = true;
      } else {
        checkboxes.style.display = "none";
        this.expanded = false;
      }
    });
    document.querySelector("div.THselectBox").addEventListener("click", function () {
      var checkboxes = document.getElementById("THcheckboxes");
      if (!this.expanded) {
        thisss.regionCheckBox("TH");
        checkboxes.style.display = "block";
        this.expanded = true;
      } else {
        checkboxes.style.display = "none";
        this.expanded = false;
      }
    });
  }

  searchResultDisplay() {
    this.searchInput();
    const search_html = `
    <div class="explore-pg-cont">
      <p> Explore Projects </p>
    </div>
    <div class="center-text-big row-parent form-group" style="min-height:100px; padding:0;">
      <div class="center" style="display:flex; flex-direction:row; width: 35%">
        <div class=" field">
            <input type="text" class="form__field searchtxt" maxlength="200">
        </div>
        <div class="">
          <button class="button-white-indigo" type="submit" style="width: 130px !important; font-size:20px;">Search</button>
        </div>
      </div>
      <div class="center" style="display:flex; flex-direction:row; width: 75%">
        <div class="multiselect">
          <div class="RGselectBox">
            <a>
              <option>&gt COUNTRY/REGION</option>
            </a>
            <div class="overSelect"></div>
          </div>
          <div id="RGcheckboxes" class="RGcheckboxes">
            <label for="one">
            <input type="checkbox" id="one" />First checkbox</label>
          </div>
        </div>
        <div class="multiselect">
          <div class="THselectBox">
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
        <a href="#"> Clear All </a>
      </div>
    </div>
    <div style="width: 100%; min-height:100px;">
      </div>
        `;
    currentMainRemove();
    document.querySelector("div.main").innerHTML = search_html;
    this.showCheckboxes();
    let thisss = this;
    window.addEventListener('resize', function () {
      thisss.regionCheckBox("TH");
      thisss.regionCheckBox("RG");
    });
  }

  async searchInput() {
    var str =
      "https://api.globalgiving.org/api/public/services/search/projects/summary?api_key=27c355cb-4b3d-417d-a001-bb8623b0ab89&q=" +
      this.q +
      "&start=" +
      (this.pageNum - 1);
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
    console.log("jsonRes");
    console.log(jsonRes);
  }
}

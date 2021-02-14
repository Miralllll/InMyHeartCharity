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
    var urlObj = new URL(window.location.href);
    urlObj.searchParams.set("size", this.size);
    urlObj.searchParams.set("nextPage", this.pageNum);
    // other ??
    window.location.replace(urlObj.toString());
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

  showRGCheckboxes() {
    let thisss = this;
    document.querySelector("div.RG").addEventListener("mouseover", function () {
      var checkboxes = document.querySelector("div.RGcheckboxes");
      thisss.regionCheckBox("RG");
      checkboxes.style.display = "block";
    });
    document
      .querySelector("div.RG")
      .addEventListener("mouseleave", function () {
        var checkboxes = document.querySelector("div.RGcheckboxes");
        checkboxes.style.display = "none";
        thisss.updateWithRGChecked();
      });
  }

  showTHCheckboxes() {
    let thisss = this;
    document.querySelector("div.TH").addEventListener("mouseover", function () {
      var checkboxes = document.querySelector("div.THcheckboxes");
      thisss.regionCheckBox("TH");
      checkboxes.style.display = "block";
    });
    document
      .querySelector("div.TH")
      .addEventListener("mouseleave", function () {
        var checkboxes = document.querySelector("div.THcheckboxes");
        checkboxes.style.display = "none";
        thisss.updateWithTHChecked();
      });
  }

  updateWithTHChecked(){
    var urlObj = new URL(window.location.href);
    let theme = "";
    console.log('has theme passed');
    urlObj.searchParams.delete(
        "theme"
      );
    var checkboxes = document
      .querySelector("div.THcheckboxes")
      .querySelectorAll("label");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].querySelector("input").checked == true) {
          theme += checkboxes[i].getAttribute("name") + ",";
          console.log(checkboxes[i].getAttribute("name"));
      }
    }
    if (theme.length != 0) {
      urlObj.searchParams.set(
        "theme",
        theme.substr(0, theme.length - 1)
      );
    }
    console.log(urlObj.toString());
    console.log('aeeee      ' + urlObj.toString());
    window.location.replace(urlObj.toString());
  }


  updateWithRGChecked() {
    var urlObj = new URL(window.location.href);
    let countries = "";
    console.log('has theme passed');
    urlObj.searchParams.delete(
        "countryRegion"
      );
    var checkboxes = document
      .querySelector("div.RGcheckboxes")
      .querySelectorAll("label");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].querySelector("input").checked == true) {
          countries += checkboxes[i].getAttribute("name") + ",";
          console.log(checkboxes[i].getAttribute("name"));
      }
    }
    if (countries.length != 0) {
      urlObj.searchParams.set(
        "countryRegion",
        countries.substr(0, countries.length - 1)
      );
    }
    console.log(urlObj.toString());
    console.log('aeeee      ' + urlObj.toString());
    window.location.replace(urlObj.toString());
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
    var somearrr = [];
    for (let i = 0; i < jsonRes.regions.region.length - 1; i++) {
      console.log(jsonRes.regions.region[i].name);
      const ress = await fetch(
        "https://api.globalgiving.org/api/public/projectservice/regions/" +
          jsonRes.regions.region[i].name +
          "/countries/projects/count?api_key=27c355cb-4b3d-417d-a001-bb8623b0ab89"
      );
      const resultt = await ress.text();
      var parser = new DOMParser();
      var xml = parser.parseFromString(resultt, "text/xml");
      const jsonRess = converterXMLToJson(xml);
      let arrrr = jsonRess;
      arrrr = arrrr.regions;
      arrrr = arrrr.region.countries.country;
      for (let j = 0; j < arrrr.length; j++) {
        if(arrrr != undefined){
          if(new URL(window.location.href).searchParams.get("countryRegion") != null){
          if((new URL(window.location.href).searchParams.get("countryRegion")).indexOf(arrrr[j].iso3166CountryCode) > -1) {
            somearrr.push("RG" + i +"RG" + j);
            console.log('somearrr');
            console.log(somearrr);
          }
        }
          checkboxes.innerHTML +=
            `
          <label id="RG` + i + "RG" + j +`" name="` +
            arrrr[j].iso3166CountryCode +
            `">
          <input type="checkbox" />` +
            arrrr[j].name +
            `</label>
        `;
        }
        
      }
    }

    for (let j = 0; j < somearrr.length; j++) {
      console.log(somearrr[j]);
      document.getElementById(somearrr[j]).querySelector("input").checked = true;
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
    var somearrr = [];
    for (let i = 0; i < jsonRes.themes.theme.length; i++) {
      if(new URL(window.location.href).searchParams.get("theme") != null){
        if(new URL(window.location.href).searchParams.get("theme").indexOf(jsonRes.themes.theme[i].id) > -1) {
          somearrr.push("RG" + i +"RG" + i);
          console.log('somearrr');
          console.log(somearrr);
        }
      } 
      checkboxes.innerHTML +=
        `
          <label  id="RG` + i + "RG" + i +`" name="` +
        jsonRes.themes.theme[i].id +
        `">
          <input type="checkbox" id="one" />` +
        jsonRes.themes.theme[i].name +
        `</label>
        `;
    }
    for (let j = 0; j < somearrr.length; j++) {
      console.log(somearrr[j]);
      document.getElementById(somearrr[j]).querySelector("input").checked = true;
    }
  }

  searchResultDisplay() {
    const search_html = `
    <div class="explore-pg-cont">
      <p> Explore Projects </p>
    </div>
    <div class="center row-parent itemssother" style="min-height:150px; width: 85%; padding:0; margin: 0 auto; ">
        <div class="center field item">
            <input type="text" class="form__field gray__border black__color searchtxt" maxlength="200">
        </div>
        <div class="center item">
          <button class="button-white-indigo searchbttn" type="submit" style="width: 130px !important; font-size:20px; border-radius: 12px; margin-right: 40px;">Search</button>
        </div>
        <div class="RG multiselect center item">
          <div class="RGselectBox centerrr">
            <a>
              <option>&gt COUNTRY/REGION</option>
            </a>
            <div class="overSelect"></div>
          </div>
          <div id="RGcheckboxes" class="RGcheckboxes">
          </div>
        </div>
        <div class="TH multiselect center item">
          <div class="THselectBox centerrr">
            <a>
              <option>&gt THEME</option>
            </a>
            <div class="overSelect"></div>
          </div>
          <div id="THcheckboxes" class="THcheckboxes">
          </div>
        </div>
        <a  class="center clearAll item"> Clear All </a>
      </div>
      <div class="contacoonta">
        <div class="keyyyys"">
          <div class="items">
          </div>
        </div>
        <div class="list-cards">
          
        </div>
      </div>
    
        `;
    currentMainRemove();
    document.querySelector("div.main").innerHTML = search_html;
    this.searchFetch();
    this.fetchRGListCheckboxes();
    this.fetchTHListCheckboxes();
    this.showRGCheckboxes();
    this.showTHCheckboxes();
    // let thisss = this;
    this.searchInput();
    this.searchedWithWords();
    document.querySelector("a.clearAll").addEventListener("click", function () {
      const urlStr = document.location.protocol +"//"+ document.location.hostname + document.location.pathname;
      var urlObj = new URL(urlStr);
      urlObj.searchParams.set("size", 10);
      urlObj.searchParams.set("nextPage", 1);
      window.location.replace(urlObj.toString() + "#search");
    });
    document.querySelector("div.list-cards").parentElement.innerHTML +=
    `
    <div class="center" style="padding-bottom: 75px;">
        <button class="new-some button-white-indigo font donateBtn" style="font-size: large;">MORE PROGRAMS</button>
    </div>`
  }

  searchedWithWords(){
    var items = document.querySelector("div.keyyyys").querySelector("div.items");
    console.log('items');
    console.log(items);
    if (this.q !== "") {
      items.innerHTML += `
        <div class="item">` + this.q + `</div>
      `;
    }
    if (this.country !== null) {
      let countries = this.country.split(",");
      for (let i = 0; i < countries.length; i++) {
        items.innerHTML += `
          <div class="item">` + countries[i] + `</div>
        `;
      }
    }
    if (this.theme !== null) {
      let themes = this.theme.split(",");
      for (let i = 0; i < themes.length; i++) {
        items.innerHTML += `
          <div class="item">` + themes[i] + `</div>
        `;
      }
    }
  }

  searchInput() {
    document
      .querySelector("input.searchtxt")
      .addEventListener("keyup", function name(event) {
        if (event.key === "Enter") {
          const urlObj = new URL(window.location.href);
          urlObj.searchParams.set("keywords", this.value.trim());
          window.location.replace(urlObj.toString());
        }
      });
    document
      .querySelector("button.searchbttn")
      .addEventListener("click", function name(event) {
        const urlObj = new URL(window.location.href);
        urlObj.searchParams.set(
          "keywords",
          document.querySelector("input.searchtxt").value.trim()
        );
        window.location.replace(urlObj.toString());
      });
  }

  async searchFetch() {
    var str =
      "https://api.globalgiving.org/api/public/services/search/projects?api_key=27c355cb-4b3d-417d-a001-bb8623b0ab89";
    if (this.q !== "") {
      str += "&q=" + this.q;
    } else {
      str += "&q=*";
    }
    str += "&start=" + (this.pageNum - 1);
    if (this.country !== null && this.theme !== null) {
      let countries = this.country.split(",");
      for (let i = 0; i < countries.length; i++) {
        str += "&filter=country:" + countries[i];
      }
      let themes = this.theme.split(",");
      for (let i = 0; i < themes.length; i++) {
        str += ",theme:" + themes[i];
      }
    } else if (this.country !== null) {
      let countries = this.country.split(",");
      for (let i = 0; i < countries.length; i++) {
        str += "&filter=country:" + countries[i];
      }
    } else if (this.theme !== null) {
      let themes = this.theme.split(",");
      for (let i = 0; i < themes.length; i++) {
        str += "&filter=theme:" + themes[i];
      }
    }
    const res = await fetch(str);
    const result = await res.text();
    var parser = new DOMParser();
    var xml = parser.parseFromString(result, "text/xml");
    const jsonRes = converterXMLToJson(xml);
    // = jsonRes.projects.project;
    console.log('jsonRes.search');
    console.log(jsonRes.search);
    if(jsonRes.search.response == "") {

    } else
    if(jsonRes.search.response.projects.project.length == undefined){
      let exampleCard = `
    <div>
      <p> 
        <image class="respon-img" src="` + jsonRes.search.response.projects.project.image.imagelink[3].url + `" />
        <span> ` + jsonRes.search.response.projects.project.themeName + " <b>:</b> " + jsonRes.search.response.projects.project.contactCountry  + `</span>
        <span> <b>` + jsonRes.search.response.projects.project.title + `</b> </span>
        <span> By ` + jsonRes.search.response.projects.project.organization.name + ` </span>
        <span> ` + `<b style="color:indigo;">$</b> ` + jsonRes.search.response.projects.project.funding + ` raised of ` + `<b style="color:indigo;">$</b> ` + jsonRes.search.response.projects.project.goal + ` goal </span>
        <span> ` + jsonRes.search.response.projects.project.numberOfDonations + ` donations    to go  ` + `<b style="color:indigo;">$</b> ` + jsonRes.search.response.projects.project.remaining + ` </span>
      </p>
      <div class="percent-bar" style="width: 300px;">
                  <div class="filled" style="width: ` + (jsonRes.search.response.projects.project.funding / jsonRes.search.response.projects.project.goal) * 100  + `%;">
                  </div>
            </div>
            <div class="">
              <button id="` + jsonRes.search.response.projects.project.id + `" class="button-white-indigo font spetialButton" style="width: 130px !important; font-size:1.6vw; border-radius: 15px; margin-right: 40px;" type="submit">DONATE</button>
            </div>
      </div>
       `;
      document.querySelector("div.list-cards").innerHTML += exampleCard;

    } else {
      var containers = document.querySelector("div.list-cards");
      for(let i=0; i<jsonRes.search.response.projects.project.length; i++) {
            document.querySelector("div.list-cards").innerHTML += `
          <div>
             <p> 
              <image class="respon-img" src="` + jsonRes.search.response.projects.project[i].image.imagelink[3].url + `" />
              <span> ` + jsonRes.search.response.projects.project[i].themeName + " <b>:</b> " + jsonRes.search.response.projects.project[i].contactCountry  + `</span>
              <span> <b>` + jsonRes.search.response.projects.project[i].title + `</b> </span>
              <span> By ` + jsonRes.search.response.projects.project[i].organization.name + ` </span>
              <span> ` + `<b style="color:indigo;">$</b> ` + jsonRes.search.response.projects.project[i].funding + ` raised of ` + `<b style="color:indigo;">$</b> ` + jsonRes.search.response.projects.project[i].goal + ` goal </span>
              <span> ` + jsonRes.search.response.projects.project[i].numberOfDonations + ` donations    to go  ` + `<b style="color:indigo;">$</b> ` + jsonRes.search.response.projects.project[i].remaining + ` </span>
            </p>
            <div class="percent-bar" style="width: 300px;">
                  <div class="filled" style="width: ` + (jsonRes.search.response.projects.project[i].funding / jsonRes.search.response.projects.project[i].goal) * 100  + `%;">
                  </div>
            </div>
            <div class="">
              <button id="` + jsonRes.search.response.projects.project[i].id + `" class="button-white-indigo font spetialButton" style="width: 130px !important; font-size:1.6vw; border-radius: 15px; margin-right: 40px;" type="submit">DONATE</button>
            </div>
          </div>
            `;
      }
    }
    this.addButtonsListeners();
  }
  addButtonsListeners(){
    console.log('mari');
      const buttons = document.querySelectorAll("button.spetialButton");

      for (const button of buttons) {
        button.addEventListener("click", function (event) {
          const urlObj = new URL(window.location.href);
          urlObj.searchParams.delete("nextPage");
          urlObj.searchParams.delete("size");
          urlObj.searchParams.delete("keyWords");
          urlObj.searchParams.delete("counrtyRegion");
          urlObj.searchParams.delete("theme");
          urlObj.searchParams.delete("filter");
          urlObj.searchParams.set("id", button.id);
          console.log(urlObj.toString().split("#")[0]);
          window.location.replace(
             urlObj.toString().split("#")[0]
          );
          console.log('mari');
        });
      }
  }
}

async function displayThemes() {
  const res = await fetch(
    "https://api.globalgiving.org/api/public/projectservice/themes?api_key=27c355cb-4b3d-417d-a001-bb8623b0ab89"
  );
  const result = await res.text();
  var parser = new DOMParser();
  var xml = parser.parseFromString(result, "text/xml");
  const jsonRes = converterXMLToJson(xml);
  console.log("jsonRes");
  console.log(jsonRes);
  const ress = await fetch(
    "https://api.globalgiving.org/api/public/projectservice/countries/IN/projects/summary?api_key=27c355cb-4b3d-417d-a001-bb8623b0ab89"
  );
  const resultt = await ress.text();
  var parser = new DOMParser();
  var xml = parser.parseFromString(resultt, "text/xml");
  const jsonRess = converterXMLToJson(xml);
  console.log("jsonRes");
  console.log(jsonRess);
}

function input() {
  console.log(document.querySelector("div.explore"));
  document
    .querySelector("input.textarea")
    .addEventListener("keyup", function name(event) {
      if (event.key === "Enter") {
        redirect(this.value);
      }
    });
  document
    .querySelector("div.explore")
    .querySelector("input.submit")
    .addEventListener("click", function name(event) {
        redirect(document.querySelector("input.textarea").value);
    });
}

function redirect(value) {
    const urlStr = document.location.protocol +"//"+ document.location.hostname + document.location.pathname;
    const urlObj = new URL(urlStr);
    urlObj.searchParams.set("size", 10);
    urlObj.searchParams.set("nextPage", 1);
    urlObj.searchParams.set("keywords", value.trim());
    window.location.replace(urlObj.toString() + "#search");
}

input();
displayThemes();

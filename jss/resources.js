function converterXMLToJson(xml) {
  try {
    var obj = {};
    if (xml.children.length > 0) {
      for (var i = 0; i < xml.children.length; i++) {
        var item = xml.children.item(i);
        var nodeName = item.nodeName;

        if (typeof obj[nodeName] == "undefined") {
          obj[nodeName] = converterXMLToJson(item);
        } else {
          if (typeof obj[nodeName].push == "undefined") {
            var old = obj[nodeName];

            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(converterXMLToJson(item));
        }
      }
    } else {
      obj = xml.textContent;
    }
    return obj;
  } catch (e) {
    console.log(e.message);
  }
}
async function fetchTestPicture() {
  // alert("email sent.");
  const res = await fetch(
    "https://api.globalgiving.org/api/public/projectservice/all/project?api_key=27c355cb-4b3d-417d-a001-bb8623b0ab89"
    // {
    //   headers: {
    //     "Content-Type": "application/json",
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    // }
  );
  const result = await res.text();
  var parser = new DOMParser();
  var xml = parser.parseFromString(result, "text/xml");
  console.log(converterXMLToJson(xml));
}

document
  .querySelector("button.new-some")
  .addEventListener("click", function () {
    fetchTestPicture();
    document.querySelector("img.bla").src =
      "https://files.globalgiving.org/pfil/44686/pict_featured_large.jpg?m=1610461702096";
  });

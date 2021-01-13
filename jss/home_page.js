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

function homePageDisplay() {
  const home_page_html = `
          <div id="home-page">
            <div id="break"> </div>
            <div id="top-programs">
                <div class="row-parent" id="topfive-pictures">
                    <div class="img-left container">
                        <img class="bla full-img" id="cont_1" src=""/>
                        <div class="bottom-left">
                            <a href="#">here</a>
                        </div>
                        <div class="centered">
                            <button href="#" class="btn" id="btn_1">DONATE</button>
                        </div>
                    </div>

                    <div class="img-right column parent">
                        <div class="img-top row-parent">
                            <div class="img-left container">
                                <img class="full-img" id="cont_2" src=""/>
                                <div class="bottom-left">
                                    <a href="#">here</a>
                                </div>
                                <div class="centered">
                                    <button onclick="" class="btn" id="btn_2">DONATE</button>
                                </div>
                            </div>
                            <div class="img-right container">
                                <img class="full-img" id="cont_3" src=""/>
                                <div class="bottom-left">
                                    <a href="#">here</a>
                                </div>
                                <div class="centered">
                                    <button onclick="" class="btn" id="btn_3">DONATE</button>
                                </div>
                            </div>
                        </div>

                        <div class="img-bottom row-parent">
                            <div class="img-left container"style="float: right;">
                                <img class="full-img" id="cont_4"  src=""/>
                                <div class="bottom-left">
                                    <a href="#">here</a>
                                </div>
                                <div class="centered">
                                    <button onclick="" class="btn" id="btn_4">DONATE</button>
                                </div>
                            </div>
                            <div class="img-right container">
                                <img class="full-img" id="cont_5" src=""/>
                                <div class="bottom-left">
                                    <a href="#">here</a>
                                </div>
                                <div class="centered">
                                    <button onclick="" class="btn" id="btn_5">DONATE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="topfive-navbar">
                    <div id="project-navbar">
                        <div id="projects" class="font indigo-color">Explore Projects:</div>
                        <a href="#">Featured</a>
                        <a href="#">Newest</a>
                        <a href="#">Nearly Funded</a>
                        <a href="#">Child Protection</a>
                        <a href="#">Disaster Response</a>
                        <a href="#">Education</a>

                        <a href="#">Climate Action</a>
                        <a href="#">Food Security</a>
                        <a href="#">Gender Equality</a>
                        <a href="#">Covid-19</a>
                        <a href="#">See All ></a>
                    </div>
                </div>
            </div>

            <div id="learn-more-request" class="center-container">
                <p class ="font center-text-big"> <b class="indigo-color">In My Heart</b> connects nonprofits, donors, and companies in nearly every country in the world. We help fellow nonprofits access the funding, tools, training, and support they need to serve their communities.</p>
                <button class="button-white-indigo font">Learn More</button>
            </div>

            <div id="enter-email" class="center-container">
                <p class ="font center-text-big indigo-color">Sign up for the GlobalGiving Newsletter</p>
                <div class="center-text-big row-parent form-group">
                    <div class="form__group field">
                        <input type="email" class="form__field white__border white__color" maxlength="200" placeholder="you@example.com" required="" title="Email address">
                        <label for="name" class="form__label indigo-color">Name</label>
                    </div>
                    <div class="form__group img-right">
                        <button class="button-white-indigo font" type="submit">Subscribe</button>
                    </div>
                </div>
            </div>

            <div id="general-work">
                <div>
                    <p>18</p>
                    <p>years</p>
                </div>
                <div>
                    <p>$542M</p>
                    <p>dollars</p>
                </div>
                <div>
                    <p>1,226,477</p>
                    <p>donors</p>
                </div>
                <div>
                    <p>28,706</p>
                    <p>projects</p>
                </div>
                <div>
                    <p>170</p>
                    <p>countries</p>
                </div>
                <div>
                    <p>336</p>
                    <p>companies</p>
                </div>
            </div>
            <div id="how-it-works">
                <div id="how-it-works-label">
                    <p>-- How It Works --</p>
                </div>
                <div id="how-it-works-row">
                    <div class="out_of_4">
                        <div class="div_text"><p>
                                Nonprofits around the world apply and join GlobalGiving to access more funding, to build new skills, and to make important connections.
                            </p></div>
                        <div class="div_link">
                            <a href="#"> NONPROFITS </a>
                        </div>
                        <img class="img_4" src="../photos/temporary_for_4.jpeg">
                    </div>
                    <div class="out_of_4">
                        <div class="div_text"><p>
                                People like you give what you can to your favorite projects; you feel great when you get updates about how your money is put to work by trusted organizations.
                            </p></div>
                        <div class="div_link"><a href="#"> DONORS </a></div>
                        <img class="img_4" src="../photos/temporary_for_4.jpeg">
                    </div>
                    <div class="out_of_4">
                        <div class="div_text"><p>
                                Generous companies and their employees further support high-impact projects, helping local communities thrive.
                            </p></div>
                        <div class="div_link"><a href="#"> COMPANIES </a></div>
                        <img class="img_4" src="../photos/temporary_for_4.jpeg">
                    </div>
                    <div class="out_of_4">
                        <div class="div_text"><p>
                                Nonprofits have the funding they need to listen to feedback and try out new ways to work; communities all over the globe get more awesome!
                            </p></div>
                        <div class="div_link"><a href="#"> OUR IMPACT </a></div>
                        <img class="img_4" src="../photos/temporary_for_4.jpeg">
                    </div>
                </div>
            </div>
            

            <!-- <div id="gift-card">
                get gift card now
            </div>

            <div id="news">
                new about programs and our organization
            </div> -->
        </div>
  `;
  document.querySelector("div.main").innerHTML = home_page_html;
  checkElement("#topfive-pictures");
}

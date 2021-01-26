function main() {
  homePageDisplay();
}

function pageListeners() {
  checkElement("#topfive-pictures", function () {
    const buttons = document.querySelectorAll("button.btn");
    for (const button of buttons) {
      button.addEventListener("click", function (event) {
        window.location.replace(
          window.location.href.split("#")[0] + "#" + button.href
        );
        projectDisplay(button.href);
      });
    }
    const links_under = document.querySelectorAll("div.bottom-left");
    for (const link_under of links_under) {
      link_under.querySelector("a").addEventListener("click", function (event) {
        projectDisplay(link_under.querySelector("a").href.split("#")[1]);
      });
    }
  });
}

pageListeners();
main();

function main() {
  homePageDisplay();
}

function pageListeners() {
  // example for page changes
  checkElement("#topfive-pictures", function () {
    const buttons = document.querySelectorAll("button.btn");
    for (const button of buttons) {
      button.addEventListener("click", function (event) {
        projectDisplay(button.href);
      });
    }
  });
}

pageListeners();
main();

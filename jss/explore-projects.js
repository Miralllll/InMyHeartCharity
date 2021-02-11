$(document).ready(function () {
  $(".search").mouseenter(function () {
    infoUpdate();
    $("#explore_show").stop().show();
  });

  $("#explore_show").mouseleave(function () {
    if (!$("#explore_show").is(":hover")) {
      $("#explore_show").hide();
    }
  });
});

function infoUpdate() {
  let element = document.querySelector("#logo-side > div.search");
  let hidden_elem = document.getElementById("explore_show");
  left = getCoords(element).left;
  hidden_elem.style.left = "" + left + "px";
}

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
}

// document.addEventListener('mouseover', function(e){
//     for(let i=1; i<=5; i++) {
//         if(e.target.id == ('cont_' + (i).toString())) {
//             $('#btn_' + (i).toString()).stop().show();
//         };
//     };
// });

// document.addEventListener('mouseleave', function(e){
//     for(let i=1; i<=5; i++) {
//         if(e.target.id == ('cont_' + (i).toString())) {
//             alert('leave alerttt');
//             if(!$('#btn_' + (i).toString()).is(':hover')){
//                 $('#btn_' + (i).toString()).hide();
//             };
//         };
//     };
// });

$(document).ready(function () {
  for (let i = 1; i <= 5; i++) {
    $("#cont_" + i.toString()).mouseenter(function () {
      infoUpdate();
      $("#btn_" + i.toString())
        .stop()
        .show();
    });

    $("#cont_" + i.toString()).mouseleave(function () {
      if (!$("#btn_" + i.toString()).is(":hover")) {
        $("#btn_" + i.toString()).hide();
      }
    });
  }
});

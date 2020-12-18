const explore_projects = `
    
`;


// document.addEventListener('mouseover', function(e) {
//     e.preventDefault();
//     if(e.target.id == 'search'){
//         var element = e.target;
//         var right = getCoords(element).right;
//         let div = document.createElement('div');
//         div.id = 'explore_show';
//         element.style.setProperty('right', right);
//         div.innerHTML = explore_projects;
//         document.body.appendChild(div);
//         element
//     }
// });

document.addEventListener("load", function(e) {
    e.preventDefault();
    if(e.target.id == 'search'){
        let element = document.getElementById("search");
        let hidden_elem = document.getElementById("explore_show");
        hidden_elem.style.right = getCoords(hidden_elem).right;
    }
});

document.addEventListener('mouseover', function(e) {
    e.preventDefault();
    if(e.target.id == 'search'){
        let element = e.target;
        let hidden_elem = document.getElementById("explore_show");
        hidden_elem.style.display = 'block';
    }
});

document.addEventListener('mouseleave', function(e) {
    e.preventDefault();
    if(e.target.id == 'explore_show'){
        let hidden_elem = document.getElementById("explore_show");
        hidden_elem.style.display = 'none';
    }
});

// $(document).ready(function(){
//     $("#search").mouseenter(function() {
//         $('#explore_show').stop().show();
//     });
    
//     $("#search, #explore_show").mouseleave(function() {
//       if(!$('#explore_show').is(':hover')){
//         $('#explore_show').hide();
//       };
//     });
// });

function getCoords(elem) {
    let box = elem.getBoundingClientRect();
  
    return {
      top: box.top + window.pageYOffset,
      right: box.right + window.pageXOffset,
      bottom: box.bottom + window.pageYOffset,
      left: box.left + window.pageXOffset
    };
  };
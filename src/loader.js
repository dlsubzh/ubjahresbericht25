
function end_loader() {
    var loader = document.querySelector(".lds-ellipsis");
    loader.style.opacity = 0;
    setTimeout(function () {
      loader.style.display = "none";
    }, 800);
  }




  function start_loader() {
    var loader = document.querySelector(".lds-ellipsis");
    loader.style.opacity = 1;
    loader.style.display = "block";
    document.querySelector("main").style.visibility = "visible";
}

window.addEventListener("resize", function () {
    start_loader();
});

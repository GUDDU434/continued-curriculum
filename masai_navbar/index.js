function deopDown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
  if (!e.target.matches(".dropbtn")) {
    var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains("show")) {
      myDropdown.classList.remove("show");
    }
  }
};

let symboll = document.getElementById("humbergerIcon");

function openContent() {
   const iconBars = document.getElementById("iconBars");
   const iconXmark = document.getElementById("iconXmark");

   iconBars.classList.toggle("hidden");
   iconXmark.classList.toggle("hidden");

  document.getElementsByClassName("side_div")[0].classList.toggle("open");
}

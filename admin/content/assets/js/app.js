// let globalLogoToggler = true;
function toggleSideBar() {
  document.querySelector("#container .sidebar").classList.toggle("active");
  const image = document.querySelector("#container .sidebar .logo img");

  image.src = image.classList.contains("active")
    ? "./assets/img/logo1.png"
    : "./assets/img/logo.png";

  image.classList.toggle("active");
}
document
  .querySelector("#container .content .bars")
  .addEventListener("click", toggleSideBar);

function menu() {
  let list = document.querySelector("#container .sidebar .menu").children;
  let pages = document.querySelector("#container .content .pages").children;

  for (let i = 0; i < list.length; i++) {
    list[i].addEventListener("click", (e) => {
      for (let j = 0; j < list.length; j++) {
        if (list[i] === list[j]) {
          list[j].classList.add("active");
          pages[j].style.display = "";
        } else {
          list[j].classList.remove("active");
          pages[j].style.display = "none";
        }
      }
    });
  }
}
menu();

function handelLink() {
  let elem = document.querySelector("#container .sidebar .menu").children;
  if (window.location.search) {
    let params = window.location.search.substring(1);
    params = params.split("&");
    if (params[0]) {
      elem[params[0].split("=")[1] - 1].click();
    }
    setTimeout(() => {
      if (params[1]) {
        $(`#${params[1].split("=")[1]}`).modal("show");
      }
    }, 500);
  }
}
handelLink();

window.oncontextmenu = function () {
  return false;
};

document.addEventListener(
  "keydown",
  function (event) {
    var key = event.key || event.keyCode;

    if (key == 123) {
      return false;
    } else if (
      (event.ctrlKey && event.shiftKey && key == 73) ||
      (event.ctrlKey && event.shiftKey && key == 74)
    ) {
      return false;
    }
  },
  false
);

const navBarToggleBtn = document.querySelector(".navbar-toggler");
const menu_bar = document.querySelector("#menu-bar");

let count = 0;
navBarToggleBtn.addEventListener("click", (e) => {
  const menubarClassName = menu_bar.classList;
  count++;
  const activeMenu = menu_bar.classList.toggle("active");
  count !== 0 && !count % 2 && activeMenu;
  activeMenu
    ? menubarClassName.replace("bi-menu-button-wide-fill", "bi-x-square-fill")
    : menubarClassName.replace("bi-x-square-fill", "bi-menu-button-wide-fill");
});

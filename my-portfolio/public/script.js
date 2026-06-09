const menu_bar = document.querySelector("#menu-bar");
console.log(menu_bar);


const currentPage = window.location.pathname;
const navLinks = document.querySelectorAll(" nav ul li a");
// currentPage === currentNavLink && activeNavLink;
navLinks.forEach(navLink => { 
  // @ts-ignore
  const parent = navLink.parentElement; 
  // @ts-ignore
  currentPage !== '/' && navLink.href.includes(currentPage) && navLink.classList.add(['active']); 
});


  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // deactivate all
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // activate clicked
      btn.classList.add('active');
      // @ts-ignore
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

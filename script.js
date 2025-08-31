const tombolHamburgir = document.querySelector(".tombolhamburgir"); 
const menuToggle = document.querySelector(".menu-toggle"); 
const navLinks = document.querySelector(".nav-links");

tombolHamburgir.addEventListener("click", () => {
  menuToggle.classList.toggle("active");  // animasi garis
  navLinks.classList.toggle("active");    // buka/tutup menu
    // Lock/unlock scroll body
  document.body.classList.toggle("no-scroll");
});



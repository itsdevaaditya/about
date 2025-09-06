const tombolHamburgir = document.querySelector(".tombolhamburgir"); 
const menuToggle = document.querySelector(".menu-toggle"); 
const navLinks = document.querySelector(".nav-links");

const galleryItems = [
  {
    src: "media/sekul.webp",
    buy: "https://www.shutterstock.com/image-photo/2674403659"
  },
  {
    src: "media/defend sekul.webp",
    buy: null
  },
  {
    src: "media/train-station-security-officer.webp",
    buy: "https://www.shutterstock.com/image-photo/2483096287"
  },
  {
    src: "media/daun.webp",
    buy: "https://www.shutterstock.com/id/image-photo/2471954037"
  }
];

// Hamburger menu
tombolHamburgir.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});


//////////////////////////////////////////////////////////
//[PORTOFOLIO]//


let currentImageIndex = 0;

function openLightbox(index) {
  currentImageIndex = index;
  document.getElementById("lightbox").classList.add("show");
  document.body.classList.add("no-scroll");
  updateLightbox();
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("show");
  document.body.classList.remove("no-scroll");
}

function changeImage(direction) {
  currentImageIndex =
    (currentImageIndex + direction + galleryItems.length) %
    galleryItems.length;
  updateLightbox();
}

function updateLightbox() {
  const img = document.getElementById("lightbox-img");
  const buyBtn = document.getElementById("buy-button");
  img.src = galleryItems[currentImageIndex].src;
  if (galleryItems[currentImageIndex].buy) {
    buyBtn.href = galleryItems[currentImageIndex].buy;
    buyBtn.style.display = "inline-block"; // tampilkan
  } else {
    buyBtn.style.display = "none"; // sembunyikan
  }
}

// Tutup lightbox dengan ESC
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeLightbox();
});

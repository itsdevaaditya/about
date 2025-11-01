const tombolHamburgir = document.querySelector(".tombolhamburgir"); 
const menuToggle = document.querySelector(".menu-toggle"); 
const navLinks = document.querySelector(".nav-links");

// Hamburger menu
tombolHamburgir.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

window.addEventListener("resize", () => {
  const isPhotoLightboxOpen = document.getElementById("photo-lightbox")?.classList.contains("show");
  const isVideoLightboxOpen = document.getElementById("video-lightbox")?.classList.contains("show");
  
  if (window.innerWidth > 460 && !isPhotoLightboxOpen && !isVideoLightboxOpen) {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }
});

//////////////////////////////////////////////////////////
//[FOTOGRAFI LIGHTBOX]//

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

let currentImageIndex = 0;

function openPhotoLightbox(index) {
  currentImageIndex = index;
  document.getElementById("photo-lightbox").classList.add("show");
  document.body.classList.add("no-scroll");
  updatePhotoLightbox();
}

function closePhotoLightbox() {
  document.getElementById("photo-lightbox").classList.remove("show");
  document.body.classList.remove("no-scroll");
}

function changeImage(direction) {
  currentImageIndex =
    (currentImageIndex + direction + galleryItems.length) %
    galleryItems.length;
  updatePhotoLightbox();
}

function updatePhotoLightbox() {
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

// Tutup lightbox foto dengan ESC
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (document.getElementById("photo-lightbox").classList.contains("show")) {
      closePhotoLightbox();
    }
  }
});

//////////////////////////////////////////////////////////
//[VIDEO LIGHTBOX]//

const videoData = [
  { 
    preview: 'media/vid editing-preview.mp4', // Low quality preview
    fullQuality: 'media/vid editing.mp4', // High quality (loaded later)
    title: 'Video Editing', 
    desc: 'Kompilasi hasil editing dengan variasi gaya visual, transisi, dan efek video yang unik.' 
  },
  { 
    preview: 'media/game porto-preview.mp4',
    fullQuality: 'media/game porto.mp4',
    title: 'Game Showcase', 
    desc: 'Beberapa cuplikan Game yang pernah saya buat sendiri. Lihat <a href="#gamenya" class="vdesc-link">selengkapnya di sini</a>.' 
  },
  { 
    preview: 'media/mogra-preview.mp4',
    fullQuality: 'media/mogra.mp4',
    title: 'Motion Graphics', 
    desc: 'Beberapa eksperimen visual yang menampilkan animasi teks, bentuk, dan elemen grafis yang digerakkan secara dinamis menggunakan After Effects.' 
  }
];

const videoLightbox = document.getElementById('video-lightbox');
const closeBtn = document.querySelector('.close-btn');
const lightboxVideo = document.getElementById('lightbox-video');

let currentVideoIndex = 0;
let isHighQualityLoaded = false;

function openVideoLightbox(index) {
  currentVideoIndex = index;
  isHighQualityLoaded = false;
  
  // Pause semua video preview
  document.querySelectorAll('.vids').forEach(v => v.pause());

  const v = videoData[index];
  if (!v) return;
  
  // Show loading state
  showVideoLoading();
  
  // First load preview (quick load)
  lightboxVideo.src = v.preview;
  lightboxVideo.currentTime = 0;
  
  // Preload high quality in background
  loadHighQualityVideo(v.fullQuality);
  
  // Play preview immediately
  lightboxVideo.play().catch(()=>{});
  
  // Update title and description
  const titleEl = document.getElementById('video-title');
  const descEl = document.getElementById('video-desc');
  if (titleEl) titleEl.textContent = v.title;
  if (descEl) {
    descEl.innerHTML = v.desc;
    
    const internalLinks = descEl.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        closeVideoLightbox();
        
        setTimeout(() => {
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      });
    });
  }

  videoLightbox.classList.add('show');
  document.body.classList.add('no-scroll');
}

function loadHighQualityVideo(fullQualitySrc) {
  const highQualityVideo = document.createElement('video');
  highQualityVideo.preload = 'auto';
  highQualityVideo.src = fullQualitySrc;
  
  highQualityVideo.addEventListener('loadeddata', () => {
    // High quality loaded, switch to it
    if (videoLightbox.classList.contains('show')) {
      const currentTime = lightboxVideo.currentTime;
      lightboxVideo.src = fullQualitySrc;
      lightboxVideo.currentTime = currentTime;
      lightboxVideo.play().catch(()=>{});
      isHighQualityLoaded = true;
      hideVideoLoading();
    }
  });
  
  highQualityVideo.addEventListener('error', () => {
    console.warn('High quality video failed to load, keeping preview version');
    hideVideoLoading();
  });
}

function showVideoLoading() {
  // Add loading indicator to lightbox
  let loadingEl = document.querySelector('.video-loading');
  if (!loadingEl) {
    loadingEl = document.createElement('div');
    loadingEl.className = 'video-loading';
    videoLightbox.querySelector('.lightbox-content').appendChild(loadingEl);
  }
  loadingEl.style.display = 'block';
}

function hideVideoLoading() {
  const loadingEl = document.querySelector('.video-loading');
  if (loadingEl) {
    loadingEl.style.display = 'none';
  }
}

// Navigasi prev & next video
function changeVideo(direction) {
  // Save current time if high quality was loaded
  const wasPlaying = !lightboxVideo.paused;
  const currentTime = lightboxVideo.currentTime;
  
  currentVideoIndex = (currentVideoIndex + direction + videoData.length) % videoData.length;
  openVideoLightbox(currentVideoIndex);
  
  // If user was watching, try to resume at similar time
  if (wasPlaying && currentTime > 0) {
    setTimeout(() => {
      if (lightboxVideo.duration > currentTime) {
        lightboxVideo.currentTime = Math.min(currentTime, lightboxVideo.duration - 1);
      }
    }, 100);
  }
}

function closeVideoLightbox() {
  videoLightbox.classList.remove('show');
  lightboxVideo.pause();
  lightboxVideo.src = '';
  isHighQualityLoaded = false;
  
  // Play ulang semua video preview
  document.querySelectorAll('.vids').forEach(v => v.play());
  
  document.body.classList.remove('no-scroll');
  hideVideoLoading();
}

/* ===== Event listeners untuk video lightbox ===== */
closeBtn.addEventListener('click', closeVideoLightbox);

// Event tombol navigasi video
document.getElementById('prev-video').addEventListener('click', () => changeVideo(-1));
document.getElementById('next-video').addEventListener('click', () => changeVideo(1));

// Tutup video lightbox saat klik area gelap
videoLightbox.addEventListener('click', (e) => {
  if (e.target === videoLightbox) closeVideoLightbox();
});

// Tutup video lightbox dengan ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && videoLightbox.classList.contains('show')) {
    closeVideoLightbox();
  }
});

/* ===== Hook ke gallery video yang ada di HTML ===== */
const videoContainers = document.querySelectorAll('.video-container');

videoContainers.forEach((container, index) => {
  container.addEventListener('click', (e) => {
    openVideoLightbox(index);
  });
});
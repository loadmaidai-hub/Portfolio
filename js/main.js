// js/main.js

// 1. รวมข้อมูลจากทุกหมวดหมู่เข้าด้วยกัน
const portfolioData = [
  ...photoProjects,
  ...videoProjects,
  ...motionProjects,
  ...liveProjects
];

// 2. ฟังก์ชันสร้างการ์ด HTML
// ฟังก์ชันสร้างการ์ด HTML (ลบไอคอนบนภาพปกออกทั้งหมด)
function createCardHTML(item) {
  const gearBadges = item.gear.map(g => `<span class="badge badge-gear small">${g}</span>`).join(' ');

  return `
    <div class="col-md-6 col-lg-4">
      <div class="card card-media h-100">
        <div class="media-thumb ratio ratio-16x9">
          <img src="${item.image}" alt="${item.title}" style="object-position: ${item.imgPosition || 'center'};">
        </div>
        <div class="card-body p-4 d-flex flex-column">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge badge-category">${item.badgeCategory}</span>
            <span class="badge badge-role">${item.role}</span>
          </div>
          <h5 class="fw-bold mb-1">${item.title}</h5>
          
          <div class="card-client mb-2 text-primary small fw-semibold">
            <i class="bi bi-hospital me-1"></i>
            <span data-lang="th">${item.clientTh}</span>
            <span data-lang="en">${item.clientEn}</span>
          </div>

          <p class="text-warm-muted small flex-grow-1">
            <span data-lang="th">${item.descTh}</span>
            <span data-lang="en">${item.descEn}</span>
          </p>

          <div class="mb-3 d-flex flex-wrap gap-1">
            ${gearBadges}
          </div>

          <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-warm">
            <i class="bi ${item.category === 'photo' ? 'bi-facebook' : 'bi-play-circle'} me-1"></i>
            <span data-lang="th">${item.linkTextTh}</span>
            <span data-lang="en">${item.linkTextEn}</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

// 3. กระจายข้อมูลลงแท็บต่างๆ
function renderPortfolio() {
  const gridAll = document.getElementById('grid-all');
  const gridVideo = document.getElementById('grid-video');
  const gridPhoto = document.getElementById('grid-photo');
  const gridMotion = document.getElementById('grid-motion');
  const gridLive = document.getElementById('grid-live');

  if (!gridAll) return;

  gridAll.innerHTML = portfolioData.filter(i => i.isFeatured).map(createCardHTML).join('');
  gridVideo.innerHTML = videoProjects.map(createCardHTML).join('');
  gridPhoto.innerHTML = photoProjects.map(createCardHTML).join('');
  gridMotion.innerHTML = motionProjects.map(createCardHTML).join('');
  gridLive.innerHTML = liveProjects.map(createCardHTML).join('');
}

// 4. สลับภาษา
function setLanguage(lang) {
  document.body.classList.remove('lang-th', 'lang-en');
  document.body.classList.add('lang-' + lang);
  document.documentElement.lang = lang;
  
  const btnTh = document.getElementById('btn-th');
  const btnEn = document.getElementById('btn-en');
  if (btnTh && btnEn) {
    btnTh.classList.toggle('active', lang === 'th');
    btnEn.classList.toggle('active', lang === 'en');
  }
  
  localStorage.setItem('preferred_lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  renderPortfolio();
  const savedLang = localStorage.getItem('preferred_lang') || 'th';
  setLanguage(savedLang);
});
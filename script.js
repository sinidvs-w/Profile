document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll('.fade-slide');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));
});

// script.js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
    }
  });
});

document.querySelectorAll('.fade-slide').forEach(el => observer.observe(el));

const userId = '833408159187337266'; // ใส่ Discord ID
const apiUrl = `https://api.lanyard.rest/v1/users/${userId}`;

function updatePresence() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const user = data.data.discord_user;
      const presence = data.data;

      const nameEl = document.querySelector('.discord-name');
      const statusText = document.querySelector('.status-text');
      const statusDot = document.querySelector('.status-dot');
      const avatarEl = document.querySelector('.discord-avatar');

      const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;

      nameEl.textContent = user.username + '#' + user.discriminator;
      avatarEl.src = avatarUrl;

      const status = presence.discord_status;
      let statusLabel = '';
      let statusClass = '';

      switch (status) {
        case 'online':
          statusLabel = 'Online';
          statusClass = 'status-online';
          break;
        case 'idle':
          statusLabel = 'Idle';
          statusClass = 'status-idle';
          break;
        case 'dnd':
          statusLabel = 'Do Not Disturb';
          statusClass = 'status-dnd';
          break;
        default:
          statusLabel = 'Offline';
          statusClass = 'status-offline';
      }

      statusText.textContent = statusLabel;
      statusDot.className = `status-dot ${statusClass}`;
    })
    .catch(() => {
      document.querySelector('.discord-name').textContent = 'Unavailable';
      document.querySelector('.status-text').textContent = 'Error';
    });
}

updatePresence();
setInterval(updatePresence, 15000);


window.addEventListener('load', () => {
  const covers = document.getElementById('covers');
  const contentBox = document.querySelector('.content');
  const projects = document.querySelector('.projects');
  const footer = document.querySelector('.footer');

  const MIN_LOAD_TIME = 1000; // แสดง loading อย่างน้อย 1 วินาที
  const startTime = performance.now();

  function finishLoading() {
    // ซ่อน loading ด้วย fade-out
    covers.style.opacity = '0';

    setTimeout(() => {
      covers.style.display = 'none';

      // เพิ่มคลาส in-view ให้กับเนื้อหาเพื่อให้สไลด์ขึ้นพร้อมจางเข้ามา
      contentBox.classList.add('in-view');
      projects.classList.add('in-view');
      footer.classList.add('in-view');
    }, 500); // รอให้ fade-out เสร็จก่อน
  }

  const elapsed = performance.now() - startTime;
  const remaining = Math.max(0, MIN_LOAD_TIME - elapsed);
  setTimeout(finishLoading, remaining);
});


// ----------- Page Optimization -----------
// Lazy load all images that aren't already marked as lazy
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        if (!img.hasAttribute('loading') && !img.closest('#profile-image')) {
            img.setAttribute('loading', 'lazy');
        }
    });
});

// Add smooth scroll behavior to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            contentBox.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
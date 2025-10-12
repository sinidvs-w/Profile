document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.getElementById('loading-screen');
  const navbar = document.getElementById('navbar');
  const navbarContainer = navbar.querySelector('.navbar-container');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = mobileMenuToggle.querySelector('.menu-icon');
  const closeIcon = mobileMenuToggle.querySelector('.close-icon');

  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
  }, 1200);

  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 1900);

  function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = navbar.offsetHeight + 20;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  const logoButton = document.querySelector('.logo-button');
  if (logoButton) {
    logoButton.addEventListener('click', () => scrollToSection('home'));
  }

  const allNavButtons = document.querySelectorAll('.nav-button, .mobile-nav-button');
  allNavButtons.forEach(button => {
    button.addEventListener('click', () => {
      const section = button.getAttribute('data-section');
      scrollToSection(section);
      
      if (mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.toggle('active');
    
    if (isOpen) {
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      navbarContainer.classList.add('menu-open');
    } else {
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      navbarContainer.classList.remove('menu-open');
    }
  }

  mobileMenuToggle.addEventListener('click', toggleMobileMenu);

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      navbarContainer.classList.remove('menu-open');
    }
  });
});

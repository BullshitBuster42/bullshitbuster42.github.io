// The Vienna Promenade - Main JavaScript

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('bx-menu');
        icon.classList.toggle('bx-x');
      }
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // Add active class to current nav item
  const currentPath = window.location.pathname;
  document.querySelectorAll('.main-nav a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // Copy-to-clipboard for quotes
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.quote-copy-btn');
    if (!btn) return;
    navigator.clipboard.writeText(btn.dataset.copyText).then(function () {
      btn.classList.add('copied');
      setTimeout(function () {
        btn.classList.remove('copied');
      }, 1500);
    });
  });

  // Jump-to-author dropdown on the quotes library page
  const authorJump = document.getElementById('quote-author-jump');
  function jumpToAuthor(targetId, updateSelect) {
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', '#' + targetId);
    target.classList.add('jump-highlight');
    setTimeout(function () {
      target.classList.remove('jump-highlight');
    }, 1600);
    if (updateSelect && authorJump) {
      authorJump.value = targetId;
    }
  }
  if (authorJump) {
    authorJump.addEventListener('change', function () {
      jumpToAuthor(this.value, false);
    });
    // Deep link support: /library/quotes/en/#author-rothbard-murray
    if (location.hash.indexOf('#author-') === 0) {
      jumpToAuthor(location.hash.slice(1), true);
    }
  }
});

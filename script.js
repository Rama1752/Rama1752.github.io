// Mobile navigation, persistent light/dark theme and footer year.
const root = document.documentElement;
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');
const themeButton = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const year = document.getElementById('year');

if (year) year.textContent = new Date().getFullYear();

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    });
  });
}

function updateThemeButton(theme) {
  if (!themeButton) return;
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  if (themeMeta) themeMeta.content = theme === 'dark' ? '#12251c' : '#fbfaf5';
  themeButton.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
  themeButton.setAttribute('title', `Switch to ${nextTheme} theme`);
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☼' : '◐';
}

const initialTheme = root.dataset.theme === 'dark' ? 'dark' : 'light';
root.dataset.theme = initialTheme;
updateThemeButton(initialTheme);

themeButton?.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = nextTheme;
  updateThemeButton(nextTheme);
  try {
    localStorage.setItem('theme', nextTheme);
  } catch (_) {
    // Theme switching remains available for the current page view.
  }
});

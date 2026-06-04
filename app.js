const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle?.querySelector("i");
const backToTop = document.getElementById("backToTop");
const checks = document.querySelectorAll(".student-check");
const checkProgress = document.getElementById("checkProgress");
const progressLabel = document.getElementById("progressLabel");
const readyAlert = document.getElementById("readyAlert");

const storedTheme = localStorage.getItem("campus-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

function setTheme(theme) {
  root.setAttribute("data-bs-theme", theme);
  localStorage.setItem("campus-theme", theme);

  if (!themeToggle || !themeIcon) return;

  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-label", isDark ? "Aktifkan light mode" : "Aktifkan dark mode");
  themeToggle.setAttribute("data-bs-title", isDark ? "Light mode" : "Dark mode");
  themeIcon.className = isDark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
}

function updateChecklist() {
  if (!checks.length || !checkProgress || !progressLabel || !readyAlert) return;

  const completed = Array.from(checks).filter((check) => check.checked).length;
  const progress = Math.round((completed / checks.length) * 100);

  checkProgress.style.width = `${progress}%`;
  checkProgress.parentElement?.setAttribute("aria-valuenow", String(progress));
  progressLabel.textContent = `${progress}%`;
  readyAlert.classList.toggle("d-none", progress < 100);
}

setTheme(initialTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

checks.forEach((check) => {
  check.addEventListener("change", updateChecklist);
});

updateChecklist();

document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((element) => {
  new bootstrap.Tooltip(element);
});

window.addEventListener("scroll", () => {
  if (!backToTop) return;
  backToTop.classList.toggle("show", window.scrollY > 520);
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll(".navbar-collapse .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("navbarMenu");
    if (!menu) return;
    const instance = bootstrap.Collapse.getInstance(menu);
    instance?.hide();
  });
});

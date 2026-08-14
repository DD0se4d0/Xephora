function xephoraInitTheme(){
  const stored = localStorage.getItem("xephora-theme");
  const theme = stored || "dark";
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme){
  const btn = document.getElementById("themeToggle");
  if(!btn) return;
  btn.innerHTML = theme === "dark"
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>';
}

function xephoraToggleTheme(){
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("xephora-theme", next);
  updateThemeIcon(next);
}

function xephoraToggleMobileMenu(){
  const menu = document.getElementById("mobileMenu");
  if(menu) menu.classList.toggle("open");
}

function xephoraCopyCommand(btn, text){
  navigator.clipboard.writeText(text).then(function(){
    const original = btn.getAttribute("data-label") || "Copy";
    btn.classList.add("copied");
    btn.querySelector("span").textContent = "Copied";
    setTimeout(function(){
      btn.classList.remove("copied");
      btn.querySelector("span").textContent = original;
    }, 1500);
  });
}

function xephoraCopyIconSvg(){
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg>';
}

document.addEventListener("DOMContentLoaded", function(){
  xephoraInitTheme();
  const themeBtn = document.getElementById("themeToggle");
  if(themeBtn) themeBtn.addEventListener("click", xephoraToggleTheme);
  const themeBtnMobile = document.getElementById("themeToggleMobile");
  if(themeBtnMobile) themeBtnMobile.addEventListener("click", xephoraToggleTheme);
  const hamburger = document.getElementById("hamburger");
  if(hamburger) hamburger.addEventListener("click", xephoraToggleMobileMenu);
  const mobileClose = document.getElementById("mobileMenuClose");
  if(mobileClose) mobileClose.addEventListener("click", xephoraToggleMobileMenu);
  document.querySelectorAll(".mobile-menu a").forEach(function(a){
    a.addEventListener("click", xephoraToggleMobileMenu);
  });
  document.querySelectorAll(".invite-link").forEach(function(el){
    el.setAttribute("href", XEPHORA_INVITE_URL);
  });
});

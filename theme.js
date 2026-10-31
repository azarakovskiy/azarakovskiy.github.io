(() => {
  const root = document.documentElement;
  const preference = matchMedia("(prefers-color-scheme: dark)");
  const scheme = document.querySelector('meta[name="color-scheme"]');
  const chrome = document.querySelector('meta[name="theme-color"]') || document.createElement("meta");
  chrome.name = "theme-color";
  if (!chrome.parentNode) document.head.append(chrome);

  let choice = null;
  let button;
  try {
    const saved = localStorage.getItem("site-theme");
    if (saved === "light" || saved === "dark") choice = saved;
  } catch {}

  function apply(mode) {
    root.dataset.theme = mode;
    scheme.content = mode;
    chrome.content = getComputedStyle(root).getPropertyValue("--page").trim();
    if (!button) return;

    const label = `Switch to ${mode === "dark" ? "light" : "dark"} theme`;
    button.title = label;
    button.setAttribute("aria-label", label);
    button.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      + (mode === "dark"
        ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42m0-14.14-1.42 1.42M6.35 17.65l-1.42 1.42"/>'
        : '<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/>')
      + '</svg>';
  }

  apply(choice || (preference.matches ? "dark" : "light"));
  preference.addEventListener("change", () => {
    if (!choice) apply(preference.matches ? "dark" : "light");
  });

  document.addEventListener("DOMContentLoaded", () => {
    button = document.getElementById("theme-toggle");
    if (!button) return;
    button.addEventListener("click", () => {
      choice = root.dataset.theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("site-theme", choice);
      } catch {}
      apply(choice);
    });
    apply(root.dataset.theme);
    button.hidden = false;
  });
})();

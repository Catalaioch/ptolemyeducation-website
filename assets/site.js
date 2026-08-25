if ("scrollRestoration" in history) history.scrollRestoration = "manual";

const initialLandingAtTop = !window.location.hash || window.location.hash === "#top";
const holdHomepagePosition = () => {
  if (initialLandingAtTop) window.scrollTo(0, 0);
};

if (initialLandingAtTop) {
  holdHomepagePosition();
  document.addEventListener("DOMContentLoaded", holdHomepagePosition, {once: true});
  window.addEventListener("pageshow", () => {
    holdHomepagePosition();
    window.setTimeout(holdHomepagePosition, 0);
  }, {once: true});
  window.addEventListener("load", () => {
    holdHomepagePosition();
    window.requestAnimationFrame(() => window.requestAnimationFrame(holdHomepagePosition));
    window.setTimeout(holdHomepagePosition, 120);
    window.setTimeout(holdHomepagePosition, 500);
  }, {once: true});
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(holdHomepagePosition);
}

document.querySelectorAll("#siteNav .nav-link, #siteNav [data-bs-toggle='modal']").forEach(control => {
  control.addEventListener("click", () => {
    const openMenu = document.getElementById("siteNav");
    if (openMenu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(openMenu).hide();
    }
  });
});

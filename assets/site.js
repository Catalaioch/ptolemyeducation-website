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

const copyEmailButton = document.querySelector("[data-copy-email]");
const copyEmailStatus = document.querySelector(".copy-email-status");

const copyText = async text => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const temporaryField = document.createElement("textarea");
  temporaryField.value = text;
  temporaryField.setAttribute("readonly", "");
  temporaryField.style.position = "fixed";
  temporaryField.style.opacity = "0";
  document.body.appendChild(temporaryField);
  temporaryField.select();
  const copied = document.execCommand("copy");
  temporaryField.remove();
  if (!copied) throw new Error("Copy command was not available");
};

if (copyEmailButton && copyEmailStatus) {
  const originalButtonText = copyEmailButton.textContent;

  copyEmailButton.addEventListener("click", async () => {
    try {
      await copyText(copyEmailButton.dataset.copyEmail);
      copyEmailButton.textContent = "Copied";
      copyEmailStatus.textContent = "Email address copied to your clipboard.";
      window.setTimeout(() => {
        copyEmailButton.textContent = originalButtonText;
        copyEmailStatus.textContent = "";
      }, 2600);
    } catch (error) {
      copyEmailStatus.textContent = "Copying was unavailable. Select the email address above to copy it manually.";
    }
  });
}

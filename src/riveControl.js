import { Rive } from "@rive-app/canvas";
import ubjahresbericht25 from "./assets/rive/ubjahresbericht25.riv";

const canvasEl = document.getElementById("canvas");

const r = new Rive({
  src: ubjahresbericht25,
  canvas: canvasEl,
  autoplay: true,
  autoBind: true,
  artboard: "ArtboardMain",
  stateMachines: "State Machine 1",
  onLoad: () => {
    const vmi = r.viewModelInstance;

    const triggers = {
      OSS_Click: {
        trigger: vmi.trigger("OSS_Click"),
        popUp: "OSS",
      },

      DACH_Click: {
        trigger: vmi.trigger("DACH_Click"),
        popUp: "DACH",
      },

      Consensus_Click: {
        trigger: vmi.trigger("Consensus_Click"),
        popUp: "Consensus",
      },

      Aviri_Click: {
        trigger: vmi.trigger("Aviri_Click"),
        popUp: "Aviri",
      },

      Studenten_Click: {
        trigger: vmi.trigger("Studenten_Click"),
        popUp: "Studenten",
      },

      Ruedi_Click: {
        trigger: vmi.trigger("Ruedi_Click"),
        popUp: "Ruedi",
      },

      Werkstatt_Click: {
        trigger: vmi.trigger("Werkstatt_Click"),
        popUp: "Werkstatt",
      },
    };

    for (const [, { trigger, popUp }] of Object.entries(triggers)) {
      trigger.on(() => handlePopUp(popUp));
    }

    r.resizeDrawingSurfaceToCanvas();
    end_loader();
    titleTransition();
  },
});

// #region resize of window
function calcCanvasSize() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Set display size (css pixels).
  const sizew = 1600 * 0.6;
  const sizeh = 3900 * 0.6;
  const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
  console.log(devicePixelRatio);
  const scaledsizew = Math.floor(sizew * scale);
  const scaledsizeh = Math.floor(sizeh * scale);

  // Set actual size in memory (scaled to account for extra pixel density).

  canvas.width = Math.floor(scaledsizew);
  canvas.height = Math.floor(scaledsizeh);
  canvas.style.width = `${sizew}px`;
  canvas.style.height = `${sizeh}px`;

  const documentHeight = Math.round(sizeh + 300);
  document.documentElement.style.setProperty(
    "--app-height",
    `${documentHeight}px`,
  );
  console.log(`Canvas height set as --app-height: ${sizeh}px`);
  console.log(canvas.width);
  console.log(canvas.height);

  // Normalize coordinate system to use CSS pixels.
  ctx.scale(scale, scale);
  console.log(ctx + " ctx");
}

calcCanvasSize();

window.addEventListener("resize", () => {
  calcCanvasSize();
  r.resizeDrawingSurfaceToCanvas();
});

console.log(r);

// #endregion

// #region Popup

const baseAppHeight = getComputedStyle(document.documentElement)
  .getPropertyValue("--app-height")
  .trim();

function handlePopUp(popUpId) {
  history.pushState({ page: 1 }, "", "");

  const popUpElement = document.getElementById(popUpId);
  const closeButton = popUpElement.querySelector(".close-button");
  closeButton.addEventListener("click", handleCloseButton);

  setVideo(popUpElement);
  popUpElement.classList.remove("hidden");

  // If content is taller than the current site height, extend to fit
  const wrapper = popUpElement.querySelector(".article-content-wrapper");
  if (wrapper) {
    const neededHeight = wrapper.scrollHeight + 100;
    const currentHeight = parseInt(baseAppHeight);
    if (neededHeight > currentHeight) {
      document.documentElement.style.setProperty(
        "--app-height",
        `${neededHeight}px`,
      );
    }
  }

  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

function closePopup(popUpElement) {
  if (!popUpElement) return;
  stopVideo(popUpElement);
  popUpElement.classList.add("hidden");

  // Restore original site height
  document.documentElement.style.setProperty("--app-height", baseAppHeight);
}

function handleCloseButton(event) {
  const popUpElement = event.currentTarget.closest(".pop-up-container");
  closePopup(popUpElement);
}

function setVideo(popUpElement) {
  const iframe = popUpElement.querySelector("iframe");
  if (iframe) iframe.setAttribute("src", iframe.getAttribute("data-video-src"));
}

function stopVideo(popUpElement) {
  const iframe = popUpElement.querySelector("iframe");
  if (iframe) iframe.setAttribute("src", "");
}

// #endregion

// #region Loader

function end_loader() {
  const loader = document.querySelector(".lds-ellipsis");
  loader.style.opacity = 0;
  setTimeout(() => {
    loader.style.display = "none";
  }, 800);
}

function start_loader() {
  const loader = document.querySelector(".lds-ellipsis");
  loader.style.opacity = 1;
  loader.style.display = "block";
}

// #endregion

// #region Back Button

history.pushState({ page: 1 }, "", "");

window.onpopstate = function () {
  const openPopup = document.querySelector(".pop-up-container:not(.hidden)");
  if (openPopup) closePopup(openPopup);
  history.pushState({ page: 1 }, "", "");
};

// #endregion

// #region Mobile Warning

function isMobileDevice() {
  return /android|iPhone|iPad|iPod|opera mini|IEMobile|WPDesktop/i.test(
    navigator.userAgent,
  );
}

if (isMobileDevice()) {
  document.getElementById("mobile-warning").style.display = "block";
  document.getElementById("canvas-container").style.display = "none";
  r.cleanup();
}

// #endregion

// #region Title

function titleTransition() {
  document.getElementById("JB-title").classList.remove("loading");
}

// #endregion

// #region Impressum

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("impressum-button").onclick = () =>
    document.getElementById("impressum-list").classList.toggle("hidden");
});

// #endregion

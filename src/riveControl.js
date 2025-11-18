// Import the entire module under the global identifier `rive`

import { Rive, EventType,RiveEventType } from "@rive-app/canvas";
import ubjahresbericht24 from "./assets/rive/ub_jahresbericht_2024.riv";

let r;

const canvasEl = document.getElementById("canvas");

const onStateChange = (event) => {
  const stateName = event.data[0];
  console.log(stateName);
  if (stateName.includes('Hover')) {
    const isHovering = stateName.split('_').pop() === 'Hover';

    if (isHovering) {
      // Toggle the cursor style: if it's 'pointer', switch to 'default'; if not, switch to 'pointer'
      if (canvasEl.style.cursor === 'pointer') {
        canvasEl.style.cursor = 'default';
      } else {
        canvasEl.style.cursor = 'pointer';
      }
    } else {
      // When not hovering, ensure the cursor is set to 'default'
      canvasEl.style.cursor = 'default';
    }
    
  }
};


r = new Rive({
  src: ubjahresbericht24,
  canvas: canvasEl,
  autoplay: true,
  artboard: "ArtboardMain",
  stateMachines: "State Machine 1",
  //automaticallyHandleEvents: true, 
  onLoad: () => {
    r.resizeDrawingSurfaceToCanvas();
    r.play("QuotesTracking");
    end_loader();
    titleTransition();
  },

  onStateChange: onStateChange,

  });
  

  // resize of window
  function calcCanvasSize() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Set display size (css pixels).
    const sizew = 1600 * 0.6;
    const sizeh = 3900 * 0.6;
    const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    console.log(devicePixelRatio)
    const scaledsizew = Math.floor(sizew * scale);
    const scaledsizeh = Math.floor(sizeh * scale);

    // Set actual size in memory (scaled to account for extra pixel density).

    canvas.width = Math.floor(scaledsizew);
    canvas.height = Math.floor(scaledsizeh);
    canvas.style.width = `${sizew}px`;
    canvas.style.height = `${sizeh}px`;

    const documentHeight = Math.round(sizeh + 300);
    document.documentElement.style.setProperty('--app-height', `${documentHeight}px`);
    console.log(`Canvas height set as --app-height: ${sizeh}px`);
    console.log(canvas.width)
    console.log(canvas.height)


    // Normalize coordinate system to use CSS pixels.
    ctx.scale(scale, scale);
    console.log(ctx + " ctx")
}

calcCanvasSize()

  window.addEventListener("resize", () => {
    calcCanvasSize();
    r.resizeDrawingSurfaceToCanvas();
  });
  

  console.log(r);




  // Define a mapping of event names to handler functions
  const eventHandlers = {
    "KI_Eisbrecher": (data) => {
      handlePopUp(data)
    },

    "KI_Literacy": (data) => {
      handlePopUp(data)
    },

    "KI_GenAI": (data) => {
      handlePopUp(data)
    },

    "KI_Recherche": (data) => {
      handlePopUp(data)
    },

    "Ruedi": (data) => {
      handlePopUp(data)
    },

    "ErstiTag": (data) => {
      handlePopUp(data)
    },

    "SocialMedia": (data) => {
      handlePopUp(data)
    },

    "BIM": (data) => {
      handlePopUp(data)
    },

    "IKTag": (data) => {
      handlePopUp(data)
    },

    "QuoteChange": (data) => {
      handleQuoteChange(data)
    },

    "Quote": (data) => {
      handlePopUp(data);
      handleQuoteClick(data);
    },

  };
  


// Central event handler which dispatches events based on their name
const riveEventHandler = (event) => {
  const eventName = event.data.name;
  const eventData = event.data;
  const eventProperties = eventData.properties;
  console.log("Received event:", eventName);

  if (eventData.type === RiveEventType.General) {
    
    const handler = eventHandlers[eventName];
    if (handler) {
      handler(eventData);
    } else {
      console.warn(`No handler defined for event: ${eventName}`);
    }
  
  } else if (eventData.type === RiveEventType.OpenUrl) {

  console.log("Open Link for:", eventName);
  window.open(eventData.url);

}

};

r.on(EventType.RiveEvent, riveEventHandler);


////////////////////////////////////////////////
/////////////Fuinctions////////////////////////
/////////////////////////////////////////////////

// Handle Pop Up
function handlePopUp(event) {

  console.log(`Handling ${event.name}:`, event);
  // Push an initial state to the browser history
  history.pushState({ page: 1 }, "", "");

  let popUpElement = document.getElementById(event.name);
  console.log("Element:", popUpElement);

  //attach close button handler
  let closeButton = popUpElement.querySelector('.close-button');
  closeButton.addEventListener("click", handleCloseButton);

  //if video set Src
  setVideo(popUpElement)
  
  popUpElement.classList.remove("hidden")

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

}


// Generic close popup function (reusable logic)
function closePopup(popUpElement) {
  if (!popUpElement) {
    console.warn("No pop-up element provided.");
    return;
  }

  stopVideo(popUpElement);
  popUpElement.classList.add('hidden');

  const articleID = popUpElement.id;
  const articleCloseTrigger = `${articleID}_Close!`;
  
  const inputs = r.stateMachineInputs('State Machine 1');
  const closeInput = inputs.find(i => i.name === articleCloseTrigger);

  if (closeInput) {
    closeInput.fire();
    console.log(`Triggered Rive input: ${closeInput.name}`);
  } else {
    console.warn(`Rive input "${articleCloseTrigger}" not found.`);
  }
}

// Updated close button handler (calls closePopup)
function handleCloseButton(event) {
  const popUpElement = event.currentTarget.closest('.pop-up-container');
  closePopup(popUpElement);
}

function setVideo(popUpElement) {
  const iframe = popUpElement.querySelector('iframe');
  if (iframe) {
    const videoSrc =  iframe.getAttribute('data-video-src');
    iframe.setAttribute('src', videoSrc);
  }
}


// Function to stop a video in a popup container by resetting its src attribute
function stopVideo(popUpElement) {
  const iframe = popUpElement.querySelector('iframe');
  if (iframe) {

    iframe.setAttribute('src', '');

  }
}

// Function that advances the Quotes whenever it receives a "Quotes" Event

//object with all quotes
const Quotes = {
  "Quote1": {
    title: "Wertschätzung und Zusammenarbeit",
    text: "«Veränderungen sind richtig – wichtig sind die Menschen. Bereichernd war und ist die unkomplizierte Zusammenarbeit und Wertschätzung in unserem Team und insgesamt in der UB. Persönliches Highlight war, dass ich an der Entwicklung des Leitfadens schriftliche Kund*innen-Kommunikation mitwirken durfte.»",
    author: "Karin Brändli, ND / DocDel, Bereich Medizin"
  },
  "Quote2": {
    title: "Open Access und E-Media-Entdeckungen",
    text: "«Im Jahr 2024, meinem zweiten Jahr in der UB, hatte ich das Privileg, unseren Bereich im Open-Access-Netzwerk zu vertreten, eine neue Mini-Stage für unsere Lernenden zu entwickeln und meine Reise in den E-Media-Dschungel unter Anleitung einiger sehr kluger und erfahrener UB-Kollegen zu beginnen. Alles awesome Herausforderungen und eine tolle Zusammenarbeit.»",
    author: "Alisa Berger, Liaison Librarian Medizin"
  },
  "Quote3": {
    title: "Strategische Zusammenarbeit mit der ZB",
    text: "«Die Entwicklung einer gemeinsamen Strategie zusammen mit der ZB war für mich ein wegweisendes und spannendes Projekt. Persönlich konnte in zwei Produktfeldern bei der Ausarbeitung der strategischen Ziele mitwirken, damit wir nun konkret in die Strategieperiode 2025-2027 starten können.»",
    author: "Susanna Blaser-Meier, Leitung Bereich Geisteswissenschaften"
  },
  "Quote4": {
    title: "Potenzial in Userstories",
    text: "«Viele konkrete Probleme vor Ort zusammen mit kompetenten Arbeitskolleginnen und -kollegen aus Nutzendendienst, Mediendienst und der Liaison-Librarian-Gruppe lösen zu können, hat Freude gemacht. In diesen Userstories steckt sehr viel Potenzial!»",
    author: "Harald Völker, Liaison Librarian Romanistik"
  },
  "Quote5": {
    title: "Swisscovery im Wandel",
    text: "«Aufgrund der Rückmeldungen unserer Nutzenden ist die EG Discovery 2024 daran gegangen, erste Probleme in unserem swisscovery anzugehen. Der Prozess ist langsam und zäh. Es gibt diverse Abhängigkeiten. Vieles muss über die UB und ZB hinaus mit allen Schweizer Hochschulbibliotheken und SLSP abgesprochen werden. Deren Ziele und Interessen sind nicht immer dieselben wie unsere. Aber wir konnten 2024 erste Änderungen beschliessen, die nun ab 2025 auch für die Nutzenden sichtbar werden. Es ist wenig, aber es geht voran.»",
    author: "Andreas Bigger, Functional Expert Discovery"
  },
  "Quote6": {
    title: "KI & Teamdynamik in den Naturwissenschaften",
    text: "«Im Bereich Naturwissenschaften ging es im 2024 turbulent zu und her. Es gab einige spürbare personelle Wechsel und Veränderungen in der Abteilungsstruktur. Mit r als neuen Liaison Librarian konnten wir eine grosse Bereicherung für unser Team gewinnen. Das Thema generative Künstliche Intelligenz wandelte sich, auch dank ihm, vom exotischen Modewort in einen fixen Bestandteil unserer Kurse. Und dann war da noch diese legendäre 4. Informationskompetenz-DACH-Tagung! Es hat unglaublich viel Freude gemacht zusammen mit einem dynamischen OK diese Konferenz auf die Beine zu stellen und internationale Gäste bei uns an der UZH willkommen zu heissen.»",
    author: "Anna Véron, Liaison Librarian Naturwissenschaften"
  },
  "Quote7": {
    title: "HOPE und Diamond Open Access",
    text: "«Die Zeitschriften-Publikationsplattform HOPE wurde 2024 verstetigt und ermöglicht mittlerweile über 20 UZH-Herausgebenden die Veröffentlichung von Diamond Open-Access-Zeitschriften. HOPE nutzt die weltweit verbreitete Open-Source-Software Open Journal Systems (OJS). Die Plattform steht im Einklang mit der 2024 revidierten Nationalen Open-Access-Strategie der Schweiz, die nun einen stärkeren Fokus auf die Förderung von Diamond Open Access legt.»",
    author: "Margit Dellatorre, Teamleitung Open-Access-Team"
  },
  "Quote8": {
    title: "ZORA-Projekt und Zukunftsfähigkeit",
    text: "«Im September 2024 startete das Projekt zur Ablösung der Software EPrints durch DSpace des UZH-Repositoriums ZORA. Damit soll ZORA auf eine zukunftsfähige Softwarebasis gestellt werden und bleibt ein zentraler Bestandteil der Open-Science-Strategie der UZH, insbesondere im Bereich Green Open Access.»",
    author: "Tessa Gerber, Open-Access-Team / ZORA"
  },
  "Quote9": {
    title: "Soziale Medien stärken",
    text: "«Als Teil des Social Media Teams war es schön zu sehen, wie 2024 die UB ihren Auftritt in den Sozialen Medien (besonders Instagram) ausbauen und ihre Followerschaft vergrössern konnte. Die Interaktion mit unseren Followern zeigt, dass wir mit informativen und lustigen Inhalten einen Kanal geschaffen haben, auf dem wir unsere Nutzenden erreichen können, und umgekehrt.»",
    author: "Alyah Davis-Moeck, Nutzenden- und Mediendienst, Bereich Sozialwissenschaften"
  },
  "Quote10": {
    title: "Zusammenrücken trotz Dezentralität",
    text: "«2024 ist die UB aus meiner Sicht nochmals zusammengerückt. Die Zusammenarbeit ist durch die dezentrale Struktur nach wie vor komplex, aber die Rollen und Wege werden immer klarer.»",
    author: "Martina Kammermann, Leitung Kommunikation"
  },
  "Quote11": {
    title: "Bereichsübergreifendes Einspringen",
    text: "«Im Jahr 2024 durfte ich während vier Monaten nebst meiner regulären Arbeit im Bereich 2 (Recht) zusätzlich einen Tag in der Woche im Bereich 3 (Sprachen & Wirtschaft) einspringen, da diese Engpässe bei den ND hatten. Die Leichtigkeit, mit welcher dieser kleine Ausflug geklappt hat – sowohl im Organisatorischen als auch bei der tatsächlichen Arbeit –, hat mir gezeigt, wie stark die verschiedenen Bereiche und Standorte der UB bereits zu einer Bibliothek zusammengewachsen sind.»",
    author: "Zoe Genhart, Nutzendendienst UB Recht"
  }
};


// Keep track of the current quote index
let currentQuoteIndex = 0;

// Extract quote keys for easy indexing
const quoteKeys = Object.keys(Quotes);

/////////////////////
// Function that advances the quote whenever it receives a "Quote_Change" event
////////////////////

function handleQuoteChange(event) {
  const currentKey = quoteKeys[currentQuoteIndex];
  const currentQuoteText = Quotes[currentKey].title;

  r.setTextRunValueAtPath("QuoteAgent_TextRun", currentQuoteText, "QuoteAgent");

  currentQuoteIndex = (currentQuoteIndex + 1) % quoteKeys.length;
}



function handleQuoteClick(event) {
  const currentKey = quoteKeys[currentQuoteIndex];
  const currentQuoteTitle = Quotes[currentKey].title;
  const currentQuoteText = Quotes[currentKey].text;
  const currentQuoteAuthor = Quotes[currentKey].author;

  const quoteTitleEl = document.querySelector("#quote-title h2");  
  const quoteTextEl = document.querySelector("#quote-body p");
  const quoteAuthorEl = document.querySelector("#quote-body h2 p");


  if (quoteTitleEl) {
    quoteTitleEl.innerHTML = currentQuoteTitle;
  }

  if (quoteTextEl) {
    quoteTextEl.innerHTML = currentQuoteText;
  }

  if (quoteAuthorEl) {
    quoteAuthorEl.innerHTML = currentQuoteAuthor;
  }

}

document.getElementById('nextQuoteBtn').addEventListener('click', nextQuote);

function nextQuote() {
  // Advance the quote index cyclically
  currentQuoteIndex = (currentQuoteIndex + 1) % quoteKeys.length;

  // Get the next quote
  const currentKey = quoteKeys[currentQuoteIndex];
  const currentQuote = Quotes[currentKey];

  // Select HTML elements
  const quoteTitleEl = document.querySelector("#quote-title h2");
  const quoteTextEl = document.querySelector("#quote-body p");
  const quoteAuthorEl = document.querySelector("#quote-body h2 p");

  // Update DOM elements safely
  if (quoteTitleEl) quoteTitleEl.innerHTML = currentQuote.title;
  if (quoteTextEl) quoteTextEl.innerHTML = currentQuote.text;
  if (quoteAuthorEl) quoteAuthorEl.innerHTML = currentQuote.author;

  // Update Rive text run if required
  r.setTextRunValueAtPath("QuoteAgent_TextRun", currentQuote.title, "QuoteAgent");

  console.log(`Displayed quote: ${currentKey}`);
}

//////////////////////////
////// LAODER ////////////
//////////////////////////


function end_loader() {
  var loader = document.querySelector(".lds-ellipsis");
  loader.style.opacity = 0;
  setTimeout(function () {
    loader.style.display = "none";
  }, 800);
}




function start_loader() {
  var loader = document.querySelector(".lds-ellipsis");
  loader.style.opacity = 1;
  loader.style.display = "block";
  document.querySelector("main").style.visibility = "visible";
}

window.addEventListener("resize", function () {
  start_loader();
});


//////////////////////////////////////////
/////// BACK BUTTON INTERCEPTION /////////
//////////////////////////////////////////


// Push an initial state to the browser history
history.pushState({ page: 1 }, "", "");

// Listen to the popstate event
window.onpopstate = function (event) {
  // Intercept back button action here
  console.log("Back button pressed, intercepted!");

  // Perform your custom action
  backButtonFunction();

  // Optionally push the state back to avoid navigation
  history.pushState({ page: 1 }, "", "");
};


// Your custom back-button intercept function
function backButtonFunction() {
  console.log("Back button intercepted!");

  const openPopup = document.querySelector('.pop-up-container:not(.hidden)');

  if (openPopup) {
    closePopup(openPopup);
  } else {
    console.log("No pop-up currently open.");
  }
}


//////////////////////////////////////
///////// Mobile Warning /////////////
/////////////////////////////////////

function isMobileDevice() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /android|iPhone|iPad|iPod|opera mini|IEMobile|WPDesktop/i.test(userAgent);
}

if (isMobileDevice()) {
  document.getElementById('mobile-warning').style.display = 'block';
  document.getElementById('canvas-container').style.display = 'none';
  r.cleanup();
}


///////////////////////////////////
////////// Title ////////////////
/////////////////////////////////

function titleTransition() {
  const title =  document.getElementById('JB-title');
  title.classList.remove('loading');
}


///////////////////////////////////
////////// Impressum ////////////////
/////////////////////////////////


document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('impressum-button').onclick = () =>
    document.getElementById('impressum-list').classList.toggle('hidden');
});



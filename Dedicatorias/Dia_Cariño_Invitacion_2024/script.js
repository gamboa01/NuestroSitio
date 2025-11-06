"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const MAX_IMAGES = 6;

let play = true;
let yes=false;
let noCount = 0;

yesButton.addEventListener("click", handleYesClick);

noButton.addEventListener("click", function () {
  if (play) {
    noCount++;
    if (noCount === MAX_IMAGES+1) {
      play = false;
      noButton.textContent="SI";
      noButton.style.fontSize=yesButton.style.fontSize;
    }
    else
    {
      const imageIndex = Math.min(noCount, MAX_IMAGES);
      changeImage(imageIndex);
      resizeYesButton();
      updateNoButtonText();
    }
  }
  else
  {
    handleYesClick();
  }
});

function handleYesClick() {
  titleElement.innerHTML = "¡¡Siiiiiiiiiiiiiiiii!! :D";
  buttonsContainer.classList.add("hidden");
  changeImage("yes");
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.6;

  yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage(noCount) {
  const messages = [
    "No",
    "¿Estás Segura? :(",
    "Piensalooooooo",
    "No me digas que no :c",
    "Ahhhhhhhhhhhhhhh di que siii",
    "Vamo a llorar...",
    "¿Cómo que me vas a decir que no?",
  ];

  const messageIndex = Math.min(noCount, messages.length - 1);
  return messages[messageIndex];
}

function changeImage(image) {
  catImg.src = `img/cat-${image}.jpg`;
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}

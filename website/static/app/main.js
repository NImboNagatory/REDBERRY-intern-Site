const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...document.querySelectorAll("[data-step]")];

const secondStepForm = document.querySelector("[data-dynamic-content]");
const secondStepForms = document.querySelectorAll("[data-dynamic-content]");
const addMoreButton = secondStepForm.querySelector(".add-more");

let currentStep = formSteps.findIndex((step) =>
  step.classList.contains("active")
);

if (currentStep < 0) {
  currentStep = 0;
  formSteps[currentStep].classList.add("active");
}

multiStepForm.addEventListener("click", (e) => {
  let incrementor;
  if (e.target.matches("[data-next]")) {
    incrementor = 1;
  } else if (e.target.matches("[data-prev]")) {
    incrementor = -1;
  }

  if (incrementor == null) return;
  currentStep += incrementor;

  showCurrentStep();
});

const handleAddMoreButtonClick = () => {
  let clone = secondStepForm.cloneNode(true);

  clone.removeAttribute("id");

  secondStepForm.parentNode.insertBefore(
    clone,
    secondStepForms[secondStepForms.length - 1].nextSibling
  );

  clone
    .querySelector(".add-more")
    .addEventListener("click", handleAddMoreButtonClick);
};

const showCurrentStep = () => {
  formSteps.forEach((step, idx) => {
    step.classList.toggle("active", currentStep === idx);
  });
};

addMoreButton.addEventListener("click", handleAddMoreButtonClick);

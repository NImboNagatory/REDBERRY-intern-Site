const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...document.querySelectorAll("[data-step]")];

const secondStepForm = document.querySelector(".experiance-form");
const thirdStepForm = document.querySelector(".education-form");
const addMoreButton = secondStepForm.querySelector(".add-more");
const thirdStepAddMoreButton = thirdStepForm.querySelector(".add-more");
const pageNum = document.querySelector(".step-container__step")

const firstInitState = {
  name: "",
  lastName: "",
  photo: "",
  email: "",
  phone: "",
  aboutMe: "",
};

let firstStepErrors = { ...firstInitState };

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

// function handelStep(step) {
//   handelFirstStep();
//   // switch (step) {
//   //   case 1:
//   //     handelFirstStep();
//   //     break;
//
//   //   default:
//   //     break;
//   // }
// }

const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("lastName");
const photoInput = document.getElementById("photo");
const photoOpenerBtn = document.getElementById("photo-opener");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const aboutInput = document.getElementById("aboutMe");
const schoolName = document.getElementById("schoolInput");
const jobName = document.getElementById("job-input");
const employer = document.getElementById("employer");
const jobStart = document.getElementById("startDate");
const jobEnd = document.getElementById("endDate");
const jobDescription = document.getElementById("jobDesc");
const grade = document.getElementById("grade");
const eduEnd = document.getElementById("eduend");
const eduDesc = document.getElementById("eduDesc");




// function handelFirstStep() {
//   firstStepErrors = { ...firstInitState };
//
//   if (!nameInput.value) {
//     firstStepErrors.name = "Required";
//   } else if (nameInput.value.length < 2) {
//     firstStepErrors.name = "Minimum 2 characters";
//   }
//
//   if (!lastNameInput.value) {
//     firstStepErrors.lastName = "Required";
//   } else if (lastNameInput.value.length < 2) {
//     firstStepErrors.lastName = "Minimum 2 characters";
//   }
//
//   if (!emailInput.value) {
//     firstStepErrors.email = "Required";
//   } else if (!checkRegex(emailInput.value, /@redberry\.ge/)) {
//     firstStepErrors.email = "Must contain @redberry.ge";
//   }
//
//   if (!phoneInput.value) {
//     firstStepErrors.phone = "Required";
//   } else if (!checkRegex(phoneInput.value, /^\+995\s5\d{2}\s\d{2}\s\d{2}\s\d{2}$/)) {
//     firstStepErrors.phone = "Must match Georgian phone number format";
//   }
//
//   const errorKeys = Object.keys(firstStepErrors);
//   errorKeys.map((key) => {
//     let hasError = false;
//     const errorText = firstStepErrors[key];
//
//     if (errorText) {
//       hasError = true;
//       showErrorState(document.getElementById(key), errorText);
//     } else {
//       hideErrorState(document.getElementById(key));
//     }
//
//     return hasError;
//   });
//
//   return !errorKeys.some((key) => firstStepErrors[key]);
// }




function handelFirstStep() {
  firstStepErrors = { ...firstInitState };

  checkElementLength(nameInput);
  checkElementLength(lastNameInput);
  if (!checkRegex(emailInput.value, /@redberry\.ge/)) {
    showErrorState(emailInput, "უნდა მთავრდებოდეს @redberry.ge-თი");
  }
  if (!checkRegex(phoneInput, /^\+\d{3} \d{3} \d{2} \d{2} \d{2}$/)) {
    showErrorState(
      phoneInput,
      "უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს"
    );
  }
  if (!nameInput.value) {
    firstStepErrors.name = "სავალდებულო";
  } else if (nameInput.value.length < 2) {
    firstStepErrors.name = "მინიმუმ 2 სიმბოლო";
  }

  if (!lastNameInput.value) {
    firstStepErrors.lastName = "სავალდებულო";
  } else if (lastNameInput.value.length < 2) {
    firstStepErrors.lastName = "მინიმუმ 2 სიმბოლო";
  }

  // if (!photoInput.files.length) {
  //   firstStepErrors.photo = "სავალდებულოა";
  // }

  if (!emailInput.value) {
    firstStepErrors.email = "სავალდებულოა";
  } else if (!checkRegex(emailInput.value, /@redberry\.ge/)) {
    firstStepErrors.email = "უნდა მთავრდებოდეს @redberry.ge-თი";
  }

  if (!phoneInput.value) {
    firstStepErrors.phone = "სავალდებულოა";
  } else if (
    !checkRegex(phoneInput.value, /^\+995\s5\d{2}\s\d{2}\s\d{2}\s\d{2}$/ )
  ) {
    firstStepErrors.phone =
      "უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს";
  }

  const errorKeys = Object.keys(firstStepErrors);

  errorKeys.map((key) => {
    let hasError = false;

    const errorText = firstStepErrors[key];
    if (errorText) {
      hasError = true;
      showErrorState(document.getElementById(key), errorText);
    } else {
      console.log(key);
      clearErrorState(document.getElementById(key));
    }

    if (!hasError) {
      currentStep = 1;
      showCurrentStep();
    }
  });
}

const handleAddMoreButtonClick = (e) => {
  const formContainers = document.querySelectorAll(".experiance-form");

  console.log(formContainers);

  const lastFormContainer = formContainers[formContainers.length - 1];
  let clone = lastFormContainer.cloneNode(true);

  const addNewBlockButton = document
    .getElementById("step-2")
    .querySelectorAll(".add-more");
  console.log(addNewBlockButton);

  addNewBlockButton.forEach((btn, idx) => {
    btn.classList.add("hidden");
  });

  let inputs = clone.getElementsByTagName("input");
  let textarea = clone.getElementsByTagName("textarea");
  clearValues([...inputs, ...textarea]);

  lastFormContainer.parentNode.insertBefore(
    clone,
    lastFormContainer.nextSibling
  );

  clone
    .querySelector(".add-more")
    .addEventListener("click", handleAddMoreButtonClick);
};

const handelThirdStep = (e) => {
  const formContainers = document.querySelectorAll(".education-form");

  console.log(formContainers);

  const lastFormContainer = formContainers[formContainers.length - 1];
  let clone = lastFormContainer.cloneNode(true);

  const addNewBlockButton = document
    .getElementById("step-3")
    .querySelectorAll(".add-more");
  console.log(addNewBlockButton);

  addNewBlockButton.forEach((btn, idx) => {
    btn.classList.add("hidden");
  });

  let inputs = clone.getElementsByTagName("input");
  let textarea = clone.getElementsByTagName("textarea");
  clearValues([...inputs, ...textarea]);

  lastFormContainer.parentNode.insertBefore(
    clone,
    lastFormContainer.nextSibling
  );

  clone.querySelector(".add-more").addEventListener("click", handelThirdStep);
};

const showCurrentStep = () => {
  formSteps.forEach((step, idx) => {
    step.classList.toggle("active", currentStep === idx);
  });
};

addMoreButton.addEventListener("click", handleAddMoreButtonClick);
thirdStepAddMoreButton.addEventListener("click", handelThirdStep);

nameInput.addEventListener("input", (e) => {
  const value = e.target.value;
  document.querySelector(".cv__name").textContent = value;
});
lastNameInput.addEventListener("input", (e) => {
  const value = e.target.value;
  document.querySelector(".cv__lastName").textContent = `  ${value}`;
});
aboutInput.addEventListener('input', (e) => {
  const value =e.target.value;
  document.querySelector(".cv__text").textContent = `${value}`;
});
photoInput.addEventListener("change", (e) => {
  console.log("changee");
  displayImage(photoInput, document.querySelector(".cv__img"));
});
phoneInput.addEventListener("input", (e) => {
  const value = e.target.value;
  document.querySelector(".cv__phone").textContent = value;
});
emailInput.addEventListener("input", (e) => {
  const value = e.target.value;
  document.querySelector(".cv__email").textContent = value;
});
aboutInput.addEventListener('input', (e) => {
  const value =e.target.value;
  document.querySelector(".cv__text").textContent = `${value}`;
});
aboutInput.addEventListener('input', (e) => {
  const value =e.target.value;
  document.querySelector(".cv__text").textContent = `${value}`;
});
photoOpenerBtn.addEventListener("click", (e) => {
  photoInput.click();
});

jobName.addEventListener("input", (e) =>{
  const value =e.target.value;
  document.querySelector(".cv__job__title").textContent = `${value}`;
})

employer.addEventListener("input", (e)=>{
  const value =e.target.value;
  document.querySelector(".cv__employer").textContent = `${value}`;
})

jobStart.addEventListener("input", (e)=>{
  const value =e.target.value;
  document.querySelector(".cv__date_start").textContent = `${value}`;
})
jobEnd.addEventListener("input", (e)=>{
  const value =e.target.value;
  document.querySelector(".cv__date_end").textContent = `${value}`;
})

jobDescription.addEventListener("input", (e)=>{
  const value =e.target.value;
  document.querySelector(".jobdescr").textContent = `${value}`;
})

schoolName.addEventListener("input", (e)=>{
   const value =e.target.value;
   document.querySelector(".university").textContent = `${value}`;
})

grade.addEventListener("input", (e)=>{
  const value =e.target.value;
   document.querySelector(".grade").textContent = `${value}`;
})

eduEnd.addEventListener("input", (e)=>{
   const value =e.target.value;
   document.querySelector(".cv__date_edu_end").textContent = `${value}`;
})

eduDesc.addEventListener("input", (e)=>{
  const value =e.target.value;
   document.querySelector(".cv__text_edu").textContent = `${value}`;
})
window.onbeforeunload = function() {
    localStorage.setItem("name", $('.name').val());
    localStorage.setItem("surname", $('.lastName').val());
    localStorage.setItem("email", $('.email').val());
    localStorage.setItem("phone", $('.phone').val());
    localStorage.setItem("aboutMe", $('.aboutMe').val());
};

function convertImageToBinary(imageSrc, callback) {
              // Create an image object
              var image = new Image();

              // Set the source of the image
              image.src = imageSrc;

              // Wait for the image to load
              image.onload = function() {
                // Create a canvas element
                var canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;

                // Draw the image on the canvas
                canvas.getContext('2d').drawImage(image, 0, 0);

                // Get the binary data from the canvas
                var binaryData = canvas.toDataURL('image/jpeg').split(',')[1];

                // Return the binary data through the callback
                callback(binaryData);
              };
            }



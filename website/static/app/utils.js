function validate() {}

function displayImage(fileInput, imgElement) {
  let file = fileInput.files[0];

  if (file) {
    let reader = new FileReader();

    reader.addEventListener("load", function () {
      imgElement.src = reader.result;
    });

    reader.readAsDataURL(file);
  } else {
    imgElement.src = "";
  }
}

const checkElementLength = (element) => {
  if (!element.value) {
    showErrorState(element, "მინიმუმ 2 სიმბოლო");
  }
};

const checkRegex = (str, regex) => {
  return regex.test(str);
};

const showErrorState = (element, message) => {
  const parent = element.closest(".controll");
  parent.classList.add("controll--fail");
  const hint = parent.querySelector(".controll__hint");
  hint.innerHTML = message;
};

const clearErrorState = (element, message) => {
  const parent = element.closest(".controll");
  parent.classList.remove("controll--fail");
  parent.classList.add("controll--success");
  const hint = parent.querySelector(".controll__hint");
  hint.innerHTML = "";
};

const clearValues = (elements) => {
  for (element of elements) {
    element.value = "";
  }
};

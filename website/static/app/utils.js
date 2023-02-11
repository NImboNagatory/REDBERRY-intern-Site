const validate = () => {};

const displayImage = (fileInput, imgElement) => {
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = () => { imgElement.src = reader.result; };
    reader.readAsDataURL(file);
  } else {
    imgElement.src = '';
  }
};

const checkElementLength = (element) => {
  if (!element.value || element.value.length < 2) {
    showErrorState(element, 'Minimum 2 characters required');
  }
};

const checkRegex = (str, regex) => regex.test(str);

const showErrorState = (element, message) => {
  const parent = element.closest('.controll');
  parent.classList.add('controll--fail');
  const hint = parent.querySelector('.controll__hint');
  hint.innerHTML = message;
};

const clearErrorState = (element) => {
  const parent = element.closest('.controll');
  parent.classList.remove('controll--fail');
  parent.classList.add('controll--success');
  const hint = parent.querySelector('.controll__hint');
  hint.innerHTML = '';
};

const clearValues = (elements) => {
  elements.forEach((element) => { element.value = ''; });
};

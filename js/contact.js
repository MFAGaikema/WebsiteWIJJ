////////////////////////////////////////////////
///////////FUNCTIONS FOR FORMCONTROL////////////
////////////////////////////////////////////////

//FUNCTIONS FOR FORM VALIDATION

//Variables
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let triedToSubmit = false;
let formDataIsValid = true;

const setErrorText = (element, key, validation) => {
	if (validation == 'emptyFields') {
		const inputLabel = key.charAt(0).toUpperCase() + key.slice(1);
		element.textContent = `${inputLabel} is niet gevuld`;
	}

	if (validation == 'validEmail') {
		element.textContent = 'E-mailadres is niet geldig';
	}
};

const showError = (key, validation) => {
	const inputElement = document.getElementById(key);
	inputElement.classList.add('alert');

	//check if paragraph with alert already exists, replaces text of paragraph
	if (inputElement.nextElementSibling) {
		setErrorText(inputElement.nextElementSibling, key, validation);
		return;
	}

	const alert = document.createElement('p');

	alert.classList.add('alert');
	alert.setAttribute('id', `${inputElement.name}-error`);

	inputElement.setAttribute('aria-invalid', 'true');
	inputElement.setAttribute('aria-describedby', `${inputElement.name}-error`);
	inputElement.after(alert);

	setErrorText(alert, key, validation);
};

const addErrorToList = (key, validation) => {
	const li = document.createElement('li');
	const link = document.createElement('a');
	link.setAttribute('href', `#${key}`);

	errorList.appendChild(li);
	li.appendChild(link);

	setErrorText(link, key, validation);
};

const fieldValidation = (requiredFields) => {
	for (const [key, value] of requiredFields) {
		//check for empty field
		if (!value || value.trim() == '') {
			showError(key, 'emptyFields');
			formErrorContainer.style = 'display: block';
			addErrorToList(key, 'emptyFields');
			formDataIsValid = false;
		} else {
			//check for valid email
			if (key === 'email' && !emailRegex.test(value)) {
				addErrorToList(key, 'validEmail');
				showError(key, 'validEmail');
				formErrorContainer.style = 'display: block';
				formDataIsValid = false;
			}
		}
	}
};

const formValidation = (data) => {
	//make sure errorlist is empty
	errorList.style = 'display: block';
	errorList.innerHTML = '';

	//remove botfield from validation
	const formFields = Object.entries(data).filter(
		(entry) => entry[0] !== 'bot-field'
	);

	const requiredFields = formFields.filter(
		(entry) => entry[0] !== 'telefoonnummer'
	);

	fieldValidation(requiredFields);
};

const showComfirmation = () => {
	form.reset();
	form.style.display = 'none';
	formContainer.innerHTML = `<div id="confirmation" role="status" tabindex="-1">
						<p>
							Bedankt voor je bericht! We nemen zo snel mogelijk contact met je
							op.
						</p>
					</div>`;

	const confirmation = document.getElementById('confirmation');
	if (confirmation) {
		confirmation.focus();
	}
};

const showGeneralError = () => {
	userError.style = 'display: none';
	generalError.style = 'display: block';
	generalError.innerHTML =
		'<strong>Er is iets misgegaan bij het verzenden</strong> <p>Probeer het later opnieuw. Als het probleem zich blijft voordoen, neem dan contact met ons op via <a href="mailto:info@wijj.nu">info@wijj.nu</a></p>';
};

const fetchAndSendDataForEmail = async (data) => {
	const response = await fetch('/.netlify/functions/sendToMake', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	if (response.ok) {
		showComfirmation();
	} else {
		showGeneralError();
	}
};

form.addEventListener('submit', async (e) => {
	triedToSubmit = true;
	formDataIsValid = true;
	e.preventDefault();

	const formData = new FormData(form);
	const data = Object.fromEntries(formData.entries());

	// Stop if honeypot is filled (only bots do that)
	if (data['bot-field']) {
		console.warn('Bot gedetecteerd.');
		return;
	}

	formValidation(data);

	//If form has not been filled in correctly go to form error container
	if (!formDataIsValid) {
		formErrorContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
		formErrorContainer.focus();
		userError.style = 'display: block';
		generalError.style = 'display: none';
		return;
	}

	fetchAndSendDataForEmail(data);

	//remove error container if form has been filled in correctly
	formErrorContainer.remove();
});

const resetAlertInputfield = (e) => {
	//Will only apply if user has already tried to submit the form
	if (triedToSubmit) {
		const inputElement = e.target;

		if (inputElement.name === 'telefoonnummer') {
			return;
		}

		//show error if field is empty
		if (!inputElement.value || inputElement.value.trim() == '') {
			showError(inputElement.name, 'emptyFields');
		} else {
			inputElement.setAttribute('aria-invalid', 'false');
			//remove error
			if (inputElement.nextElementSibling) {
				inputElement.nextElementSibling.remove();
				inputElement.classList.remove('alert');
			}

			//show error if email is not valid
			if (inputElement.name == 'email') {
				const value = inputElement.value;
				if (!emailRegex.test(value)) {
					showError(inputElement.name, 'validEmail');
					formDataIsValid = false;
				}
			}
		}
	}
};

form.addEventListener('input', resetAlertInputfield);

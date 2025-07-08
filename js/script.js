////////////////////////////////////////////////
///////////////////ELEMENTS/////////////////////
////////////////////////////////////////////////

//HEADER

//general
const header = document.querySelector('header');
const headerLogoLink = document.querySelector('.header-logo');

//mobile-tablet elements
const navbarToggleBtn = document.querySelector('.navbar-toggle-btn');
const toggleBtnIcon = navbarToggleBtn.querySelector('i');
const mobileTabletNavMenu = document.getElementById('mobile-tablet-navbar');

//desktop elements
const introSection = document.querySelector('.intro');
const secondSection = document.querySelectorAll('section')[1];
const coachenLink = document.querySelector('.dropdown-link-coachen');
const overonsLink = document.querySelector('.dropdown-link-overons');
const otherNavLinks = Array.from(
	document.querySelectorAll('.nav-list > li > a')
);
const rightNavbarContainer = document.querySelector(
	'#desktop-navbar .nav-right-container'
);

const coachenBtn = document.querySelector('.coachen-btn');
const overonsBtn = document.querySelector('.overons-btn');
const coachenMenu = document.getElementById('coachen-menu');
const overonsMenu = document.getElementById('overons-menu');
const chevrons = Array.from(document.getElementsByClassName('fa-chevron-down'));
const dropdownMenus = Array.from(
	document.getElementsByClassName('dropdown-menu')
);
const dropdownNavItems = Array.from(
	document.getElementsByClassName('dropdown-nav-item')
);

//CONTACT

//contact form
const form = document.querySelector('.contact-form');
const formContainer = document.querySelector('.form-container');
const formErrorContainer = document.querySelector('.form-error-container');
const errorList = document.querySelector('.error-list');

////////////////////////////////////////////////
///////////////GENERAL FUNCTIONS////////////////
////////////////////////////////////////////////

//check if menu is expanded
const menuIsExpanded = (button) => {
	return button.getAttribute('aria-expanded') === 'true';
};

//Scroll behavior of header
let initialHeaderPosition = window.pageYOffset;

const handleScrollingHeader = () => {
	const currentHeaderPosition = window.pageYOffset;

	if (
		!menuIsExpanded(navbarToggleBtn) &&
		!menuIsExpanded(coachenBtn) &&
		!menuIsExpanded(overonsBtn)
	) {
		initialHeaderPosition > currentHeaderPosition || currentHeaderPosition <= 0
			? (header.style.transform = 'translateY(0)')
			: (header.style.transform = 'translateY(-100%)');
		initialHeaderPosition = currentHeaderPosition;
	}
};

window.addEventListener('scroll', handleScrollingHeader);

////////////////////////////////////////////////
////////FUNCTIONS FOR MOBILE DEVICES////////////
////////////////////////////////////////////////

//open and close mobile navbar
const toggleNavbar = () => {
	let expanded = menuIsExpanded(navbarToggleBtn);

	//toggle hamburger/close btn and move navigation in/out of screen
	navbarToggleBtn.setAttribute('aria-expanded', !expanded);

	if (expanded) {
		toggleBtnIcon.setAttribute('class', 'fa-solid fa-bars fa-2xl');
		navbarToggleBtn.setAttribute('aria-label', 'Open navigatie');
		mobileTabletNavMenu.style.left = '-100vw';
		setTimeout(() => {
			mobileTabletNavMenu.hidden = expanded;
		}, 100);
	} else {
		toggleBtnIcon.setAttribute('class', 'fa-solid fa-xmark fa-2xl');
		navbarToggleBtn.setAttribute('aria-label', 'Sluit navigatie');
		mobileTabletNavMenu.hidden = expanded;
		setTimeout(() => {
			mobileTabletNavMenu.style.left = '0';
		}, 100);
	}
};

navbarToggleBtn.addEventListener('click', toggleNavbar);

//Keep focus in header when opened
const focusableItems = Array.from(
	mobileTabletNavMenu.querySelectorAll('button, a')
);
const firstFocusableItem = focusableItems[0];
const lastFocusableItem = focusableItems[focusableItems.length - 1];

const keepFocusInHeader = (e) => {
	if (e.shiftKey) {
		if (document.activeElement === headerLogoLink) {
			e.preventDefault();
			lastFocusableItem.focus();
		}
	} else {
		if (document.activeElement === lastFocusableItem) {
			e.preventDefault();
			headerLogoLink.focus();
		}
	}
};

header.addEventListener('keydown', (e) => {
	if (e.key === 'Tab' && menuIsExpanded(navbarToggleBtn)) {
		keepFocusInHeader(e);
	}
});

////////////////////////////////////////////////
///////////FUNCTIONS FOR DESKTOP////////////////
////////////////////////////////////////////////

//ADD PADDING TO SECOND SECTION BASED ON HEIGHT OF INTRO SECTION

const adjustPaddingTopSecondSection = () => {
	if (!secondSection || !introSection) {
		return;
	}

	window.innerWidth >= 768
		? (secondSection.style.paddingTop = `${introSection.offsetHeight}px`)
		: (secondSection.style.paddingTop = '2.5em');
};

window.onload = () => adjustPaddingTopSecondSection();
window.onresize = () => adjustPaddingTopSecondSection();

//DROPDOWN BEHAVIOUR NAVIGATION MENU DESKTOP
const openDropdownMenu = (button) => {
	button.querySelector('.fa-chevron-down').style.transform = 'rotate(180deg)';
	button.setAttribute('aria-expanded', true);

	if (button.classList[1] === 'coachen-btn') {
		button.setAttribute('aria-label', 'Coachen menu inklappen');
		coachenMenu.hidden = false;

		if (menuIsExpanded(overonsBtn)) {
			closeDropdownMenu(overonsBtn);
		}
	}

	if (button.classList[1] === 'overons-btn') {
		button.setAttribute('aria-label', 'Over ons menu inklappen');
		overonsMenu.hidden = false;

		if (menuIsExpanded(coachenBtn)) {
			closeDropdownMenu(coachenBtn);
		}
	}
};

const closeDropdownMenu = (button) => {
	button.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
	button.setAttribute('aria-expanded', false);

	if (button.classList[1] === 'coachen-btn') {
		button.setAttribute('aria-label', 'Coachen menu uitklappen');
		coachenMenu.hidden = true;
	}

	if (button.classList[1] === 'overons-btn') {
		button.setAttribute('aria-label', 'Over ons menu uitklappen');
		overonsMenu.hidden = true;
	}
};

const toggleDropdownMenu = (button) => {
	let expanded = menuIsExpanded(button);

	if (!expanded) {
		openDropdownMenu(button);
	} else {
		closeDropdownMenu(button);
	}
};

const closeDropdownMenuWhenOutsideDropdownLinkOrMenu = (element) => {
	const isInDropdownMenu = dropdownMenus.some((dropdownMenu) =>
		dropdownMenu.contains(element)
	);
	const isInDropdownBtn = dropdownNavItems.some((dropdownBtn) =>
		dropdownBtn.contains(element)
	);

	if (!isInDropdownMenu && !isInDropdownBtn) {
		closeDropdownMenu(coachenBtn);
		closeDropdownMenu(overonsBtn);
	}
};

//EVENTLISTENERS TO OPEN AND CLOSE DROPDOWN MENUS

//onclick events
coachenBtn.addEventListener('click', () => {
	toggleDropdownMenu(coachenBtn);
});

overonsBtn.addEventListener('click', () => {
	toggleDropdownMenu(overonsBtn);
});

window.addEventListener('click', (e) =>
	closeDropdownMenuWhenOutsideDropdownLinkOrMenu(e.target)
);

//on hover events
window.addEventListener('mouseover', (e) => {
	closeDropdownMenuWhenOutsideDropdownLinkOrMenu(e.target);
});

coachenLink.addEventListener('mouseover', () => {
	openDropdownMenu(coachenBtn);
	closeDropdownMenu(overonsBtn);
});

overonsLink.addEventListener('mouseover', () => {
	openDropdownMenu(overonsBtn);
	closeDropdownMenu(coachenBtn);
});

//keydown events
window.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		closeDropdownMenu(overonsBtn);
		closeDropdownMenu(coachenBtn);
	}
});

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
	li.classList.add('alert');

	errorList.appendChild(li);

	setErrorText(li, key, validation);
};

const requiredFieldsValidation = (requiredFields) => {
	for (const [key, value] of requiredFields) {
		if (!value || value.trim() == '') {
			showError(key, 'emptyFields');
			formErrorContainer.style = 'display: block';
			addErrorToList(key, 'emptyFields');
			formDataIsValid = false;
		}
	}
};

const validateEmail = ([key, value]) => {
	// const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/g;

	if (!emailRegex.test(value)) {
		if (value || value.trim() !== '') {
			addErrorToList(key, 'validEmail');
			showError(key, 'validEmail');
			formErrorContainer.style = 'display: block';
			formDataIsValid = false;
		}
	}
};

const formValidation = (data) => {
	//make sure errorlist is empty
	errorList.innerHTML = '';

	//remove botfield from validation
	const formFields = Object.entries(data).filter(
		(entry) => entry[0] !== 'bot-field'
	);

	//required fields validation
	const requiredFields = formFields.filter(
		(entry) => entry[0] !== 'telefoonnummer'
	);

	requiredFieldsValidation(requiredFields);

	//email validation
	const emailField = Object.entries(data).find((entry) => entry[0] == 'email');

	validateEmail(emailField);
};

form.addEventListener('submit', async (e) => {
	triedToSubmit = true;
	formDataIsValid = true;
	e.preventDefault();

	const formData = new FormData(form);
	const data = Object.fromEntries(formData.entries());

	formValidation(data);

	// Stop if honeypot is filled (only bots do that)
	if (data['bot-field']) {
		console.warn('Bot gedetecteerd.');
		return;
	}

	//If form has not been filled in correctly
	if (!formDataIsValid) {
		return;
	}

	//remove error container if form has been filled in correctly
	formErrorContainer.remove();

	const response = await fetch('/.netlify/functions/sendToMake', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	if (response.ok) {
		form.reset();
		form.style.display = 'none';
		formContainer.innerHTML = `<div id="confirmation" role="status">
						<p>
							Bedankt voor je bericht! We nemen zo snel mogelijk contact met je
							op.
						</p>
					</div>`;
	} else {
		alert('Er ging iets mis.');
	}
});

//remove alert from inputfield when typing
const resetAlertInputfield = (e) => {
	//Will only apply if user has already tried to submit the form
	if (triedToSubmit) {
		const inputElement = e.target;

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

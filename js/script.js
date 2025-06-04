//Elements
const header = document.querySelector('header');
const headerLogoLink = document.querySelector('.header-logo');
const navbarToggleBtn = document.querySelector('.navbar-toggle-btn');
const toggleBtnIcon = navbarToggleBtn.querySelector('i');
const mobileTabletNavMenu = document.getElementById('mobile-tablet-navbar');
const coachenLink = document.querySelector('.dropdown-link-coachen');
const overonsLink = document.querySelector('.dropdown-link-overons');
const coachenBtn = document.querySelector('.coachen-btn');
const overonsBtn = document.querySelector('.overons-btn');
const chevrons = Array.from(document.getElementsByClassName('fa-chevron-down'));
const dropdownContainers = Array.from(
	document.getElementsByClassName('dropdown-container')
);

//Visibility of dropdowncontainer based on screenwidth
// const dropdownContainerUpdateAttributes = () => {
// 	dropdownContainers.forEach((container) => {
// 		if (window.innerWidth > 1024) {
// 			container.setAttribute('hidden', true);
// 		}
// 	});
// };

// window.addEventListener('resize', dropdownContainerUpdateAttributes);
// window.addEventListener('load', dropdownContainerUpdateAttributes);

//check if menu is expanded
const menuIsExpanded = (button) => {
	return button.getAttribute('aria-expanded') === 'true';
};

//change aria-label based on button class
const setAriaLabel = (button, expanded) => {
	if (button.classList[1] === 'coachen-btn') {
		expanded
			? button.setAttribute('aria-label', 'Coachen menu uitklappen')
			: button.setAttribute('aria-label', 'Coachen menu inklappen');
	}

	if (button.classList[1] === 'overons-btn') {
		expanded
			? button.setAttribute('aria-label', 'Over ons menu uitklappen')
			: button.setAttribute('aria-label', 'Over ons menu inklappen');
	}

	if (button.classList[0] === 'navbar-toggle-btn') {
		expanded
			? button.setAttribute('aria-label', 'Open navigatie')
			: button.setAttribute('aria-label', 'Sluit navigatie');
	}
};

//set attributes of dropdown buttons and menus on toggle
const toggleDropdownAttributes = (menuName, button, expanded) => {
	const menu = document.getElementById(menuName);
	button.setAttribute('aria-expanded', !expanded);

	if (expanded) {
		setTimeout(() => {
			menu.hidden = expanded;
		}, 100);
	} else {
		menu.hidden = expanded;
	}

	setAriaLabel(button, expanded);
};

//open and close mobile navbar
const toggleNavbar = () => {
	toggleDropdownAttributes(
		'mobile-tablet-navbar',
		navbarToggleBtn,
		menuIsExpanded(navbarToggleBtn)
	);

	//toggle hamburger/close btn and move navigation in/out of screen
	if (menuIsExpanded(navbarToggleBtn)) {
		toggleBtnIcon.setAttribute('class', 'fa-solid fa-xmark fa-2xl');
		setTimeout(() => {
			mobileTabletNavMenu.style.left = '0';
		}, 1);
	} else {
		toggleBtnIcon.setAttribute('class', 'fa-solid fa-bars fa-2xl');
		mobileTabletNavMenu.style.left = '-100vw';
	}
};

navbarToggleBtn.addEventListener('click', toggleNavbar);

//reset alle knoppen/menu's
// chevrons.forEach((chevron) => (chevron.style.transform = 'rotate(0deg)'));

// dropdownContainers.forEach((container) => (container.hidden = true));
//};

//Sluiten van navigatie als er buiten de header en navigatie wordt geklikt
// document.addEventListener('click', (e) => {
// 	const isClickOnOpenBtn = navbarToggleBtn.contains(e.target);
// 	const isClickOnHeader = header.contains(e.target);

// 	if (!isClickOnHeader && !isClickOnOpenBtn) {
// 		//navMenuMobile.setAttribute('hidden', '');
// 		navbarToggleBtn.setAttribute('aria-label', 'Open navigatie');
// 		toggleBtnIcon.setAttribute('class', 'fa-solid fa-bars fa-2xl');
// 	}
// });

//Voorkomen dat de focus uit de header gaat als de navigatie geopend is
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

//Scroll behavior of header
let initialHeaderPosition = window.pageYOffset;

const handleScrollingHeader = () => {
	const currentHeaderPosition = window.pageYOffset;

	if (
		!menuIsExpanded(navbarToggleBtn) &&
		!menuIsExpanded(coachenBtn) &&
		!menuIsExpanded(overonsBtn)
	) {
		initialHeaderPosition > currentHeaderPosition
			? (header.style.top = '0')
			: (header.style.top = '-5em');
		initialHeaderPosition = currentHeaderPosition;
	}
};

window.addEventListener('scroll', handleScrollingHeader);

//Dropdown behaviour navigation menu desktop

//Close dropdown menu when other is opened, also reset chevron back to down
const closeDropdown = (button, menuName) => {
	const menu = document.getElementById(menuName);
	menu.hidden = true;

	if (button.classList[1] === 'coachen-btn') {
		overonsBtn.setAttribute('aria-label', 'Over ons menu uitklappen');
		overonsBtn.querySelector('.fa-chevron-down').style.transform =
			'rotate(0deg)';
	}

	if (button.classList[1] === 'overons-btn') {
		overonsBtn.setAttribute('aria-label', 'Coachen menu uitklappen');
		overonsBtn.querySelector('.fa-chevron-down').style.transform =
			'rotate(0deg)';
	}
};

const toggleDropdownMenu = (button, menuName) => {
	toggleDropdownAttributes(menuName, button, menuIsExpanded(button));

	const buttonClass = button.classList[1];

	const chevron = document.querySelector(`.${buttonClass} .fa-chevron-down`);

	menuIsExpanded(button)
		? (chevron.style.transform = 'rotate(180deg)')
		: (chevron.style.transform = 'rotate(0deg)');
};

//open dropdown menus
coachenBtn.addEventListener('click', () => {
	toggleDropdownMenu(coachenBtn, 'coachen-menu');
	//closeDropdown(overonsBtn, 'overons-menu');
});

coachenBtn.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		toggleDropdownMenu(coachenBtn, 'coachen-menu');
		//closeDropdown(overonsBtn, 'overons-menu');
	}
});

// coachenLink.addEventListener('mouseover', () => {
// 	toggleDropdownMenu(coachenBtn, 'coachen-menu');
// 	closeDropdown(overonsBtn, 'overons-menu');
// });

overonsBtn.addEventListener('click', () => {
	toggleDropdownMenu(overonsBtn, 'overons-menu');
	//closeDropdown(coachenBtn, 'coachen-menu');
});
overonsBtn.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		toggleDropdownMenu(overonsBtn, 'overons-menu');
		//closeDropdown(coachenBtn, 'coachen-menu');
	}
});

// overonsLink.addEventListener('mouseover', () => {
// 	toggleDropdownMenu(overonsBtn, 'overons-menu');
// 	closeDropdown(coachenBtn, 'coachen-menu');
// });

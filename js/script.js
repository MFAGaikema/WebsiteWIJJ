//Navbar elements
const navbarToggleBtn = document.querySelector('#navbar-toggle-btn');
const toggleBtnIcon = navbarToggleBtn.querySelector('i');
const headerLogoLink = document.querySelector('.header-logo');
const mobileTabletNavMenu = document.getElementById('mobile-tablet-navigation');
const header = document.querySelector('header');
const coachenBtn = document.querySelector('.coachen-btn');
const overonsBtn = document.querySelector('.overons-btn');
const chevrons = Array.from(document.getElementsByClassName('fa-chevron-down'));
const dropdownContainers = Array.from(
	document.getElementsByClassName('dropdown-container')
);

//ATTRIBUTEN DIE TOEGEVOEGD MOETEN WORDEN BIJ GROTERE BEELDSCHERMEN (OP DROPDOWNKNOP)
// aria-haspopup="true"
// 							aria-expanded="false"
// 							aria-controls="coachen-menu"
// aria-haspopup="true"
// 							aria-expanded="false"
// 							aria-controls="overons-menu"

//Visibility of dropdowncontainer based on screenwidth
const dropdownContainerUpdateAttributes = () => {
	dropdownContainers.forEach((container) => {
		if (window.innerWidth > 1024) {
			container.setAttribute('hidden', true);
		}
	});
};

window.addEventListener('resize', dropdownContainerUpdateAttributes);
window.addEventListener('load', dropdownContainerUpdateAttributes);

//check of menu uitgeklapt is
const menuIsExpanded = (button) => {
	return button.getAttribute('aria-expanded') === 'true';
};

//openen en sluiten van menu's algemeen
const toggleAttributeHidden = (menuName, button, expanded) => {
	const menu = document.getElementById(menuName);
	button.setAttribute('aria-expanded', !expanded);

	if (expanded) {
		setTimeout(() => {
			menu.hidden = expanded;
		}, 100);
	} else {
		menu.hidden = expanded;
	}
};

//openen en sluiten van navigatie mobile
const toggleNavbar = () => {
	//const expanded = navbarToggleBtn.getAttribute('aria-expanded') === 'true';
	toggleAttributeHidden(
		'mobile-tablet-navigation',
		navbarToggleBtn,
		menuIsExpanded(navbarToggleBtn)
	);

	if (menuIsExpanded(navbarToggleBtn)) {
		navbarToggleBtn.setAttribute('aria-label', 'Sluit navigatie');
		toggleBtnIcon.setAttribute('class', 'fa-solid fa-xmark fa-2xl');
		setTimeout(() => {
			mobileTabletNavMenu.style.left = '0';
		}, 1);
	} else {
		navbarToggleBtn.setAttribute('aria-label', 'Open navigatie');
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
document.addEventListener('click', (e) => {
	const isClickOnOpenBtn = navbarToggleBtn.contains(e.target);
	const isClickOnHeader = header.contains(e.target);

	if (!isClickOnHeader && !isClickOnOpenBtn) {
		navMenuMobile.setAttribute('hidden', '');
		navbarToggleBtn.setAttribute('aria-label', 'Open navigatie');
		toggleBtnIcon.setAttribute('class', 'fa-solid fa-bars fa-2xl');
	}
});

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

const handleHeader = () => {
	const currentHeaderPosition = window.pageYOffset;
	if (!menuIsExpanded(navbarToggleBtn)) {
		initialHeaderPosition > currentHeaderPosition
			? (header.style.top = '0')
			: (header.style.top = '-5em');
		initialHeaderPosition = currentHeaderPosition;
	}
};

window.addEventListener('scroll', handleHeader);

const handleDropdownMenu = (button, menuName) => {
	const expanded = button.getAttribute('aria-expanded') === 'true';

	toggleAttributeHidden(menuName, button, expanded);

	const buttonClass = button.classList[0];

	const chevron = document.querySelector(`.${buttonClass} .fa-chevron-down`);

	expanded
		? (chevron.style.transform = 'rotate(0deg)')
		: (chevron.style.transform = 'rotate(180deg)');
};

//openen dropdowns
coachenBtn.addEventListener('click', () =>
	handleDropdownMenu(coachenBtn, 'coachen-menu')
);
coachenBtn.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		handleDropdownMenu(coachenBtn, 'coachen-menu');
	}
});

overonsBtn.addEventListener('click', () =>
	handleDropdownMenu(overonsBtn, 'overons-menu')
);
overonsBtn.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		handleDropdownMenu(overonsBtn, 'coachen-menu');
	}
});

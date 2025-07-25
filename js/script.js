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
//const coachenLink = document.querySelector('.dropdown-link-coachen');
//const overonsLink = document.querySelector('.dropdown-link-overons');
const dropdownLinks = document.querySelectorAll('.dropdown-link');
const otherNavLinks = Array.from(
	document.querySelectorAll('.nav-list > li > a')
);
const rightNavbarContainer = document.querySelector(
	'#desktop-navbar .nav-right-container'
);

//const coachenBtn = document.querySelector('.coachen-btn');
//const overonsBtn = document.querySelector('.overons-btn');
const dropdownBtns = document.querySelectorAll('.dropdown-btn');

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
const formErrorContainer = document.getElementById('form-error-container');
const errorList = document.querySelector('.error-list');
const userError = document.querySelector('.user-error');
const generalError = document.querySelector('.general-error');

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

	const menusAreExpanded = Array.from(dropdownBtns).some((btn) =>
		menuIsExpanded(btn)
	);

	if (!menuIsExpanded(navbarToggleBtn) && !menusAreExpanded) {
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
const openDropdownMenu = (button, dropdownMenu) => {
	button.querySelector('.fa-chevron-down').style.transform = 'rotate(180deg)';
	button.setAttribute('aria-expanded', true);
	button.setAttribute('aria-label', `${button.dataset.label} menu inklappen`);
	dropdownMenu.hidden = false;

	// if (button.classList[1] === 'coachen-btn') {
	// 	button.setAttribute('aria-label', 'Coachen menu inklappen');
	// 	coachenMenu.hidden = false;

	// 	if (menuIsExpanded(overonsBtn)) {
	// 		closeDropdownMenu(overonsBtn);
	// 	}
	// }

	// if (button.classList[1] === 'overons-btn') {
	// 	button.setAttribute('aria-label', 'Over ons menu inklappen');
	// 	overonsMenu.hidden = false;

	// 	if (menuIsExpanded(coachenBtn)) {
	// 		closeDropdownMenu(coachenBtn);
	// 	}
	// }
};

const closeDropdownMenu = (button, dropdownMenu) => {
	button.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
	button.setAttribute('aria-expanded', false);
	button.setAttribute('aria-label', `${button.dataset.label} menu uitklappen`);
	dropdownMenu.hidden = true;

	// if (button.classList[1] === 'coachen-btn') {
	// 	button.setAttribute('aria-label', 'Coachen menu uitklappen');
	// 	coachenMenu.hidden = true;
	// }

	// if (button.classList[1] === 'overons-btn') {
	// 	button.setAttribute('aria-label', 'Over ons menu uitklappen');
	// 	overonsMenu.hidden = true;
	// }
};

const getDropdownMenu = (button) => {
	const controlledId = button.getAttribute('aria-controls');
	const dropdownMenu = document.getElementById(controlledId);

	return dropdownMenu;
};

const toggleDropdownMenu = (button) => {
	let expanded = menuIsExpanded(button);

	if (!expanded) {
		openDropdownMenu(button, getDropdownMenu(button));
	} else {
		closeDropdownMenu(button, getDropdownMenu(button));
	}
};

//EVENTLISTENERS TO OPEN AND CLOSE DROPDOWN MENUS

//onclick events//

dropdownBtns.forEach((button) => {
	button.addEventListener('click', (e) => {
		toggleDropdownMenu(e.currentTarget);

		const otherDropdownBtns = Array.from(dropdownBtns).filter((dropdownBtn) => {
			return dropdownBtn !== button;
		});

		otherDropdownBtns.forEach((btn) => {
			closeDropdownMenu(btn, getDropdownMenu(btn));
		});
	});
});

//close dropdown menus when click is outside dropdown menu or dropdown button
window.addEventListener('click', (e) => {
	const element = e.target;

	const isInDropdownMenu = dropdownMenus.some((dropdownMenu) =>
		dropdownMenu.contains(element)
	);
	const isInDropdownBtn = dropdownNavItems.some((dropdownBtn) =>
		dropdownBtn.contains(element)
	);

	if (!isInDropdownMenu && !isInDropdownBtn) {
		dropdownBtns.forEach((btn) => closeDropdownMenu(btn, getDropdownMenu(btn)));
	}
});

//on hover events//

//open and close dropdown menus
dropdownLinks.forEach((link) => {
	link.addEventListener('mouseover', (e) => {
		const button = e.target.nextElementSibling;
		openDropdownMenu(button, getDropdownMenu(button));

		//close other dropdownmenus
		const otherDropdownLinks = Array.from(dropdownLinks).filter(
			(dropdownLink) => {
				return dropdownLink !== link;
			}
		);

		otherDropdownLinks.forEach((dropdownLink) => {
			const btn = dropdownLink.nextElementSibling;
			closeDropdownMenu(btn, getDropdownMenu(btn));
		});
	});
});

//keydown events
window.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		dropdownBtns.forEach((btn) => closeDropdownMenu(btn, getDropdownMenu(btn)));
	}
});

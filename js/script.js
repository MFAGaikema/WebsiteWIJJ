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

const form = document.getElementsByClassName('contact-form')[0];

form.addEventListener('submit', async (e) => {
	e.preventDefault();

	const formData = new FormData(form);
	const data = Object.fromEntries(formData.entries());

	const response = await fetch('/.netlify/functions/sendToZapier', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	if (response.ok) {
		alert('Bericht verzonden!');
	} else {
		alert('Er ging iets mis.');
	}
});

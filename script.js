//Navbar elements
const hamburgerBtn = document.querySelector('.hamburger-btn');
const closeBtn = document.querySelector('.close-btn');
const nav = document.querySelector('nav');
const header = document.querySelector('header');
const coachenBtn = document.querySelector('.coachen-btn');
const overonsBtn = document.querySelector('.overons-btn');

//UI functions in navbar
const openNavbar = () => {
	nav.style.display = 'block';
	hamburgerBtn.style.display = 'none';
	closeBtn.style.display = 'block';
};

const closeNavbar = () => {
	nav.style.display = 'none';
	hamburgerBtn.style.display = 'block';
	closeBtn.style.display = 'none';

	//reset alle knoppen/menu's
	const chevrons = document.getElementsByClassName('fa-chevron-down');
	Array.from(chevrons).forEach(
		(chevron) => (chevron.style.transform = 'rotate(0deg)')
	);

	const dropdownContainers =
		document.getElementsByClassName('dropdown-container');
	Array.from(dropdownContainers).forEach(
		(container) => (container.hidden = true)
	);
};

const handleDropdownMenu = (button, menuName) => {
	const buttonClass = button.classList[0];

	const chevron = document.querySelector(`.${buttonClass} .fa-chevron-down`);

	const menu = document.getElementById(menuName);
	const expanded = button.getAttribute('aria-expanded') === 'true';
	button.setAttribute('aria-expanded', !expanded);
	menu.hidden = expanded;

	expanded
		? (chevron.style.transform = 'rotate(0deg)')
		: (chevron.style.transform = 'rotate(180deg)');
};

//openen en sluiten van navigatie mobile
hamburgerBtn.addEventListener('click', openNavbar);
closeBtn.addEventListener('click', closeNavbar);

document.addEventListener('click', (e) => {
	const isClickInsideNav = nav.contains(e.target);
	const isClickOnOpenBtn = hamburgerBtn.contains(e.target);
	const isClickOnHeader = header.contains(e.target);

	if (!isClickInsideNav && !isClickOnHeader && !isClickOnOpenBtn) {
		closeNavbar();
	}
});

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

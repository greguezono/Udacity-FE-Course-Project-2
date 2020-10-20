/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
const navbarMenu = document.getElementsByClassName("navbar__menu")[0];
const landingContainers = document.getElementsByClassName("landing__container");
const pageHeader = document.getElementsByClassName("page__header")[0];
let prevYPos = window.pageYOffset;

/**
 * End Global Variables
 * Start Helper Functions
 *
*/



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNavBar() {
  let sectionName;
  let listItem;
  let anchorItem;
  for (let section of landingContainers) {
    sectionName = section.getElementsByTagName("h2")[0].innerText;
    listItem = document.createElement('ul');
    anchorItem = document.createElement('a');
    listItem.classList.add("navbar__list");
    listItem.classList.add("menu__link");
    listItem.innerText = sectionName;
    anchorItem.setAttribute("href", "#" + section.parentElement.getAttribute("id"));
    anchorItem.appendChild(listItem);
    navbarMenu.appendChild(anchorItem);
  }
}

function getSectionsFromLandingContainers() {
  let sections = [];
  for (container of landingContainers) {
    sections.push(container.parentElement);
  }
  return sections;
}

function setActiveSection() {
      const sections = getSectionsFromLandingContainers();
      const curYPosition = window.scrollY;

      for (let section of sections) { 
        const top = section.getBoundingClientRect().top;
        const bottom = section.getBoundingClientRect().bottom;

        if (curYPosition >= top && curYPosition <= bottom) {
          const previous_active = document.querySelector('.active');
          if (previous_active) {
            previous_active.classList.remove('active');
          }
          if (!section.classList.contains("active")) {
            section.classList.add('active');
          }
        }
      }
}

function hideNavBar() {
  console.log(prevYPos);
  let curYPos = window.pageYOffset;
  console.log(curYPos);
  if (prevYPos > curYPos) {
    pageHeader.style.top = "0";
  } else {
    pageHeader.style.top = "-50px";
  }
  prevYPos = curYPos;
}

buildNavBar();
/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click

// Set sections as active
document.addEventListener('scroll', setActiveSection);
window.addEventListener('scroll', hideNavBar);
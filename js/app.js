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
    anchorItem.setAttribute("id", "links");
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
      console.log("ypos: " + curYPosition);

      for (let section of sections) { 
        var position = getCoords(section);
        const top = position.top;
        const bottom = position.bottom;
        
        

        if (curYPosition >= top && curYPosition <= bottom) {
          console.log("Section: " + section.getAttribute('id'));
          console.log("top: " + top);
          console.log("bot: " + bottom);

          const previous_active = document.querySelector('.active');
          const previouseMenuActive = document.querySelector('.activeMenuSection');
          
          if (previous_active) {
            previous_active.classList.remove('active');
          }

          if (previouseMenuActive) {
            previouseMenuActive.classList.remove('activeMenuSection');
          }

          if (!section.classList.contains("active")) {
            section.classList.add('active');
            let sectionName = section.getAttribute('id');
            let menuSection = document.querySelectorAll("a[href='#" + sectionName + "']")[0];
            let listItem = menuSection.childNodes[0];
            listItem.classList.add('activeMenuSection');
            console.log(listItem);
          }
        }
      }
}
// https://javascript.info/coordinates
function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}

function hideNavBar() {
  let curYPos = window.pageYOffset;
  if (prevYPos > curYPos) {
    pageHeader.style.top = "0";
  } else {
    pageHeader.style.top = "-250px";
  }
  prevYPos = curYPos;
}
// Code to make href links smooth source: https://www.geeksforgeeks.org/how-to-set-smooth-scroll-after-clicking-the-link-using-javascript/ date:10/14/20
function initSmoothScroll() {
  let anchorSelector = 'a[href^="#"]';
  let anchorList = document.querySelectorAll(anchorSelector);

  anchorList.forEach(link => {
      link.onclick = function (e) {
          e.preventDefault();
          let destination = document.querySelector(this.hash);
          destination.scrollIntoView({
              behavior: 'smooth'
          });
      }
  });
}

function toggleMenu() {
  var menu = document.getElementsByClassName("navbar__menu")[0];
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}


buildNavBar();
initSmoothScroll();
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
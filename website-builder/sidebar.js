const mediaQuery = window.matchMedia('(min-width: 768px)');
const mobileMediaQuery = window.matchMedia('(max-width: 767px)');
const sidebar = document.querySelector('.js-sidebar');
const sections = document.querySelectorAll('.section[id]');
const dropdowns = document.querySelectorAll('.js-dropdown-checkbox');
let activeSidenavItem;
let isInitiated = false;
// store a hash of section intersection ratios
const sectionIntxHeights = {};

const thresholdCount = 8;
const threshold = [];
for (let i = 0; i <= thresholdCount; i++) {
  threshold.push(i/thresholdCount);
}

if (sidebar) {
  // on resize, check media query and run
  mediaQuery.addEventListener('change', checkMediaQuery);

  // initial check and run
  checkMediaQuery(mediaQuery);

  if (mobileMediaQuery.matches) {
    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener('click', (event) => {
        event.stopPropagation();
        const activeDropdown = document.querySelector('.js-dropdown.is-active');

        const toggleEl = event.target.closest('.js-dropdown');

        if (activeDropdown === toggleEl) {
          activeDropdown.querySelector('.js-dropdown-checkbox').checked = false;
          activeDropdown.classList.remove('is-active');

          return;
        } else if (activeDropdown) {
          activeDropdown.querySelector('.js-dropdown-checkbox').checked = false;
          activeDropdown.classList.remove('is-active');
        }


        toggleEl.classList.add('is-active');
        dropdown.checked = true;
      });
    });
  }
}

/**
 * Checks Media query and only runs if
 * the window is 768px and above
 * @param {Object} event - event for media query
 */
function checkMediaQuery(event) {
  if (event.matches) {
    initiateObserver();
  }
}

/**
 * Initates intersection observer
 * to observe all sections to update
 * the sidebar nav when the section
 * has come into view
 */
function initiateObserver() {
  if (isInitiated) return; // initate once
  isInitiated = true;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // update section ratios;
      const {id} = entry.target;
      sectionIntxHeights[id] = entry.intersectionRect.height;
    });

    // get highest ratio
    const values = Object.values(sectionIntxHeights);
    const maxHeight = Math.max(...values);
    if (maxHeight) {
      // get the id of the max height
      const index = values.indexOf(maxHeight);
      const id = Object.keys(sectionIntxHeights)[index];
      const sidebarItem = sidebar.querySelector(`a[href="#${id}"]`).parentElement;
      activateSidebarItem(sidebarItem);
    } else {
      deactivateSidebarItem();
    }
  }, {
    // limit callback to triggering when these thresholds are crossed
    threshold,
  });

  sections.forEach((section) => {
    observer.observe(section);
  });
}


/**
 * activates sidebar item
 * @param {Element} item
 */
function activateSidebarItem(item) {
  if (item == activeSidenavItem) return;

  deactivateSidebarItem();
  activeSidenavItem = item;
  activeSidenavItem.classList.add('is-active');
}

/**
 * de-activates sidebar item
 */
function deactivateSidebarItem() {
  if (activeSidenavItem) activeSidenavItem.classList.remove('is-active');
  activeSidenavItem = null;
}


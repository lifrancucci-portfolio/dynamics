// Get menu's translatable elements
const translatableElements = document.querySelectorAll('.translatable_element');

// Create a list of all the pages with en/es versions
const sitePages =
  [
    { esVersion: baseURL + '', enVersion: baseURL + 'en/' },
    { esVersion: baseURL + 'equipo/', enVersion: baseURL + 'en/team/' },
    { esVersion: baseURL + 'digital/', enVersion: baseURL + 'en/digital/' },
    { esVersion: baseURL + 'sostenible/', enVersion: baseURL + 'en/sustainable/' },
  ]

// Only show the menu items in the corresponding language
switch (container.lang) {
  case 'es':
    showMenuItems('es');
    break;
  // case 'en':
  //   showMenuItems('en');
  //   break;
  default:
    showMenuItems('en');
}
function showMenuItems(selectedLang) {
  translatableElements.forEach(element => {
    if (element.lang == selectedLang) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  })
}

// Get the language selector and it's children elements
const langSelector = document.querySelector('.lang_selector');
const langList = Array.from(langSelector.children);
// Show the currently active language
switch (container.lang) {
  case 'es':
    langList.forEach(lang => {
      if (lang.classList.contains('select--es')) {
        lang.classList.add('selected');
      } else {
        lang.classList.remove('selected');
      }
    })
  break;
  case 'en':
    langList.forEach(lang => {
      if (lang.classList.contains('select--en')) {
        lang.classList.add('selected');
      } else {
        lang.classList.remove('selected');
      }
    })
  break;
}

// If user selects a language, store their choice
let selectedLang; // Variable to store the selected lang
langList.forEach(item => {
  item.addEventListener('click', () => {
    // let itemLang = item.classList[0];
    // switch (itemLang) {
    //   case 'select--es':
    //     localStorage.setItem('lang', 'es');
    //     break;
    //   case 'select--en':
    //     localStorage.setItem('lang', 'en');
    //     break;
    // }
    if(item.classList.contains('select--es')) {
      localStorage.setItem('lang', 'es');
    }
    else if(item.classList.contains('select--en')) {
      localStorage.setItem('lang', 'en');
    }
    selectedLang = localStorage.getItem('lang');
    // Call translate function
    changeSelectedLanguage();
  })
})

// If there's no language stored in 'lang' item, use the navigator preferred language
if (!localStorage.getItem('lang')) {
  if (navigator.language.split('-')[0] != 'es') {
    localStorage.setItem('lang', 'en');
  } else {
    localStorage.setItem('lang', 'es');
  }
}
// If there's no language set on the page, set it to a default
if (container.lang != 'es') {
  container.lang = 'en';
}
// Set selected language to 'lang' item
selectedLang = localStorage.getItem('lang');
let selectedVersion;
switch (selectedLang) {
  case 'es':
    selectedVersion = 'esVersion';
    break;
  case 'en':
    selectedVersion = 'enVersion';
    break;
}
// Call translate function
changeSelectedLanguage();

// TRANSLATE SITE
function changeSelectedLanguage() {
  // Get the current url 
  let currentLocation = location.href;
  let nextLocation;

  // Check if site language matches selected language
  if (selectedLang != container.lang) {
    // If it doesn't, get the current page and change to the corresponding version
    if (container.lang == 'es') {
      sitePages.forEach(page => {
        if (currentLocation == page.esVersion) {
          nextLocation = currentLocation.replace(page.esVersion, page.enVersion);
        }
      })
    }
    if (container.lang == 'en') {
      sitePages.forEach(page => {
        if (currentLocation == page.enVersion) {
          nextLocation = currentLocation.replace(page.enVersion, page.esVersion);
        }
      })
    }
    // Go to the next location
    location.href = nextLocation;
  }
}
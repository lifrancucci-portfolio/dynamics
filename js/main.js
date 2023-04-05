function contentLoaded() {
  /************** GENERAL **************/
  // Force scroll to top of the page
  window.scrollTo(0,0);

  // Get the main container
  const container = document.querySelector('.page_container');

  // Store site's base URL
  // const baseURL = 'https://lifrancucci-portfolio.github.io/dynamics/';
  const baseURL = 'http://127.0.0.1:4000/dynamics/';

  // Get header elements 
  const logoSection = document.getElementById('logo_section');
  const pageLogo = document.querySelector('.logo_section--logo');
  const pageIso = document.querySelector('.logo_section--iso');
  pageLogo.style.display = 'flex';
  const menu = document.querySelector('.menu');

  // Get menu's translatable elements
  const translatableElements = document.querySelectorAll('.translatable_element');

  // Create a list of all the pages with en/es versions
  const sitePages = 
  [
    {esVersion: baseURL + '',  enVersion: baseURL + 'en/'},
    {esVersion: baseURL + 'equipo/',  enVersion: baseURL + 'en/team/'},
    {esVersion: baseURL + 'digital/',  enVersion: baseURL + 'en/digital/'},
    {esVersion: baseURL + 'sostenible/',  enVersion: baseURL + 'en/sustainable/'},
  ]

  // Only show the menu items in the corresponding language
  switch(container.lang) {
    case 'es':
      showMenuItems('es');
      break;
    case 'en':
      showMenuItems('en');
      break;
    default:
      showMenuItems('en');
  }
  function showMenuItems(selectedLang) {
    translatableElements.forEach(element => {
      if(element.lang == selectedLang) {
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
  switch(container.lang) {
    case 'es':
      langList.forEach(lang => {
        if(lang.classList.contains('select--es')) {
          lang.classList.add('selected');
        } else {
          lang.classList.remove('selected');
        }
      })
      break;
    case 'en':
      langList.forEach(lang => {
        if(lang.classList.contains('select--en')) {
          lang.classList.add('selected');;
        } else {
          lang.classList.remove('selected');;
        }
      })
      break;
  }

  // If user selects a language, store their choice
  let selectedLang; // Variable to store the selected lang
  langList.forEach(item => {
    item.addEventListener('click', () => {
      let itemLang = item.classList[0];
      switch(itemLang) {
        case 'select--es':
          localStorage.setItem('lang', 'es');
          break;
        case 'select--en':
          localStorage.setItem('lang', 'en');
          break;
      }
      selectedLang = localStorage.getItem('lang');
      // Call translate function
      changeSelectedLanguage();
    })
  })

  // If there's no language stored in 'lang' item, use the navigator preferred language
  if(!localStorage.getItem('lang')) {
    if(navigator.language.split('-')[0] != 'es') {
      localStorage.setItem('lang', 'en');
    } else {
      localStorage.setItem('lang', 'es');
    }
  } 
  // If there's no language set on the page, set it to a default
  if(container.lang != 'es') {
    container.lang = 'en';
  }
  // Set selected language to 'lang' item
  selectedLang = localStorage.getItem('lang');
  let selectedVersion;
  switch(selectedLang) {
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
    if(selectedLang != container.lang) {
     // If it doesn't, get the current page and change to the corresponding version
      if(container.lang == 'es') {
        sitePages.forEach(page => {
          if(currentLocation == page.esVersion) {
            nextLocation = currentLocation.replace(page.esVersion, page.enVersion);
          }
        })
      }
      if(container.lang == 'en') {
        sitePages.forEach(page => {
          if(currentLocation == page.enVersion) {
            nextLocation = currentLocation.replace(page.enVersion, page.esVersion);
          }
        })
      }
      // Go to the next location
      location.href = nextLocation;
    }
  }
  /* ************************************************* */
  // INTRO MENU
  const menuList = document.querySelector('.menu__list');
  const menuDots = document.querySelector('.menu__display_closed');

  function menuToggle() {
    if(!menuList.classList.contains('active')) {
      menuList.classList.add('active');
      menuDots.classList.add('hidden');
    }
    else {
      menuList.classList.remove('active');
      menuDots.classList.remove('hidden');
    }
  };
  menuDots.addEventListener('click', menuToggle);

  // Lock scrolling until intro animations end
  function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

    // if any scroll is attempted, set this to the previous value
    window.onscroll = function() {
        window.scrollTo(scrollLeft, scrollTop);
    };
  }
  // ENABLE SCROLL AND CLOSE MENU WHEN SCROLLING
  function enableScroll() {
    window.onscroll = function() {
      if(menuList.classList.contains('active')) {
        menuList.classList.remove('active');
        menuDots.classList.remove('hidden');
      }
    };
  }
  enableScroll();

  /***************** INDEX *****************/
  if( container.id == 'main' ) 
  {
    logoSection.classList.remove('static');
    pageLogo.classList.add('animated');
    // pageLogo.style.opacity = '1';

    const slides = document.querySelector('.slides');
    const introAnim = [];
    const textAnim1 = document.querySelector('#slide1 p:nth-child(1)');
    const textAnim2 = document.querySelector('#slide1 p:nth-child(2)');
    const textAnim3 = document.querySelector('#slide1 p:nth-child(3)');
    const textAnim4 = document.querySelector('#slide1 p:nth-child(4)');
    const closingText = document.getElementById('closing-text');
    introAnim.push(textAnim1, textAnim2, textAnim3, textAnim4, closingText);

    // If the intro animation has been shown, don't show again
    if(!sessionStorage.getItem('display-animation')) {
      disableScroll();
      logoSection.classList.add('animated');
      menu.classList.add('animated');
      langSelector.classList.add('animated');
      sessionStorage.setItem('display-animation', true);
    } 
    else {
      logoSection.classList.remove('static');
      logoSection.classList.add('static');
      pageLogo.style.display = 'none';
      textAnim1.style.animationDelay = '0s';
      slides.style.animationDelay = '0s';
    }
    
    // When element ends animating, start next animation
    introAnim.forEach((item, index) => {
      item.addEventListener('animationend', () => {
        if(index < introAnim.length -1) {
          introAnim[index+1].classList.add('animate');
        }
        // Once the last animation plays, allow scrolling again
        if(index == introAnim.length -1) {
          enableScroll();
        }
      })
    });

    // TEXT ANIMATION ON SCROLL
    // Create scrollTrigger function
    function scrollTrigger(selector, options = {}) {
      // Select elements to apply trigger
      let els = document.querySelectorAll(selector);
      // Create array from elements
      els = Array.from(els);
      // Add IntersectionObserver to elements
      els.forEach(el => {
        addObserver(el, options);
      })
    }
  
    // Create addObserver function 
    function addObserver(el, options) {
      // Create instance of IntersectionObserver
      let observer = new IntersectionObserver((entries, observer) => {
        // For each element observed
        entries.forEach(entry => {
          // If the element is visible, entry.isIntersecting = true
          if(entry.isIntersecting) {
            // Add .active class to visible element
            entry.target.classList.add('active');
            // Remove the observer after adding class
            observer.unobserve(entry.target);
          }
        })
      }, options) // Passing the options object to the observer
      // Adding the observer to the element
      observer.observe(el);
    }
    scrollTrigger('.text-enter', {
      rootMargin: '-100px'
    });
  }

  /*********** DIGITAL/SUSTAINABLE ***********/
  else if(container.id == 'workareas') 
  {
    // SECTIONS NAVIGATION
    // Nav links
    let navList = document.querySelectorAll('.nav-link');
    navList = Array.from(navList);
    // Header gif
    let headerIso = document.getElementById('logo_section--iso');
    // Current title
    let currentTitle = document.getElementById('current-title');
    // Section body
    let sectionBody = document.querySelectorAll('.body-container');
    sectionBody = Array.from(sectionBody);

    // Change sections on click
    navList.forEach(link => {
      link.addEventListener('click', () => {

        // Remove 'animate' class
        currentTitle.classList.remove('animate');
        // Trigger DOM reflow on the element
        void currentTitle.offsetWidth; 
        // Add class again
        currentTitle.classList.add('animate');
        
        // Display the selected section's title
        currentTitle.innerHTML = link.innerHTML;

        // Store element's ID
        let linkId = link.id; 
        let sectionId = '';

      // Check element's id and select section's id
      switch(linkId) {
        // Section: DIGITAL
        case 'link-platforms':
          sectionId = 'platforms';
          headerIso.src = baseURL + '/gifs/iso-header-01.gif';
          break;
        case 'link-telecom':
          sectionId = 'telecom';
          headerIso.src = baseURL + '/gifs/iso-header-02.gif';
          break;
        case 'link-media':
          sectionId = 'media';
          headerIso.src = baseURL + '/gifs/iso-header-03.gif';
          break;
        case 'link-web3':
          sectionId = 'web3';
          headerIso.src = baseURL + '/gifs/iso-header-04.gif';
          break;
        case 'link-regulations':
          sectionId = 'regulations';
          headerIso.src = baseURL + '/gifs/iso-header-05.gif';
          break;
        // Section: SUSTAINABLE
        case 'link-transition':
          sectionId = 'transition';
          headerIso.src = baseURL + '/gifs/iso-header-01.gif';
          break;
        case 'link-agroindustries':
          sectionId = 'agroindustries';
          headerIso.src = baseURL + '/gifs/iso-header-02.gif';
          break;
        case 'link-ambient-regulations':
          sectionId = 'ambient-regulations';
          headerIso.src = baseURL + '/gifs/iso-header-03.gif';
          break;
        case 'link-integrity':
          sectionId = 'integrity';
          headerIso.src = baseURL + '/gifs/iso-header-04.gif';
          break;
        case 'link-sustainability':
          sectionId = 'sustainability';
          headerIso.src = baseURL + '/gifs/iso-header-05.gif';
          break;
      }
      // Call the function on each element to select the section with the correct ID 
      sectionBody.forEach(section => sectionDisplay(section, sectionId));
      });
    });

    // Display the correct section
    function sectionDisplay(targetSection, targetId) {
      // Create variable to store section's color scheme
      let clrScheme = '';
      // If the section's ID is the requested, display it
      if(targetSection.id == targetId) {
        targetSection.classList.add('current');
        // Store color scheme of the section
        if(targetSection.classList.contains('clr_scheme_1')) {
          clrScheme = 'clr_scheme_1';
        }
        else if(targetSection.classList.contains('clr_scheme_2')) {
          clrScheme = 'clr_scheme_2';
        }
      } 
      // Else, hide the section
      else {
        targetSection.classList.remove('current');
      }

      // Change current-title color according to sections color scheme
      if(clrScheme == 'clr_scheme_1') {
        currentTitle.classList.remove('clr_scheme_2');
        currentTitle.classList.add('clr_scheme_1');
      }
      else if(clrScheme == 'clr_scheme_2') {
        currentTitle.classList.remove('clr_scheme_1');
        currentTitle.classList.add('clr_scheme_2');
      }
    }

    // Highlight selected link
    for (let li of navList) {
      // Remove 'selected' class from all links
      li.addEventListener("click", function(){
        for (let li of navList) {
          li.classList.remove('selected');
        }
        // Add 'selected' class to clicked element
        this.classList.add('selected');
      });
    }

  }

}
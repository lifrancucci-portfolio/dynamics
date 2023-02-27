function contentLoaded() {

  window.scrollTo(0,0);

  /************** GENERAL **************/
  const container = document.querySelector('.page-container');
  const pageLogo = document.querySelector('.page_logo');

  // INTRO MENU
  // const menuArrow = document.querySelector('.menu__display-arrow');
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
    // Disable scroll until animation ends
    disableScroll();

    pageLogo.style.display='block';
    // On main page, animate page-iso and show page-logo
    const pageIso = document.getElementById('page-iso');
    pageIso.classList.add('animated');

    // On main page, animate menu arrow
    const menu = document.querySelector('.menu');
    menu.classList.add('animated');

    const introAnim = [];

    const textAnim1 = document.querySelector('#slide1 :nth-child(1)');
    const textAnim2 = document.querySelector('#slide1 :nth-child(2)');
    const textAnim3 = document.querySelector('#slide1 :nth-child(3)');
    const textAnim4 = document.querySelector('#slide1 :nth-child(4)');
    const closingText = document.getElementById('closing-text');

    introAnim.push(textAnim1, textAnim2, textAnim3, textAnim4, closingText);
    
    // When element ends animating, start next animation
    introAnim.forEach((item, index) => {
      item.addEventListener('animationend', () => {
        if(index < introAnim.length -1) {
          introAnim[index+1].classList.add('animate');
        }
        // Once the last animation plays, allow scrolling again
        if(index == introAnim.length -1) {
          // container.classList.remove('prevent-scrolling');
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
    let headerIso = document.getElementById('page-iso')
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
          headerIso.src = './gifs/iso-header-01.gif';
          break;
        case 'link-telecom':
          sectionId = 'telecom';
          headerIso.src = './gifs/iso-header-02.gif';
          break;
        case 'link-media':
          sectionId = 'media';
          headerIso.src = './gifs/iso-header-03.gif';
          break;
        case 'link-web3':
          sectionId = 'web3';
          headerIso.src = './gifs/iso-header-04.gif';
          break;
        case 'link-regulations':
          sectionId = 'regulations';
          headerIso.src = './gifs/iso-header-05.gif';
          break;
        // Section: SUSTAINABLE
        case 'link-transition':
          sectionId = 'transition';
          headerIso.src = './gifs/iso-header-01.gif';
          break;
        case 'link-agroindustries':
          sectionId = 'agroindustries';
          headerIso.src = './gifs/iso-header-02.gif';
          break;
        case 'link-ambient-regulations':
          sectionId = 'ambient-regulations';
          headerIso.src = './gifs/iso-header-03.gif';
          break;
        case 'link-integrity':
          sectionId = 'integrity';
          headerIso.src = './gifs/iso-header-04.gif';
          break;
        case 'link-sustainability':
          sectionId = 'sustainability';
          headerIso.src = './gifs/iso-header-05.gif';
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
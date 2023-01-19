function contentLoaded() {

  // SECTIONS NAVIGATION
  // Nav links
  let navList = document.querySelectorAll('.nav-link');
  navList = Array.from(navList);
  // Current title
  let currentTitle = document.getElementById('current-title');
  // Section body
  let sectionBody = document.querySelectorAll('.body-container');
  sectionBody = Array.from(sectionBody);

  // Change sections on click
  navList.forEach(link => {
    link.addEventListener('click', () => {

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
        break;
      case 'link-telecom':
        sectionId = 'telecom';
        break;
      case 'link-media':
        sectionId = 'media';
        break;
      case 'link-web3':
        sectionId = 'web3';
        break;
      case 'link-regulations':
        sectionId = 'regulations';
        break;
      // Section: SUSTAINABLE
      case 'link-transition':
        sectionId = 'transition';
        break;
      case 'link-agroindustries':
        sectionId = 'agroindustries';
        break;
      case 'link-ambient-regulations':
        sectionId = 'ambient-regulations';
        break;
      case 'link-integrity':
        sectionId = 'integrity';
        break;
      case 'link-sustainability':
        sectionId = 'sustainability';
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
        console.log('Color 1');
        clrScheme = 'clr_scheme_1';
      }
      else if(targetSection.classList.contains('clr_scheme_2')) {
        console.log('Color 2');
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
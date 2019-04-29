/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Global variables.
const listElements = document.getElementsByClassName("student-item cf");
const itemsPerPage = 10;
const page = document.querySelector('.page');  // try


// Hide all of the items in the list except for the ten you want to show.
const showPage = (list, page) => {
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = page * itemsPerPage;
   for (let i = 0; i < list.length; i++) {
      if ( startIndex <= i &&  i < endIndex) {
         list[i].style.display = 'list-item';
      } else { 
         list[i].style.display = 'none';
      }
   }
}

//   Create and append elements
const createAndAppend = (elementName, property, value, parent) => {
   const element = document.createElement(elementName);
   element[property] = value;
   parent.appendChild(element);
   return element;
}

//   Generate, append, and add functionality to the pagination links.
const appendPageLinks = list => {
   const numOfPages = Math.ceil(list.length/itemsPerPage);
   const pagination = createAndAppend('DIV', 'className', 'pagination', page);
   const paginationLinks = createAndAppend('UL', 'className', 'paginationLinks', pagination);  

   for(let i = 0; i < numOfPages; i++) {
      const pageNumber = createAndAppend('LI', 'className', 'pageNumber', paginationLinks);
      pageNumber.innerHTML = `<a href="#">${i+1}</a>`;
   }
   for(let i = 0; i < numOfPages; i++) {
      const aLinks = document.querySelectorAll('a');
      aLinks[i].addEventListener('click', (event) => {
         showPage(list, i+1);
         activeClass.remove(numOfPages);
         activeClass.add(event);
      });
   }
   const activeClass = {
      add: (event) => event.target.className = 'active',
      remove: (pages) => {
         for(let i = 0; i < pages; i++) {
            let activeLinks = document.querySelectorAll('.paginationLinks a');
            activeLinks[i].className = '';
         }      
      }
   }
      showPage(list, 1);
}
appendPageLinks(listElements);

//   Create search tools and add functionality
const createSearchTools = () => {
   const header = document.querySelector('.page-header');
   const searchDiv = createAndAppend('DIV', 'className', 'student-search', header);
   const searchBar = createAndAppend('INPUT', 'placeholder', 'Search by name...', searchDiv);
   searchBar.type = 'search';
   const button = createAndAppend('BUTTON', 'textContent', 'Search', searchDiv);
   const message = createAndAppend('p', 'textContent', 'No matches found...', page); // try
   message.style.display = 'none';

   const removePageLinks = () => {
      const paginationLinks = document.getElementsByClassName('pagination')[0];
      paginationLinks.parentNode.removeChild(paginationLinks)
   }   

   const search = () => {
      removePageLinks();
      message.style.display = 'none';
      const searchTerm = searchBar.value.toLowerCase();
      const listNames = document.getElementsByTagName('h3');

      for(let i = 0; i < listElements.length; i++) {       
         const name = listNames[i].textContent.toLowerCase();        
         if(name.indexOf(searchTerm) > -1){
            listElements[i].style.display = '';
            listElements[i].id = 'matched';
         } else {
            listElements[i].style.display = 'none';
            listElements[i].id = 'not-matched';
         } 
      }
      let searchResults = document.querySelectorAll('#matched');
      appendPageLinks(searchResults);

      if(searchResults.length === 0) {         
         message.style.display = '';
      } 

   }
   button.addEventListener('click', (e) => {
      search();
   });
   searchBar.addEventListener('keyup', () => {
      search();
   }); 
} 
createSearchTools();

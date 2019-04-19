/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.

   ***/

const listElements = document.getElementsByClassName("student-item cf");
const itemsPerPage = 10;


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

const showPage = (list, page) => {
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = page * itemsPerPage;
   for (let i = 0; i < list.length; i++) {
      if ( startIndex <= i &&  i < endIndex) {
         list[i].style.display = 'list-item';
         } else { list[i].style.display = 'none';
      } ; 
   };
};


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = (list) => {

   /*  1. Determine how many pages are needed*/
   const numberOfPages = Math.ceil(list.length/itemsPerPage);
   const page = document.querySelector('.page');

   showPage(list,1);

   //2. Create a div, give it the “pagination” class, and append it to the .page div
   const pagination = document.createElement('DIV');
   pagination.className = 'pagination';
   page.appendChild(pagination);

   // 3. Add a ul to the “pagination” div to store the pagination links
   const paginationLinks = document.createElement('UL');
   paginationLinks.className = 'paginationLinks';
   pagination.appendChild(paginationLinks);

   // 4. for every page, add li and a tags with the page number text
   for(let i = 0; i < numberOfPages; i++) {
      const pageNumber = document.createElement('LI');
      pageNumber.className = 'pageNumber';
      pageNumber.innerHTML = `<a href="#">${i+1}</a>`;
      paginationLinks.appendChild(pageNumber);
   }
   
   // call the showPage function When a tag is clicked
   for(let i = 0; i < numberOfPages; i++) {
      aLinks = document.querySelectorAll('a');
      aLinks[i].addEventListener('click', (event) => {
         showPage(listElements, i+1);
         removeActiveClass();
         addActiveClass(event);
      });
   }
   // 6. Loop over pagination links to remove active class from all links
   const removeActiveClass = () => {
      for(let i = 0; i < numberOfPages; i++) {
         let activeLinks = document.querySelectorAll('.paginationLinks a');
         activeLinks[i].className = '';
      }      
   }
   
// Add the active class to the link that was just clicked
   const addActiveClass = (event) => event.target.className = 'active';
};
appendPageLinks(listElements);

/*
<div class="student-search">
          <input placeholder="Search for students...">
          <button>Search</button>
        </div>

*/
// Remember to delete the comments that came with this file, and replace them with your own code comments.
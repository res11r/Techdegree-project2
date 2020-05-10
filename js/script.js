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
var studentList = document.querySelectorAll('li');
let numOfItems = 10;
/*** 
<!-- student search HTML to add dynamically -->
<div class="student-search">
  <input placeholder="Search for students...">
  <button>Search</button>
</div>
<!-- end search -->
***/

//Define variables for main page elements and pagination elements
let pageDiv = document.querySelector('div.page');
let pageUL = document.querySelector('ul.student-list')
let paginationDiv = document.createElement('div');
let paginationUL = document.createElement('ul');
//Define search form and button elements
let searchDiv = document.createElement('div');
let searchForm = document.createElement('form');
let searchInput = document.createElement('input');
let searchButton = document.createElement('button');
searchDiv.className = 'student-search';
searchInput.placeholder = 'Search for students...';
searchInput.type = 'text';
searchButton.textContent = 'Search';
searchButton.type = 'submit';
searchForm.appendChild(searchInput);
searchForm.appendChild(searchButton);
searchDiv.appendChild(searchForm);
document.querySelector('div.page-header.cf').appendChild(searchDiv);
let searchResultsArr = [];
//Define variable for paragraph element that contains text for when no search results are found.
//Set the display style for the element to 'none' by default
let noSearchResults = document.createElement('p');
   noSearchResults.textContent = 'No results found';
   noSearchResults.style.display = 'none';
   pageDiv.appendChild(noSearchResults);
   pageDiv.insertBefore(noSearchResults, pageUL);

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
function showPage(list, page) {
   let startIndex = numOfItems*page - numOfItems;
   let endIndex = numOfItems*page;

   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex & i < endIndex) {
         list[i].style.display = '';
      } else {
         list[i].style.display = 'none';
      }
   }
}

function appendPageLinks(list) {
   let numOfPages = Math.floor(list.length / numOfItems) + 1;
   // Define function which invokes the showPage function for the active anchor
   function showActivePage() {
      for (let i = 0; i < paginationUL.children.length; i++) {
         if (paginationUL.children[i].children[0].className == 'active') {
            showPage(list, i+1);
         }
      }
   }
   paginationUL.innerHTML = '';
   // Loop through the number of pages and create a corresponding number of pagination anchors
   for (let i = 0; i < numOfPages; i++) {
      let paginationLI = document.createElement('li');
      let link = document.createElement('a');
      link.href = "#";
      link.textContent = i + 1;
      paginationLI.appendChild(link);
      paginationUL.appendChild(paginationLI);
   }
   paginationDiv.className = 'pagination';
   paginationDiv.appendChild(paginationUL);
   pageDiv.appendChild(paginationDiv);
   // Set the first page to show up by default when the user opens the page
   paginationUL.querySelector('a').className = 'active';
   showActivePage();

   let links = paginationUL.querySelectorAll('a');
   paginationUL.addEventListener('click', (e) => {
      if (e.target.tagName == 'A') {
         for (let i = 0; i < links.length; i++) {
            links[i].classList.remove('active');
         }
         e.target.className = 'active';   
      }
   showActivePage();  
   });
 
}

appendPageLinks(studentList);

searchForm.addEventListener('submit', (event) => {
   event.preventDefault();
   for (let i = 0; i < studentList.length; i++) {
      let studentName = studentList[i].querySelector('h3').textContent;
      if (studentName.includes(searchInput.value)) {
         studentList[i].style.display = '';
      } else {
         studentList[i].style.display = 'none';
      }
   }
   // check if no results are returned and display a message
   let displayStyleNone = true;
   for (let i = 0; i < studentList.length; i++) {
      if (studentList[i].style.display !== 'none') {
         displayStyleNone = false;
         //Add list elements with default display style to the searchResultsArr array variable defined above
         searchResultsArr.push(studentList[i]);
      }
   }
   if (displayStyleNone === true) {
      noSearchResults.style.display = '';
   //If results are found then set the display style for the 'no search results are found' element to 'none'
   } else {
      noSearchResults.style.display = 'none';
      }
   appendPageLinks(searchResultsArr);
});




// Remember to delete the comments that came with this file, and replace them with your own code comments.
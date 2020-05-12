/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


var studentList = document.querySelectorAll('li');
let numOfItems = 10;

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
//Define variable for paragraph element that contains text for when 
//no search results are found.
//Set the display style for the element to 'none' by default
let noSearchResults = document.createElement('p');
   noSearchResults.textContent = 'No results found';
   noSearchResults.style.display = 'none';
   pageDiv.appendChild(noSearchResults);
   pageDiv.insertBefore(noSearchResults, pageUL);

/**
 * Define showPage function which takes 2 arguments: list and page
 * list is an array which contains the list of students
 * page is an integer representing the required result page to be displayed
 * The function does not return any value
 */
function showPage(list, page) {
   //startIndex and endIndex represent the first and last list items 
   //in a given page
   let startIndex = numOfItems*page - numOfItems;
   let endIndex = numOfItems*page;

   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex & i < endIndex) {
         //Display the items that are within the index range of the given page
         list[i].style.display = '';
      } else {
         //The rest of the list items will be invisible
         list[i].style.display = 'none';
      }
   }
}

/**
 * Define the function appendPageLinks which takes 1 argument: list
 * list is an array which contains the list of students 
 * The function does not return any value
 */
function appendPageLinks(list) {
   let numOfPages = Math.floor(list.length / numOfItems) + 1;
   /**
    * Define the function showActivePage which takes no arguments
    * The function returns a string listStr which contains the HTML text of the restultant list
    */
   function showActivePage() {
      //Call the function showPage, display the list items from the page of which the pagination
      //link is set to Active
      for (let i = 0; i < paginationUL.children.length; i++) {
         if (paginationUL.children[i].children[0].className == 'active') {
            showPage(list, i+1);
         }
      }
      //Initialize listStr and make it an empty string
      let listStr = '';
      //Assign the HTML content of the list UL to the listStr string
      for (let i = 0; i < list.length;  i++) {
         listStr += `${list[i].outerHTML} `;
      }
      return listStr;
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
   // Set the HTML of the list UL to call the function showActivePage. This will populate the page
   // with the first page list items
   pageUL.innerHTML = showActivePage();

   //Event listener that listens to a user's click on a pagination link and sets that 
   //link's class to Active and removes the Active class from all other pagination links
   let links = paginationUL.querySelectorAll('a');
   paginationUL.addEventListener('click', (e) => {
      if (e.target.tagName == 'A') {
         for (let i = 0; i < links.length; i++) {
            links[i].classList.remove('active');
         }
         e.target.className = 'active';   
      }
   // Set the HTML of the list UL to call the function showActivePage. This will populate the page
   // with the list items in the page corresponding to the active pagination link
   pageUL.innerHTML = showActivePage();  
   });
 
}

//Call the function appendPageLinks to display the paginated full list of students when the user
//opens the page the first time
appendPageLinks(studentList);

//Set a search event listener to listen for a user's input and pass the resultant search results array to
//the appendPageLinks function
searchForm.addEventListener('submit', (event) => {
   event.preventDefault();
   //Initialize search results array and string
   let searchResultsArr = [];
   let searchResultsStr = '';
   //Check if each student name contains the input search term, change the list item's display to 'none'
   //if it doesn't
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
   
   for (let i = 0; i < searchResultsArr.length;  i++) {
      searchResultsStr += `${searchResultsArr[i].outerHTML} `;
   }
   //Assign the HTML content of the list UL to the search results string
   pageUL.innerHTML = searchResultsStr;
   //Call the function appendPageLinks on the search results array
   appendPageLinks(searchResultsArr);
});



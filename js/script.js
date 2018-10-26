/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
let CurrentDisplayedStudents = document.querySelectorAll('.student-item');           //array of currently searched items, if the search bar is empty, it will contain all the student tems
const students = CurrentDisplayedStudents;					     //array of all student items
const pages = {
	current: 1,															//current active page
	min: 1,																//the first page available
	max: Math.ceil(CurrentDisplayedStudents.length / 10),				//last page available
	links: [],															//array of pagination links
	element: document.querySelector('.page'),							//DOM element of the complete page
	currentActiveLink: undefined,										//current active link, starts undefined because the pagination links haven't been created yet
	showPage: () => {													//shows the current page and hides all the other student elements
		let minItem = (pages.current - 1) * 10,
			maxItem = pages.current * 10 - 1;
		for (let i = 0; i < CurrentDisplayedStudents.length; i++) {
			if (i >= minItem && i <= maxItem) 
				CurrentDisplayedStudents[i].style.display = 'block';
			else
				CurrentDisplayedStudents[i].style.display = 'none';
		}
	},
	activateLink: link => {												//shows the selected page and gives the link the 'active' class
		pages.current = parseInt(link.textContent);
		pages.showPage();
		if (pages.currentActiveLink !== undefined)
			pages.currentActiveLink.className = '';
		link.className = 'active';
		pages.currentActiveLink = link;
	},
	createLink: (ul, i) => {											//creates individual pagination link
		const li = document.createElement('li'), 
			  link = document.createElement('a');
		pages.links.push(link); 
		li.appendChild(link);
		link.textContent = i;
		link.href = '#';
		ul.appendChild(li);
	},
	createLinks: () => {												//using the createLink() function creates or updates the array of pagination links
		const lastDiv = document.querySelector('.pagination');			//if there are links displayed when this function is called, the links will
		if (lastDiv !== null){											//be removed to create new updated links
			pages.element.removeChild(lastDiv);
			pages.links = []
		}
		const ul = document.createElement('ul'),
			  div = document.createElement('div');
		div.className = 'pagination';
		div.appendChild(ul);
		pages.element.appendChild(div);
		for (let i = pages.min; i <= pages.max; i++)
			pages.createLink(ul, i);
		pages.activateLink(pages.links[0]);
		ul.addEventListener('click', e => {
			if (e.target.tagName === 'A')
				pages.activateLink(e.target);
		})
	},
	createSearchBar: () => {											//creates the search bar and adds event listeners
		const div = document.createElement('div'),
			  input = document.createElement('input'),
			  button = document.createElement('button');
		const updatePage = () => {										//each time the user inserts a name the page is updated
			pages.current = 1;											//and moves to the first page automatically
			pages.max = Math.ceil(CurrentDisplayedStudents.length / 10),
			pages.showPage();
			pages.createLinks();
			pages.activateLink(pages.links[0]);
		}
		const searchItems = () => {										//each times the iser inserts a key or the button is pressed this funcyion will be called
			const name = input.value.toLowerCase();						//searches and displays the students that match with the searched term
			if (name === ''){											//otherwise the item is hidden
				CurrentDisplayedStudents = students;					//if the search bar is empty, all the students will be diplayed, with the pagination system
				updatePage();
			} else {
				CurrentDisplayedStudents = [];
				let counter = 0;
				for (let i = 0; i < students.length; i++){				//compares the search term with each item from the list
					const studentName = students[i].querySelector('.student-details h3').textContent.toLowerCase();
					if (studentName.indexOf(name) !== -1){
						counter++;
						students[i].style.display = 'block';
						CurrentDisplayedStudents.push(students[i]);
					} else
						students[i].style.display = 'none';
				}
				if (counter === 0)										//if the student wasn't found, an alert box will pop up
					alert('searched student doesn\'t exists');
				else
					updatePage();
			}
		}
		div.appendChild(input);
		div.appendChild(button);
		div.className = 'student-search';
		input.type = 'text';
		input.placeholder = 'Search for students...';
		button.textContent = 'Search';
		document.querySelector('.page-header').appendChild(div);
		input.addEventListener('input', searchItems);
		button.addEventListener('click', searchItems);
	}
}

pages.showPage();										//shows the first page by default

pages.createLinks();									//creates the pagination links dynamically

pages.createSearchBar();								//creates and gives use to the search bar

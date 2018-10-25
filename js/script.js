/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
const students = document.querySelectorAll('.student-item');
const pages = {
	current: 1,											//current active page
	min: 1,												//the first page available
	max: Math.ceil(students.length / 10),				//last page available
	links: [],											//array of pagination links
	element: document.querySelector('.page'),			//DOM element of the complete page
	currentActiveLink: undefined,						//current active link, starts undefined because the pagination links haven't been created yet
	showPage: () => {									//shows the current page and hides all the other student elements
		let minItem = (pages.current - 1) * 10,
			maxItem = pages.current * 10 - 1;
		for (let i = 0; i < students.length; i++) {
			if (i >= minItem && i <= maxItem) 
				students[i].style.display = 'block';
			else
				students[i].style.display = 'none';
		}
	},
	activateLink: link => {								//shows the selected page and gives the links the 'active' class
		pages.current = parseInt(link.textContent);
		pages.showPage();
		if (pages.currentActiveLink !== undefined)
			pages.currentActiveLink.className = '';
		link.className = 'active';
		pages.currentActiveLink = link;
	},
	createLink: (ul, i) => {							//creates individual pagination link
		const li = document.createElement('li'), 
			  link = document.createElement('a');
		pages.links.push(link); 
		li.appendChild(link);
		link.textContent = i;
		link.href = '#';
		ul.appendChild(li);
	},
	createLinks: () => {								//using the createLink() function creates the array of pagination links
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
	}
}

pages.showPage();										//shows the first page by default

pages.createLinks();									//creates the pagination links dynamically
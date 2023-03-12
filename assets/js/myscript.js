// function to generate a random job id field
function generateJobID() {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let jobId = '';
    for (let i = 0; i < 6; i++) {
        jobId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    document.getElementById('job-id').value = jobId;
}

generateJobID();

// generate table rows for employees
function generateEmployeeRows(employees) {
    let rows = '';
    for (let i = 0; i < employees.length; i++) {
      const employee = employees[i];
      const randomNumber = Math.floor(Math.random() * 1000); // generate random number
      rows += `
        <tr>
          <td><img src="https://picsum.photos/50?random=${randomNumber}" alt="Employee Photo"></td>
          <td>${employee.jobId}</td>
          <td>${employee.name}</td>
          <td>${employee.bioJoke}</td>
        </tr>
      `;
    }
    return rows;
  }
  


// function to sort employees by name
function sortEmployeesByName() {
    let table = document.querySelector('#employee-table');
    let tbody = table.querySelector('tbody');
    let rows = tbody.querySelectorAll('tr');

    // convert rows to array
    let rowsArray = Array.from(rows);

    // sort rows by name
    rowsArray.sort(function (a, b) {
        let nameA = a.querySelector('td:nth-child(3)').textContent;
        let nameB = b.querySelector('td:nth-child(3)').textContent;
        if (nameA < nameB) {
            return -1;
        } else if (nameA > nameB) {
            return 1;
        } else {
            return 0;
        }
    });

    // empty the tbody and append sorted rows
    tbody.innerHTML = '';
    for (let i = 0; i < rowsArray.length; i++) {
        tbody.appendChild(rowsArray[i]);
    }
}

// function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    let employees = JSON.parse(localStorage.getItem('employees')) || [];


    // get form data
let jobId = document.querySelector('#job-id').value;
let name = document.querySelector('#name').value;
let address = document.querySelector('#address').value;
let department = document.querySelector('#department').value;
let bioJokeEl = document.querySelector('#bioJoke');
let salary = document.querySelector('#salary').value;

// fetch a random dad joke
fetch('https://icanhazdadjoke.com/', {
    headers: {
        'Accept': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        // set the value of the bioJoke input to the fetched joke
        bioJokeEl.value = data.joke;

        // get employees data from localStorage or use an empty array if none exists
        let employees = JSON.parse(localStorage.getItem('employees')) || [];

        // create new employee object and add it to array
        let employee = {
            jobId: jobId,
            name: name,
            address: address,
            department: department,
            bioJoke: bioJokeEl.value,
            salary: salary
        };
        employees.push(employee);

        // save updated employees array to localStorage
        localStorage.setItem('employees', JSON.stringify(employees));

        // generate table rows and append to tbody
        let tbody = document.querySelector('#employee-table tbody');
        tbody.innerHTML = generateEmployeeRows(employees);
    })
    .catch(error => console.error(error));

    // save updated employees array to localStorage
    localStorage.setItem('employees', JSON.stringify(employees));

    // generate table rows and append to tbody
    let tbody = document.querySelector('#employee-table tbody');
    tbody.innerHTML = generateEmployeeRows(employees);

    // reset form
    event.target.reset();
}

// add event listener for form submission
let form = document.querySelector('form');
form.addEventListener('submit', handleFormSubmit);
form.addEventListener('submit', showTableButton);

function showTableButton(){
    
    let table = document.querySelector('#employee-table');
    let sortButton = document.querySelector('#sort-button');

    table.style.display = 'block';
    sortButton.style.display = 'block';
    sortButton.style.margin = 'auto';
}
// generate initial employees data
let initialEmployees = [
    {
        jobId: 'Ab5DE1',
        name: 'John Doe',
        address: '123 Main St',
        department: 'Sales',
        bioJoke: 'Why did the tomato turn red? Because it saw the salad dressing!',
        salary: 50000
    },
    {
        jobId: 'FgH4J2',
        name: 'Jane Smith',
        address: '456 Oak Ave',
        department: 'Marketing',
        bioJoke: 'What do you call a boomerang that doesn\'t come back? A stick!',
        salary: 60000
    },
    {
        jobId: 'Cb5DE1',
        name: 'John Clarke',
        address: '1244 Main St',
        department: 'Software',
        bioJoke: 'Why did the tomato turn red? Because it saw the salad singing!',
        salary: 52000
    },
    {
        jobId: 'FgC4J2',
        name: 'Neymar Jr.',
        address: 'Millan Court',
        department: 'Footballer',
        bioJoke: '1% Chance, 99% Faith',
        salary: 1000000
    }
];

// save initial employees data to localStorage
localStorage.setItem('employees', JSON.stringify(initialEmployees));

// generate table rows and append to tbody
let tbody = document.querySelector('#employee-table tbody');
tbody.innerHTML = generateEmployeeRows(initialEmployees);

// add event listener for sort button
let sortButton = document.querySelector('#sort-button');
sortButton.addEventListener('click', sortEmployeesByName);


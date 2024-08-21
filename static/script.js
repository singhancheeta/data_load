function addRow() {
    let table = document.getElementById('Body');
    let row = table.insertRow();
    let name = row.insertCell(0);
    let age = row.insertCell(1);
    let classdata = row.insertCell(2);
    let marks = row.insertCell(3);
    let actions = row.insertCell(4);

    name.contentEditable = true;
    age.contentEditable = true;
    classdata.contentEditable = true;
    marks.contentEditable = true;

    actions.innerHTML = '<button onclick="saveRow(this, true)">Save</button> <button onclick="deleteRow(this)">Delete</button>';
}

function deleteRow(button) {
    let row = button.parentNode.parentNode;
    let rowIndex = row.rowIndex - 1
    fetch('/delete_row',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({index: rowIndex})
    }).then(response => response.json())
    .then(data => {
        console.log('Row deleted:', data);
        row.parentNode.removeChild(row);
    });
}

function saveRow(button, isNew = false) {
    let row = button.parentNode.parentNode;
    let name = row.cells[0];
    let age = row.cells[1];
    let classdata = row.cells[2];
    let marks = row.cells[3];

    if (validateRow(name, age, classdata, marks)) {
        row.contentEditable = false;
        button.textContent = 'Edit';
        button.onclick = function() {
            editRow(button);
        };

        let rowData = {
            name: name.innerText.trim(),
            age: age.innerText.trim(),
            class: classdata.innerText.trim(),
            marks: marks.innerText.trim()
        };

        if (isNew) {
            fetch('/add_row', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rowData)
            }).then(response => response.json())
              .then(data => {
                  console.log('Row added:', data);
              });
        } else {
            let rowIndex = row.rowIndex - 1;
            let updatedRowData = {
                index: rowIndex,
                row: rowData
            };

            fetch('/update_row', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedRowData)
            }).then(response => response.json())
              .then(data => {
                  console.log('Row updated:', data);
              });
        }
    }
}

function editRow(button) {
    let row = button.parentNode.parentNode;
    row.contentEditable = true;
    button.textContent = 'Save';
    button.onclick = function() {
        saveRow(button);
    };
}

function validateRow(name, age, classdata, marks) {
    let nameval = name.innerText.trim();
    let ageval = age.innerText.trim();
    let classval = classdata.innerText.trim();
    let marksval = marks.innerText.trim();

    console.log('Validating row:', { nameval, ageval, classval, marksval });

    if (nameval === '' || ageval === '' || classval === '' || marksval === '') {
        alert('All fields are required.');
        return false;
    }

    if (nameval.length > 20) {
        alert('Name cannot exceed 20 characters.');
        return false;
    }

    if (/\d/.test(nameval)) {
        alert('Name cannot contain numerical values.');
        return false;
    }

    return true;
}


function reloadTable(data) {
    let tableBody = document.getElementById('Body');
    tableBody.innerHTML = ''; 
    data.forEach(row => {
        let newRow = tableBody.insertRow();
        let name = newRow.insertCell(0);
        let age = newRow.insertCell(1);
        let classdata = newRow.insertCell(2);
        let marks = newRow.insertCell(3);
        let actions = newRow.insertCell(4);

        name.textContent = row.name;
        age.textContent = row.age;
        classdata.textContent = row.class;
        marks.textContent = row.marks;

        actions.innerHTML = '<button onclick="editRow(this)">Edit</button> <button onclick="deleteRow(this)">Delete</button>';
    });
}

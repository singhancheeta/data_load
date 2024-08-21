function addRow() {
    let table = document.getElementById('Body');
    let row = table.insertRow();
    let nameCell = row.insertCell(0);
    let ageCell = row.insertCell(1);
    let classCell = row.insertCell(2);
    let marksCell = row.insertCell(3);
    let actionsCell = row.insertCell(4);

    nameCell.contentEditable = true;
    ageCell.contentEditable = true;
    classCell.contentEditable = true;
    marksCell.contentEditable = true;

    actionsCell.innerHTML = '<button onclick="saveRow(this)">Save</button> <button onclick="deleteRow(this)">Delete</button>';
}

function deleteRow(button) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function saveRow(button) {
    let row = button.parentNode.parentNode;
    let nameCell = row.cells[0];
    let ageCell = row.cells[1];
    let classCell = row.cells[2];
    let marksCell = row.cells[3];

    if (validateRow(nameCell, ageCell, classCell, marksCell)) {
        row.contentEditable = false;
        button.textContent = 'Edit';
        button.onclick = function() {
            editRow(button);
        };
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

function validateRow(nameCell, ageCell, classCell, marksCell) {
    let name = nameCell.innerText.trim();
    let age = ageCell.innerText.trim();
    let classValue = classCell.innerText.trim();
    let marks = marksCell.innerText.trim();

    console.log('Validating row:', { name, age, classValue, marks });

    if (name === '' || age === '' || classValue === '' || marks === '') {
        alert('All fields are required.');
        return false;
    }

    if (name.length > 20) {
        alert('Name cannot exceed 20 characters.');
        return false;
    }

    if (/\d/.test(name)) {
        alert('Name cannot contain numerical values.');
        return false;
    }

    return true;
}

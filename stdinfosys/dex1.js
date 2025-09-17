let count = 0;
let students = [];
let archivedStudents = [];  // Array to store archived students
let global_id = null;

function addStudent() {
    const nameValue = document.getElementById('name').value;
    const LastNameValue = document.getElementById('LastName').value;
    const emailValue = document.getElementById('email').value;
    const degreeValue = document.getElementById('degree').value;

    // Check if we're editing an existing student
    if (document.querySelector("#submit").innerText === "Edit Student") {
        console.log("Editing student with ID:", global_id);
        let index = students.findIndex(student => student.ID === global_id);
        
        if (index !== -1) {
            let student = students[index];
            student.name = nameValue;
            student.LastName = LastNameValue;
            student.email = emailValue;
            student.degree = degreeValue;
            students[index] = student;
            showTable();
            resetForm();
            document.querySelector("#submit").innerText = "Add Student";
        }

        return;
    }

    // Validate inputs
    if (nameValue === '' || LastNameValue === '' || emailValue === '' || degreeValue === '') {
        alert("All fields are required!");
        return;
    }

    // Add new student
    count++;

    students.push({
        ID: count,
        name: nameValue,
        LastName: LastNameValue,
        email: emailValue,
        degree: degreeValue,
    });

    showTable();
    resetForm();
}

function resetForm() {
    document.getElementById('name').value = "";
    document.getElementById('LastName').value = "";
    document.getElementById('email').value = "";
    document.getElementById('degree').value = "";
}

function showTable() {
    const table = document.getElementById('tbody');
    table.innerHTML = ""; // Clear existing rows

    students.forEach((student) => {
        const row = document.createElement("tr");
        const id = document.createElement('td');
        const name = document.createElement('td');
        const lastName = document.createElement('td');
        const email = document.createElement('td');
        const degree = document.createElement('td');
        const actions = document.createElement('td');

        id.innerText = student.ID;
        name.innerText = student.name;
        lastName.innerText = student.LastName;
        email.innerText = student.email;
        degree.innerText = student.degree;

        actions.innerHTML = `<a href="#" onClick="edit(${student.ID})" class="fa">&#xf044;</a> 
                             <a href="#" onClick="archive(${student.ID})" class="fa fa-trash"></a>`;

        row.appendChild(id);
        row.appendChild(name);
        row.appendChild(lastName);
        row.appendChild(email);
        row.appendChild(degree);
        row.appendChild(actions);

        table.appendChild(row);
    });
}

function search() {
    const input = document.getElementById("search").value.toUpperCase();
    const table = document.getElementById("tbody");
    const rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        const name = cells[1].innerText.toUpperCase();
        const email = cells[3].innerText.toUpperCase();
        const degree = cells[4].innerText.toUpperCase();

        if (name.indexOf(input) > -1 || email.indexOf(input) > -1 || degree.indexOf(input) > -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

function edit(id) {
    const student = students.find(student => student.ID === id);

    if (student) {
        document.getElementById('name').value = student.name;
        document.getElementById('LastName').value = student.LastName;
        document.getElementById('email').value = student.email;
        document.getElementById('degree').value = student.degree;

        global_id = id;
        document.querySelector("#submit").innerText = "Edit Student";
    }
}

function archive(id) {
    const index = students.findIndex(student => student.ID === id);

    if (index !== -1) {
        const student = students.splice(index, 1)[0]; // Remove the student from active list
        archivedStudents.push(student);
        showTable();
        showArchivedTable();
    }
}

function showArchivedTable() {
    const archiveBody = document.getElementById('archive-body');
    archiveBody.innerHTML = ""; // Clear existing rows

    archivedStudents.forEach((student) => {
        const row = document.createElement("tr");
        const id = document.createElement('td');
        const name = document.createElement('td');
        const lastName = document.createElement('td');
        const email = document.createElement('td');
        const degree = document.createElement('td');
        const actions = document.createElement('td');

        id.innerText = student.ID;
        name.innerText = student.name;
        lastName.innerText = student.LastName;
        email.innerText = student.email;
        degree.innerText = student.degree;

        actions.innerHTML = `<a href="#" onClick="restore(${student.ID})" class="fa">&#xf0c7;</a>`;

        row.appendChild(id);
        row.appendChild(name);
        row.appendChild(lastName);
        row.appendChild(email);
        row.appendChild(degree);
        row.appendChild(actions);

        archiveBody.appendChild(row);
    });
}

function restore(id) {
    const index = archivedStudents.findIndex(student => student.ID === id);

    if (index !== -1) {
        const student = archivedStudents.splice(index, 1)[0];
        students.push(student);
        showTable();
        showArchivedTable();
    }
}

function showArchive() {
    const archiveContainer = document.getElementById('archiveContainer');
    archiveContainer.style.display = (archiveContainer.style.display === "none") ? "block" : "none";
}

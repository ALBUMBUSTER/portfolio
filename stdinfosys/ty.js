const adminUsername = "jason"; 
const adminPassword = "jason123"; 

let students = JSON.parse(localStorage.getItem("students")) || [];
let archivedStudents = JSON.parse(localStorage.getItem("archivedStudents")) || [];
let studentId = students.length ? students[students.length - 1].id + 1 : 1;

function login() {
    const username = document.getElementById("adminUsername").value.trim();
    const password = document.getElementById("adminPassword").value.trim();

    if (username === adminUsername && password === adminPassword) {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("adminContainer").style.display = "block";
        
        localStorage.setItem("isAdminLoggedIn", "true"); 
        renderStudents();
    } else {
        document.getElementById("loginError").style.display = "block"; 
    }
}

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    
    if (isLoggedIn === "true") {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("adminContainer").style.display = "block";
        renderStudents();
    } else {
        document.getElementById("loginContainer").style.display = "block";
        document.getElementById("adminContainer").style.display = "none";
    }
}

function logout() {
    localStorage.removeItem("isAdminLoggedIn"); 
    checkLoginStatus(); 
}

function addStudent() {
    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("LastName").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase(); // Normalize email to lowercase
    const degree = document.getElementById("degree").value.trim();

    if (name && lastName && email && degree) {
        // Check for duplicates by name, last name, and normalized email
        const isDuplicate = students.some((student) =>
            student.name.toLowerCase() === name.toLowerCase() &&
            student.lastName.toLowerCase() === lastName.toLowerCase() &&
            student.email.toLowerCase() === email // Compare emails in lowercase
        );

        if (isDuplicate) {
            alert("This student already exists.");
        } else {
            const isNameDuplicate = students.some((student) => student.name.toLowerCase() === name.toLowerCase());
            const isEmailDuplicate = students.some((student) => student.email.toLowerCase() === email.toLowerCase());
            if (isNameDuplicate) {
                alert("This student name already exists.");
            } else if (isEmailDuplicate) {
                alert("This email already exists.");
            } else {
                const student = { id: studentId++, name, lastName, email, degree };
                students.push(student);
                saveToLocalStorage();
                renderStudents();
                clearInputs();
            }
        }
    } else {
        alert("Please fill out all fields.");
    }
}

function search() {
    const searchQuery = document.getElementById("search").value.toLowerCase(); // Get the search query and convert to lowercase
    const filteredStudents = students.filter((student) => {
        return (
            student.name.toLowerCase().includes(searchQuery) ||
            student.email.toLowerCase().includes(searchQuery) ||
            student.degree.toLowerCase().includes(searchQuery)
        );
    });

    renderFilteredStudents(filteredStudents); // Call a function to render the filtered students
}

function renderFilteredStudents(filteredStudents) {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = ""; // Clear the table

    filteredStudents.forEach((student) => {
        const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.lastName}</td>
                <td>${student.email}</td>
                <td>${student.degree}</td>
                <td>
                    <button onclick="editStudent(${student.id})">Edit</button>
                    <button onclick="archiveStudent(${student.id})">Archive</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function renderStudents() {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = ""; 

    students.forEach((student) => {
        const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.lastName}</td>
                <td>${student.email}</td>
                <td>${student.degree}</td>
                <td>
                    <button onclick="editStudent(${student.id})">Edit</button>
                    <button onclick="archiveStudent(${student.id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}
function archiveStudent(id) {
    const studentToArchive = students.find((student) => student.id === id);
    if (studentToArchive) {
        archivedStudents.push(studentToArchive);
        students = students.filter((student) => student.id !== id);
        saveToLocalStorage();
        renderStudents();
        renderArchive();
    }
}
function editStudent(id) {
    const student = students.find((s) => s.id === id);
    if (student) {
        document.getElementById("name").value = student.name;
        document.getElementById("LastName").value = student.lastName;
        document.getElementById("email").value = student.email;
        document.getElementById("degree").value = student.degree;
        const submitButton = document.getElementById("submit");
        submitButton.textContent = "Update Student";
        submitButton.onclick = function () {
            updateStudent(id);
        };
    }
}
function updateStudent(id) {
    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("LastName").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase(); // Normalize email to lowercase
    const degree = document.getElementById("degree").value.trim();

    if (name && lastName && email && degree) {
        // Check for duplicates by name, last name, and normalized email
        const isDuplicate = students.some((student) =>
            student.id !== id &&  // Exclude the current student being edited
            student.name.toLowerCase() === name.toLowerCase() &&
            student.lastName.toLowerCase() === lastName.toLowerCase() &&
            student.email.toLowerCase() === email // Compare emails in lowercase
        );

        if (isDuplicate) {
            alert("This student already exists.");
        } else {
            const student = students.find((s) => s.id === id);
            student.name = name;
            student.lastName = lastName;
            student.email = email;
            student.degree = degree;

            saveToLocalStorage();
            renderStudents();
            clearInputs();

            const submitButton = document.getElementById("submit");
            submitButton.textContent = "Add Student";
            submitButton.onclick = addStudent;
        }
    } else {
        alert("Please fill out all fields.");
    }
}

function saveToLocalStorage() {
    localStorage.setItem("students", JSON.stringify(students));
    localStorage.setItem("archivedStudents", JSON.stringify(archivedStudents));
}

function clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("LastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("degree").value = "";
}

function showArchive() {
    const archiveContainer = document.getElementById("archiveContainer");
    const archiveBody = document.getElementById("archive-body");

    if (archiveContainer.style.display === "none" || archiveContainer.style.display === "") {
        archiveContainer.style.display = "block";
        renderArchive();
    } else {
        archiveContainer.style.display = "none";
    }
}

function renderArchive() {
    const archiveBody = document.getElementById("archive-body");
    archiveBody.innerHTML = "";

    archivedStudents.forEach((student) => {
        const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.lastName}</td>
                <td>${student.email}</td>
                <td>${student.degree}</td>
                <td>
                    <button onclick="restoreStudent(${student.id})">Restore</button>
                </td>
            </tr>
        `;
        archiveBody.innerHTML += row;
    });
}

function restoreStudent(id) {
    const studentToRestore = archivedStudents.find((student) => student.id === id);
    if (studentToRestore) {
        students.push(studentToRestore);
        archivedStudents = archivedStudents.filter((student) => student.id !== id);
        saveToLocalStorage();
        renderStudents();
        renderArchive();
    }
}
localStorage.clear();
checkLoginStatus();

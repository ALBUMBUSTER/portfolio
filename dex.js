var count = 0;
var students = []; 
var global_id;
function addStudent(){
 
    const nameValue = document.getElementById('name').value;
    const LastNameValue = document.getElementById('LastName').value;
    const emailValue = document.getElementById('email').value;
    const gradeValue = document.getElementById('grade').value;
    const degreeValue = document.getElementById('degree').value;

    if(document.querySelector("#submit").innerText == "Edit Student"){
        console.log("this will edit and not add");
        console.log(global_id);
        let index;

        for (let i = 0; i < students.length; i++) {
            if (students[i]['ID'] == global_id) {
                index=i;
                break;
            }
        }

        let studentobj = students[index];

        studentobj['name'] = nameValue;
        studentobj['LastName'] = LastNameValue;
        studentobj['email'] = emailValue;
        studentobj['grade'] = gradeValue;
        studentobj['degree'] = degreeValue;

        students[index] = studentobj;

        showTable();
        document.querySelector("#submit").innerHTML = "Add Student";

            document.getElementById('name').value="";
            document.getElementById('LastName').value="";
            document.getElementById('email').value="";
            document.getElementById('grade').value="";
            document.getElementById('degree').value="";
        
     return;

    }
    if(nameValue=='' || LastNameValue=='' || emailValue=='' || gradeValue =='' || degreeValue==""){
        alert("All fields are required!")
        return;
    }
    count++;

    students.push({
        ID:count,
        name:nameValue,
        LastName:LastNameValue,
        email:emailValue,
        grade:gradeValue,
        degree:degreeValue
    });


    document.getElementById('name').value="";
    document.getElementById('LastName').value="";
    document.getElementById('email').value="";
    document.getElementById('grade').value="";
    document.getElementById('degree').value="";
    console.log(students);
    showTable();
}


function showTable(){
    const table = document.getElementById('tbody');
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }

    table.value="";
    students.forEach((student)=>{

        const row = document.createElement("tr");
        var keys=Object.keys(student);

        var id = document.createElement('td');
        const name = document.createElement('td');
        const LastName = document.createElement('td');
        const email = document.createElement('td');
        const grade = document.createElement('td');
        const degree = document.createElement('td');

        keys.forEach((key)=>{
            if(key=='ID'){
                id.innerHTML = student[key];
            }
            else if(key=='name'){
                name.innerHTML = student[key];
            }
            else if(key=='LastName'){
                LastName.innerHTML = student[key];
            }
            else if(key=='email'){
                email.innerHTML = student[key];
            }
            else if(key=='grade'){  
                grade.innerHTML = student[key];
            }
            else
            degree.innerHTML = `<div class='degree'><div>${student[key]}</div>
        <div class="icons"><a onClick="edit(${student['ID']})" class='fa'>&#xf044;</a> 
        <a onClick="del(${student['ID']})" class='fa'>&#xf1f8;</a> </div></div> `;

            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(LastName);
            row.appendChild(email);
            row.appendChild(grade);
            row.appendChild(degree);       
        })

        table.appendChild(row);
    })
}

function search(){
  var input, filter, table, tr, td, i, txtValue,txtValue1,txtValue2;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("tbody");
  tr = table.getElementsByTagName("tr");


  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    td1 = tr[i].getElementsByTagName("td")[2];
    td2 = tr[i].getElementsByTagName("td")[5];
    if (td || td1 || td2) {
      txtValue = td.textContent || td.innerText;
      txtValue1 = td1.textContent || td1.innerText;
      txtValue2 = td2.textContent || td2.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}


function edit(id) {
    let student;
    console.log(id);
    for (let i = 0; i < students.length; i++) {
        if (students[i]['ID'] == id) {
            student = students[i];
            break;
        }
    }

    document.querySelector("#name").value = student['name'];
    document.querySelector("#LastName").value = student['LastName'];
    document.querySelector("#email").value = student['email'];
    document.querySelector("#grade").value = student['grade'];
    document.querySelector("#degree").value = student['degree'];
    document.getElementById("submit").innerText = "Edit Student";

    global_id=id;
}

function del(id){
    students.forEach((student,index) => {
        if(student['ID']==id){
            students.splice(index,1);
            showTable();
        }
    })
}
// Toggle Archive Table visibility
document.getElementById('archiveButton').addEventListener('click', function () {
    const archiveContainer = document.getElementById('archiveContainer');
    if (archiveContainer.style.display === "none") {
        archiveContainer.style.display = "block";  // Show the archive table
        showArchiveTable();  // Display archived students
    } else {
        archiveContainer.style.display = "none";  // Hide the archive table
    }
});

// Show archived students in the table
function showArchiveTable() {
    const archiveTable = document.getElementById('archive-body');
    while (archiveTable.hasChildNodes()) {
        archiveTable.removeChild(archiveTable.firstChild); // Remove existing rows
    }

    // Loop through your archived students array and display them
    archivedStudents.forEach((student) => {
        const row = document.createElement("tr");
        const keys = Object.keys(student);

        var id = document.createElement('td');
        const name = document.createElement('td');
        const lastName = document.createElement('td');
        const email = document.createElement('td');
        const degree = document.createElement('td');
        const actions = document.createElement('td');

        keys.forEach((key) => {
            if (key === 'ID') {
                id.innerHTML = student[key];
            } else if (key === 'name') {
                name.innerHTML = student[key];
            } else if (key === 'LastName') {
                lastName.innerHTML = student[key];
            } else if (key === 'email') {
                email.innerHTML = student[key];
            } else if (key === 'degree') {
                degree.innerHTML = student[key];
            }
        });

        actions.innerHTML = `<a href="#" onClick="restoreStudent(${student['ID']})" class="fa">&#xf0c7;</a>`; // For restoring
        row.appendChild(id);
        row.appendChild(name);
        row.appendChild(lastName);
        row.appendChild(email);
        row.appendChild(degree);
        row.appendChild(actions);
        archiveTable.appendChild(row);
    });
}

// Archive an item
function archiveStudent(id) {
    const studentIndex = students.findIndex(student => student.ID === id);
    const studentToArchive = students.splice(studentIndex, 1)[0];  // Remove from the main list
    archivedStudents.push(studentToArchive);  // Add to the archive

    showTable();  // Update the active student table
}

// Restore an archived student
function restoreStudent(id) {
    const studentIndex = archivedStudents.findIndex(student => student.ID === id);
    const studentToRestore = archivedStudents.splice(studentIndex, 1)[0];  // Remove from the archive
    students.push(studentToRestore);  // Restore to the active list

    showTable();  // Update the active student table
    showArchiveTable();  // Update the archive table
}

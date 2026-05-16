const API_URL = "http://localhost:8080/employees";

function addEmployee() {
    const id = document.getElementById("employeeId").value;

    const employee = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value,
        salary: document.getElementById("salary").value
    };

    if (id) {
        fetch(API_URL + "/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })
        .then(response => response.json())
        .then(data => {
            alert("Employee updated successfully!");
            clearForm();
            getEmployees();
        })
        .catch(error => {
            alert("Error updating employee");
            console.log(error);
        });
    } else {
        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })
        .then(response => response.json())
        .then(data => {
            alert("Employee added successfully!");
            clearForm();
            getEmployees();
        })
        .catch(error => {
            alert("Error adding employee");
            console.log(error);
        });
    }
}

function getEmployees() {
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById("employeeTable");
        tableBody.innerHTML = "";

        data.forEach(employee => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;

            row.querySelector(".edit-btn").addEventListener("click", function () {
                editEmployee(employee);
            });

            row.querySelector(".delete-btn").addEventListener("click", function () {
                deleteEmployee(employee.id);
            });

            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        alert("Error fetching employees");
        console.log(error);
    });
}

function editEmployee(employee) {
    document.getElementById("employeeId").value = employee.id;
    document.getElementById("name").value = employee.name;
    document.getElementById("email").value = employee.email;
    document.getElementById("department").value = employee.department;
    document.getElementById("salary").value = employee.salary;

    document.getElementById("formTitle").innerText = "Update Employee";
    document.getElementById("submitBtn").innerText = "Update Employee";
}

function deleteEmployee(id) {
    fetch(API_URL + "/" + id, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(data => {
        alert("Employee deleted successfully!");
        getEmployees();
    })
    .catch(error => {
        alert("Error deleting employee");
        console.log(error);
    });
}

function clearForm() {
    document.getElementById("employeeId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("department").value = "";
    document.getElementById("salary").value = "";

    document.getElementById("formTitle").innerText = "Add Employee";
    document.getElementById("submitBtn").innerText = "Add Employee";
}
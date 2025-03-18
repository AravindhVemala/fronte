// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRa6In3qCGRnw082rKSVLg6cxRa9eJZIc",
  authDomain: "testapp-a8a64.firebaseapp.com",
  projectId: "testapp-a8a64",
  storageBucket: "testapp-a8a64.firebasestorage.app",
  messagingSenderId: "223060596409",
  appId: "1:223060596409:web:bf32b04e6a76597087ed68"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

//const auth = firebase.auth();

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// Signup function
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Signup Successful!");
    })
    .catch((error) => {
      alert(error.message);
    });
}

// function signup() {
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       alert("Signup Successful!");
//     })
//     .catch((error) => {
//       alert(error.message);
//     });
// }

// Login function
// function login() {
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   auth.signInWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       alert("Login Successful!");
//       loadTasksForUser(userCredential.user.uid);
//     })
//     .catch((error) => {
//       alert(error.message);
//     });
// }

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Login Successful!");
            console.log("User logged in:", userCredential.user);
        })
        .catch((error) => {
            alert(error.message);
            console.error("Login error:", error.message);
        });
}


// // Logout function
// function logout() {
//   auth.signOut()
//     .then(() => {
//       alert("Logged out!");
//     })
//     .catch((error) => {
//       alert(error.message);
//     });
// }

function logout() {
    auth.signOut()
        .then(() => {
            alert("Logged out successfully!");
            console.log("User logged out");
        })
        .catch((error) => {
            alert(error.message);
            console.error("Logout error:", error.message);
        });
}

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("User is logged in:", user.email);
        document.getElementById("user-info").innerText = `Welcome, ${user.email}`;
    } else {
        console.log("No user logged in.");
        document.getElementById("user-info").innerText = "Not logged in";
    }
});


function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") return; // Prevent empty tasks

    fetch("https://test-guv3.onrender.com/tasks", { // Your backend URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: taskText })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Task added:", data);
        taskInput.value = ""; // Clear input
        fetchTasks(); // Reload tasks
    })
    .catch(error => console.error("Error adding task:", error));
}

// async function addTask() {
//     const taskInput = document.getElementById("taskInput").value;

//     if (!taskInput) {
//         alert("Please enter a task");
//         return;
//     }

//     try {
//         const response = await fetch(`${API_URL}/tasks`, {  // ✅ Must be `/tasks`, not `/`
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ text: taskInput }),
//         });

//         if (!response.ok) {
//             throw new Error("Failed to add task");
//         }

//         console.log("Task added successfully");
//         document.getElementById("taskInput").value = ""; // Clear input field
//         fetchTasks(); // Refresh task list
//     } catch (error) {
//         console.error("Error adding task:", error);
//     }
// }

// function addTask() {
//     const taskText = document.getElementById("task-input").value;
//     const user = auth.currentUser;

//     if (!user) {
//         alert("You must be logged in to add tasks.");
//         return;
//     }

//     fetch("https://test-guv3.onrender.com/tasks", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: taskText, userId: user.uid })
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log("Task added:", data);
//         fetchTasks(); // Refresh task list
//     })
//     .catch(error => console.error("Error adding task:", error));
// }

function addTask() {
    const taskText = document.getElementById("taskInput").value;
    const user = firebase.auth().currentUser; // Get logged-in user

    if (!user) return alert("Please log in to add tasks.");
    if (!taskText) return alert("Task cannot be empty.");

    fetch("https://test-guv3.onrender.com/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: taskText, userId: user.uid })
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById("taskInput").value = "";
        fetchTasks(); // Refresh task list
    })
    .catch(error => console.error("Error adding task:", error));
}


const API_URL = "https://test-guv3.onrender.com"; // Your backend URL

// async function fetchTasks() {
//     try {
//         const response = await fetch(`${API_URL}/tasks`);
//         const data = await response.json();
//         console.log("Tasks received:", data); // ✅ Check if tasks are received
        
//         // Render tasks in your HTML (modify based on your UI)
//         document.getElementById("taskList").innerHTML = data.map(task => 
//             `<li>${task.text} <button onclick="deleteTask('${task._id}')">Delete</button></li>`
//         ).join("");

//     } catch (error) {
//         console.error("Error fetching tasks:", error);
//     }
// }

// function fetchTasks() {
//     const user = auth.currentUser;
//     if (!user) {
//         console.log("No user is logged in.");
//         return;
//     }

//     fetch(`https://test-guv3.onrender.com/tasks?userId=${user.uid}`)
//         .then(response => response.json())
//         .then(data => {
//             document.getElementById("task-list").innerHTML = "";
//             data.forEach(task => {
//                 document.getElementById("task-list").innerHTML += `<li>${task.text} <button onclick="deleteTask('${task._id}')">Delete</button></li>`;
//             });
//         })
//         .catch(error => console.error("Error fetching tasks:", error));
// }

// function fetchTasks() {
//     const user = firebase.auth().currentUser; // Get logged-in user
//     if (!user) return alert("Please log in to view tasks.");

//     fetch(`https://test-guv3.onrender.com/tasks?userId=${user.uid}`)
//         .then(response => response.json())
//         .then(tasks => {
//             const taskList = document.getElementById("taskList");
//             taskList.innerHTML = "";
//             tasks.forEach(task => {
//                 taskList.innerHTML += `<li>${task.text}</li>`;
//             });
//         })
//         .catch(error => console.error("Error fetching tasks:", error));
// }

function fetchTasks() {
    fetch("https://test-guv3.onrender.com/tasks")
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById("task-list");
            taskList.innerHTML = ""; // Clear existing tasks

            tasks.forEach(task => {
                const li = document.createElement("li");
                li.textContent = task.text;

                // Add Delete Button
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.onclick = () => deleteTask(task._id);
                li.appendChild(deleteButton);

                taskList.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching tasks:", error));
}



// async function deleteTask(taskId) {
//     try {
//         const response = await fetch(`${API_URL}/tasks/${taskId}`, {  
//             method: "DELETE",
//         });

//         if (!response.ok) {
//             throw new Error("Failed to delete task");
//         }

//         console.log("Task deleted successfully");
//         fetchTasks(); // Refresh the list after deleting
//     } catch (error) {
//         console.error("Error deleting task:", error);
//     }
// }

window.onload = fetchTasks; // Load tasks when page loads



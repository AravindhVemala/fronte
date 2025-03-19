// Import the functions you need from the SDKs you need


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";





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
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);



window.signup = function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Signup Successful!");
        })
        .catch((error) => {
            alert(error.message);
        });
    }


function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Login Successful:", userCredential.user);
            alert("Login Successful!");
        })
        .catch((error) => {
            console.error("Error logging in:", error.message);
            alert(error.message);
        });
}
window.login = login;



window.logout = function () {
    signOut(auth)
        .then(() => {
            alert("Logout successful!");
            
            // Clear tasks from the UI after logout
            const taskList = document.getElementById("taskList");
            if (taskList) {
                taskList.innerHTML = ""; // Remove all tasks from the screen
            }

            // Reload the page to reset state
            location.reload();

            // Optional: Redirect to login page
            // window.location.href = "index.html"; 
        })
        .catch((error) => {
            console.error("Logout error:", error);
            alert("Failed to log out!");
        });
};

window.logout = function () {
    signOut(auth)
        .then(() => {
            alert("Logout successful!");

            // Clear tasks from the UI after logout
            const taskList = document.getElementById("taskList");
            if (taskList) {
                taskList.innerHTML = ""; // Remove all tasks from the screen
            }

            // Reload the page to reset state
            location.reload();
        })
        .catch((error) => {
            console.error("Logout error:", error);
            alert("Failed to log out!");
        });
};



auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("User is logged in:", user.email);
        document.getElementById("user-info").innerText = `Welcome, ${user.email}`;
    } else {
        console.log("No user logged in.");
        document.getElementById("user-info").innerText = "Not logged in";
    }
});


const API_URL = "https://test-guv3.onrender.com"; // Your backend URL





window.addTask = async function () {
    const user = auth.currentUser;
    if (!user) {
        alert("You must be logged in to add tasks.");
        return;
    }

    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();
    
    if (text === "") {
        alert("Task cannot be empty!");
        return;
    }

    try {
        const response = await fetch("https://test-guv3.onrender.com/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${await user.getIdToken()}`
            },
            body: JSON.stringify({ text, userId: user.uid }) // Ensure userId is included
        });

        if (!response.ok) throw new Error("Failed to add task");

        taskInput.value = ""; // Clear input after adding task
        fetchTasks(); // Refresh task list
    } catch (error) {
        console.error("Error adding task:", error);
    }
};





async function fetchTasks() {
    const user = auth.currentUser;
    if (!user) {
        console.log("No user logged in.");
        return;
    }

    try {
        const token = await user.getIdToken();  // Get Firebase auth token

        const response = await fetch("https://test-guv3.onrender.com/tasks", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }

        const tasks = await response.json();
        console.log("Fetched Tasks:", tasks);

        const taskList = document.getElementById("taskList");
        if (!taskList) return;

        taskList.innerHTML = ""; // Clear previous tasks

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task.text;

            // Create delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = async function () {
                await deleteTask(task._id);
                fetchTasks(); // Refresh after delete
            };

            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}



async function deleteTask(taskId) {
    const user = auth.currentUser;
    if (!user) {
        console.log("No user logged in.");
        return;
    }

    try {
        const token = await user.getIdToken();

        const response = await fetch(`https://test-guv3.onrender.com/tasks/${taskId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error("Failed to delete task");
        }

        fetchTasks(); // Refresh the list after deletion
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

window.onload = fetchTasks; // Load tasks when page loads



// const API_URL = "https://test-guv3.onrender.com"; // Your Render backend URL

// async function deleteTask(taskId) {
//     try {
//         const response = await fetch(`${API_URL}/tasks/${taskId}`, {  // ✅ Task ID must be included
//             method: "DELETE",
//         });

//         if (!response.ok) {
//             throw new Error("Failed to delete task");
//         }

//         console.log("Task deleted successfully");
//         fetchTasks(); // Refresh task list after deletion
//     } catch (error) {
//         console.error("Error deleting task:", error);
//     }
// }



// const API_URL = "https://test-guv3.onrender.com";

// async function fetchTasks() {
//     const response = await fetch(`${API_URL}/tasks`);
//     const tasks = await response.json();

//     const taskList = document.getElementById("taskList");
//     taskList.innerHTML = ""; // Clear old tasks

//     tasks.forEach(task => {
//         let li = document.createElement("li");
//         li.textContent = task.text;

//         let deleteBtn = document.createElement("button");
//         deleteBtn.textContent = "Delete";
//         deleteBtn.onclick = async () => {
//             await fetch(`${API_URL}/${task.id}`, { method: "DELETE" });
//             fetchTasks(); // Refresh list
//         };

//         li.appendChild(deleteBtn);
//         taskList.appendChild(li);
//     });
// }

async function addTask() {
    const taskInput = document.getElementById("taskInput").value;

    if (!taskInput) {
        alert("Please enter a task");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/tasks`, {  // ✅ Must be `/tasks`, not `/`
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: taskInput }),
        });

        if (!response.ok) {
            throw new Error("Failed to add task");
        }

        console.log("Task added successfully");
        document.getElementById("taskInput").value = ""; // Clear input field
        fetchTasks(); // Refresh task list
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

const API_URL = "https://test-guv3.onrender.com"; // Your backend URL

async function fetchTasks() {
    try {
        const response = await fetch(`${API_URL}/tasks`);
        const data = await response.json();
        console.log("Tasks received:", data); // ✅ Check if tasks are received
        
        // Render tasks in your HTML (modify based on your UI)
        document.getElementById("taskList").innerHTML = data.map(task => 
            `<li>${task.text} <button onclick="deleteTask('${task._id}')">Delete</button></li>`
        ).join("");

    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

async function deleteTask(taskId) {
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {  
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete task");
        }

        console.log("Task deleted successfully");
        fetchTasks(); // Refresh the list after deleting
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

window.onload = fetchTasks; // Load tasks when page loads




let greetingElement = document.getElementById('greeting'); 
if (greetingElement) {
    let name = localStorage.getItem('name') || "Guest";
    greetingElement.innerHTML = "Hello " + name;
}
let allCategories = [];
let allTasks = [];

console.log("we got here");

async function getTasks() {
    try {
        let response = await fetch('/tasks');
        
        if (response.status == 401) {
            console.log("Not logged in, redirecting...");
            
            window.location.href = '/login'; 
            return;
        }
        document.getElementById('mainBody').style.display = 'block';
        
        let data = await response.json();
        if (response.status == 400) {
            
            return;
        }
        createTable(data);
    } catch (err) {
        console.error("Fetch error:", err);
    }
}




    


function createTable(data) {
    let txt = "";
    for (obj of data) {
        if (obj) {
            let isChecked = obj.is_done ? "checked" : "";
            let rowClass = obj.is_done ? "class='rowClass'" : "";
            // let catName = allCategories[obj.category_id] ? allCategories[obj.category_id].name : '--';
            txt += `<tr ${rowClass}>`;
            txt += `<td><input type="checkbox" ${isChecked} onchange="taskDone(${obj.id},this)"></td>`;
            txt += `<td>${obj.name}</td>`;
            txt += `<td>${obj.category_id}</td>`;
            txt += `<td><button onclick="deleteTask(${obj.id})">🗑️</button></td>`;
            txt += `<td><button onclick="taskToEdit(${obj.id})">✏️</button></td>`;
            txt += "</tr>";
        }
    }
    document.getElementById('myTable').innerHTML = txt;
}

async function taskDone(id, elm){
    let is_done =  elm.checked;
    try{

        let response = await fetch(`/tasks/${id}`, {
            method:'PATCH',
            headers: { 'Content-Type':'application/json' },
            body:JSON.stringify({ is_done }),
        });
        
        getTasks();

    }catch(err){
        alert(err);
    }
    
}
getTasks();

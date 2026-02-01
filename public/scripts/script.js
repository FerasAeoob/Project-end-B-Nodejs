
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
        allTasks = data;
        createSelect(allCategories);
        createTable(allTasks);
        
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
            txt += `<td>${obj.text}</td>`;
            txt += `<td>${obj.category_name}</td>`;
            txt += `<td><button onclick="deleteTask(${obj.id})">🗑️</button></td>`;
            txt += `<td><button onclick="taskToEdit(${obj.id})">✏️</button></td>`;
            txt += "</tr>";
        }
    }
    document.getElementById('myTable').innerHTML = txt;
    
}

function createSelect(data) {
    let txt = `<option value="0">All</option>`;
    for (obj of data) {
        if (obj) {
            txt += `<option value="${obj.id}">${obj.name}</option>`;
        }
    }
    document.getElementById('mySelect').innerHTML = txt;
    
}

function sortTable() {
    let val = document.getElementById('mySelect').value;
    let sorted = allTasks.filter(t => t.category_id == val);
    if(val == 0){
        createTable(allTasks);
    }
    else{
    createTable(sorted);
    }
    
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
async function getCategories() {
    try {
        let response = await fetch('/categories');
        if (response.status == 401) {
            window.location.href = '/login';
            return;
        }
         if (response.status === 204) {
            allCategories = [];
            createSelect(allCategories);
            return;
        }
        let text = await response.text();
        allCategories = text ? JSON.parse(text) : [];
        createSelect(allCategories);
       
    } catch (err) {
        alert(err)
    }
}


async function deleteTask(id) {
    try{
        let response = await fetch(`/tasks/${id}`,{
            method:'DELETE',
        });
        let data = await response.json();
        if(!response.ok){
            alert(data.message);
        }
        
        getTasks()
        
    }catch(err){

    }
    
}

async function addTask() {
   
    try{
        let text = document.getElementById('text').value;
        let category_id =  document.getElementById('mySelect').value;
        if(category_id == 0){
            category_id = null;
        }
        let response = await fetch('/tasks',{
            method:'POST',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify({text,category_id}),
        })
        getTasks();
    }   
    catch(err){
        console.error('add task function failed');
    }
}
getCategories();
getTasks()


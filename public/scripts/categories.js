
let greetingElement = document.getElementById('greeting'); 
if (greetingElement) {
    let name = localStorage.getItem('name') || "Guest";
    greetingElement.innerHTML = "Hello " + name;
}
let allCategories = [];
let allTasks = [];

console.log("we got here");



   
function createTable(data) {
    let txt = "";
    for (obj of data) {
        if (obj) {
            let name = obj.name;
            // let catName = allCategories[obj.category_id] ? allCategories[obj.category_id].name : '--';
            txt += `<tr>`;
            txt += `<td>${name}</td>`;
            txt += `<td><button onclick="deleteCat(${obj.id})">🗑️</button></td>`;
            txt += `<td><button onclick="CatToEdit(${obj.id})">✏️</button></td>`;
            txt += "</tr>";
        }
    }
    document.getElementById('myTable').innerHTML = txt;
    
}


async function getCategories() {
    try {
        let response = await fetch('/categories');
        if (response.status == 401) {
            window.location.href = '/login';
            return;
        }
        document.getElementById('mainBody').style.display = 'block';
         if (response.status === 204) {
            allCategories = [];
            createTable(allCategories);
            return;
        }
        let text = await response.text();
        allCategories = text ? JSON.parse(text) : [];
        createTable(allCategories);
       
    } catch (err) {
        alert(err)
    }
}


async function deleteCat(id) {
    try {
        let response = await fetch(`/categories/${id}`, { method: 'DELETE' });

        if (response.status === 409) {
            let data = await response.json();
            if (confirm(data.message)) {
                let secondResponse = await fetch(`/categories/force/${id}`, { method: 'DELETE' });
                if (secondResponse.status == 200) {
                    alert("Everything deleted!");
                }
            }
        } 
        
        getCategories(); 
        
    } catch (err) {
        console.error(err);
    }
}
    


async function addCat() {
   
    try{
        let name = document.getElementById('name').value;
        
        let response = await fetch('/categories',{
            method:'POST',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify({name}),
        })
        getCategories();
    }   
    catch(err){
        console.error('add task function failed');
    }
}

async function CatToEdit(id) {
    try{
        let name = document.getElementById('name').value;
        let response = await fetch(`/categories/${id}`,{
            method:'PATCH',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify({name,id}),
        });
        getCategories();
        document.getElementById('name').value = "";
    }catch(err){
        alert(err);
    }
}
getCategories();



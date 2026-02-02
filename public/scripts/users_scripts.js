let greetingElement = document.getElementById('greeting'); 
if (greetingElement) {
    let name = localStorage.getItem('name') || "Guest";
    greetingElement.innerHTML = "Hello " + name;
}
let allUsers = [];

function createTable(data) {
    let txt = "";
    for (obj of data) {
        if (obj) {
            let name = obj.name;
            txt += `<tr>`;
            txt += `<td>${name}</td>`;
            txt += `<td>${obj.username}</td>`;
            txt += `<td>${obj.email}</td>`;
            txt += `<td><button onclick="deleteUser(${obj.id})">🗑️</button></td>`;
            txt += `<td><button onclick="userToEdit(${obj.id})">✏️</button></td>`;
            txt += "</tr>";
        }
    }
    document.getElementById('myTable').innerHTML = txt;
    
}


async function getUsers() {
    try {
        let response = await fetch('/users');
        
        if (response.status == 401) {
            console.log("Not logged in, redirecting...");
            
            window.location.href = '/login'; 
            return;
        }
        document.getElementById('mainBody').style.display = 'block';
        
        let data = await response.json();
        if (!response.ok) {
            alert(data.message);
            return;
        }
        allUsers = data;
        
        createTable(allUsers);
        
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

async function deleteUser(id) {
    try{
        let response = await fetch(`/users/${id}`,{
            method:'DELETE'
        });
        let data = await response.json();
        if (!response.ok) {
            alert(data.message);
            return;
        }
        
        getUsers();
    }catch(err){
        throw err;
    }
}

async function userToEdit(id) {
    try{
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let response = await fetch(`/users/${id}`, {
            method:'PATCH',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify({name,email,username,password}),
        });
        let data = await response.json();
        if (!response.ok){
            alert(data.message);
            return;
        }

        getUsers();
        document.getElementById('name').value ="";
        document.getElementById('email').value = "";
        document.getElementById('username').value= "";
        document.getElementById('password').value = "";
        
        
    }catch(err){
        throw err;
    }
}
async function reg() {
    let name = document.getElementById('name').value;
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    
    try{
        let response = await fetch('/auth/reg',{
            method:'POST',
            headers: { 'Content-Type':'application/json' },
            body:JSON.stringify({name,email,username,password}),
        });
        getUsers();
        let data = await response.json(); 
        alert(data.message);
        

    }catch(err){
        alert(err);
    }

}
getUsers();
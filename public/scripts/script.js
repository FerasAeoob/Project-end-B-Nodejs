let greeting = "Hello";
greeting += ` ${localStorage.getItem('name')}`;
document.getElementById('greeting').innerHTML = greeting;

async function getTasks() {
    try{
        let response = await fetch('/tasks')
        let data = await response.json();
        console.log(data);
    }
    catch(err){
        console.error(err);
    }
    
}

getTasks();
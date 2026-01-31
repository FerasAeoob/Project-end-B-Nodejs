async function  register() {
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
        let data = await response.json();
        alert(data.message);

    }catch(err){
        alert(err);
    }

    
}
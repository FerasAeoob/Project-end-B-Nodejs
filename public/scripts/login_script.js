async function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    try{
    let response = await fetch('/auth/login',{
        method:'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({username,password}),
    });
    let data = await response.json();
    if (response.status == 200){
        localStorage.setItem('name',data.name);
        window.location.href = '/';
        return;
    }
    
    alert(data.message);
    }catch(err){
        alert(err);
    }
    
}
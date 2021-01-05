function handleInput() {
    var username = document.getElementById("username").value;
    var auth = document.getElementById("auth").value !== "" ? document.getElementById("auth").value : undefined;
    main(username, auth);
}

async function getRequest(url, auth) {
    const headers = {
        'Authorization': `Token ${auth}`
    }
    const response = (auth == undefined) ? await fetch(url) : await fetch(url, {
        "method": "GET",
        "headers": headers
    });
}

async function main(username, auth) {
    let url = `https://api.github.com/users/${username}/repos`;
    let repos = await getRequest(url, auth).catch(error => console.error(error));
}
function handleInput() {
    var username = document.getElementById("username").value;
    main(username);
}

async function getRequest(url) {
    const response = await fetch(url);
    let data = await response.json();
    return data;
}

async function main(username) {
    let url = `https://api.github.com/users/${username}/repos`;
    let repos = await getRequest(url).catch(error => console.error(error));
}
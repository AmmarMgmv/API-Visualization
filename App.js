function handleInput() {
    var user = document.getElementById("user").value;

    main(user);
}

async function getRequest(url) {
    const response = await fetch(url);
    let data = await response.json();
    return data;
}

async function main(user) {
    let url = `https://api.github.com/users/${user}/repos`;
    let repo = await getRequest(url).catch(error => console.error(error));

    language(repo, user);
}

async function language(repo, user) {
    let label = [];
    let data = [];
    let backgroundColor = [];

    for (i in repo) {
        let url = `https://api.github.com/repos/${user}/${repo[i].name}/languages`;
        let languages = await getRequest(url).catch(error => console.error(error));

        for (language in languages) {

            if (label.includes(language)) {
                for (j = 0; j < label.length; j++)
                    if (language == label[i])
                        data[j] = data[i] + languages[language];

            } else {
                label.push(language);
                data.push(languages[language]);
                backgroundColor.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`);
            }
        }

    }

    draw('doughnutChart', 'doughnut', 'languages', 'Languages Used', label, data, backgroundColor);

}

function draw(ctx, type, datasetLabel, titleText, label, data, backgroundColor) {

    new Chart(doughnutChart, {
        type: type,
        data: {
            labels: label,
            datasets: [{
                label: datasetLabel,
                data: data,
                backgroundColor: backgroundColor,
                borderWidth: 1,
                borderColor: '#777',
                hoverBorderWidth: 2,
                hoverBorderColor: '#000'
            }],

        },
    });
}
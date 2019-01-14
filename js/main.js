const content				= document.getElementById("content-container");
const repoList				= document.getElementById("RepoList");

content.style.opacity		= 0;
document.body.style.opacity = 0;

function setContent(ID) {
	content.style.opacity	= 0;
	let newContent			= document.getElementById(ID).innerHTML;

	content.innerHTML		= newContent;
}

function increaseOpacity() {
	let contentCurrent = parseFloat(content.style.opacity);
	if ( contentCurrent < 1.0 ) {
		content.style.opacity = contentCurrent + 0.1;
	}

	let documentCurrent = parseFloat(document.body.style.opacity);
	if ( documentCurrent < 1.0) {
		document.body.style.opacity = documentCurrent + 0.05;
	}
}

let opacityTimer = setInterval(increaseOpacity, 50);

window.setContent = setContent;

setContent("WelcomeText");

fetch("https://api.github.com/users/ChristianSilvermoon/repos?perpage=100&page=1", {"Accept": "application/vnd.github.v3.full+json"}).then( r => r.json()).then( repos => {
	RepoList.innerHTML += `<span class="smallText">Displaying ${repos.length} GitHub Repositories.</span>`
	repos.forEach( repo => {
		console.log(repo);
		let buffer = `<div class="box"><b><a href="${repo.html_url}">${repo.name}</a>`;
		buffer += `</b><br/><i>${repo.description}</i><br/>`;

		if ( repo.has_pages ) {
			buffer += `<br/>This project has content you can interact with on <a href="${repo.name}">GitHub Pages</a><br/>`;
		}

		buffer += `<br/><span class="smallText">Language: ${repo.language == null? "Unknown" : repo.language } | License: ${repo.license == null? "Not Licensed": repo.license.name}<br>`
		buffer += `Latest Change Pushed: ${new Date(repo.pushed_at).toLocaleString()} </span></div>`

		RepoList.innerHTML += buffer;
	});
});

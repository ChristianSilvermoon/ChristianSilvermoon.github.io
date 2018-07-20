const content				= document.getElementById("content-container");
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

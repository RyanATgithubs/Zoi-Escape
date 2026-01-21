////////////////// 
// Client Secrets
const clientID = "716401733069-0123nu4bknhhc63a69pm3vpkcggsh9m5.apps.googleusercontent.com";
const authURI = "https://accounts.google.com/o/oauth2/auth";
const redirectURI = "https://ryanatgithubs.github.io/Zoi-Escape/pages/security/auth_callback.html";

////////////////// 
// AUTHENTICATION
const signinWindow = document.querySelector(".signin-window");
const signinBttn = document.getElementById("google-signin-button");
const authOverlay = document.getElementById("auth-overlay");

let googleAuthPopup = null;

signinBttn.addEventListener("click", StartGoogleSignIn);

function StartGoogleSignIn() {
	authOverlay.style.display = "flex";

	const authURL = `${authURI}` +
					`?client_id=${clientID}` +
					`&redirect_uri=${encodeURIComponent(redirectURI)}` +
					`&response_type=token` +
                    `&scope=email profile`;

    googleAuthPopup = window.open(authURL, "Google Auth", "width=500,height=600"); 
}

function OnSigninSuccess() {
	if (googleAuthPopup) googleAuthPopup.close();
	signinWindow.style.display = "none";
	authOverlay.style.display = "none";
	loadGame();
}

function OnSignOut() {
	signinWindow.style.display = "block";
}

function CancelSignin() {
	if (googleAuthPopup) googleAuthPopup.close();
	if (signinWindow === null) console.log("signin window is null");
	authOverlay.style.display = "none";
	signinWindow.style.display = "block";
}

window.addEventListener("message", (event) => {
	if (event.data.type = "GOOGLE_AUTH_SUCCESS") {
		OnSigninSuccess();
		console.log("Signin success");
	}
}, false);

/////////
// UNITY
const unityCanvas = `
				<canvas id="unity-canvas"></canvas>
                <div id="unity-loading-bar">
                    <div id="unity-logo"></div>
                    <div id="unity-progress-bar-empty">
                        <div id="unity-progress-bar-full"></div>
                    </div>
                </div>

                <div id="unity-warning"></div>

                <div id="unity-footer">
                    <button id="full-screen-bttn">Expand</button> 
                </div>
				<script src="game-loader.js" defer></script>
				`;

const unityContainer = document.getElementById("unity-container");

function createHtmlElement(html) {
	const template = document.createElement("template");
	template.innerHTML = html.trim();
	return template.content;
}
 
function loadGame() {
	unityContainer.appendChild(createHtmlElement(unityCanvas));

	const gameLoader = document.createElement("script");
	gameLoader.src = "game-loader.js";
	gameLoader.defer = true;
	document.body.appendChild(gameLoader);
}
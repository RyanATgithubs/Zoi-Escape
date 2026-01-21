////////////////// 
// Client Secrets
const clientID = "716401733069-0123nu4bknhhc63a69pm3vpkcggsh9m5.apps.googleusercontent.com";
const authURI = "https://accounts.google.com/o/oauth2/auth";
const redirectURI = "https://ryanatgithubs.github.io/Zoi-Escape/pages/security/auth_callback.html";

////////////////// 
// AUTHENTICATION
const signinWindow = document.querySelector(".signin-window");
const signinBttn = document.getElementById("google-signin-button");
const cancelSigninBttn = document.getElementById("cancel-signin-button");

const unityContainer = document.getElementById("unity-container");

let googleAuthPopup = null;

signinBttn.addEventListener("click", StartGoogleSignIn);
cancelSigninBttn.addEventListener("click", CancelSignin);

function StartGoogleSignIn() {

	const authURL = `${authURI}` +
					`?client_id=${clientID}` +
					`&redirect_uri=${encodeURIComponent(redirectURI)}` +
					`&response_type=token` +
                    `&scope=email profile`;

    googleAuthPopup = window.open(authURL, "Google Auth", "width=500,height=600"); 
}

function OnSigninSuccess() {
	openSigninWindow(false);
	openGameWindow();
}

function OnSignOut() {
	openSigninWindow(true);
	closeGameWindow();
}

function CancelSignin() {
	if (googleAuthPopup) googleAuthPopup.close();
	openSigninWindow(true);
}

window.addEventListener("message", (event) => {
	if (event.data.type === "GOOGLE_AUTH_SUCCESS") {
		OnSigninSuccess();
		console.log("Signin success");
	}
}, false);

function openSigninWindow(isOpen) {
	signinWindow.style.display = isOpen ? "block" : "none";
}

/////////
// UNITY
import { loadGame, unloadGame } from "./game-loader.js";

function openGameWindow() {
	unityContainer.style.display = "flex";
	loadGame();
}

async function closeGameWindow() {
	await unloadGame(); // Wait the unity finish unloading;
	unityContainer.style.display = "none";
}
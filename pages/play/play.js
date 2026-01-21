////////////////// 
// AUTHENTICATION
const signinWindow = document.querySelector(".signin-window");
const signinBttn = document.querySelector(".gsi-material-button");

const unityContainer = document.getElementById("unity-container");

import { StartGoogleSignIn, CheckAuthSession } from "./../security/authenticator.js";
signinBttn.addEventListener("click", StartGoogleSignIn);

window.addEventListener("load", CheckAuthSession); // Check for saved session immediately


function OnSigninSuccess() {
	openGameWindow();
	openSigninWindow(false);
}

function OnSignOut() {
	openSigninWindow(true);
	closeGameWindow();
}

////////////////////////////////////
// AUTH CALLBACK LISTENER
window.addEventListener("message", (event) => {
	if (event.data.type === "GOOGLE_AUTH_SUCCESS") {
		OnSigninSuccess();
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

////////////////// 
// Client Details
const clientID = "716401733069-0123nu4bknhhc63a69pm3vpkcggsh9m5.apps.googleusercontent.com";
const authURI = "https://accounts.google.com/o/oauth2/auth";
const redirectURI = "https://ryanatgithubs.github.io/Zoi-Escape/Views/auth_callback.html";

let googleAuthPopup = null;

export function StartGoogleSignIn() {

	const authURL = `${authURI}` +
					`?client_id=${clientID}` +
					`&redirect_uri=${encodeURIComponent(redirectURI)}` +
					`&response_type=token` +
                    `&scope=email profile`;

    googleAuthPopup = window.open(authURL, "Google Auth", "width=500,height=600"); 
}


function CancelSignin() {
	if (googleAuthPopup) googleAuthPopup.close();
}

////////////////////////////////////
// AUTH CALLBACK LISTENER
const tokenName = "zoi-escape-session-token";
window.addEventListener("message", (event) => {
	if (event.data.type === "GOOGLE_AUTH_SUCCESS") {
		
		SaveAuthSession(event.data.token);

	} else if (event.data.type === "GOOGLE_AUTH_FAILED") {
		CancelSignin();
		window.alert("Authentication failed:", event.data.error);
	}
}, false);

function SaveAuthSession(token) {
	sessionStorage.setItem(tokenName, token);
}


// Checks for Saved Auth Session
export function CheckAuthSession() {
	const cachedToken = sessionStorage.getItem(tokenName);
	if (cachedToken) {
		window.postMessage({ type: "GOOGLE_AUTH_SUCCESS", token: cachedToken }, "*");
	}
}

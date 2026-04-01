import "./TabButton.js";
import "./item.js";
import { StartGoogleSignIn, CheckAuthSession } from "../authenticator.js"; //import auth script
import { loadGame, unloadGame } from "../game-loader.js"; //import game loader script

const viewContainer = document.getElementById("view-container"); //MAinview Container
// Cached View Paths
const viewPaths = {
    "HOME": "./Views/home-view.html",
    "PLAY": "./Views/play-view.html",
    "CHARACTERS": "./Views/characters-view.html",
    "DEV INFO": "./Views/dev-info-view.html"
};

class TabController extends HTMLElement {
    constructor() {
        super();
        this.tabButtons = [];
        this.activeTab = null;
    }

    connectedCallback() {
        this.render();
        this.getButtons();
        this.setupEvents();
        
        const initialTab = this.validateOnLoad();
        this.activeTab = initialTab;
        this.changeTab(initialTab);
    };

    render() { 
        this.className = "block"; 

        this.innerHTML = `
            <nav class="flex flex-row items-center justify-end gap-10">
                <tab-button name="HOME" active></tab-button>
                <tab-button name="PLAY"></tab-button>
                <tab-button name="CHARACTERS"></tab-button>
                <tab-button name="DEV INFO"></tab-button>
            </nav>
        `;
    }

    getButtons() {
        this.tabButtons = this.querySelectorAll("tab-button");
    }

    setupEvents() {
        this.addEventListener("tab-click", async (event) => {
            const targetName = event.detail.name;
            
            if (this.activeTab === targetName) return; // return if same tab

            if (this.activeTab === "PLAY") {
                await unloadGame();
            }

            this.tabButtons.forEach(bttn => {
                const isMatch = bttn.getAttribute("name") === targetName;
                if (isMatch) {
                    bttn.setAttribute("active", ""); 
                } else {
                    bttn.removeAttribute("active"); 
                }
            });
            
            this.activeTab = targetName;
            this.changeTab(targetName);
        });
    }

    async changeTab(targetName) {
        try {
            const fragment = await fetch(viewPaths[targetName])
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to load view: ${response.statusText}`);
                    }
                    return response.text();
                });

            viewContainer.innerHTML = fragment;
            window.location.hash = targetName.toLowerCase();

            // initialze the views
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    try {
                        if (targetName === "HOME") {
                            initHomeView();
                        } else if (targetName === "PLAY") {
                            initPlayView();
                        }
                    } catch (initError) {
                        console.error(`[${targetName} View] Error occured on intialization:`, initError);
                    }
                });
            });

        } catch (error) {
            console.error("Error changing view:", error);
        }
    }

    validateOnLoad() {
        const currentHash = window.location.hash.replace('#', '').toUpperCase();
        const initialTab = viewPaths[currentHash] ? currentHash : "HOME";
        
        this.tabButtons.forEach(bttn => {
            if (bttn.getAttribute("name") === initialTab) {
                bttn.setAttribute("active", "");
            } else {
                bttn.removeAttribute("active");
            }
        });

        return initialTab;
    }
}

customElements.define("tab-controller", TabController);


////////////////// 
// HOME VIEW SECTION
////////////////// 

function initHomeView() {
    const bttnPlayDemo = document.getElementById("play-demo");
    const tabController = document.querySelector("tab-controller");

    if (bttnPlayDemo && tabController) {
        bttnPlayDemo.addEventListener("click", () => {
            tabController.dispatchEvent(new CustomEvent("tab-click", { // Go to Playview
                detail: { name: "PLAY" } 
            }));
        });
    }
}

////////////////// 
// PLAY VIEW SECTION
////////////////// 

function initPlayView() {
    const signinWindow = document.querySelector(".signin-window");
    const signinBttn = document.querySelector(".gsi-material-button");
    const unityContainer = document.getElementById("unity-container");

    if (!signinWindow || !signinBttn) {
        console.error("[Game UI] View elements not fully rendered in DOM.");
        return; 
    }

    function openSigninWindow(isOpen) {
        if (signinWindow) signinWindow.style.display = isOpen ? "block" : "none";
    }

    function openGameWindow() {
        if (unityContainer) {
            unityContainer.classList.remove("hidden");
        }
        loadGame();
    }

    async function closeGameWindow() {
        await unloadGame(); 
        if (unityContainer) {
            unityContainer.classList.add("hidden");
        }
    }

    function OnSigninSuccess() {
        openSigninWindow(false);

        // Wait for the window to fully render before opening the game window
        setTimeout(() => {
            openGameWindow();
        }, 300);
    }

    function OnSignOut() {
        openSigninWindow(true);
        closeGameWindow();
    }

    // Callbacks from authenticator.js
    window.OnSigninSuccess = OnSigninSuccess;
    window.OnSignOut = OnSignOut;
    window.onmessage = (event) => {
        if (event.data && event.data.type === "GOOGLE_AUTH_SUCCESS") {
            OnSigninSuccess();
        }
    };

    signinBttn.addEventListener("click", StartGoogleSignIn);

    OnSignOut(); 

    CheckAuthSession(); 
}
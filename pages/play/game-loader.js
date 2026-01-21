// 1. Initialize
let unityInstance = null;
let loaderScript = null;

// 2. PATH CONFIGURATION
var buildPath = "../../unity-build/Build"; 
var loaderUrl = buildPath + "/unity-build.loader.js";

// 3. DOM ELEMENTS
var canvas = document.querySelector("#unity-canvas");
var loadingBar = document.querySelector("#unity-loading-bar");
var progressBarFull = document.querySelector("#unity-progress-bar-full");
var fullScreenButton = document.querySelector("#full-screen-bttn");
var warningBanner = document.querySelector("#unity-warning");

// 4. ERROR BANNER FUNCTION
function unityShowBanner(msg, type) {
    function updateBannerVisibility() {
        warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
    }
    var div = document.createElement('div');
    div.innerHTML = msg;
    warningBanner.appendChild(div);
    if (type == 'error') div.style = 'background: red; padding: 10px; color: white;';
    else {
        if (type == 'warning') div.style = 'background: yellow; padding: 10px; color: black;';
        setTimeout(function() {
            warningBanner.removeChild(div);
            updateBannerVisibility();
        }, 5000);
    }
    updateBannerVisibility();
}

// 5. UNITY CONFIGURATION
const config = {
    dataUrl: buildPath + "/unity-build.data.unityweb",
    frameworkUrl: buildPath + "/unity-build.framework.js.unityweb",
    codeUrl: buildPath + "/unity-build.wasm.unityweb",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "Zoi_Escape",
    productVersion: "1.0",
    showBanner: unityShowBanner,
    errorHandler: function(err, url, line) {
        // Standard error handling
        console.error("Unity Error:", err); 
        return false; 
    },
};

// 6. LOAD THE GAME
export function loadGame() {
    if (unityInstance) return;
    loadingBar.style.display = "flex";

    loaderScript = document.createElement("script");
    loaderScript.src = loaderUrl;
    loaderScript.onload = () => {
        createUnityInstance(canvas, config, (progress) => {
            // Update the width of the blue bar
            progressBarFull.style.width = 100 * progress + "%";
        })
        .then((instance) => {
            unityInstance = instance;
            // GAME LOADED SUCCESS
            loadingBar.style.display = "none";
            
            // Activate the Full Screen Button
            fullScreenButton.onclick = () => {
                unityInstance.SetFullscreen(1);
            };
        })
        .catch((message) => {
            alert(message);
        });
    };

    document.body.appendChild(loaderScript);

    console.log("loaded the game successfully!");
}

export async function unloadGame() {
    if (!unityInstance) return;

    await unityInstance.Quit();

    unityInstance = null;
    if (loaderScript) {
        loaderScript.remove();
        loaderScript = null;
    }

    console.log("unloaded the game successfully!");
}

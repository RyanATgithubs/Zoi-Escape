// Assets/_Scripts/JavaScript/game-loader.js

let unityInstance = null;
let loaderScript = null;

const buildPath = "../../unity-build/Build"; 
const loaderUrl = buildPath + "/unity-build.loader.js";

export function loadGame() {
    if (unityInstance) return;

    const canvas = document.querySelector("#unity-canvas");
    const loadingBar = document.querySelector("#unity-loading-bar");
    const progressBarFull = document.querySelector("#unity-progress-bar-full");
    const fullScreenButton = document.querySelector("#full-screen-bttn");
    const container = document.querySelector("#unity-container");

    if (!canvas || !loadingBar || !container) {
        console.error("Unity container elements not found in the DOM.");
        return;
    }

    if (fullScreenButton) {
        fullScreenButton.onclick = () => {
            if (!document.fullscreenElement) {
                if (container.requestFullscreen) {
                    container.requestFullscreen();
                } else if (container.webkitRequestFullscreen) {
                    container.webkitRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        };
    }

    loadingBar.style.display = "flex";

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
            console.warn("[Unity Internal Error Suppressed]:", err);            
            return true; // suppress
        },
    };

    loaderScript = document.createElement("script");
    loaderScript.src = loaderUrl;
    loaderScript.onload = () => {
        createUnityInstance(canvas, config, (progress) => {
            if (progressBarFull) {
                progressBarFull.style.width = 100 * progress + "%";
            }
        })
        .then((instance) => {
            unityInstance = instance;
            loadingBar.style.display = "none";
        })
        .catch((message) => {
            alert("Failed to load Unity: " + message);
        });
    };

    document.body.appendChild(loaderScript);
    console.log("Unity WebGL loading initiated.");
}

export async function unloadGame() {
    if (!unityInstance) return;

    await unityInstance.Quit();
    unityInstance = null;

    if (loaderScript) {
        loaderScript.remove();
        loaderScript = null;
    }

    console.log("Unity WebGL unloaded successfully.");
}
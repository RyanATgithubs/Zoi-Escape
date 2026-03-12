// Data Structure
class PlayerRankData {
    constructor(rank, name, time, kills, kpm) {
        this.rank = rank;
        this.playerName = name;
        this.time = time;
        this.kills = kills;
        this.kpm = kpm;
    }
}

const playerRankList = [
    new PlayerRankData(1, "Ryan", "12:30", 25, 2.1),
    new PlayerRankData(2, "Alex", "13:10", 20, 1.8),
    new PlayerRankData(3, "Sam", "11:45", 18, 1.5),
    new PlayerRankData(4, "Chris", "14:05", 30, 2.4),
    new PlayerRankData(5, "Taylor", "12:50", 22, 1.9),
    new PlayerRankData(6, "Jordan", "15:20", 28, 2.2),
    new PlayerRankData(7, "Morgan", "10:40", 15, 1.2),
    new PlayerRankData(8, "Jamie", "13:55", 19, 1.6),
    new PlayerRankData(9, "Casey", "12:05", 21, 1.7),
    new PlayerRankData(10, "Drew", "14:30", 26, 2.0)
];

// Call this inside your initPlayView()
export function initLeaderboard() {
    const leaderboardBody = document.getElementById("leaderboard-body");
    const expandButton = document.getElementById("toggle-button");
    const arrowIcon = document.getElementById("arrow-icon");
    
    // Safety check in case the DOM hasn't loaded
    if (!leaderboardBody || !expandButton) return;

    // State Variables
    const minimizedHeight = "165px";
    const expandedHeight = "500px"; // Adjusted slightly so it doesn't break your 8:9 container
    let isExpanded = false;

    // 1. Clear any existing rows (prevents duplication if the user clicks the tab multiple times)
    leaderboardBody.innerHTML = '';

    // 2. Populate Rows
    playerRankList.forEach(data => {
        const rowHtml = `
            <li class="flex flex-row w-full items-center bg-zinc-800/40 hover:bg-zinc-700/60 rounded px-2 py-2 text-amber-100 font-koho-regular text-xs md:text-sm transition-colors border border-transparent hover:border-zinc-600 shrink-0">
                <div class="w-[15%] font-bold text-amber-400">#${data.rank}</div>
                <div class="w-[40%] truncate pr-2">${data.playerName}</div>
                <div class="w-[15%] text-center text-zinc-300">${data.time}</div>
                <div class="w-[15%] text-center text-zinc-300">${data.kills}</div>
                <div class="w-[15%] text-center text-zinc-300">${data.kpm}</div>
            </li>
        `;
        leaderboardBody.insertAdjacentHTML('beforeend', rowHtml);
    });

    // 3. Setup Toggle Event
    // Remove old listeners first to avoid duplication bugs in SPAs
    const newExpandButton = expandButton.cloneNode(true);
    expandButton.parentNode.replaceChild(newExpandButton, expandButton);
    
    newExpandButton.addEventListener("click", () => {
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            leaderboardBody.style.height = expandedHeight;
            // Tailwind rotate class for a smooth arrow flip
            newExpandButton.querySelector("svg").classList.add("rotate-180");
        } else {
            leaderboardBody.style.height = minimizedHeight;
            newExpandButton.querySelector("svg").classList.remove("rotate-180");
        }
      
    });
}
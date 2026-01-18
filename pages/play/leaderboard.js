const leaderboardBody = document.querySelector(".leaderboard-body");
const expandButton = document.getElementById("toggle-button");
const minimizedHeight = "165px";
const expandedHeight = "650px";
let isExpanded = false;

class PlayerRankData {
	constructor(rank, name, time, kills, kmp) {
		this.playerName = name;
		this.rank = rank;
		this.time = time;
		this.kills = kills;
		this.kmp = kmp;
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

function loadLeaderboard() {
	console.log("add row button clicked!");
	playerRankList.forEach(function(rankData) {
		addPlayerRow(
			rankData.rank, 
			rankData.playerName, 
			rankData.time, 
			rankData.kills, 
			rankData.kmp);
	});
}

function addPlayerRow(rank, playerName, time, kills, kmp) {

	const rowHtml = `
		<li class="row" id="player-1">
            <div class="col rank">#${rank}</div>
            <div class="col name">${playerName}</div>
            <div class="col time">${time}</div>
            <div class="col kills">${kills}</div>
            <div class="col kpm">${kmp}</div>
        </li>
	`;

	leaderboardBody.insertAdjacentHTML('beforeend', rowHtml);
}

window.onload = function() {
	console.log("Caching leaderboard data from firebase!");
	loadLeaderboard();
};

expandButton.addEventListener("click", function() {
	toggleLeaderBoard();
});

function toggleLeaderBoard() {
  if (isExpanded) {
    leaderboardBody.style.height = minimizedHeight;
    expandButton.textContent = "▼";
  } else {
    leaderboardBody.style.height = expandedHeight;
    expandButton.textContent = "▲";
  }

  isExpanded = !isExpanded;
}


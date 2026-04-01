class LeaderboardItem extends HTMLElement {
    static get observedAttributes() {
        return ['rank', 'name', 'time', 'kills', 'kpm'];
    }

    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML = `
            <li class="flex flex-row w-full items-center bg-zinc-800/40 hover:bg-zinc-700/60 rounded px-2 py-2 text-amber-100 font-koho-regular text-xs md:text-sm transition-colors border border-transparent hover:border-zinc-600 shrink-0">
                <div class="w-[15%] font-bold text-amber-400">${this.getAttribute('rank') || '-'}</div>
                <div class="w-[40%] truncate pr-2">${this.getAttribute('name') || '-'}</div>
                <div class="w-[15%] text-center text-zinc-300">${this.getAttribute('time') || '-'}</div>
                <div class="w-[15%] text-center text-zinc-300">${this.getAttribute('kills') || '-'}</div>
                <div class="w-[15%] text-center text-zinc-300">${this.getAttribute('kpm') || '-'}</div>
            </li>
        `;
    }
}

customElements.define('leaderboard-item', LeaderboardItem);
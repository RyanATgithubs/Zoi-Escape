class TabButton extends HTMLElement {
    static get observedAttributes() {
        return ['active', 'name'];
    }

    constructor() {
        super();
        this.baseClasses = "block w-full h-full whitespace-nowrap px-4 py-2 font-bold text-center font-koho-regular text-xs md:text-size-button cursor-pointer transition-all ease-in-out duration-200 border-b-4";
        this.unselectedClasses = "text-amber-100 border-transparent hover:text-amber-200 hover:bg-amber-200/20 hover:border-amber-200/50";
        this.selectedClasses = "text-amber-300 border-amber-300/70";
    }

    connectedCallback() {
        this.render();
        this.setupEvents();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    // Inside TabButton.js
    render() {
        const isSelected = this.hasAttribute('active');
        const buttonName = this.getAttribute('name') || 'Tab';

        const buttonClasses = `${this.baseClasses} ${isSelected 
            ? this.selectedClasses 
            : this.unselectedClasses}
        `;

        this.className = "block";

        this.innerHTML = `
            <button class="${buttonClasses} block w-full h-full" type="button">
                ${buttonName}
            </button>
        `;
    }

    setupEvents() {
        this.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('tab-click', {
                detail: { name: this.getAttribute('name') },
                bubbles: true,
                composed: true
            }));
        });
    }
}

customElements.define('tab-button', TabButton);
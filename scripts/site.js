(() => {
    const resetPageView = () => {
        for (let view of suite.textViews) {
            view.style.display = "none";
        }
    }
    const resetNavButtons = () => {
        for (let view of suite.navButtons) {
            view.classList.remove("secondary-active");
        }
    }
    const suite = {
        /**
         * Switch to a given page
         * @param {string} page page id
         */
        display(page) {
            resetPageView();
            document.getElementById(page).style.display = "grid";
        },
        /**
         * Display a page using a navbar element
         * @param {Element} element 
         */
        displayFromElement(element) {
            this.display(element.dataset.pageTarget);
            resetNavButtons();
            element.classList.add("secondary-active");
            this.textViewTitle.innerText = element.innerText;
        },
        init() {
            resetPageView();
            resetNavButtons();
            this.displayFromElement(this.navButtons[0]);
            for (let navButton of this.navButtons) {
                navButton.addEventListener("click", event => this.displayFromElement(event.srcElement));
            }
        },
        get textViews() {
            return Array.from(document.getElementsByName("text-view"));
        },
        get navButtons() {
            return Array.from(document.getElementById("explorer").children);
        },
        get textViewTitle() {
            return document.getElementById("tvt-wrap");
        }
    };
    window.MimicoShell = suite;
    suite.init();
})();
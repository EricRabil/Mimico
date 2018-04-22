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
    const resetResponsiveNav = () => {
        suite.navIsCollapsed = suite.viewportWidth < 750;
    }
    let hiddenResponsiveState = false;
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
                navButton.addEventListener("click", event => this.displayFromElement(navButton));
            }
            this.navCollapseButton.addEventListener("click", () => {
                this.navIsCollapsed = !this.navIsCollapsed;
                hiddenResponsiveState = this.navIsCollapsed;
            });
            window.addEventListener("resize", () => {
                if (this.navIsCollapsed && this.viewportWidth >= 750) {
                    this.navIsCollapsed = false;
                }
                if (!this.navIsCollapsed && this.viewportWidth < 750 && hiddenResponsiveState) {
                    this.navIsCollapsed = true;
                }
            });
        },
        get navIsCollapsed() {
            return document.getElementById("explorer").style.display === "none";
        },
        set navIsCollapsed(collapsed) {
            document.getElementById("explorer").style.display = collapsed ? "none" : "grid";
            this.textView.classList[collapsed ? "add" : "remove"]("text-view-max");
        },
        get textViews() {
            return Array.from(document.getElementsByName("text-view"));
        },
        get navButtons() {
            return Array.from(document.getElementById("explorer-items").children);
        },
        get textViewTitle() {
            return document.getElementById("tvt-wrap");
        },
        get textView() {
            return document.getElementById("text-view");
        },
        get viewportWidth() {
            return window.innerWidth;
        },
        get navCollapseButton() {
            return document.getElementById("nav-burger");
        }
    };
    window.MimicoShell = suite;
    suite.init();
})();
(function () {
    if (document.readyState === "interactive" || document.readyState === "complete")
        init();
    else
        document.addEventListener("DOMContentLoaded", init);

    function init() {
        try { initArticleHead(); } catch (e) { console.error(e); }
        try { initTabs(); } catch (e) { console.error(e); }
        try { initExpandables(); } catch (e) { console.error(e); }
        try { styleTagBackgrounds(); } catch (e) { console.error(e); }
    }

    // === TAGS ===
    function styleTagBackgrounds() {
        var tagElements = document.querySelectorAll(".tag-container .tag");
        var backgrounds = [
            ["javascript", "tomato"],
            ["functional", "dodgerblue"]
        ];
        for (var element of tagElements) {
            var background = backgrounds.find(function (bg) {
                return bg[0] === element.innerHTML.trim();
            });
            if (background) {
                element.style.backgroundColor = background[1];
            }
        }
    }

    // === TABS ===
    function initTabs() {
        function selectButton(element) {
            element.style.fontWeight = "bold"; element.style.textDecoration = "underline";
        }
        function deselectButton(element) {
            element.style.fontWeight = "normal"; element.style.textDecoration = "none";
        }

        var tabPanes = document.querySelectorAll(".tab-pane");
        for (var i = 0; i < tabPanes.length; i++) {
            (function () {
                const tabPane = tabPanes[i];
                const tabList = document.createElement("div");
                var tabNodes = tabPane.querySelectorAll(".tab");
                var hideTabs = function () { for (var n = 0; n < tabNodes.length; n++) tabNodes[n].style.display = "none"; };
                var deselectButtons = function () {
                    var button = tabList.firstElementChild;
                    do {
                        deselectButton(button);
                    } while (button = button.nextElementSibling)
                };

                for (var j = 0; j < tabNodes.length; j++) {
                    (function () {
                        var tab = tabNodes[j];
                        var label = document.createElement("span");
                        label.innerHTML = tab.getAttribute("data-title");
                        label.classList = "tab-button";
                        label.addEventListener("click", function () { hideTabs(); tab.style.display = "block"; deselectButtons(); selectButton(label); });
                        tabList.appendChild(label);
                    })();
                }

                hideTabs();
                tabNodes[0].style.display = "block";
                selectButton(tabList.firstChild);
                tabPane.insertBefore(tabList, tabPane.firstChild);
            })();
        }
    }

    // === EXPANDABLES ===
    function closeOpenExpandable(group) {
        const current = group.querySelector(".expandable-shown");
        const currentLabel = group.querySelector(".expandable-active-label");
        if (current) {
            current.classList.remove("expandable-shown");
            current.classList.add("expandable-hidden");
        }
        if (currentLabel) {
            currentLabel.classList.remove("expandable-active-label");
        }
    }

    function onExpandableClicked(source, group) {
        return function (evt) {
            const target = group.querySelector(source.getAttribute("for"));
            const targetShouldShow = target.classList.contains("expandable-hidden")

            closeOpenExpandable(group);

            if (targetShouldShow) {
                target.classList.remove("expandable-hidden");
                target.classList.add("expandable-shown");
                source.classList.add("expandable-active-label");
            }
        };
    }

    function initExpandables() {
        const groups = document.querySelectorAll(".expandable-group");
        for (const group of groups) {
            const expandables = group.querySelectorAll(".expandable");
            for (const exp of expandables) {
                exp.addEventListener("click", onExpandableClicked(exp, group));
            }
        }
    }
    // ======= ARTICLE =======
    function initArticleHead() {
        const toc = document.querySelector(".toc");
        const tldr = document.querySelector(".tldr");
        if (toc && tldr) {
            const parent = toc.parentElement
            const newContainer = document.createElement("div");
            const nextElement = tldr.nextElementSibling;

            parent.removeChild(toc);
            parent.removeChild(tldr);
            const tldrTitle = tldr.querySelector("h2");
            if (tldrTitle) {
                tldr.removeChild(tldrTitle);
            }

            newContainer.innerHTML = `
                <div class="expandable-group" style="margin-bottom: -2em">
                    <div class="expandable-header">
                        <span class="expandable" for="#tldr-exp">tl;dr</span>
                        <span class="expandable" for="#toc-exp">Table of contents</span>
                    </div>
                    <div class="expandable-hidden" id="tldr-exp">${tldr.innerHTML}</div>
                    <div class="expandable-hidden" id="toc-exp">${toc.innerHTML}</div>
                </div>
            `;

            parent.insertBefore(newContainer, nextElement);
        }
    }
})();
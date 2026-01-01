document.addEventListener("DOMContentLoaded", function () {
    const bookCover = document.getElementById("book-cover");
    const book = document.getElementById("book");

    const leftPage = document.querySelector(".page-left");
    const rightPage = document.querySelector(".page-right");
    const mobilePage = document.querySelector(".mobile-page");

    const prevPageButton = document.getElementById("prev-page");
    const nextPageButton = document.getElementById("next-page");

    const prevPageMobileButton = document.getElementById("prev-page-mobile");
    const nextPageMobileButton = document.getElementById("next-page-mobile");

    const readButton = document.getElementById("readButton");
    const indexButton = document.getElementById("indexButton");

    const indexModal = new bootstrap.Modal(document.getElementById("indexModal"));

    let currentPage = 0;
    let diarioData = [];

    function convertDateFormat(dateString) {
        if (!dateString || typeof dateString !== "string") return null;
        const parts = dateString.split("/");
        if (parts.length !== 3) return null;
        const [day, month, year] = parts;
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }

    function setMobileView(data, pageNumber) {
        const dateEl = document.getElementById("date-mobile");
        const contentEl = document.getElementById("content-mobile");
        const footerEl = document.getElementById("footer-mobile");

        dateEl.textContent = data?.originalDate || "";
        contentEl.textContent = data?.content || "";
        footerEl.textContent = `Página ${pageNumber + 1} de ${diarioData.length}`;
    }

    function setDesktopView(leftData, rightData, pageNumber) {
        const dateLeft = document.getElementById("date-left");
        const contentLeft = document.getElementById("content-left");
        const footerLeft = document.getElementById("footer-left");

        const dateRight = document.getElementById("date-right");
        const contentRight = document.getElementById("content-right");
        const footerRight = document.getElementById("footer-right");

        dateLeft.textContent = leftData?.originalDate || "";
        contentLeft.textContent = leftData?.content || "";
        footerLeft.textContent = `Página ${pageNumber + 1}`;

        dateRight.textContent = rightData?.originalDate || "";
        contentRight.textContent = rightData?.content || "";
        footerRight.textContent = `Página ${pageNumber + 2}`;
    }

    function showPages(pageNumber) {
        if (!diarioData.length) return;

        if (window.innerWidth < 768) {
            const data = diarioData[pageNumber];
            mobilePage.style.opacity = "0";
            requestAnimationFrame(() => {
                setMobileView(data, pageNumber);
                mobilePage.style.opacity = "1";
            });
        } else {
            const leftData = diarioData[pageNumber];
            const rightData = diarioData[pageNumber + 1] || null;

            leftPage.style.opacity = "0";
            rightPage.style.opacity = "0";

            setTimeout(() => {
                setDesktopView(leftData, rightData, pageNumber);
                leftPage.style.opacity = "1";
                rightPage.style.opacity = "1";
            }, 140);
        }
    }

    function nextPage() {
        if (window.innerWidth < 768) {
            if (currentPage < diarioData.length - 1) {
                currentPage++;
                showPages(currentPage);
            }
        } else {
            if (currentPage < diarioData.length - 2) {
                currentPage += 2;
                showPages(currentPage);
            }
        }
    }

    function prevPage() {
        if (window.innerWidth < 768) {
            if (currentPage > 0) {
                currentPage--;
                showPages(currentPage);
            }
        } else {
            if (currentPage > 0) {
                currentPage -= 2;
                showPages(currentPage);
            }
        }
    }

    function openBook() {
        bookCover.classList.add("d-none");
        book.classList.remove("d-none");

        indexButton.classList.remove("d-none");
        document.querySelector(".mobile-navigation").classList.remove("d-none");
        prevPageButton.classList.remove("d-none");
        nextPageButton.classList.remove("d-none");

        showPages(currentPage);
    }

    function initializeCalendar() {
        const calendarEl = document.getElementById("calendar");
        const startDate = diarioData[0]?.date || new Date();
        const endDate = diarioData[diarioData.length - 1]?.date || new Date();

        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: "dayGridMonth",
            locale: "es",
            initialDate: startDate,
            validRange: { start: startDate, end: endDate },
            height: "auto",
            events: diarioData
                .filter(entry => (entry.content || "").trim() !== "")
                .map(entry => ({
                    title: "Entrada",
                    start: entry.date,
                    allDay: true
                })),
            dateClick: function (info) {
                const dateString = info.dateStr;
                const pageIndex = diarioData.findIndex(entry => entry.date === dateString);
                if (pageIndex !== -1) {
                    currentPage = pageIndex;
                    showPages(currentPage);
                    indexModal.hide();
                }
            }
        });

        calendar.render();
        indexButton.addEventListener("click", () => indexModal.show());
    }

    readButton.addEventListener("click", openBook);
    nextPageButton.addEventListener("click", nextPage);
    prevPageButton.addEventListener("click", prevPage);
    nextPageMobileButton.addEventListener("click", nextPage);
    prevPageMobileButton.addEventListener("click", prevPage);

    window.addEventListener("resize", () => showPages(currentPage));

    fetch("DiarioJson.json")
        .then(response => response.json())
        .then(data => {
            diarioData = data.map(entry => ({
                ...entry,
                date: convertDateFormat(entry.date),
                originalDate: entry.date
            }));
            showPages(currentPage);
            initializeCalendar();
        })
        .catch(error => console.error("Error al cargar el JSON:", error));
});

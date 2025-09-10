function searchWord() {
    const searchText = document.getElementById("searchInput").value.trim();
    const textElements = document.querySelectorAll(".text");
    const resultElement = document.getElementById("result");

    resultElement.innerHTML = "";

    if (searchText === "") {
        resultElement.innerHTML = "<p>Bitte ein Wort eingeben!</p>";
        return;
    }

    let positions = [];
    textElements.forEach((textElement, index) => {
        const textContent = textElement.innerHTML; 
        const regex = new RegExp(`\\b(${searchText})\\b`, 'gi');
        let match;

        let highlightedText = textContent.replace(regex, `<span class="highlight">$1</span>`);
        textElement.innerHTML = highlightedText;

        while ((match = regex.exec(textContent)) !== null) {
            positions.push({ position: match.index, textIndex: index });
        }
    });

    if (positions.length === 0) {
        resultElement.innerHTML = "<p>Kein Ergebnis gefunden.</p>";
    } else {
        resultElement.innerHTML = "<p>Wort gefunden an den Positionen:</p>";

        positions.forEach((pos) => {
            const link = document.createElement("a");
            link.href = `#text${pos.textIndex}`;
            link.innerText = `Gehe zu Position ${pos.position} in Text ${pos.textIndex + 1}`;
            resultElement.appendChild(link);
            resultElement.appendChild(document.createElement("br"));
        });
    }
}
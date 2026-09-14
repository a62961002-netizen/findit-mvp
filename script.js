const games = [
    {
        name: "GTA 5",
        type: "PC Game",
        platform: "PC",
        price: "Check current price",
        store: "Steam",
        link: "https://store.steampowered.com/"
    },

    {
        name: "Minecraft",
        type: "Sandbox Game",
        platform: "PC",
        price: "Check current price",
        store: "Official Store",
        link: "https://www.minecraft.net/"
    },

    {
        name: "Cyberpunk 2077",
        type: "Open World RPG",
        platform: "PC",
        price: "Check current price",
        store: "Steam",
        link: "https://store.steampowered.com/"
    }
];


const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const results = document.getElementById("results");


function searchGame() {

    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {

        results.innerHTML = `
            <div class="no-result">
                <h2>Type something first</h2>
                <p>Try searching GTA 5 or Minecraft.</p>
            </div>
        `;

        return;
    }


    const game = games.find(item =>
        item.name.toLowerCase().includes(query)
    );


    if (!game) {

        results.innerHTML = `
            <div class="no-result">
                <h2>Not found</h2>
                <p>
                    We don't have this game in our MVP database yet.
                </p>
            </div>
        `;

        return;
    }


    results.innerHTML = `

        <div class="game-card">

            <h2>${game.name}</h2>

            <p class="game-type">
                ${game.type}
            </p>

            <div class="info-row">
                <span class="label">Platform</span>
                <span class="value">${game.platform}</span>
            </div>

            <div class="info-row">
                <span class="label">Price</span>
                <span class="value">${game.price}</span>
            </div>

            <div class="info-row">
                <span class="label">Availability</span>
                <span class="value available">
                    Available
                </span>
            </div>

            <div class="info-row">
                <span class="label">Official source</span>
                <span class="value">${game.store}</span>
            </div>

            <a
                class="store-button"
                href="${game.link}"
                target="_blank"
                rel="noopener"
            >
                View Official Store →
            </a>

        </div>
    `;
}


function quickSearch(name) {

    searchInput.value = name;

    searchGame();
}


searchButton.addEventListener("click", searchGame);


searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchGame();
    }

});
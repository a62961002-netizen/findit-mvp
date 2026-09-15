/* =====================================================
   FINDIT — LEVEL 5 MASTER
   Level 1 + 2 + 3 + 4 + 5

   Features:
   • Game Search
   • Smart Search
   • Suggestions
   • Game Details
   • Platform Filters
   • Multiple Official Stores
   • Supabase Connection Test
===================================================== */


/* =====================================================
   SUPABASE CONFIG
===================================================== */

const SUPABASE_URL =
    "https://siyxtdhgmzpyfieawrsp.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_T-bLLUmspiHTSG-aYzSyLQ_xBKYR0GZ";


/* =====================================================
   SUPABASE CLIENT
===================================================== */

let supabaseClient = null;

if (typeof supabase !== "undefined") {

    supabaseClient = supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

    console.log("Supabase library loaded.");

} else {

    console.error(
        "Supabase library not loaded. Check index.html."
    );

}


/* =====================================================
   DEMO GAME DATABASE
   Level 6 में इसी data को Supabase से replace करेंगे.
===================================================== */

const games = [

    {
        id: "gta-v",

        name: "Grand Theft Auto V",

        aliases: [
            "gta",
            "gta 5",
            "gta5",
            "gta v",
            "grand theft auto",
            "grand theft auto 5",
            "grand theft auto v"
        ],

        type: "Open World Action Game",

        release: "2013",

        genre: "Action / Open World",

        platforms: [
            "PC",
            "PlayStation",
            "Xbox"
        ],

        stores: [

            {
                name: "Steam",
                platform: "PC",
                status: "Available",
                price: "Check current price",
                link: "https://store.steampowered.com/"
            },

            {
                name: "Epic Games Store",
                platform: "PC",
                status: "Available",
                price: "Check current price",
                link: "https://store.epicgames.com/"
            },

            {
                name: "PlayStation Store",
                platform: "PlayStation",
                status: "Available",
                price: "Check current price",
                link: "https://store.playstation.com/"
            },

            {
                name: "Xbox Store",
                platform: "Xbox",
                status: "Available",
                price: "Check current price",
                link: "https://www.xbox.com/games/store"
            }

        ]
    },


    {
        id: "minecraft",

        name: "Minecraft",

        aliases: [
            "minecraft",
            "mine craft",
            "mc",
            "minecraft game"
        ],

        type: "Sandbox Game",

        release: "2011",

        genre: "Sandbox / Survival",

        platforms: [
            "PC",
            "PlayStation",
            "Xbox",
            "Nintendo",
            "Android",
            "iOS"
        ],

        stores: [

            {
                name: "Minecraft Official",
                platform: "PC",
                status: "Available",
                price: "Check current price",
                link: "https://www.minecraft.net/"
            },

            {
                name: "PlayStation Store",
                platform: "PlayStation",
                status: "Available",
                price: "Check current price",
                link: "https://store.playstation.com/"
            },

            {
                name: "Xbox Store",
                platform: "Xbox",
                status: "Available",
                price: "Check current price",
                link: "https://www.xbox.com/games/store"
            },

            {
                name: "Nintendo eShop",
                platform: "Nintendo",
                status: "Available",
                price: "Check current price",
                link: "https://www.nintendo.com/store/"
            },

            {
                name: "Google Play",
                platform: "Android",
                status: "Available",
                price: "Check current price",
                link: "https://play.google.com/store/"
            },

            {
                name: "Apple App Store",
                platform: "iOS",
                status: "Available",
                price: "Check current price",
                link: "https://www.apple.com/app-store/"
            }

        ]
    },


    {
        id: "cyberpunk-2077",

        name: "Cyberpunk 2077",

        aliases: [
            "cyberpunk",
            "cyber punk",
            "cyberpunk 2077",
            "cp2077"
        ],

        type: "Open World RPG",

        release: "2020",

        genre: "RPG / Open World",

        platforms: [
            "PC",
            "PlayStation",
            "Xbox"
        ],

        stores: [

            {
                name: "Steam",
                platform: "PC",
                status: "Available",
                price: "Check current price",
                link: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/"
            },

            {
                name: "Epic Games Store",
                platform: "PC",
                status: "Available",
                price: "Check current price",
                link: "https://store.epicgames.com/"
            },

            {
                name: "PlayStation Store",
                platform: "PlayStation",
                status: "Available",
                price: "Check current price",
                link: "https://store.playstation.com/"
            },

            {
                name: "Xbox Store",
                platform: "Xbox",
                status: "Available",
                price: "Check current price",
                link: "https://www.xbox.com/games/store"
            }

        ]
    }

];


/* =====================================================
   ELEMENTS
===================================================== */

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const results =
    document.getElementById("results");

const suggestions =
    document.getElementById("suggestions");

const filterButtons =
    document.querySelectorAll(".filter-button");


/* =====================================================
   STATE
===================================================== */

let selectedPlatform = "all";


/* =====================================================
   NORMALIZE
===================================================== */

function normalize(text) {

    return String(text)
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");

}


/* =====================================================
   PLATFORM CHECK
===================================================== */

function isAvailableOnPlatform(game, platform) {

    if (platform === "all") {
        return true;
    }

    return game.platforms.includes(platform);

}


/* =====================================================
   FIND MATCHES
===================================================== */

function findMatches(query) {

    const search =
        normalize(query);


    if (!search) {
        return [];
    }


    return games.filter(game => {

        if (
            !isAvailableOnPlatform(
                game,
                selectedPlatform
            )
        ) {
            return false;
        }


        const gameName =
            normalize(game.name);


        if (
            gameName.includes(search)
        ) {
            return true;
        }


        return game.aliases.some(alias =>
            normalize(alias).includes(search)
        );

    });

}


/* =====================================================
   SUGGESTIONS
===================================================== */

function showSuggestions() {

    const query =
        searchInput.value;


    const matches =
        findMatches(query);


    suggestions.innerHTML = "";


    if (
        !normalize(query) ||
        matches.length === 0
    ) {

        suggestions.style.display = "none";

        return;

    }


    matches
        .slice(0, 5)
        .forEach(game => {

            const item =
                document.createElement("div");


            item.className =
                "suggestion-item";


            item.innerHTML = `

                <div class="suggestion-icon">
                    🎮
                </div>

                <div>

                    <div class="suggestion-name">
                        ${game.name}
                    </div>

                    <div class="suggestion-type">
                        ${game.type}
                    </div>

                </div>

            `;


            item.addEventListener(
                "click",
                function() {

                    searchInput.value =
                        game.name;

                    suggestions.style.display =
                        "none";

                    showGame(game);

                }
            );


            suggestions.appendChild(item);

        });


    suggestions.style.display = "block";

}


/* =====================================================
   SEARCH
===================================================== */

function searchGame() {

    const query =
        normalize(searchInput.value);


    suggestions.style.display =
        "none";


    if (!query) {

        showEmptySearch();

        return;

    }


    const matches =
        findMatches(query);


    if (matches.length === 0) {

        showNoResult();

        return;

    }


    showGame(matches[0]);

}


/* =====================================================
   EMPTY SEARCH
===================================================== */

function showEmptySearch() {

    results.innerHTML = `

        <div class="no-result">

            <div class="empty-icon">
                🎮
            </div>

            <h2>
                Search for a game
            </h2>

            <p>
                Type a game name to get started.
            </p>

        </div>

    `;

}


/* =====================================================
   NO RESULT
===================================================== */

function showNoResult() {

    const platformText =
        selectedPlatform === "all"
        ? ""
        : ` on ${selectedPlatform}`;


    results.innerHTML = `

        <div class="no-result">

            <div class="empty-icon">
                🔎
            </div>

            <h2>
                No game found
            </h2>

            <p>
                No matching game was found
                ${platformText}.
            </p>

        </div>

    `;

}


/* =====================================================
   PLATFORM ICON
===================================================== */

function getPlatformIcon(platform) {

    const icons = {

        "PC": "🖥",

        "PlayStation": "🎮",

        "Xbox": "🟩",

        "Nintendo": "🔴",

        "Android": "📱",

        "iOS": "🍎"

    };


    return icons[platform] || "🎮";

}


/* =====================================================
   SHOW GAME
===================================================== */

function showGame(game) {


    /* PLATFORM LIST */

    const platformHTML =
        game.platforms
            .map(platform => {

                return `

                    <div class="platform">

                        <span class="platform-name">

                            ${getPlatformIcon(platform)}
                            ${platform}

                        </span>

                        <span class="platform-status available">
                            ✓ Available
                        </span>

                    </div>

                `;

            })
            .join("");


    /* STORE FILTER */

    let visibleStores =
        game.stores;


    if (
        selectedPlatform !== "all"
    ) {

        visibleStores =
            game.stores.filter(store =>
                store.platform === selectedPlatform
            );

    }


    /* STORE LIST */

    let storeHTML = "";


    if (
        visibleStores.length === 0
    ) {

        storeHTML = `

            <div class="store">

                <div>

                    <div class="store-name">
                        No official store found
                    </div>

                    <div class="store-price">
                        Availability information unavailable.
                    </div>

                </div>

            </div>

        `;

    } else {

        storeHTML =
            visibleStores
                .map(store => {

                    return `

                        <div class="store">

                            <div>

                                <div class="store-name">
                                    ${store.name}
                                </div>

                                <div class="store-price">

                                    ${getPlatformIcon(store.platform)}
                                    ${store.platform}
                                    •
                                    ${store.status}
                                    •
                                    ${store.price}

                                </div>

                            </div>


                            <a
                                class="store-button"
                                href="${store.link}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Game →
                            </a>

                        </div>

                    `;

                })
                .join("");

    }


    /* COUNTS */

    const storeCount =
        game.stores.length;


    /* GAME CARD */

    results.innerHTML = `

        <div class="game-card">

            <div class="game-header">

                <h2>
                    ${game.name}
                </h2>

                <p class="game-type">
                    ${game.type}
                </p>

            </div>


            <div class="quick-info">

                <div class="info-box">

                    <span class="label">
                        Release
                    </span>

                    <span class="value">
                        ${game.release}
                    </span>

                </div>


                <div class="info-box">

                    <span class="label">
                        Genre
                    </span>

                    <span class="value">
                        ${game.genre}
                    </span>

                </div>


                <div class="info-box">

                    <span class="label">
                        Official Stores
                    </span>

                    <span class="value">
                        ${storeCount}
                    </span>

                </div>

            </div>


            <h3 class="section-title">
                Available On
            </h3>


            <div class="platform-list">

                ${platformHTML}

            </div>


            <h3 class="section-title">
                Official Stores
            </h3>


            <div class="store-list">

                ${storeHTML}

            </div>

        </div>

    `;

}


/* =====================================================
   QUICK SEARCH
===================================================== */

function quickSearch(name) {

    searchInput.value =
        name;

    searchGame();

}


/* =====================================================
   MAKE QUICK SEARCH AVAILABLE TO HTML
===================================================== */

window.quickSearch =
    quickSearch;


/* =====================================================
   PLATFORM FILTER
===================================================== */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        function() {

            filterButtons.forEach(item => {

                item.classList.remove("active");

            });


            this.classList.add("active");


            selectedPlatform =
                this.dataset.platform;


            if (
                searchInput.value.trim()
            ) {

                searchGame();

            }

        }
    );

});


/* =====================================================
   LIVE SEARCH
===================================================== */

searchInput.addEventListener(
    "input",
    showSuggestions
);


/* =====================================================
   SEARCH BUTTON
===================================================== */

searchButton.addEventListener(
    "click",
    searchGame
);


/* =====================================================
   ENTER KEY
===================================================== */

searchInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            searchGame();

        }

    }
);


/* =====================================================
   CLOSE SUGGESTIONS
===================================================== */

document.addEventListener(
    "click",
    function(event) {

        if (
            !event.target.closest(".search-wrapper")
        ) {

            suggestions.style.display =
                "none";

        }

    }
);


/* =====================================================
   SUPABASE DATABASE TEST
===================================================== */

async function testDatabase() {

    if (!supabaseClient) {

        console.error(
            "Supabase client is not initialized."
        );

        return;

    }


    const { data, error } =
        await supabaseClient
            .from("games")
            .select("*")
            .limit(5);


    if (error) {

        console.error(
            "DATABASE ERROR:",
            error
        );

        return;

    }


    console.log(
        "DATABASE CONNECTED:",
        data
    );

}


/* =====================================================
   START
===================================================== */

console.log(
    "FindIt Level 5 loaded successfully."
);

console.log(
    "Games in current demo database:",
    games.length
);


testDatabase();
async function loadGamesFromDatabase() {

    if (!supabaseClient) {
        console.error("Supabase client not available.");
        return;
    }

    const { data, error } = await supabaseClient
        .from("games")
        .select("*");

    if (error) {
        console.error("GAME DATABASE ERROR:", error);
        return;
    }

    console.log("REAL GAMES FROM SUPABASE:", data);
}

loadGamesFromDatabase();
document.addEventListener('DOMContentLoaded', () => {

    // --- TRANSLATION DATA ---
    // Object containing all text translations for English and Indonesian
    const translations = {
        en: {
            title: "Welcome to Otniel Department Store!",
            description: "Here are several stores you can visit.",
            theWaroenkz: "You can checkout several products, know the stocks, and buy them at cashier",
            tokotniel: "You can topup currency and spend them to buy products online"
        },
        id: {
            title: "Selamat datang di Otniel Department Store!",
            description: "Berikut adalah beberapa toko yang bisa Anda kunjungi.",
            theWaroenkz: "Anda dapat checkout beberapa produk, mengetahui stoknya, dan membelinya di kasir",
            tokotniel: "Anda dapat top up saldo dan menggunakannya untuk membeli produk secara online"
        }
    };

    // --- DOM ELEMENTS ---
    // Get references to all elements that need their text changed
    const titleElement = document.getElementById('title');
    const descriptionElement = document.getElementById('description');
    const theWaroenkzElement = document.getElementById('the-waroenkz');
    const tokotnielElement = document.getElementById('tokotniel');
    const langEnButton = document.getElementById('lang-en');
    const langIdButton = document.getElementById('lang-id');

    // --- FUNCTIONS ---
    /**
     * Updates the text content of the page based on the selected language.
     * @param {string} lang - The selected language ('en' or 'id').
     */
    const setLanguage = (lang) => {
        const langData = translations[lang];

        // Update text content of each element
        titleElement.textContent = langData.title;
        descriptionElement.textContent = langData.description;
        theWaroenkzElement.textContent = langData.theWaroenkz;
        tokotnielElement.textContent = langData.tokotniel;

        // Update active state of language buttons
        if (lang === 'en') {
            langEnButton.classList.add('active');
            langIdButton.classList.remove('active');
        } else {
            langIdButton.classList.add('active');
            langEnButton.classList.remove('active');
        }
    };

    // --- EVENT LISTENERS ---
    // Add click event listeners to the language buttons
    langEnButton.addEventListener('click', () => setLanguage('en'));
    langIdButton.addEventListener('click', () => setLanguage('id'));

    // --- INITIALIZATION ---
    // Set the default language to English when the page loads
    setLanguage('en');
});

// Store vars
let emojis = null;

// Register nationality renderer method
ZingGrid.registerMethod(renderNationality, 'renderNationality');

function renderNationality(nationality, $cell) {
    const emoji = renderEmojis(nationality[0].countryFlag, $cell);
    return `<span class="flag">${emoji}</span> ${nationality[0].country}`;
}

// Register emoji renderers
ZingGrid.registerMethod(renderEmojis, 'renderEmojis');

function renderEmojis(shortcode, cellRef, $cell) {
    let returnText = shortcode;
    if (emojis) {
        for (let emoji in emojis) {
            if (shortcode === emojis[emoji].shortname) {
                returnText = emojis[emoji].emoji;
                cellRef.children[0].classList.add('loaded');
                break;
            }
        }
    }
    return returnText;
}

// Fetch emojis
window.onload = function() {
    // Store grid ref
    const zgRef = document.querySelector('zing-grid');
    zgRef.executeOnLoad(function() {
        const ENDPOINT = 'https://gist.githubusercontent.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb/raw/ac8dde8a374066bcbcf44a8296fc0522c7392244/emojis.json';
        fetch(ENDPOINT)
            .then(r => r.json())
            .then(r => {
                emojis = r.emojis;
                // Refresh the grid to render the emoji column
                if (zgRef) {
                  // refresh all first columns so emoji
                  // can re-render
                  zgRef.refresh(0,1); 
                  zgRef.refresh(1,1); 
                  zgRef.refresh(2,1); 
                  zgRef.refresh(3,1); 
                  zgRef.refresh(4,1); 
                  zgRef.refresh(5,1);  
                }
            });
    });
}

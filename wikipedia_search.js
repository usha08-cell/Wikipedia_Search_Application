let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");

function createAndAppendSearchResults(result) {

    //1. Div Container -- result - item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    //2. Anchor Title -- result -title
    let resultTitleEl = document.createElement("a"); // Fixed: Changed createElement to document.createElement
    resultTitleEl.classList.add("result-title"); // Changed class name to "result-title"
    resultTitleEl.textContent = result.title;
    resultTitleEl.href = result.link;
    resultTitleEl.target = "_blank";
    resultItemEl.appendChild(resultTitleEl);

    //3. Title Break
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    //4. Anchor URL --result -url
    let resultUrlEl = document.createElement("a"); // Fixed: Created anchor element for URL
    resultUrlEl.classList.add("result-url"); // Added class name "result-url"
    resultUrlEl.textContent = result.link;
    resultUrlEl.href = result.link;
    resultUrlEl.target = "_blank";
    resultItemEl.appendChild(resultUrlEl);
    
    // 5. Line Break
    let descriptionBreakEl = document.createElement("br");
    resultItemEl.appendChild(descriptionBreakEl);

    //6. Paragraph description -- line description
    let descriptionEl = document.createElement("p"); // Changed to "p" element for description
    descriptionEl.classList.add("result-description"); // Added class name "result-description"
    descriptionEl.textContent = result.description;
    resultItemEl.appendChild(descriptionEl);
}

function display_results(search_results) {
    searchResultsEl.textContent = "";
    for (let result of search_results) {
        createAndAppendSearchResults(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent="";
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        
        let options = {
            method: "GET"
        };
        
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let { search_results } = jsonData;
                display_results(search_results); // Pass search_results to display_results
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);

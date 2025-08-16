let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
  let { title, link, description } = result;

  //1.Div Container -- result-item
  let resultItemEl = document.createElement("div");
  resultItemEl.classList.add("result-item");
  searchResultsEl.appendChild(resultItemEl);

  //2.Anchor Element -- result-title
  let resultTitleEl = document.createElement("a");
  resultTitleEl.classList.add("result-title");
  resultTitleEl.textContent = title;
  resultTitleEl.href = link;
  resultTitleEl.target = "_blank";
  resultItemEl.appendChild(resultTitleEl);

  //3.Title Break
  let titleBreakEl = document.createElement("br");
  resultItemEl.appendChild(titleBreakEl);

  //4.Anchor URl -- result-url
  let urlEl = document.createElement("a");
  urlEl.classList.add("result-url");
  urlEl.href = link;
  urlEl.target = "_blank";
  urlEl.textContent = link;
  resultItemEl.appendChild(urlEl);

  //Line break
  let lineBreakEl = document.createElement("br");
  resultItemEl.appendChild(lineBreakEl);

  //6.Paragraph Description -- line-description
  let descriptionEl = document.createElement("p");
  descriptionEl.classList.add("line-description");
  descriptionEl.textContent = description;
  resultItemEl.appendChild(descriptionEl);

  searchInputEl.value = "";
}

function displayResults(search_results) {
  for (let result of search_results) {
    createAndAppendSearchResult(result);
  }
}

function searchWikipedia(event) {
  if (event.key === "Enter") {
    spinner.classList.toggle("d-none");
    searchResultsEl.textContent = "";
    let searchInput = searchInputEl.value;
    let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
    let options = {
      method: "GET",
    };
    fetch(url, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        let { search_results } = jsonData;
        spinner.classList.toggle("d-none");
        displayResults(search_results);
      });
  }
}
searchInputEl.addEventListener("keydown", searchWikipedia);

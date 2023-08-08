const Api_key = "e6a4fd8c99fa4436844e45fc7d3f7111";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => fetchnews("virat kohli"));

function reload() {
  window.location.reload();
}

async function fetchnews(query) {
  const response = await fetch(`${url}${query}&apiKey=${Api_key}`);
  const data = await response.json();
  bindData(data.articles);
}
function bindData(articles)  {
  const cards_container = document.getElementById("card_container");
  const News_template = document.getElementById("cardtemp");

  cards_container.innerHTML = " ";

  articles.forEach((article) => {
    if (!article.urlToImage) return;

    const card_clone = News_template.content.cloneNode(true);
    fillDataCard(card_clone, article);
    cards_container.appendChild(card_clone);
  });
}
function fillDataCard(card_clone, article) {
  const newsImg = card_clone.querySelector("#cardimg");
  const newstittle = card_clone.querySelector("#tittle");
  const newsource = card_clone.querySelector("#headlines");
  const newsdescp = card_clone.querySelector("#newsdescp");

  newsImg.src = article.urlToImage;
  newstittle.innerHTML = article.title;
  newsource.innerHTML = article.content;
  newsdescp.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsource.innerHTML = `${article.source.name} . ${date}`;
  card_clone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}
let curDelNav = null;
function naviclick(id) {
  fetchnews(id);
  const navitem = document.getElementById(id);
  curDelNav?.classList.remove("active");
  curDelNav = navitem; 
  curDelNav.classList.add("active");
}

const searchButton = document.getElementById("btn");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchnews(query);
  curDelNav?.classList.remove("active");
  curDelNav = null;
});

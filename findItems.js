const input = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");
const button = document.querySelector(".search button");
const items = Array.from(document.querySelectorAll(".item"));
const hotelList = document.querySelector(".item").parentElement;

let selectedItem = null;

input.addEventListener("input", function(){
    const value = input.value.toLowerCase().trim();
    suggestionsBox.innerHTML = "";
    suggestionsBox.style.display = "block";
    selectedItem = null;

    if (value === ""){
        suggestionsBox.style.display = "none";
        items.forEach(item => item.style.display = "block");
        return;
    }

    let count = 0;
    items.forEach(hotel => {
        const hotelNameElement = hotel.querySelector(".card-title");
        if (!hotelNameElement) return;

        const text = hotelNameElement.textContent.trim();
        if(text.toLowerCase().includes(value) && count < 5){
            const div = document.createElement("div");
            div.classList.add("suggestion-item");
            div.textContent = text;

            div.addEventListener("click", function(){
                input.value = text;
                selectedItem = hotel;
                suggestionsBox.innerHTML = "";
            });
            suggestionsBox.appendChild(div);
            count++;
        }
        
    });
});

button.addEventListener("click", function(){
    const value = input.value.toLowerCase().trim();

    if (value === ""){
        items.forEach(item => item.style.display = "block");
        return ;
    }

    items.forEach(item => {
        const title = item.querySelector(".card-title")?.textContent.trim().toLowerCase();

        if ((item === selectedItem) || (title && title.includes(value))) {
           item.style.display = "block";
           hotelList.prepend(item);
       } else {
           item.style.display = "none";
       }
    });
});

document.addEventListener("click", function(e){
    if (!suggestionsBox.contains(e.target) && e.target !== input){
        suggestionsBox.style.display ="none";

        input.addEventListener("focus", function(){
            if(input.value.trim() !== ""){
                suggestionsBox.style.display = "block";
            }
        });
    }
});
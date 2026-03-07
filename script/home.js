const CardContainer = document.getElementById("CardContainer")
const openCardContainer = document.getElementById("openCardContainer")
const closedCardContainer = document.getElementById("closedCardContainer")
const allBtn = document.getElementById("allBtn")
const openBtn = document.getElementById("openBtn")
const closedBtn = document.getElementById("closedBtn")
const loadingSpinner = document.getElementById("loadingSpinner")
let CurrentTab = "allBtn";


const showSpinner= () => {
    loadingSpinner.classList.remove('hidden')
}

const hideSpinner= () => {
    loadingSpinner.classList.add('hidden')
}

// Change the buttons color
document.getElementById('buttons').addEventListener('click', function (event) {

    let clickedBtn = event.target;
    allBtn.classList.remove('btn-primary')
    if (clickedBtn.innerText === "Open") {
        closedBtn.classList.remove('btn-primary')
        openBtn.classList.add('btn-primary')
        CurrentTab = "openBtn"
    }
    else if (clickedBtn.innerText === "Closed") {
        openBtn.classList.remove('btn-primary')
        clickedBtn.classList.add('btn-primary')
        CurrentTab = "closedBtn"
    }
    else {
        openBtn.classList.remove('btn-primary')
        closedBtn.classList.remove('btn-primary')
        allBtn.classList.add('btn-primary')
        CurrentTab = "allBtn"
    }
    changeTab(CurrentTab);
    console.log(CurrentTab);
    
});

function changeTab(CurrentTab){
    
    if(CurrentTab === "allBtn"){
        openCardContainer.classList.add("hidden")
        closedCardContainer.classList.add("hidden")
        CardContainer.classList.remove("hidden")
    }
    else if(CurrentTab === "openBtn"){
        CardContainer.classList.add("hidden")
        CardContainer.classList.add("hidden")
        openCardContainer.classList.remove("hidden")
    }
    if(CurrentTab === "closedBtn"){
        CardContainer.classList.add("hidden")
        openCardContainer.classList.add("hidden")
        closedCardContainer.classList.remove("hidden")
    }

}

function createLabel(arr) {
    const createElement = arr.map((element) => `<h1 class="bg-yellow-200 px-3 py-1 rounded-lg">${element}</h1>`)
    return createElement.join(" ");
    
    
}

async function loadCards() {
    showSpinner()
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();
    
    displayTheCards(data.data);
    hideSpinner()
}

function displayTheCards(data) {
    const CardContainer = document.getElementById("CardContainer")
    CardContainer.innerHTML = '';
    
    data.forEach(card => {
        
        let borderColor = "";
        if (card.status === "closed") {
            borderColor = "border-purple-400";
        } else {
            borderColor = "border-green-400";
            
        }
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML = `
        <div id="card" class="shadow-lg rounded-lg p-7 border-t-9 ${borderColor} space-y-7 h-full">
        <div id="priority" class="flex justify-end  ">
        <h1 class="bg-red-200 px-3 rounded-lg">${card.priority}</h1>
        </div>
        <h2 class="text-left text-xl font-semibold line-clamp-1">${card.title}</h2>
        <p class="opacity-60 line-clamp-2">${card.description}</p>
        <div id="labels" class="">
        <div id="label" class="flex justify-start  gap-2">${createLabel(card.labels)}</div>
        </div>
        <hr>
        <p id="author" class="opacity-60">#1
        ${card.author}</p>
        <p id="createdAt" class="opacity-60">${card.createdAt}</p>
        </div> 
        `
        CardContainer.appendChild(cardDiv)
        
        
    });
    const totalIssue = document.getElementById('totalIssue')
    totalIssue.innerText = CardContainer.children.length;
}

changeTab(CurrentTab);
loadCards();

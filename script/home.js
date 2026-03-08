const closedCardContainer = document.getElementById("closedCardContainer")
const openCardContainer = document.getElementById("openCardContainer")
const loadingSpinner = document.getElementById("loadingSpinner")
const CardContainer = document.getElementById("CardContainer")
const searchInput = document.getElementById("searchInput")
const totalIssue = document.getElementById('totalIssue')
const searchBtn = document.getElementById("searchBtn")
const CardModal = document.getElementById("CardModal")
const closedBtn = document.getElementById("closedBtn")
const openBtn = document.getElementById("openBtn")
const allBtn = document.getElementById("allBtn")
let CurrentTab = "allBtn";
let allIssue = [];



const showSpinner = () => {
    loadingSpinner.classList.remove('hidden')
}

const hideSpinner = () => {
    loadingSpinner.classList.add('hidden')
}

// Change the buttons color
document.getElementById('buttons').addEventListener('click', function (event) {
    let clickedBtn = event.target;
    console.log(clickedBtn);
    
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

    showSpinner()

    setTimeout(() => {
        changeTab(CurrentTab);
        hideSpinner()
    }, 50);

});

function changeTab(CurrentTab) {
    if (CurrentTab === "allBtn") {
        openCardContainer.classList.add("hidden")
        closedCardContainer.classList.add("hidden")
        CardContainer.classList.remove("hidden")
    }
    else if (CurrentTab === "openBtn") {
        CardContainer.classList.add("hidden")
        closedCardContainer.classList.add("hidden")
        openCardContainer.classList.remove("hidden")
    }
    else if (CurrentTab === "closedBtn") {
        CardContainer.classList.add("hidden")
        openCardContainer.classList.add("hidden")
        closedCardContainer.classList.remove("hidden")
    }
    totalIssueCount()

}

function createLabel(arr) {
    const createElement = arr.map((element) =>{
        
        let bgColor = "";
        let icon = ``;
        if(element === "bug" || element === "good first issue"){
            bgColor = 'bg-red-200'
            icon = `<i class="fa-solid fa-bug-slash"></i>`;
            
        }
        else if(element === "help wanted" || element === "documentation" ){
            bgColor = 'bg-yellow-200'
            icon = `<i class="fa-solid fa-person-circle-exclamation"></i>`;
        }
        else if(element === "enhancement"){
            bgColor = 'bg-green-200'
            icon = `<i class="fa-regular fa-circle-xmark"></i>`;
        }
        
        return `<h1 class="${bgColor} px-3 py-1 rounded-lg">${icon}  ${element}</h1>`;
        })
        return createElement.join(" ");
}

async function loadCards() {
    showSpinner()
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();
    allIssue = data.data;
    displayTheCards(data.data);
    hideSpinner()
}

function displayTheCards(data) {
    const CardContainer = document.getElementById("CardContainer")
    CardContainer.innerHTML = '';
    openCardContainer.innerText = '';
    closedCardContainer.innerText = '';
    data.forEach(card => {

        let image = "";
        let borderColor = "";
        if (card.status === "closed") {
            borderColor = "border-purple-400";
            image = 'src="./assets/Closed- Status .png"';
        } else {
            image = 'src="./assets/Open-Status.png"';
            borderColor = "border-green-400";
        }
        let priorityBg = "";
        if (card.priority === "high") {
            priorityBg = "bg-red-200"
        } else if (card.priority === "medium") {
            priorityBg = "bg-yellow-200"
        }else{
            priorityBg = "bg-gray-200"

        }
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML = `
        <div onclick="ShowTheMOdal(${card.id})" class="cursor-pointer card shadow-lg rounded-lg p-7 border-t-9 ${borderColor} space-y-7 h-full">
        <div id="priority" class="flex justify-between  ">
         <img ${image} alt="">
        <h1 class="${priorityBg} px-4 py-1 rounded-lg">${card.priority}</h1>
        </div>
        <h2 class="text-left text-xl font-semibold line-clamp-1">${card.title}</h2>
        <p class="opacity-60 line-clamp-2">${card.description}</p>
        <div id="labels" class="">
        <div id="label" class="flex justify-start  gap-2">${createLabel(card.labels)}</div>
        </div>
        <hr>
        <p id="author" class="opacity-60">#${card.id}
        ${card.author}</p>
        <p id="createdAt" class="opacity-60">${new Date(card.createdAt).toLocaleString()}</p>
        </div> 
        `
        CardContainer.appendChild(cardDiv)
        if (card.status === "closed") {
            const closedCardCopy = cardDiv.cloneNode(true)
            closedCardContainer.appendChild(closedCardCopy)
        }
        else {
            const openCardCopy = cardDiv.cloneNode(true)
            openCardContainer.appendChild(openCardCopy)
        }


    });
    totalIssueCount()

}

function totalIssueCount() {
    if (CurrentTab === "allBtn") {
        totalIssue.innerText = CardContainer.children.length
    }
    else if (CurrentTab === "openBtn") {
        totalIssue.innerText = openCardContainer.children.length
    }
    if (CurrentTab === "closedBtn") {
        totalIssue.innerText = closedCardContainer.children.length

    }
}

async function ShowTheMOdal(cardId) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${cardId}`)
    const data = await res.json();
    displayTheModalCards(data.data);
    CardModal.showModal();
}

function displayTheModalCards(data) {
    console.log(data);

    CardModal.innerText = "";

    let statusColor = "";
    if (data.status === "closed") {
        statusColor = "bg-purple-400";
    } else {
        statusColor = "bg-green-400";
    }

    const cardDiv = document.createElement('div')
    cardDiv.innerHTML = `
                <div class="modal-box space-y-6 p-7">
                    <h2 class="text-2xl font-bold line-clamp-1">${data.title}</h2>
                    <div class="flex gap-2">
                        <p class="${statusColor} text-sm px-2 rounded-md text-white">${data.status}</p>
                        <div class="flex gap-4">
                            <p class="opacity-60 text-sm">Opened by:- ${data.author}</p>
                            <p class="opacity-60 text-sm">Time${new Date(data.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                        <div class="flex justify-start  gap-2">${createLabel(data.labels)}</div>
                    <h2 class="description text-xl font-semibold">${data.description}</h2>

                    <div class="grid grid-cols-2 gap-4 bg-gray-100 p-5 rounded-md">
                        <div ">
                            <p class="mb-4">Assignee:</p>
                            <h3 class="font-semibold">${data.author}</h3>
                        </div>
                        <div class="">
                            <p class="mb-4">Priority:</p>
                            <span class="bg-red-200 px-2 py-1 rounded-md">${data.priority}</span>
                        </div>
                    </div>
                    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn btn-primary p-6">Close</button>
                        </form>
                    </div>
                </div> 
        `
    CardModal.appendChild(cardDiv)
}

searchBtn.addEventListener('click', function(){
    const searchValue = searchInput.value.toLowerCase();

    const filteredIssue = allIssue.filter(issue =>
        issue.title.toLowerCase().includes(searchValue) || issue.description.toLowerCase().includes(searchValue)
    )

    displayTheCards(filteredIssue)
})



changeTab(CurrentTab);
loadCards();

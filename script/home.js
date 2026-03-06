const CardContainer = document.getElementById("CardContainer")
const allBtn = document.getElementById("allBtn")
const openBtn = document.getElementById("openBtn")
const closedBtn = document.getElementById("closedBtn")






function createLabel(arr) {
    const createElement = arr.map((element) => `<h1 class="bg-yellow-200 px-3 py-1 rounded-lg">${element}</h1>`)
    return createElement.join(" ");


}


async function loadCards() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();

    displayTheCards(data.data);
}
function displayTheCards(data) {
    const CardContainer = document.getElementById("CardContainer")
    CardContainer.innerHTML = '';

    data.forEach(card => {

        let borderColor = "";
        if (card.priority === "low") {
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


loadCards();

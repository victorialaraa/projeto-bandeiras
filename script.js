const flagsContainer = document.querySelector("#flagsContainer");

const fetchFlags = async () => {
    await getFlags();
};

const getFlags = async () => {
    const url = "https://restcountries.com/v3.1/all?fields=name,flags";
    const response = await fetch(url);
    const data = await response.json();
    data.map(flag => createFlagCard(flag));
};

function createFlagCard(flag) {
    const card = document.createElement('div');
    card.classList.add("flag");

    const uniqueId = `modal-${flag.name.common.replace(/\s+/g, '-')}`; 

    const description = (flag.flags.alt !== "") 
        ? flag.flags.alt 
        : "No more information";
    

    const flagInnerHTML = `
    <div class="imgContainer">
        <img src="${flag.flags.png}" alt="imagem">
    </div>
    <div class="info">
        <h3 class="name">${flag.name.common}</h3>
    </div>

    <button class="openModalBtn" data-target="${uniqueId}">Description</button>

    <div id="${uniqueId}" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <p>${description}</p>
        </div>
    </div>
    `;

    card.innerHTML = flagInnerHTML;
    flagsContainer.appendChild(card);

    const modal = card.querySelector(`.modal`);
    const btn = card.querySelector(`.openModalBtn`);
    const span = modal.querySelector(".close");

    btn.onclick = function() {
        modal.style.display = "block";
    };

    span.onclick = function() {
        modal.style.display = "none";
    };
    
}

fetchFlags();
const inputsToDisable = document.querySelectorAll('#note, input[type=checkbox]');
const formSubmitBtn = document.querySelector('#submit-btn');
const collapsibleBtn = document.querySelectorAll('.collapsible');
const nameInput = document.querySelector('#name');
const searchOutput = document.querySelector('#search-output');

function disableInput(event){
    if(event.target.value){
        inputsToDisable.forEach(input => input.setAttribute('disabled', 'true'));
    } else {
        inputsToDisable.forEach(input => input.removeAttribute('disabled', 'true'));
    }
}
nameInput.addEventListener('input', disableInput);

function retrieveFilterData(){
    const formData = document.querySelector('#essential-oil-filter');
    const oilFilter = new FormData(formData);
    const name = oilFilter.get('name');
    const note = oilFilter.get('note');
    const fragrances = oilFilter.getAll('frag');
    const allergens = oilFilter.getAll('allergen');
    return [name, note, fragrances];
}

const fetchEssentialOilData = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch('essential-oil.json');
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
        const essentialOilData = await response.json();
        renderData(essentialOilData);

    }
    catch (error) {
        alert("Essential Oil not found");
        console.log(error);
    }
};

function renderData(input){
    const [oilName, fragNote, fragrance] = retrieveFilterData();
    input.forEach(input => {
        if(input.name.includes(oilName) && oilName){
            createInfoCard(input);

        } else if(input.note === fragNote && fragrance.length === 0){
            createInfoCard(input);

        } else if(fragrance.length > 0 && !fragNote){
            for(let i = 0; i < fragrance.length; i++){
                if(input.fragrance_families.includes(fragrance[i])){
                    createInfoCard(input);
                    return true;
                }
            } 
        }else if(fragNote && fragrance.length > 0){
            for(let i = 0; i < fragrance.length; i++){
                if(input.fragrance_families.includes(fragrance[i]) && input.note === fragNote){
                    createInfoCard(input);
                    return true;
                }
            }
        }
    })
}

function deleteData(){
    searchOutput.innerHTML = "";
}

function createInfoCard(input){
    searchOutput.innerHTML += `
        <div class="oil-info">
            <div class="${input.note.toLowerCase()}"><p>${input.note}</p></div>
            <div>
                <p>${input.fragrance_families}</p>
                <h1>${input.name}</h1>
                <details>
                <summary>Effects</summary>
                <p>${input.effects}</p>
                </details>
                <details class="allergens">
                <summary>Allergens</summary>
                <p>${input.allergens}</p>
                </details>
            </div>
        </div>`
}

formSubmitBtn.addEventListener('click', (event) => {
    deleteData();
    fetchEssentialOilData(event);
});

collapsibleBtn.forEach(button => button.addEventListener('click', (event) => {
    const content = event.target.parentElement.nextElementSibling;
    content.classList.toggle('active');
    content.classList.contains('active')
    ? content.style.height = content.scrollHeight + "px"
    : content.style.height = 0;

}));
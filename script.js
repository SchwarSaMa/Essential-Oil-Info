const inputsToDisable = document.querySelectorAll('#note, input[type=checkbox]');
const formSubmitBtn = document.querySelector('#submit-btn');
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
    return name;
}

const fetchEssentialOilData = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch('essential-oil.json');
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
        const essentialOilData = await response.json();
        showData(essentialOilData);

    }
    catch (error) {
        alert("Essential Oil not found");
        console.log(error);
    }
};

function showData(input){
    const dataToSearchFor = retrieveFilterData();
    input.forEach(input => {
        if(input.name.includes(dataToSearchFor)){
            searchOutput.innerHTML += `
            <h1>${input.name}</h1>
            <p>${input.note}</p>
            <p>${input.fragrance_families}</p>
            `
        }
    })
}

function deleteData(){
    searchOutput.innerHTML = "";
}

formSubmitBtn.addEventListener('click', (event) => {
    deleteData();
    fetchEssentialOilData(event);

});
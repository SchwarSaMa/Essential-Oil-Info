 const inputsToDisable = document.querySelectorAll('#note, input[type=checkbox]');
const formSubmitBtn = document.querySelector('#submit-btn');
const nameInput = document.querySelector('#name');
const searchOutput = document.querySelector('search-output');

function disableInput(event){
    if(event.target.value){
        inputsToDisable.forEach(input => input.setAttribute('disabled', 'true'));
    } else {
        inputsToDisable.forEach(input => input.removeAttribute('disabled', 'true'));
    }
}

function retrieveFilterData(event){
    event.preventDefault();
    const formData = document.querySelector('#essential-oil-filter');
    const oilFilter = new FormData(formData);
    const name = oilFilter.get('name');
    const note = oilFilter.get('note');
    const fragrances = oilFilter.getAll('frag')
    const allergens = oilFilter.getAll('allergen')
}

const fetchEssentialOilData = async () => {
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
    input.forEach(input => {
        return input.name.includes('Mand')
        ? console.log(input.name, input.fragrance_families)
        : console.log('noop');
    })
}

formSubmitBtn.addEventListener('click', retrieveFilterData);
nameInput.addEventListener('input', disableInput);
//fetchEssentialOilData();
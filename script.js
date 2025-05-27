const searchOutput = document.querySelector('search-output');

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

fetchEssentialOilData();
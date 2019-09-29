const axios = require('axios');
const fs = require('fs');
const lodash = require('lodash');

const baseURL = 'https://rickandmortyapi.com/api/';
const characters = 'character/';

function characterMatchesParams(characterObject, params) {
    let mathesParams= true;
    params.forEach(parameter => {
        if (characterObject[parameter[0]] !== parameter[1]) {
            mathesParams = false;
        }
    });
    return mathesParams;
};

async function getDataFromRick(args) {
    let rickAndMortyArray = [];
    let results = [];
    const initialResponse = await axios.get(`${baseURL}${characters}`);
    let pages = initialResponse.data.info.pages;
    for (let i = 1; i <= pages; i++) {
        let response = axios.get(`${baseURL}${characters}?page=${i}`);
        rickAndMortyArray.push(response);
    }
    await Promise.all(rickAndMortyArray).then(function (values) {
        for (let i = 0; i < values.length; i++) {
            results = lodash.concat(results, values[i].data.results);
        }

        const filteredList = results.filter(character => {
            return characterMatchesParams(character, args);
        });
        console.log(filteredList);

        return fs.writeFileSync('rick.json', JSON.stringify(results, null, '\t'), 'utf-8');
    });
}

module.exports = {
    getDataFromRick
};
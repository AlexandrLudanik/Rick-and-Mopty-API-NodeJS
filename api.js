const axios = require('axios');
const fs = require('fs');
const lodash = require('lodash');

const baseURL = 'https://rickandmortyapi.com/api/';
const characters = 'character/';

let rickAndMortyArray = [];
let results = [];

async function getDataFromRick(id, name, status, species, type, gender, location) {
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

        const filteredList = results.filter(x =>
            x.name === name
            && x.id === id
            && x.status === status
            && x.species === species
            && x.type === type
            && x.gender === gender
            && x.location.name === location);
        console.log(filteredList);

        fs.writeFileSync('rick.json', JSON.stringify(results, null, '\t'), 'utf-8');
    });
}

module.exports = {
    getDataFromRick
};
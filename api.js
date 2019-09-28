const axios = require('axios');
const fs = require('fs');
const lodash = require('lodash');

const baseURL = 'https://rickandmortyapi.com/api/';
const characters = 'character/';

async function getDataFromRick(...args) {
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

        const filteredList = results.filter(x =>
            x.name === args[1]
            || x.id === args[0]
            || x.status === args[2]
            || x.species === args[3]
            || x.type === args[4]
            || x.gender === args[5]
            || x.location.name === args[6]
        );
        console.log(filteredList);

        return fs.writeFileSync('rick.json', JSON.stringify(results, null, '\t'), 'utf-8');
    });
}

module.exports = {
    getDataFromRick
};
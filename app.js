const yargs = require("yargs");
const api = require("./api");

yargs.command({
    command: 'find',
    describe: 'Find a character',
    builder: {
        id: {
            describe: 'id of character',
            demandOption: true,
            type: 'number',
            alias: 'id'
        },
        name: {
            describe: 'name of character',
            demandOption: true,
            type: 'string',
            alias: 'n'
        },
        status: {
            describe: 'status of character',
            demandOption: true,
            type: 'string',
            alias: 'st'
        },
        species: {
            describe: 'species of character',
            demandOption: true,
            type: 'string',
            alias: 'sp'
        },
        type: {
            describe: 'type of character',
            demandOption: true,
            type: 'string',
            alias: 't'
        },
        gender: {
            describe: 'gender of character',
            demandOption: true,
            type: 'string',
            alias: 'g'
        },
        location: {
            describe: 'location of character',
            demandOption: true,
            type: 'string',
            alias: 'l'
        }
    },
    handler(argv) {
        if (argv.id && argv.name && argv.status && argv.species && argv.type && argv.gender && argv.location) {
            api.getDataFromRick(argv.id, argv.name, argv.status, argv.species, argv.type, argv.gender, argv.location)
        }
    }
});

yargs.parse();
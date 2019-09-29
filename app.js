const yargs = require("yargs");
const api = require("./api");

yargs.command({
    command: 'find',
    describe: 'Find a character',
    builder: {
        id: {
            describe: 'id of character',
            demandOption: false,
            type: 'number',
            alias: 'id'
        },
        name: {
            describe: 'name of character',
            demandOption: false,
            type: 'string',
            alias: 'n'
        },
        status: {
            describe: 'status of character',
            demandOption: false,
            type: 'string',
            alias: 'st'
        },
        species: {
            describe: 'species of character',
            demandOption: false,
            type: 'string',
            alias: 'sp'
        },
        type: {
            describe: 'type of character',
            demandOption: false,
            type: 'string',
            alias: 't'
        },
        gender: {
            describe: 'gender of character',
            demandOption: false,
            type: 'string',
            alias: 'g'
        },
        location: {
            describe: 'location of character',
            demandOption: false,
            type: 'string',
            alias: 'l'
        }
    },
    handler(argv) {
        const arrayOfAcceptableArgs = ['id', 'gender', 'name', 'location', 'type', 'species', 'status'];
        argv = Object.entries(argv).filter(argument => arrayOfAcceptableArgs.includes(argument[0]));
        api.getDataFromRick(argv);
    }
});

yargs.parse();
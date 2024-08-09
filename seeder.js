const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');


//Load env variables
dotenv.config({path: './config/config.env'});

//Load models
const Bootcamp = require('./models/Bootcamp');

//Connect to DataBase
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

dotenv.config({ path: './config/config.env' });

console.log('Loaded environment variables:', process.env); // This will print all environment variables
console.log('Mongo URI:', process.env.MONGO_URI); // This should print the MongoDB URI

//Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

//Import data to DataBase
const importData  = async () => {
    try {
        await Bootcamp.create(bootcamps);
        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (e) {
        console.error(e)
    }
}

//Delete data from DataBase
const delereData  = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log('Data Deleted...'.red.inverse);
        process.exit();
    } catch (e) {
        console.error(e)
    }
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d'){
    delereData();
}
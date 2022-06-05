const express = require ('express');
const multer = require ('multer');
const wordsninjapack = require ("wordsninja");
const fs = require (`fs`);
const router = express.Router();
const wordsninja = new wordsninjapack();

let fileName = ``;
const fileStorage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, `./uploads`);
    },
    filename: (req, file, cb) => {
        fileName = file.originalname;
        cb(null, file.originalname);
    },
});  

const upload = multer({
    storage: fileStorage,
    //Filters file type
    fileFilter(req,file,cb) {
        if (!file.originalname.match(/\.(txt|| csv)$/)) {
            return cb(new Error (`File not supported for processing.`));
        }
        cb(undefined, true);
    },
    });

    router.post(
        `/upload`,
        upload.single(`upload`),
        (req, res) => {
            console.clear();

            if (fileName.includes(`.csv`)) {
                readCSV(fileName, (e, request) => {
                    res.status(200).send({message:request});
                });          
            }
        },
        (error, req, res, next) => {
            res.status(400).send ({ error: error.message });
        }
    );

const readCSV = (fileName, cb) => {
    fs.readFile(`./uploads/${fileName}`, `utf8`, async (error,data) => {
        console.log (data);
//const words = data.split(",");
//console.log(words);
//let message = "";
// for (let i=0; <words.length; i++){
//  message = message + " " + words[i]; 
//}

await wordsninja.loadDictionary();
const message = wordsninja.splitSentence(data, {joinWords: true });
console.log(message);
cb(undefined, message.trim());
    });
};

const words = [];
const readTXT = (fileName, cb) => {
    fs.readfile (`./uploads/${fileName}`, `utf8`, async (error, data) => {
        console.log(data);
        // words.push (data.slice(0, 5));
        // words.push (data.slice(5, 11));
        // words.push (data.slice(11, 15));
        // words.push (data.slice(15, 20));
        // words.push (data.slice(20, 30));
        // const message = `${words[0]} ${words[1]} ${words[2]} ${words[3]} ${words[4]}.`;
        // }

        await wordsninja.loadDictionary();
        const message = wordsninja.splitSentence(data, {joinWords: true});
        console.log(message);
        cb(undefined, message);
    });
};

module.exports = router;

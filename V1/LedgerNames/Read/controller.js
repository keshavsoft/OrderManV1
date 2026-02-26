import {
    StartFunc as StartFuncFromReadFromFile
} from './readFromFile.js';

let GetFunc = (req, res) => {
    let LocalFromRepo = StartFuncFromReadFromFile();

    if (LocalFromRepo.KTF === false) {
        res.status(404).send(LocalFromRepo.KReason);

        return;
    };

    res.status(200).json(LocalFromRepo.JsonData);
};

export {
    GetFunc
};
import {
    StartFunc as StartFuncFromInsertToFile
} from './insertToFile.js';

let postFilterDataFromBodyFunc = (req, res) => {
    let LocalRequestBody = req.body;

    let LocalFromRepo = StartFuncFromInsertToFile({
        inRequestBody: LocalRequestBody
    });

    if (LocalFromRepo.KTF === false) {
        res.status(409).send(LocalFromRepo.KReason);
        return;
    };

    res.set('Content-Type', 'text/plain');
    res.send(LocalFromRepo.SuccessText);
};

export {
    postFilterDataFromBodyFunc
};
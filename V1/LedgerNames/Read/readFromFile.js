import fs from "fs";

import ParamsJson from '../CommonFuncs/params.json' with {type: 'json'};

let StartFunc = () => {
    const LocalFileName = ParamsJson.TableName;
    const LocalDataPath = ParamsJson.DataPath;

    let LocalReturnData = { KTF: false };
    let filePath = `${LocalDataPath}/${LocalFileName}.json`;

    try {
        if (!fs.existsSync(filePath)) {
            LocalReturnData.KReason = `${LocalFileName}.json File does not exist in ${LocalDataPath} Folder.`;
            console.warn(LocalReturnData.KReason);
            return LocalReturnData;
        };

        const data = fs.readFileSync(`${LocalDataPath}/${LocalFileName}.json`, 'utf8');

        LocalReturnData.KTF = true;
        LocalReturnData.JsonData = JSON.parse(data);
    } catch (err) {
        LocalReturnData.KReason = `Error reading ${LocalFileName} file .`;
        console.warn(LocalReturnData.KReason);
        return LocalReturnData;
    };

    return LocalReturnData;
};

export { StartFunc };

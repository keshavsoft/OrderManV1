import fs from "fs";

import ParamsJson from '../CommonFuncs/params.json' with {type: 'json'};

const StartFunc = ({ inRequestBody }) => {
  const LocalFileName = ParamsJson.TableName;
  const LocalDataPath = ParamsJson.DataPath;

  let LocalinDataToInsert = inRequestBody;

  const filePath = `${LocalDataPath}/${LocalFileName}.json`;
  let LocalReturnObject = {};
  LocalReturnObject.KTF = false;

  try {
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      let LocalArrayPk = data.map(element => element.pk);

      let LocalRemoveUndefined = LocalArrayPk.filter(function (element) {
        return element !== undefined;
      });

      let numberArray = LocalRemoveUndefined.map(Number);
      let MaxPk = Math.max(...numberArray, 0) + 1;

      let LocalInsertData = { ...LocalinDataToInsert, pk: MaxPk };
      data.push(LocalInsertData);

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

      LocalReturnObject.KTF = true;
      LocalReturnObject.SuccessText = `Inserted pk ${MaxPk} In To ${LocalFileName}.json successfully`;

      return LocalReturnObject;
    } else {
      LocalReturnObject.KReason = `File ${LocalFileName}.json does not exist in ${LocalDataPath} folder.`;
      console.warn(LocalReturnObject.KReason);

      return LocalReturnObject;
    };
  } catch (err) {
    console.error('Error:', err);
  };

  return LocalReturnObject;
};

export { StartFunc };
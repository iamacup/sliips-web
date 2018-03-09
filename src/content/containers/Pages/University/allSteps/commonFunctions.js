
import { dNc } from '../../../../../content/scripts/custom/utilities';

export function getAllItemsWithFriendlyNameFromState(friendlyName, answerData) {
  const results = [];

  if (dNc(answerData) && dNc(answerData.data)) {
    const { data } = answerData;
    const arr = Object.keys(data);

    arr.forEach((value) => {
      if (dNc(data[value][friendlyName])) {
        results.push({
          optionValue: data[value][friendlyName].optionValue,
          arrayValue: Number.parseInt(value.split('_')[1], 10),
        });
      }
    });
  }

  return results;
}

export function getLatestItemWithFriendlyNameFromState(friendlyName, alternativeText, answerData) {
  const results = getAllItemsWithFriendlyNameFromState(friendlyName, answerData);

  if (results.length === 0) {
    return alternativeText;
  }

  let latestFound = null;

  results.forEach((value) => {
    if (latestFound === null) {
      latestFound = value;
    } else if (latestFound.arrayValue < value.arrayValue) {
      latestFound = value;
    }
  });

  return latestFound.optionValue;
}

export function getFirstItemWithFriendlyNameFromState(friendlyName, alternativeText, answerData) {
  const results = getAllItemsWithFriendlyNameFromState(friendlyName, answerData);

  if (results.length === 0) {
    return alternativeText;
  }

  return results[0].optionValue;
}

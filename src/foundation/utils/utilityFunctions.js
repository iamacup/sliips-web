// eslint-disable-next-line import/prefer-default-export
export function getEnvironment() {
  if (__API__ === '3' || __API__ === '"3"') {
    return 'live';
  } else if (__API__ === '2' || __API__ === '"2"') {
    return 'dev';
  } else if (__API__ === '1' || __API__ === '"1"') {
    return 'local';
  }

  return 'live';
}

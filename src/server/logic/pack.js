export default function (result, total = 0, code = 0, errorMsg = 'no error.') {
  return {
    code,
    errorMsg,
    result,
    total,
  };
}

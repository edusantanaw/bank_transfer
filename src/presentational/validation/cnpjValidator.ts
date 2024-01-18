export class CnpjValidator implements IValidator {
  isValid(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, "");
    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
      return false;
    }
    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (parseInt(digits.charAt(0)) !== result) {
      return false;
    }
    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return parseInt(digits.charAt(1)) === result;
  }
}

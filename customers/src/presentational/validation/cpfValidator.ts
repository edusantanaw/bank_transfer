export class CpfValidator implements IValidator {
  isValid(cpf: string) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    remainder = remainder >= 10 ? 0 : remainder;
    if (parseInt(cpf.charAt(9)) !== remainder) {
      return false;
    }
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    remainder = remainder >= 10 ? 0 : remainder;
    return parseInt(cpf.charAt(10)) === remainder;
  }
}

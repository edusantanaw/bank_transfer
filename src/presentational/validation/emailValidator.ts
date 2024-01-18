interface IValidator {
  isValid: (value: string) => boolean;
}

export class EmailValidator implements IValidator {
  isValid(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default class Email {
  private regex: RegExp;
  private _email: string;
  constructor(email: string) {
    this.regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    this._email = email;
  }

  validate(): boolean {
    return this.regex.test(this._email);
  }
}

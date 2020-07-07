export interface Mailer {
  send(emails: string[]): Promise<void>;
  generateConfirmationTemplate(): string;
  sendConfirmation(email: string): Promise<void>
}

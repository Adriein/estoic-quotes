import sgMail from '@sendgrid/mail';
import { Mailer as IMailer } from '../../core/entities';

export class Mailer implements IMailer {
  constructor() {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY!);
  }

  async send(emails: string[]): Promise<void> {
    const msg = {
      to: emails,
      from: 'stoicweekly@gmail.com',
      subject: 'Stoic Quotes',
      text: 'and easy to do anywhere, even with Node.js',
      html: this.generateQuoteTemplate(),
    };

    await sgMail.sendMultiple(msg);
  }

  async sendConfirmation(email: string): Promise<void> {
    const msg = {
      to: email,
      from: 'stoicweekly@gmail.com',
      subject: 'Stoic Quotes',
      text: 'Confirm your email account',
      html: this.generateConfirmationTemplate(),
    };

    await sgMail.send(msg);
  }

  generateConfirmationTemplate(): string {
    return `<html>
        <body>
            <div style="text-align: center;">
                <h3>Please click the link below to confirm your email account</h3>
                <a href=${
                  process.env.NODE_ENV === 'dev'
                    ? 'http://localhost:3000/api/confirm'
                    : 'http://https://stoic-quo.herokuapp.com/api/confirm'
                }>
                    Confirm the email
                </a>
            </div>
        </body>
    </html>`;
  }

  generateQuoteTemplate() {
    return `<html>
        <body>
            <div style="text-align: center;">
                <h3>Please click the link below to confirm your email account</h3>
            </div>
        </body>
    </html>`;
  }
}

export interface MailData {
  template: string;
  project: string;
  subject: string;
  to: string;
  expiresAt: string;
  from?: string;
  url?: string;
}

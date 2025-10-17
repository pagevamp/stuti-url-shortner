export const MAIL_CONSTANTS = {
  FROM: 'Stuti Url Shortener',
  SUBJECTS: {
    VERIFY_EMAIL: 'Verify Your Email Address',
  },
  MESSAGES: {
    VERIFY_EMAIL: (url: string, expiresAt: Date) => `Hello from Stuti-Url-Shortener. 🌻

Please click on the link below to verify your email address:

${url}

This link will expire on: ${expiresAt.toUTCString()}`,
  },
};

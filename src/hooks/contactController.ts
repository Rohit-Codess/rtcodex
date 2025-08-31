import emailjs from 'emailjs-com';

// EmailJS configuration from environment variables
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const RECEIVER_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_RECEIVER_TEMPLATE_ID;
const AUTO_REPLY_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const sendEmail = async (
  formData: ContactFormData,
  onSuccess: () => void,
  onError: (error: Error) => void
): Promise<void> => {
  const { name, email, message } = formData;

  try {
    // Check if EmailJS is configured
    if (!SERVICE_ID || !RECEIVER_TEMPLATE_ID || !PUBLIC_KEY) {
      throw new Error('Email service is not configured. Please contact the administrator.');
    }

    // 1. Send notification email to you (the website owner)
    await emailjs.send(
      SERVICE_ID,
      RECEIVER_TEMPLATE_ID,
      { name, email, message },
      PUBLIC_KEY
    );

    // 2. Send auto-reply to the user (if auto-reply template is configured)
    if (AUTO_REPLY_TEMPLATE_ID) {
      try {
        await emailjs.send(
          SERVICE_ID,
          AUTO_REPLY_TEMPLATE_ID,
          { name, email, message },
          PUBLIC_KEY
        );
      } catch (autoReplyError) {
        console.warn('Auto-reply failed:', autoReplyError);
        // Don't fail the entire process if auto-reply fails
      }
    }

    onSuccess();
  } catch (error) {
    console.error('EmailJS Error:', error);
    onError(error instanceof Error ? error : new Error('Failed to send message. Please try again.'));
  }
};

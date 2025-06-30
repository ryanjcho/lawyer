import nodemailer from 'nodemailer'
import { envConfig } from '../config/env.config'

interface EmailOptions {
  to: string
  subject: string
  html: string
  attachments?: Array<{
    filename: string
    content: Buffer | string
    contentType?: string
  }>
}

const transporter = nodemailer.createTransport({
  host: envConfig.email.smtp.host,
  port: envConfig.email.smtp.port,
  secure: envConfig.email.smtp.port === 465,
  auth: {
    user: envConfig.email.smtp.user,
    pass: envConfig.email.smtp.password,
  },
})

export async function sendEmail({ to, subject, html, attachments }: EmailOptions) {
  try {
    await transporter.sendMail({
      from: envConfig.email.smtp.from,
      to,
      subject,
      html,
      ...(attachments ? { attachments } : {}),
    })
  } catch (error) {
    console.error('Failed to send email:', error)
    throw new Error('이메일 전송에 실패했습니다')
  }
}

export function renderCustomNotificationEmail({ title, message }: { title: string, message: string }) {
  return `
    <html>
      <body style="font-family: Arial, sans-serif;">
        <h2 style="color: #4F46E5;">${title}</h2>
        <p>${message}</p>
        <hr />
        <p style="font-size: 12px; color: #888;">OhKContract 알림 메일입니다.</p>
      </body>
    </html>
  `;
} 
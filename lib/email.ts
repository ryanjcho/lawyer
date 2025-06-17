import nodemailer from 'nodemailer'
import { envConfig } from '@/config/env.config'

interface EmailOptions {
  to: string
  subject: string
  html: string
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

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    await transporter.sendMail({
      from: envConfig.email.smtp.from,
      to,
      subject,
      html,
    })
  } catch (error) {
    console.error('Failed to send email:', error)
    throw new Error('이메일 전송에 실패했습니다')
  }
} 
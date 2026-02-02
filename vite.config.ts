import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import nodemailer from 'nodemailer'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    {
      name: 'contact-email',
      configureServer(server) {
        server.middlewares.use('/api/contact', async (req, res, next) => {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Method not allowed' }))
            return
          }

          let body = ''
          req.on('data', (chunk) => {
            body += chunk
          })
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}')
              const { name, email, phone, service, message } = data

              if (!name || !email || !service || !message) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: 'Missing required fields' }))
                return
              }

              const transporter = nodemailer.createTransport({
                host: env.SMTP_HOST,
                port: Number(env.SMTP_PORT || 587),
                secure: false,
                auth: {
                  user: env.SMTP_USER,
                  pass: env.SMTP_PASS
                }
              })

              await transporter.sendMail({
                from: env.SMTP_FROM,
                to: env.ADMIN_EMAIL,
                replyTo: email,
                subject: `Novo contato - ${name}`,
                text: [
                  `Nome: ${name}`,
                  `Email: ${email}`,
                  `Telefone: ${phone || '-'}`,
                  `Serviço: ${service}`,
                  `Mensagem: ${message}`
                ].join('\n')
              })

              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: true }))
            } catch (error) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Failed to send email' }))
            }
          })
        })
      }
    }
  ],
  resolve: {
    alias: [
      // Alias @ to the src directory
      { find: '@', replacement: path.resolve(__dirname, './src') },
      // Support Figma asset imports like figma:asset/<hash>.png
      { find: /^figma:asset\//, replacement: path.resolve(__dirname, './src/assets/') + '/' },
    ],
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})

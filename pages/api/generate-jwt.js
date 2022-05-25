// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    const jwtSecret = process.env.JWT_SECRET || 'no-env-secret'
    res.status(200).json({ jwt: 'John Doe', secret: jwtSecret })
}
  
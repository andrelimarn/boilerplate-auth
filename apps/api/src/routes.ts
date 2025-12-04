import { Router } from 'express';
import { prisma } from '@auth/database';
import { NodemailerProvider } from '@auth/email';

export const router = Router();

const mailProvider = new NodemailerProvider();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.post('/users', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password, // Note: In a real app, hash the password!
        name,
      },
    });

    await mailProvider.sendMail({
      to: email,
      subject: 'Welcome!',
      body: `Hello ${name}, welcome to our platform!`,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

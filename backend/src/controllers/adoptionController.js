import { prisma } from '../lib/prisma.js';

export const createAdoption = async (req, res) => {
  try {
    const { petId, fullName, email, phone, address, reason } = req.body;

    if (!petId || !fullName || !email || !phone || !address || !reason) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const adoption = await prisma.adoption.create({
      data: {
        petId: parseInt(petId),
        fullName,
        email,
        phone,
        address,
        reason,
      },
    });

    res.status(201).json({
      message: 'Adoption form submitted successfully',
      adoption: {
        id: adoption.id,
        fullName: adoption.fullName,
        email: adoption.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAdoptions = async (req, res) => {
  try {
    const adoptions = await prisma.adoption.findMany({
      include: {
        pet: {
          select: { name: true, species: true, breed: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ adoptions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};





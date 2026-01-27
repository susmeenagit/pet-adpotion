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

// ============= ADMIN ROUTES =============

// Get adoption by ID (admin only)
export const getAdoptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const adoption = await prisma.adoption.findUnique({
      where: { id: parseInt(id) },
      include: {
        pet: {
          select: { name: true, species: true, breed: true },
        },
        verifications: true,
      },
    });

    if (!adoption) {
      return res.status(404).json({ error: 'Adoption not found' });
    }

    res.json({ adoption });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update adoption status (admin only)
export const updateAdoptionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const adoption = await prisma.adoption.update({
      where: { id: parseInt(id) },
      data: { status },
      include: {
        pet: {
          select: { name: true, species: true, breed: true },
        },
      },
    });

    res.json({ message: 'Adoption status updated', adoption });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Adoption not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete adoption (admin only)
export const deleteAdoption = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.adoption.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Adoption deleted successfully' });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Adoption not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};






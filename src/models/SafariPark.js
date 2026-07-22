const { db } = require('../config/firebase');

class SafariPark {
  constructor(data) {
    this.id = data.id || null;
    this.name = data.name;
    this.ratePerPerson = data.ratePerPerson;
    this.image = data.image;
    this.status = data.status || 'active';
    this.createdAt = data.createdAt || new Date();
  }

  static async create(parkData) {
    try {
      const generateDocId = () => `SSPK-${Date.now()}-${Math.floor(Math.random() * 9000) + 1000}`;
      const newId = generateDocId();
      const parkRef = db.collection('safari-parks').doc(newId);
      const park = new SafariPark({
        ...parkData,
        id: parkRef.id,
        createdAt: new Date()
      });

      await parkRef.set(park.toFirestore());
      return { id: parkRef.id, ...park };
    } catch (error) {
      console.error('Error creating safari park:', error);
      throw new Error('Failed to create safari park');
    }
  }

  static async getAll() {
    try {
      const snapshot = await db.collection('safari-parks').get();
      const parks = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(park => park.status !== 'deleted')
        .sort((a, b) => {
          const aTime = a.createdAt?.seconds || a.createdAt?.getTime?.() || 0;
          const bTime = b.createdAt?.seconds || b.createdAt?.getTime?.() || 0;
          return bTime - aTime;
        });
      return parks;
    } catch (error) {
      console.error('Error fetching safari parks:', error);
      throw new Error('Failed to fetch safari parks');
    }
  }

  static async getById(parkId) {
    try {
      const doc = await db.collection('safari-parks').doc(parkId).get();
      if (!doc.exists) {
        throw new Error('Safari park not found');
      }
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('Error fetching safari park:', error);
      throw error;
    }
  }

  static async update(parkId, updateData) {
    try {
      const parkRef = db.collection('safari-parks').doc(parkId);
      await parkRef.update({
        ...updateData,
        updatedAt: new Date()
      });
      return await this.getById(parkId);
    } catch (error) {
      console.error('Error updating safari park:', error);
      throw new Error('Failed to update safari park');
    }
  }

  static async delete(parkId) {
    try {
      await db.collection('safari-parks').doc(parkId).update({
        status: 'deleted',
        deletedAt: new Date()
      });
      return { message: 'Safari park deleted successfully' };
    } catch (error) {
      console.error('Error deleting safari park:', error);
      throw new Error('Failed to delete safari park');
    }
  }

  toFirestore() {
    return {
      name: this.name,
      ratePerPerson: this.ratePerPerson,
      image: this.image,
      status: this.status,
      createdAt: this.createdAt
    };
  }
}

module.exports = SafariPark;

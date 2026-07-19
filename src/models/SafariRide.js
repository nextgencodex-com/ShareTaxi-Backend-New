const { db } = require('../config/firebase');

class SafariRide {
  constructor(data) {
    this.id = data.id || null;
    this.parkId = data.parkId || '';
    this.parkName = data.parkName || '';
    this.date = data.date || '';
    this.time = data.time || '';
    this.people = Number(data.people || 1);
    this.price = Number(data.price || 0);
    this.customerName = data.customerName || '';
    this.customerEmail = data.customerEmail || '';
    this.customerPhone = data.customerPhone || '';
    this.specialRequests = data.specialRequests || '';
    this.status = data.status || 'active';
    this.createdAt = data.createdAt || new Date();
  }

  static async create(rideData) {
    try {
      const newId = `SFR-${Date.now()}-${Math.floor(Math.random() * 9000) + 1000}`;
      const rideRef = db.collection('safari_rides').doc(newId);
      const ride = new SafariRide({
        ...rideData,
        id: rideRef.id,
        createdAt: new Date()
      });

      await rideRef.set(ride.toFirestore());
      return { id: rideRef.id, bookingId: rideRef.id, ...ride };
    } catch (error) {
      console.error('Error creating safari ride:', error);
      throw new Error('Failed to create safari ride');
    }
  }

  static async getAll() {
    try {
      const snapshot = await db.collection('safari_rides').get();

      return snapshot.docs
        .map(doc => ({
          id: doc.id,
          bookingId: doc.id,
          ...doc.data()
        }))
        .filter(ride => ride.status !== 'deleted')
        .sort((a, b) => {
          const aTime = a.createdAt?.seconds || a.createdAt?.getTime?.() || 0;
          const bTime = b.createdAt?.seconds || b.createdAt?.getTime?.() || 0;
          return bTime - aTime;
        });
    } catch (error) {
      console.error('Error fetching safari rides:', error);
      throw new Error('Failed to fetch safari rides');
    }
  }

  static async update(id, updateData) {
    try {
      const rideRef = db.collection('safari_rides').doc(id);
      const doc = await rideRef.get();

      if (!doc.exists) {
        throw new Error('Safari ride not found');
      }

      await rideRef.update({
        ...updateData,
        updatedAt: new Date()
      });

      const updated = await rideRef.get();
      return { id: updated.id, bookingId: updated.id, ...updated.data() };
    } catch (error) {
      console.error('Error updating safari ride:', error);
      throw error;
    }
  }
  static async softDelete(id) {
    try {
      await db.collection('safari_rides').doc(id).update({
        status: 'deleted',
        updatedAt: new Date()
      });
      return true;
    } catch (error) {
      console.error('Error deleting safari ride:', error);
      throw new Error('Failed to delete safari ride');
    }
  }

  toFirestore() {
    return {
      parkId: this.parkId,
      parkName: this.parkName,
      date: this.date,
      time: this.time,
      people: this.people,
      price: this.price,
      customerName: this.customerName,
      customerEmail: this.customerEmail,
      customerPhone: this.customerPhone,
      specialRequests: this.specialRequests,
      status: this.status,
      createdAt: this.createdAt
    };
  }
}

module.exports = SafariRide;




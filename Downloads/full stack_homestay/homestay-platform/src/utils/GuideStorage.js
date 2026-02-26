class GuideStorage {
  constructor() {
    this.guides = [
      {
        id: 1,
        name: 'Ravi Kumar',
        email: 'ravi@guide.com',
        phone: '9876543220',
        location: 'Goa',
        languages: ['English', 'Hindi', 'Konkani'],
        specialization: ['Beach Tours', 'Water Sports', 'Historical Sites'],
        experience: 5,
        pricePerDay: 1500,
        rating: 4.8,
        available: true,
        description: 'Experienced guide specializing in Goa beach tours and water sports activities.'
      },
      {
        id: 2,
        name: 'Meera Nair',
        email: 'meera@guide.com',
        phone: '9876543221',
        location: 'Kerala',
        languages: ['English', 'Hindi', 'Malayalam'],
        specialization: ['Backwater Tours', 'Cultural Tours', 'Ayurveda'],
        experience: 7,
        pricePerDay: 2000,
        rating: 4.9,
        available: true,
        description: 'Expert in Kerala backwater tours and cultural experiences.'
      },
      {
        id: 3,
        name: 'Arjun Singh',
        email: 'arjun@guide.com',
        phone: '9876543222',
        location: 'Rajasthan',
        languages: ['English', 'Hindi', 'Rajasthani'],
        specialization: ['Desert Safari', 'Fort Tours', 'Cultural Heritage'],
        experience: 6,
        pricePerDay: 1800,
        rating: 4.7,
        available: false,
        description: 'Specialized in Rajasthan desert safaris and historical fort tours.'
      },
      {
        id: 4,
        name: 'Priya Sharma',
        email: 'priya@guide.com',
        phone: '9876543223',
        location: 'Himachal Pradesh',
        languages: ['English', 'Hindi', 'Punjabi'],
        specialization: ['Trekking', 'Mountain Tours', 'Adventure Sports'],
        experience: 4,
        pricePerDay: 1600,
        rating: 4.6,
        available: true,
        description: 'Adventure specialist for Himalayan treks and mountain expeditions.'
      },
      {
        id: 5,
        name: 'Vikram Reddy',
        email: 'vikram@guide.com',
        phone: '9876543224',
        location: 'Karnataka',
        languages: ['English', 'Hindi', 'Kannada'],
        specialization: ['Temple Tours', 'Wildlife Safari', 'City Tours'],
        experience: 8,
        pricePerDay: 2200,
        rating: 4.9,
        available: true,
        description: 'Expert guide for Karnataka temples, wildlife, and city exploration.'
      }
    ];
    this.bookings = [];
  }

  getAllGuides() {
    return this.guides;
  }

  getAvailableGuides() {
    return this.guides.filter(guide => guide.available);
  }

  getGuidesByLocation(location) {
    return this.guides.filter(guide => 
      guide.location.toLowerCase().includes(location.toLowerCase()) && guide.available
    );
  }

  getGuideById(id) {
    return this.guides.find(guide => guide.id === id);
  }

  bookGuide(bookingData) {
    const booking = {
      id: Date.now(),
      ...bookingData,
      status: 'pending',
      bookedAt: new Date().toISOString()
    };
    this.bookings.push(booking);
    return booking;
  }

  getBookingsByTourist(touristEmail) {
    return this.bookings.filter(booking => booking.touristEmail === touristEmail);
  }

  updateGuideAvailability(id, available) {
    const guide = this.guides.find(g => g.id === id);
    if (guide) {
      guide.available = available;
    }
  }
}

const guideStorage = new GuideStorage();
export default guideStorage;

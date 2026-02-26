class HomestayStorage {
  constructor() {
    this.homestays = [
      { id: 1, name: 'Cozy Villa', location: 'Goa', price: 2500, rooms: 3, amenities: 'WiFi, AC, Pool', rating: 4.5, hostEmail: 'rajesh@homestay.com', hostName: 'Rajesh Kumar', hostPhone: '9876543210', status: 'approved', description: 'Beautiful villa near the beach' },
      { id: 2, name: 'Beach House', location: 'Kerala', price: 3000, rooms: 4, amenities: 'WiFi, Kitchen, Beach Access', rating: 4.8, hostEmail: 'rajesh@homestay.com', hostName: 'Rajesh Kumar', hostPhone: '9876543210', status: 'approved', description: 'Luxury beach house with ocean view' },
      { id: 3, name: 'Mountain Retreat', location: 'Manali', price: 2000, rooms: 2, amenities: 'Fireplace, Garden', rating: 4.3, hostEmail: 'priya@homestay.com', hostName: 'Priya Sharma', hostPhone: '9876543211', status: 'approved', description: 'Peaceful mountain getaway' },
      { id: 4, name: 'Heritage Haveli', location: 'Jaipur', price: 3500, rooms: 5, amenities: 'WiFi, AC, Traditional Decor, Parking', rating: 4.7, hostEmail: 'priya@homestay.com', hostName: 'Priya Sharma', hostPhone: '9876543211', status: 'approved', description: 'Experience royal Rajasthani hospitality' },
      { id: 5, name: 'Lake View Cottage', location: 'Udaipur', price: 2800, rooms: 3, amenities: 'WiFi, Lake View, Garden', rating: 4.6, hostEmail: 'amit@homestay.com', hostName: 'Amit Patel', hostPhone: '9876543212', status: 'approved', description: 'Serene cottage overlooking the lake' },
      { id: 6, name: 'City Center Apartment', location: 'Mumbai', price: 4000, rooms: 2, amenities: 'WiFi, AC, Gym, Parking', rating: 4.4, hostEmail: 'amit@homestay.com', hostName: 'Amit Patel', hostPhone: '9876543212', status: 'approved', description: 'Modern apartment in heart of Mumbai' },
      { id: 7, name: 'Garden Villa', location: 'Bangalore', price: 3200, rooms: 4, amenities: 'WiFi, AC, Garden, Parking', rating: 4.5, hostEmail: 'sneha@homestay.com', hostName: 'Sneha Reddy', hostPhone: '9876543213', status: 'approved', description: 'Spacious villa with lush garden' },
      { id: 8, name: 'Riverside Retreat', location: 'Rishikesh', price: 2200, rooms: 3, amenities: 'WiFi, River View, Yoga Space', rating: 4.8, hostEmail: 'sneha@homestay.com', hostName: 'Sneha Reddy', hostPhone: '9876543213', status: 'approved', description: 'Peaceful retreat by the Ganges' },
      { id: 9, name: 'Tea Estate Bungalow', location: 'Darjeeling', price: 2600, rooms: 3, amenities: 'WiFi, Fireplace, Tea Garden', rating: 4.7, hostEmail: 'rajesh@homestay.com', hostName: 'Rajesh Kumar', hostPhone: '9876543210', status: 'approved', description: 'Colonial bungalow in tea gardens' },
      { id: 10, name: 'Desert Camp', location: 'Jaisalmer', price: 1800, rooms: 2, amenities: 'Traditional Tents, Camel Safari, Bonfire', rating: 4.5, hostEmail: 'priya@homestay.com', hostName: 'Priya Sharma', hostPhone: '9876543211', status: 'approved', description: 'Authentic desert camping experience' },
      { id: 11, name: 'Backwater Villa', location: 'Alleppey', price: 3300, rooms: 4, amenities: 'WiFi, AC, Backwater View, Boat', rating: 4.9, hostEmail: 'amit@homestay.com', hostName: 'Amit Patel', hostPhone: '9876543212', status: 'approved', description: 'Luxury villa on Kerala backwaters' },
      { id: 12, name: 'Hill Station Cottage', location: 'Ooty', price: 2400, rooms: 2, amenities: 'WiFi, Fireplace, Garden', rating: 4.4, hostEmail: 'sneha@homestay.com', hostName: 'Sneha Reddy', hostPhone: '9876543213', status: 'approved', description: 'Cozy cottage in the Nilgiris' },
      { id: 13, name: 'Palace Suite', location: 'Mysore', price: 4500, rooms: 3, amenities: 'WiFi, AC, Heritage Architecture, Parking', rating: 4.8, hostEmail: 'rajesh@homestay.com', hostName: 'Rajesh Kumar', hostPhone: '9876543210', status: 'approved', description: 'Royal suite in heritage palace' },
      { id: 14, name: 'Beach Shack', location: 'Gokarna', price: 1500, rooms: 1, amenities: 'Beach Access, Hammock', rating: 4.2, hostEmail: 'priya@homestay.com', hostName: 'Priya Sharma', hostPhone: '9876543211', status: 'approved', description: 'Simple beach shack for backpackers' },
      { id: 15, name: 'Forest Lodge', location: 'Coorg', price: 2900, rooms: 3, amenities: 'WiFi, Fireplace, Coffee Plantation', rating: 4.6, hostEmail: 'amit@homestay.com', hostName: 'Amit Patel', hostPhone: '9876543212', status: 'approved', description: 'Lodge in coffee plantations' },
      { id: 16, name: 'Urban Loft', location: 'Delhi', price: 3800, rooms: 2, amenities: 'WiFi, AC, Modern Design, Parking', rating: 4.3, hostEmail: 'sneha@homestay.com', hostName: 'Sneha Reddy', hostPhone: '9876543213', status: 'approved', description: 'Stylish loft in South Delhi' },
      { id: 17, name: 'Seaside Bungalow', location: 'Pondicherry', price: 2700, rooms: 3, amenities: 'WiFi, AC, Beach View, Garden', rating: 4.7, hostEmail: 'rajesh@homestay.com', hostName: 'Rajesh Kumar', hostPhone: '9876543210', status: 'approved', description: 'French colonial style bungalow' },
      { id: 18, name: 'Valley View Home', location: 'Shimla', price: 2300, rooms: 2, amenities: 'WiFi, Fireplace, Mountain View', rating: 4.5, hostEmail: 'priya@homestay.com', hostName: 'Priya Sharma', hostPhone: '9876543211', status: 'approved', description: 'Home with stunning valley views' },
      { id: 19, name: 'Luxury Penthouse', location: 'Pune', price: 4200, rooms: 3, amenities: 'WiFi, AC, Terrace, Gym, Parking', rating: 4.6, hostEmail: 'amit@homestay.com', hostName: 'Amit Patel', hostPhone: '9876543212', status: 'approved', description: 'Premium penthouse with city views' },
      { id: 20, name: 'Farmhouse Stay', location: 'Lonavala', price: 3100, rooms: 4, amenities: 'WiFi, Pool, Garden, BBQ', rating: 4.7, hostEmail: 'sneha@homestay.com', hostName: 'Sneha Reddy', hostPhone: '9876543213', status: 'approved', description: 'Spacious farmhouse for groups' }
    ];
    this.homestayId = 21;
  }

  addHomestay(homestayData) {
    const homestay = {
      id: this.homestayId++,
      ...homestayData,
      status: 'pending',
      rating: 0
    };
    this.homestays.push(homestay);
    return homestay;
  }

  getHomestaysByHost(hostEmail) {
    return this.homestays.filter(h => h.hostEmail === hostEmail);
  }

  getApprovedHomestays() {
    return this.homestays.filter(h => h.status === 'approved');
  }

  getAllHomestays() {
    return this.homestays;
  }

  updateHomestayStatus(homestayId, status) {
    const homestay = this.homestays.find(h => h.id === homestayId);
    if (homestay) {
      homestay.status = status;
      return true;
    }
    return false;
  }

  deleteHomestay(homestayId) {
    this.homestays = this.homestays.filter(h => h.id !== homestayId);
  }
}

const homestayStorage = new HomestayStorage();
export default homestayStorage;

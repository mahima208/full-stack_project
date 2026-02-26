class UserStorage {
  constructor() {
    this.users = [
      { email: 'admin@homestay.com', password: 'admin123', role: 'admin', username: 'Admin', phone: '1234567890' },
      { email: 'rajesh@homestay.com', password: 'rajesh123', role: 'host', username: 'Rajesh Kumar', phone: '9876543210' },
      { email: 'priya@homestay.com', password: 'priya123', role: 'host', username: 'Priya Sharma', phone: '9876543211' },
      { email: 'amit@homestay.com', password: 'amit123', role: 'host', username: 'Amit Patel', phone: '9876543212' },
      { email: 'sneha@homestay.com', password: 'sneha123', role: 'host', username: 'Sneha Reddy', phone: '9876543213' }
    ];
  }

  register(userData) {
    const existingUser = this.users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'Email already registered' };
    }
    this.users.push(userData);
    return { success: true, message: 'Registration successful' };
  }

  login(email, password) {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials. Please sign up if you don\'t have an account.' };
  }

  getAllUsers() {
    return this.users;
  }
}

const userStorage = new UserStorage();
export default userStorage;

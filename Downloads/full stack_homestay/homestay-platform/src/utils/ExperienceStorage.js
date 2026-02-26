class ExperienceStorage {
  constructor() {
    this.experiences = [
      { id: 1, name: 'Local Food Experience', icon: '🥘', price: 500, description: 'Enjoy authentic local cuisine with traditional cooking', duration: '2-3 hours' },
      { id: 2, name: 'Cultural Event Visit', icon: '🎭', price: 800, description: 'Experience local festivals and cultural performances', duration: '3-4 hours' },
      { id: 3, name: 'Village Farming Experience', icon: '🚜', price: 600, description: 'Learn traditional farming methods and rural lifestyle', duration: '4-5 hours' },
      { id: 4, name: 'Sunrise Trekking with Guide', icon: '🏞️', price: 1000, description: 'Guided trek to scenic viewpoints at sunrise', duration: '3-4 hours' }
    ];
  }

  getAllExperiences() {
    return this.experiences;
  }

  getExperienceById(id) {
    return this.experiences.find(e => e.id === id);
  }
}

export default new ExperienceStorage();

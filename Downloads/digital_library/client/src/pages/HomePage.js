import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { FaDownload, FaStar, FaEye, FaTag, FaCalendar } from 'react-icons/fa';
import axios from 'axios';
import '../styles/HomePage.css';

function HomePage() {
  const [featuredResources, setFeaturedResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [resourcesRes, categoriesRes] = await Promise.all([
          axios.get('/api/resources?limit=6&sort=-downloads'),
          axios.get('/api/categories')
        ]);

        setFeaturedResources(resourcesRes.data.resources);
        setCategories(categoriesRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h1 className="hero-title">Welcome to Digital Library</h1>
              <p className="hero-subtitle">
                Access thousands of educational resources, research papers, and study materials
              </p>
              <Form className="search-form">
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Search for resources, topics, or authors..."
                  className="search-input"
                />
                <Button variant="primary" size="lg" className="search-button">
                  Search
                </Button>
              </Form>
            </Col>
            <Col md={4} className="hero-stats">
              <div className="stat-box">
                <h3>10K+</h3>
                <p>Resources</p>
              </div>
              <div className="stat-box">
                <h3>500K+</h3>
                <p>Downloads</p>
              </div>
              <div className="stat-box">
                <h3>100K+</h3>
                <p>Active Users</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <Container>
          <h2 className="section-title">Explore by Category</h2>
          <Row>
            {categories.map(category => (
              <Col md={3} key={category._id} className="mb-4">
                <Card className="category-card">
                  <Card.Body className="text-center">
                    <div className="category-icon">{category.icon}</div>
                    <h5>{category.name}</h5>
                    <p className="text-muted">{category.resourceCount} resources</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Resources */}
      <section className="featured-resources">
        <Container>
          <h2 className="section-title">Most Downloaded</h2>
          <Row>
            {featuredResources.map(resource => (
              <Col md={6} lg={4} key={resource._id} className="mb-4">
                <Card className="resource-card">
                  {resource.coverImage && (
                    <Card.Img variant="top" src={resource.coverImage} />
                  )}
                  <Card.Body>
                    <Card.Title>{resource.title}</Card.Title>
                    <p className="text-muted small">By {resource.uploadedBy?.name}</p>
                    <div className="resource-meta">
                      <Badge bg="info">{resource.resourceType}</Badge>
                      <Badge bg="success">{resource.level}</Badge>
                    </div>
                    <div className="resource-stats mt-2">
                      <span><FaDownload /> {resource.downloads}</span>
                      <span><FaEye /> {resource.views}</span>
                      <span><FaStar /> {resource.rating.toFixed(1)}</span>
                    </div>
                    <Button variant="primary" className="w-100 mt-3">
                      View Resource
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <h2 className="section-title">Why Choose Digital Library?</h2>
          <Row>
            <Col md={4}>
              <div className="feature-box">
                <FaSearch size={40} className="feature-icon" />
                <h5>Advanced Search</h5>
                <p>Find exactly what you need with our powerful search and filtering system</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-box">
                <FaTag size={40} className="feature-icon" />
                <h5>Organized Categories</h5>
                <p>Resources organized by subject, level, and type for easy navigation</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-box">
                <FaDownload size={40} className="feature-icon" />
                <h5>Easy Downloads</h5>
                <p>Download materials in multiple formats for your convenience</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default HomePage;

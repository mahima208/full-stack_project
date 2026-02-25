import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { FaSearch, FaFilter, FaDownload, FaStar, FaShieldAlt, FaPercentage, FaBell, FaFileUpload, FaChartBar, FaUsers } from 'react-icons/fa';
import '../styles/AdvancedFeatures.css';

function AdvancedFeatures() {
  const features = [
    {
      id: 1,
      title: 'Advanced Search',
      icon: <FaSearch />,
      description: 'Powerful full-text search across all resources with text indexing and relevance scoring'
    },
    {
      id: 2,
      title: 'Smart Filtering',
      icon: <FaFilter />,
      description: 'Filter by category, level, resource type, subject, language, and more'
    },
    {
      id: 3,
      title: 'Download Management',
      icon: <FaDownload />,
      description: 'Track downloads, manage file formats, and access download history'
    },
    {
      id: 4,
      title: 'Rating & Reviews',
      icon: <FaStar />,
      description: 'Community ratings and detailed reviews help identify quality resources'
    },
    {
      id: 5,
      title: 'Resource Approval System',
      icon: <FaShieldAlt />,
      description: 'Admin moderation to ensure quality and prevent spam'
    },
    {
      id: 6,
      title: 'Usage Analytics',
      icon: <FaChartBar />,
      description: 'Track views, downloads, and engagement metrics for each resource'
    },
    {
      id: 7,
      title: 'Saved Resources',
      icon: <FaPercentage />,
      description: 'Bookmark favorite resources for quick access later'
    },
    {
      id: 8,
      title: 'Feedback System',
      icon: <FaBell />,
      description: 'Users can report issues and suggest improvements'
    },
    {
      id: 9,
      title: 'Bulk Upload',
      icon: <FaFileUpload />,
      description: 'Educators can upload multiple resources at once'
    },
    {
      id: 10,
      title: 'User Management',
      icon: <FaUsers />,
      description: 'Admin controls for managing users and access levels'
    }
  ];

  return (
    <div className="advanced-features">
      <Container>
        <div className="features-header text-center mt-5 mb-5">
          <h1>Advanced Features</h1>
          <p className="lead">Comprehensive tools for educational content management and discovery</p>
        </div>

        <Row className="mb-5">
          {features.map(feature => (
            <Col md={6} lg={4} key={feature.id} className="mb-4">
              <Card className="feature-card h-100">
                <Card.Body>
                  <div className="feature-icon mb-3">
                    {feature.icon}
                  </div>
                  <h5>{feature.title}</h5>
                  <p className="text-muted">{feature.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Detailed Feature Breakdown */}
        <div className="feature-details mt-5">
          <h2 className="text-center mb-4">Feature Highlights</h2>

          <Row className="mb-5">
            <Col md={6}>
              <Card className="detail-card">
                <Card.Header className="bg-primary text-white">
                  <h5 className="mb-0">For Students & Educators</h5>
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>✓ Search & Discovery</strong>
                    <p className="mb-0 small">Find resources using advanced filters and full-text search</p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>✓ Save for Later</strong>
                    <p className="mb-0 small">Build personal collections of resources to download anytime</p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>✓ Write Reviews</strong>
                    <p className="mb-0 small">Share experiences and rate resources based on quality</p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>✓ Download Resources</strong>
                    <p className="mb-0 small">Access materials in multiple formats for offline use</p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>✓ Send Feedback</strong>
                    <p className="mb-0 small">Report issues or suggest improvements to the platform</p>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="detail-card">
                <Card.Header className="bg-success text-white">
                  <h5 className="mb-0">For Administrators</h5>
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>✓ Resource Approval</strong>
                    <p className="mb-0 small">Review and approve user-submitted resources</p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>✓ Analytics Dashboard</strong>
                    <p className="mb-0 small">Monitor downloads, views, and engagement metrics</p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>✓ User Management</strong>
                    <p className="mb-0 small">Manage user roles, permissions, and access levels</p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>✓ Feedback Management</strong>
                    <p className="mb-0 small">Track and respond to user feedback and reports</p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>✓ Category Management</strong>
                    <p className="mb-0 small">Organize and manage resource categories and tags</p>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col md={12}>
              <Card className="detail-card">
                <Card.Header className="bg-info text-white">
                  <h5 className="mb-0">🚀 Technical Features</h5>
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>RESTful API</strong> - Full-featured API for all operations with JWT authentication
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>MongoDB Database</strong> - Scalable NoSQL database with text indexing
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>File Management</strong> - Support for multiple file formats and cloud storage integration
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Pagination</strong> - Efficient data loading with customizable page sizes
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Real-time Analytics</strong> - Track metrics like views, downloads, and engagement
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Security</strong> - Password hashing, JWT tokens, role-based access control
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default AdvancedFeatures;

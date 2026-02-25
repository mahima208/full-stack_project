import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, ListGroup, Badge } from 'react-bootstrap';
import { FaUser, FaBook, FaCalendar, FaEdit, FaTrash, FaTrophy } from 'react-icons/fa';
import axios from 'axios';
import '../styles/UserProfile.css';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [savedResources, setSavedResources] = useState([]);
  const [downloadedResources, setDownloadedResources] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await axios.get('/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(response.data);
      setFormData(response.data);
      setSavedResources(response.data.savedResources || []);
      setDownloadedResources(response.data.downloadedResources || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/users/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(response.data.user);
      setEditMode(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  if (loading) return <div className="text-center py-5">Loading profile...</div>;
  if (!user) return <Alert variant="danger">User not found</Alert>;

  return (
    <div className="user-profile">
      <Container>
        <h1 className="mt-4 mb-4">My Profile</h1>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Row>
          {/* Profile Information */}
          <Col md={8}>
            <Card className="mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0"><FaUser /> Profile Information</h5>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setEditMode(!editMode)}
                >
                  <FaEdit /> {editMode ? 'Cancel' : 'Edit'}
                </Button>
              </Card.Header>
              <Card.Body>
                {editMode ? (
                  <Form onSubmit={handleSaveProfile}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={formData.email || ''}
                        disabled
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Institution</Form.Label>
                      <Form.Control
                        type="text"
                        name="institution"
                        value={formData.institution || ''}
                        onChange={handleInputChange}
                        placeholder="Your school/university"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Bio</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="bio"
                        rows={3}
                        value={formData.bio || ''}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Interests</Form.Label>
                      <Form.Control
                        type="text"
                        name="interests"
                        value={formData.interests?.join(', ') || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          interests: e.target.value.split(',').map(i => i.trim())
                        })}
                        placeholder="Comma-separated interests"
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                  </Form>
                ) : (
                  <div>
                    <Row className="mb-3">
                      <Col md={6}>
                        <h6>Name</h6>
                        <p>{user.name}</p>
                      </Col>
                      <Col md={6}>
                        <h6>Email</h6>
                        <p>{user.email}</p>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6}>
                        <h6>Role</h6>
                        <Badge bg="primary">{user.role}</Badge>
                      </Col>
                      <Col md={6}>
                        <h6>Institution</h6>
                        <p>{user.institution || 'Not specified'}</p>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <h6>Bio</h6>
                        <p>{user.bio || 'No bio added'}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h6>Interests</h6>
                        <div>
                          {user.interests?.map(interest => (
                            <Badge key={interest} bg="light" text="dark" className="me-2">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </Col>
                    </Row>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Stats Sidebar */}
          <Col md={4}>
            <Card className="mb-4">
              <Card.Header><FaTrophy /> Your Statistics</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item className="text-center">
                  <h4>{savedResources.length}</h4>
                  <small>Saved Resources</small>
                </ListGroup.Item>
                <ListGroup.Item className="text-center">
                  <h4>{downloadedResources.length}</h4>
                  <small>Downloaded</small>
                </ListGroup.Item>
                <ListGroup.Item className="text-center">
                  <h4>Member Since</h4>
                  <small>{new Date(user.createdAt).toLocaleDateString()}</small>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>

        {/* Saved Resources */}
        <Row className="mt-4">
          <Col md={6}>
            <Card>
              <Card.Header><FaBook /> Saved Resources ({savedResources.length})</Card.Header>
              <ListGroup variant="flush">
                {savedResources.length === 0 ? (
                  <ListGroup.Item className="text-muted">No saved resources yet</ListGroup.Item>
                ) : (
                  savedResources.map(resource => (
                    <ListGroup.Item key={resource._id} className="d-flex justify-content-between">
                      <div>
                        <h6 className="mb-0">{resource.title}</h6>
                        <small className="text-muted">{resource.category?.name}</small>
                      </div>
                      <Button variant="link" size="sm" className="text-danger">
                        <FaTrash />
                      </Button>
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </Card>
          </Col>

          {/* Downloaded Resources */}
          <Col md={6}>
            <Card>
              <Card.Header><FaCalendar /> Downloaded Resources ({downloadedResources.length})</Card.Header>
              <ListGroup variant="flush">
                {downloadedResources.length === 0 ? (
                  <ListGroup.Item className="text-muted">No downloads yet</ListGroup.Item>
                ) : (
                  downloadedResources.map(resource => (
                    <ListGroup.Item key={resource._id}>
                      <h6 className="mb-0">{resource.title}</h6>
                      <small className="text-muted">{resource.category?.name}</small>
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserProfile;

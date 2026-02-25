import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Tabs, Tab, ListGroup } from 'react-bootstrap';
import { FaDownload, FaStar, FaEye, FaComment, FaCalendar, FaTags } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ResourceDetail.css';

function ResourceDetailPage() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, title: '', comment: '' });
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResource();
  }, [id]);

  const fetchResource = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/resources/${id}`);
      setResource(response.data);
      setReviews(response.data.reviews || []);
      
      // Check if saved
      const token = localStorage.getItem('token');
      if (token) {
        const userRes = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsSaved(userRes.data.savedResources?.some(r => r._id === id));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resource:', error);
      setError('Failed to load resource');
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      await axios.post(`/api/resources/${id}/download`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Create download link
      const a = document.createElement('a');
      a.href = resource.fileUrl;
      a.download = resource.title;
      a.click();
    } catch (error) {
      setError('Failed to download resource');
    }
  };

  const handleSaveResource = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const endpoint = isSaved
        ? `/api/users/saved-resources/${id}`
        : `/api/users/saved-resources/${id}`;

      await axios[isSaved ? 'delete' : 'post'](endpoint, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setIsSaved(!isSaved);
    } catch (error) {
      setError('Failed to save resource');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      // Submit review logic here
      setNewReview({ rating: 5, title: '', comment: '' });
      alert('Review submitted successfully!');
    } catch (error) {
      setError('Failed to submit review');
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!resource) return <Alert variant="warning">Resource not found</Alert>;

  return (
    <div className="resource-detail-page">
      <Container>
        <Row className="mt-4">
          <Col md={8}>
            {/* Resource Header */}
            <Card className="resource-header-card mb-4">
              <Row className="g-0">
                {resource.coverImage && (
                  <Col md={4}>
                    <Card.Img src={resource.coverImage} alt={resource.title} />
                  </Col>
                )}
                <Col md={resource.coverImage ? 8 : 12}>
                  <Card.Body>
                    <h1>{resource.title}</h1>
                    <p className="text-muted mb-2">By {resource.uploadedBy?.name}</p>
                    <p>{resource.description}</p>

                    <div className="resource-badges mb-3">
                      <span className="badge bg-primary">{resource.resourceType}</span>
                      <span className="badge bg-success">{resource.level}</span>
                      <span className="badge bg-info">{resource.language}</span>
                    </div>

                    <div className="resource-actions">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleDownload}
                        className="me-2"
                      >
                        <FaDownload /> Download
                      </Button>
                      <Button
                        variant={isSaved ? 'warning' : 'outline-secondary'}
                        size="lg"
                        onClick={handleSaveResource}
                      >
                        {isSaved ? 'Saved' : 'Save for Later'}
                      </Button>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>

            {/* Resource Details */}
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">Resource Information</h5>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong><FaCalendar /> Published Date:</strong> {new Date(resource.createdAt).toLocaleDateString()}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Subject:</strong> {resource.subject}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong><FaTags /> Tags:</strong>
                  {resource.tags?.map(tag => (
                    <span key={tag} className="badge bg-secondary ms-2">{tag}</span>
                  ))}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Category:</strong> {resource.category?.name}
                </ListGroup.Item>
              </ListGroup>
            </Card>

            {/* Tabs */}
            <Tabs defaultActiveKey="stats" className="mb-4">
              <Tab eventKey="stats" title="Statistics">
                <Card className="mt-3">
                  <Card.Body>
                    <Row className="text-center">
                      <Col md={4}>
                        <h5><FaDownload /> Downloads</h5>
                        <h3>{resource.downloads}</h3>
                      </Col>
                      <Col md={4}>
                        <h5><FaEye /> Views</h5>
                        <h3>{resource.views}</h3>
                      </Col>
                      <Col md={4}>
                        <h5><FaStar /> Rating</h5>
                        <h3>{resource.rating.toFixed(1)}/5</h3>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Tab>

              <Tab eventKey="reviews" title={`Reviews (${reviews.length})`}>
                <div className="mt-3">
                  <h5 className="mb-3">User Reviews</h5>
                  {reviews.length === 0 ? (
                    <p className="text-muted">No reviews yet. Be the first to review!</p>
                  ) : (
                    reviews.map(review => (
                      <Card key={review._id} className="mb-2">
                        <Card.Body>
                          <div className="d-flex justify-content-between">
                            <h6>{review.title}</h6>
                            <div className="text-warning">
                              {'⭐'.repeat(review.rating)}
                            </div>
                          </div>
                          <p className="text-muted small">{review.comment}</p>
                          <small className="text-muted">By {review.user?.name}</small>
                        </Card.Body>
                      </Card>
                    ))
                  )}
                </div>
              </Tab>

              <Tab eventKey="write-review" title="Write a Review">
                <div className="mt-3">
                  <Form onSubmit={handleReviewSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Rating</Form.Label>
                      <Form.Select
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                      >
                        <option value="1">⭐ 1 - Poor</option>
                        <option value="2">⭐ 2 - Fair</option>
                        <option value="3">⭐ 3 - Good</option>
                        <option value="4">⭐ 4 - Very Good</option>
                        <option value="5">⭐ 5 - Excellent</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Review title"
                        value={newReview.title}
                        onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Share your thoughts about this resource..."
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Submit Review
                    </Button>
                  </Form>
                </div>
              </Tab>
            </Tabs>
          </Col>

          {/* Sidebar */}
          <Col md={4}>
            <Card className="resource-sidebar-card mb-3">
              <Card.Header>Uploaded By</Card.Header>
              <Card.Body className="text-center">
                <h6>{resource.uploadedBy?.name}</h6>
                <p className="text-muted small">{resource.uploadedBy?.email}</p>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header><FaTags /> Keywords</Card.Header>
              <Card.Body>
                {resource.keywords?.map(keyword => (
                  <span key={keyword} className="badge bg-light text-dark me-2 mb-2">
                    {keyword}
                  </span>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ResourceDetailPage;

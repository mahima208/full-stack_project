import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../styles/FeedbackPage.css';

function FeedbackPage() {
  const [formData, setFormData] = useState({
    type: 'general_feedback',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setMessage('');

      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      await axios.post('/api/feedback', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage('Thank you for your feedback! We will review it shortly.');
      setFormData({
        type: 'general_feedback',
        subject: '',
        message: ''
      });
      setLoading(false);
    } catch (error) {
      setError('Failed to submit feedback. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="feedback-page">
      <Container>
        <div className="feedback-header text-center mt-5 mb-5">
          <h1>Send Us Your Feedback</h1>
          <p className="lead">Help us improve the Digital Library by sharing your thoughts and suggestions</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <Card>
              <Card.Body>
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Feedback Type</Form.Label>
                    <Form.Select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="general_feedback">General Feedback</option>
                      <option value="bug_report">Bug Report</option>
                      <option value="feature_request">Feature Request</option>
                      <option value="content_issue">Content Issue</option>
                      <option value="other">Other</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief subject of your feedback"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please provide detailed feedback..."
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-100"
                  >
                    {loading ? 'Submitting...' : 'Submit Feedback'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default FeedbackPage;

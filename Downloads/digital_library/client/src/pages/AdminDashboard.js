import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Tabs, Tab } from 'react-bootstrap';
import { FaChart, FaDownload, FaCheckCircle, FaCircle, FaTrash, FaClock } from 'react-icons/fa';
import axios from 'axios';
import '../styles/AdminDashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({});
  const [pendingResources, setPendingResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const [statsRes, resourcesRes] = await Promise.all([
        axios.get('/api/analytics/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('/api/admin/resources/pending', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setStats(statsRes.data);
      setPendingResources(resourcesRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setError('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const handleApprove = async (resourceId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/admin/resources/${resourceId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPendingResources(pendingResources.filter(r => r._id !== resourceId));
      alert('Resource approved!');
    } catch (error) {
      setError('Failed to approve resource');
    }
  };

  const handleReject = async (resourceId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/admin/resources/${resourceId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPendingResources(pendingResources.filter(r => r._id !== resourceId));
      alert('Resource rejected and deleted!');
    } catch (error) {
      setError('Failed to reject resource');
    }
  };

  if (loading) return <div className="text-center py-5">Loading admin dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <Container>
        <h1 className="mt-4 mb-4">Admin Dashboard</h1>

        {error && <Alert variant="danger">{error}</Alert>}

        <Tabs activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)} className="mb-4">
          {/* Dashboard Tab */}
          <Tab eventKey="dashboard" title="Dashboard">
            <div className="mt-3">
              <Row>
                <Col md={3} className="mb-3">
                  <Card className="stat-card">
                    <Card.Body className="text-center">
                      <h5>Total Resources</h5>
                      <h2>{stats.statistics?.totalResources || 0}</h2>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3} className="mb-3">
                  <Card className="stat-card">
                    <Card.Body className="text-center">
                      <h5>Approved</h5>
                      <h2>{stats.statistics?.approvedResources || 0}</h2>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3} className="mb-3">
                  <Card className="stat-card">
                    <Card.Body className="text-center">
                      <h5>Total Downloads</h5>
                      <h2>{stats.statistics?.totalDownloads || 0}</h2>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3} className="mb-3">
                  <Card className="stat-card">
                    <Card.Body className="text-center">
                      <h5>Total Views</h5>
                      <h2>{stats.statistics?.totalViews || 0}</h2>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Charts Section */}
              <Row className="mt-4">
                <Col md={6}>
                  <Card>
                    <Card.Header>Resources by Type</Card.Header>
                    <Card.Body>
                      {stats.resourcesByType?.map(item => (
                        <div key={item._id} className="mb-2">
                          <div className="d-flex justify-content-between">
                            <span>{item._id}</span>
                            <strong>{item.count}</strong>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{ width: `${(item.count / Math.max(...stats.resourcesByType.map(r => r.count))) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card>
                    <Card.Header>Resources by Level</Card.Header>
                    <Card.Body>
                      {stats.resourcesByLevel?.map(item => (
                        <div key={item._id} className="mb-2">
                          <div className="d-flex justify-content-between">
                            <span>{item._id}</span>
                            <strong>{item.count}</strong>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar bg-success"
                              style={{ width: `${(item.count / Math.max(...stats.resourcesByLevel.map(r => r.count))) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col md={6}>
                  <Card>
                    <Card.Header>Top Downloaded Resources</Card.Header>
                    <Card.Body>
                      {stats.topResources?.map(resource => (
                        <div key={resource._id} className="mb-3 pb-2 border-bottom">
                          <h6>{resource.title}</h6>
                          <small className="text-muted">
                            <FaDownload /> {resource.downloads} | <FaCheckCircle /> {resource.views}
                          </small>
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card>
                    <Card.Header>Recent Uploads</Card.Header>
                    <Card.Body>
                      {stats.recentUploads?.map(resource => (
                        <div key={resource._id} className="mb-3 pb-2 border-bottom">
                          <h6>{resource.title}</h6>
                          <small className="text-muted">
                            <FaClock /> {new Date(resource.createdAt).toLocaleDateString()}
                          </small>
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Tab>

          {/* Pending Resources Tab */}
          <Tab eventKey="pending" title={`Pending Approval (${pendingResources.length})`}>
            <div className="mt-3">
              {pendingResources.length === 0 ? (
                <Alert variant="info">No pending resources for approval</Alert>
              ) : (
                <div>
                  {pendingResources.map(resource => (
                    <Card key={resource._id} className="mb-3">
                      <Card.Body>
                        <Row>
                          <Col md={8}>
                            <h5>{resource.title}</h5>
                            <p className="text-muted mb-2">
                              By {resource.uploadedBy?.name} ({resource.uploadedBy?.email})
                            </p>
                            <p>{resource.description.substring(0, 100)}...</p>
                            <div>
                              <span className="badge bg-primary me-2">{resource.resourceType}</span>
                              <span className="badge bg-success me-2">{resource.level}</span>
                              <span className="badge bg-info">{resource.subject}</span>
                            </div>
                          </Col>
                          <Col md={4} className="text-end">
                            <Button
                              variant="success"
                              size="sm"
                              className="me-2"
                              onClick={() => handleApprove(resource._id)}
                            >
                              <FaCheckCircle /> Approve
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleReject(resource._id)}
                            >
                              <FaTrash /> Reject
                            </Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default AdminDashboard;

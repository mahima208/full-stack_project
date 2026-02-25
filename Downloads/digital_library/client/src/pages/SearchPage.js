import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Pagination, Spinner } from 'react-bootstrap';
import { FaFilter, FaDownload, FaStar, FaEye } from 'react-icons/fa';
import axios from 'axios';
import '../styles/SearchPage.css';

function SearchPage() {
  const [resources, setResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    level: '',
    resourceType: '',
    subject: '',
    language: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    performSearch();
  }, [currentPage]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const performSearch = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        ...(searchQuery && { query: searchQuery }),
        ...filters,
        page: currentPage,
        limit: 12
      });

      const endpoint = searchQuery ? `/api/search/${searchQuery}` : '/api/resources';
      const response = await axios.get(`${endpoint}?${query}`);

      setResources(response.data.resources);
      setTotalPages(response.data.pagination.pages);
      setLoading(false);
    } catch (error) {
      console.error('Error searching:', error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    performSearch();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleDownload = async (resourceId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/resources/${resourceId}/download`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
    }
  };

  return (
    <div className="search-page">
      <Container>
        <div className="search-header">
          <h1>Find Educational Resources</h1>
          <p>Search and filter thousands of learning materials</p>
        </div>

        <Row>
          {/* Filters Sidebar */}
          <Col md={3} className="mb-4">
            <Card className="filters-card">
              <Card.Header>
                <FaFilter /> Filters
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSearch}>
                  <Form.Group className="mb-3">
                    <Form.Label>Search</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Search by title, author..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Level</Form.Label>
                    <Form.Select
                      name="level"
                      value={filters.level}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Levels</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="professional">Professional</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Resource Type</Form.Label>
                    <Form.Select
                      name="resourceType"
                      value={filters.resourceType}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Types</option>
                      <option value="textbook">Textbook</option>
                      <option value="research_paper">Research Paper</option>
                      <option value="study_guide">Study Guide</option>
                      <option value="video">Video</option>
                      <option value="worksheet">Worksheet</option>
                      <option value="presentation">Presentation</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Mathematics, Science..."
                      name="subject"
                      value={filters.subject}
                      onChange={handleFilterChange}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Apply Filters
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Results */}
          <Col md={9}>
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" />
              </div>
            ) : resources.length === 0 ? (
              <Card className="text-center py-5">
                <p className="text-muted mb-0">No resources found. Try adjusting your filters.</p>
              </Card>
            ) : (
              <>
                <div className="results-info mb-3">
                  <p>Found {resources.length} resource(s)</p>
                </div>

                <Row>
                  {resources.map(resource => (
                    <Col md={12} key={resource._id} className="mb-3">
                      <Card className="resource-list-card">
                        <Row className="g-0">
                          {resource.coverImage && (
                            <Col md={2}>
                              <Card.Img
                                src={resource.coverImage}
                                alt={resource.title}
                                className="resource-list-img"
                              />
                            </Col>
                          )}
                          <Col md={resource.coverImage ? 10 : 12}>
                            <Card.Body>
                              <h5>{resource.title}</h5>
                              <p className="text-muted mb-2">
                                By {resource.uploadedBy?.name} | {resource.category?.name}
                              </p>
                              <p className="card-text">{resource.description.substring(0, 100)}...</p>
                              <div className="resource-list-meta">
                                <span><FaDownload /> {resource.downloads}</span>
                                <span><FaEye /> {resource.views}</span>
                                <span><FaStar /> {resource.rating.toFixed(1)}</span>
                                <span className="ms-auto">
                                  <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handleDownload(resource._id)}
                                  >
                                    Download
                                  </Button>
                                </span>
                              </div>
                            </Card.Body>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  ))}
                </Row>

                {/* Pagination */}
                <Pagination className="justify-content-center mt-4">
                  <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                  <Pagination.Prev onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} />

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === currentPage}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}

                  <Pagination.Next onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} />
                  <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SearchPage;

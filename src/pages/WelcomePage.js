import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const WelcomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="welcome-hero">
        <Container>
          <Row>
            <Col>
              <h1 className="display-4 fw-bold mb-4">
                LUCT Reporting System
              </h1>
              <p className="lead mb-4">
                Streamlined academic reporting and monitoring for lecturers, students, and administrators
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="my-5">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="fw-bold">System Features</h2>
            <p className="text-muted">Comprehensive tools for academic management</p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md={6} lg={3}>
            <Card className="feature-card h-100">
              <div className="feature-icon">📊</div>
              <Card.Body>
                <Card.Title>Lecturer Reporting</Card.Title>
                <Card.Text>
                  Submit detailed class reports, attendance records, and teaching progress
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="feature-card h-100">
              <div className="feature-icon">⭐</div>
              <Card.Body>
                <Card.Title>Rating System</Card.Title>
                <Card.Text>
                  Students can rate courses and lecturers for continuous improvement
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="feature-card h-100">
              <div className="feature-icon">👨‍🏫</div>
              <Card.Body>
                <Card.Title>Monitoring</Card.Title>
                <Card.Text>
                  Real-time monitoring of academic performance and attendance
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="feature-card h-100">
              <div className="feature-icon">📈</div>
              <Card.Body>
                <Card.Title>Analytics</Card.Title>
                <Card.Text>
                  Comprehensive analytics and reports for program leaders
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Role Information */}
      <Container className="my-5">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="fw-bold">System Roles</h2>
            <p className="text-muted">Different access levels for different users</p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md={6} lg={3}>
            <Card className="h-100 role-student">
              <Card.Body>
                <Card.Title>👨‍🎓 Student</Card.Title>
                <Card.Text>
                  • Monitor academic progress<br/>
                  • Rate courses and lecturers<br/>
                  • Access personal dashboard
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="h-100 role-lecturer">
              <Card.Body>
                <Card.Title>👨‍🏫 Lecturer</Card.Title>
                <Card.Text>
                  • Submit class reports<br/>
                  • Manage assigned classes<br/>
                  • Monitor student attendance<br/>
                  • View teaching ratings
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="h-100 role-principal_lecturer">
              <Card.Body>
                <Card.Title>👨‍💼 Principal Lecturer</Card.Title>
                <Card.Text>
                  • View department courses<br/>
                  • Review lecturer reports<br/>
                  • Provide feedback<br/>
                  • Monitor department performance
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="h-100 role-program_leader">
              <Card.Body>
                <Card.Title>👨‍💻 Program Leader</Card.Title>
                <Card.Text>
                  • Manage courses and classes<br/>
                  • Assign lecturers<br/>
                  • View consolidated reports<br/>
                  • Program-wide monitoring
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WelcomePage;
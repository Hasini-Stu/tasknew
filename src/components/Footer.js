import React from 'react';
import { Container, Icon } from 'semantic-ui-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          {/* Explore */}
          <div className="footer-column">
            <h4>Explore</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#questions">Questions</a></li>
              <li><a href="#articles">Articles</a></li>
              <li><a href="#tutorials">Tutorials</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><a href="#faqs">FAQs</a></li>
              <li><a href="#help">Help</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div className="footer-column">
            <h4>Stay connected</h4>
            <div className="social-icons">
              <a href="#facebook" className="social-icon">
                <Icon name="facebook f" size="large" />
              </a>
              <a href="#twitter" className="social-icon">
                <Icon name="twitter" size="large" />
              </a>
              <a href="#instagram" className="social-icon">
                <Icon name="instagram" size="large" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and Links */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>DEV@Deakin 2022</p>
          </div>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms</a>
            <a href="#code">Code of Conduct</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 
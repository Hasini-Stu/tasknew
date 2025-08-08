import React from 'react';
import { Container } from 'semantic-ui-react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <Container>
        <div className="hero-image-container">
          <div className="hero-image-placeholder">
            <span>Image</span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero; 
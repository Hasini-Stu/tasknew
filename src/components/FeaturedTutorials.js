import React from 'react';
import { Container, Card, Button, Icon } from 'semantic-ui-react';
import './FeaturedTutorials.css';

const FeaturedTutorials = () => {
  
  const tutorials = [
    {
      id: 1,
      title: "Tutorial's Name", //arays
      description: "blah",
      rating: 5,
      author: "username",
      image: "Tutorial image"
    },
    {
      id: 2,
      title: "Tutorial's Name",
      description: "blahhhh",
      rating: 5,
      author: "username",
      image: "Tutorial image"
    },
    {
      id: 3,
      title: "Tutorial's Name",
      description: "idk",
      rating: 4.9,
      author: "username",
      image: "Tutorial image"
    }
  ];

  return (
    <div className="featured-tutorials">
      <Container>
        <h2 className="section-title">Featured Tutorials</h2>
        
        <div className="tutorials-grid">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.id} className="tutorial-card">
              <div className="tutorial-image-placeholder">
                <span>{tutorial.image}</span>
              </div>
              <Card.Content>
                <Card.Header>{tutorial.title}</Card.Header>
                <Card.Description>{tutorial.description}</Card.Description>
                <div className="tutorial-rating">
                  <Icon name="star" color="yellow" />
                  <span>{tutorial.rating}</span>
                  <span className="author-name">{tutorial.author}</span>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
        
        <div className="see-all-button">
          <Button color="grey">See all tutorials</Button>
        </div>
      </Container>
    </div>
  );
};

export default FeaturedTutorials; 
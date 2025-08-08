import React from 'react';
import { Container, Card, Button, Icon } from 'semantic-ui-react';
import './FeaturedArticles.css';

const FeaturedArticles = () => {
  
  const articles = [
    {
      id: 1,
      title: "Article's Name", //customise later :)
      description: "blah",
      rating: 5,
      author: "Author's name",
      image: "Article image"
    },
    {
      id: 2,
      title: "Article's Name",
      description: "blah2",
      rating: 5,
      author: "Author's name",
      image: "Article image"
    },
    {
      id: 3,
      title: "Article's Name",
      description: "blah3",
      rating: 5,
      author: "Author's name",
      image: "Article image"
    }
  ];

  return (
    <div className="featured-articles">
      <Container>
        <h2 className="section-title">Featured Articles</h2>
        
        <div className="articles-grid">
          {articles.map((article) => (
            <Card key={article.id} className="article-card">
              <div className="article-image-placeholder">
                <span>{article.image}</span>
              </div>
              <Card.Content>
                <Card.Header>{article.title}</Card.Header>
                <Card.Description>{article.description}</Card.Description>
                <div className="article-rating">
                  <Icon name="star" color="yellow" />
                  <span>{article.rating}</span>
                  <span className="author-name">{article.author}</span>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
        
        <div className="see-all-button">
          <Button color="grey">See all articles</Button>
        </div>
      </Container>
    </div>
  );
};

export default FeaturedArticles; 
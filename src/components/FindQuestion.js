import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, deleteDoc, doc, query, orderBy, where } from 'firebase/firestore';
import { Container, Card, Button, Input, Dropdown, Icon, Modal, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './FindQuestion.css';

const FindQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [questions, searchTerm, selectedTag, dateFilter]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      console.log('Fetching questions from Firebase...');
      
      const questionsQuery = query(
        collection(db, 'posts'),
        where('postType', '==', 'question'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(questionsQuery);
      console.log(`Found ${querySnapshot.size} questions in database`);
      
      const questionsData = [];
      const tagsSet = new Set();
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('Question data:', doc.id, data);
        questionsData.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date()
        });
        
        // Collect unique tags
        if (data.tags && Array.isArray(data.tags)) {
          data.tags.forEach(tag => tagsSet.add(tag));
        }
      });
      
      // Questions are already sorted by Firebase query (newest first)
      
      console.log('Processed questions:', questionsData);
      setQuestions(questionsData);
      setAvailableTags(Array.from(tagsSet).map(tag => ({ key: tag, text: tag, value: tag })));
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...questions];
    console.log('Applying filters. Total questions:', questions.length);
    console.log('Search term:', searchTerm);
    console.log('Selected tag:', selectedTag);
    console.log('Date filter:', dateFilter);

    // Filter by search term (title)
    if (searchTerm) {
      filtered = filtered.filter(question =>
        question.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log('After title filter:', filtered.length);
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(question =>
        question.tags && question.tags.includes(selectedTag)
      );
      console.log('After tag filter:', filtered.length);
    }

    // Filter by date
    if (dateFilter) {
      const today = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(question =>
            question.createdAt >= filterDate
          );
          break;
        case 'week':
          filterDate.setDate(today.getDate() - 7);
          filtered = filtered.filter(question =>
            question.createdAt >= filterDate
          );
          break;
        case 'month':
          filterDate.setMonth(today.getMonth() - 1);
          filtered = filtered.filter(question =>
            question.createdAt >= filterDate
          );
          break;
        default:
          break;
      }
      console.log('After date filter:', filtered.length);
    }

    console.log('Final filtered questions:', filtered.length);
    setFilteredQuestions(filtered);
  };

  const handleDeleteQuestion = async () => {
    if (!questionToDelete) return;

    try {
      await deleteDoc(doc(db, 'posts', questionToDelete.id));
      setQuestions(questions.filter(q => q.id !== questionToDelete.id));
      setDeleteModalOpen(false);
      setQuestionToDelete(null);
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const openDeleteModal = (question) => {
    setQuestionToDelete(question);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setQuestionToDelete(null);
  };

  const toggleCardExpansion = (questionId) => {
    setExpandedCard(expandedCard === questionId ? null : questionId);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const dateFilterOptions = [
    { key: '', text: 'All Time', value: '' },
    { key: 'today', text: 'Today', value: 'today' },
    { key: 'week', text: 'This Week', value: 'week' },
    { key: 'month', text: 'This Month', value: 'month' }
  ];

  if (loading) {
    return (
      <Container className="find-question-container">
        <div className="loading">Loading questions...</div>
      </Container>
    );
  }

  return (
    <Container className="find-question-container">
      <Header as="h1" className="page-title">Find Questions</Header>
      
      {/* Filters Section */}
      <div className="filters-section">
        <div className="filter-row">
          <Input
            icon="search"
            placeholder="Search by question title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <Dropdown
            placeholder="Filter by tag"
            selection
            options={availableTags}
            value={selectedTag}
            onChange={(e, { value }) => setSelectedTag(value)}
            clearable
            className="tag-filter"
          />
          
          <Dropdown
            placeholder="Filter by date"
            selection
            options={dateFilterOptions}
            value={dateFilter}
            onChange={(e, { value }) => setDateFilter(value)}
            className="date-filter"
          />
        </div>
      </div>

      {/* Questions List */}
      <div className="questions-list">
        {filteredQuestions.length === 0 ? (
          <div className="no-questions">
            <Icon name="question circle" size="huge" />
            <p>No questions found matching your criteria.</p>
          </div>
        ) : (
          filteredQuestions.map((question) => (
            <Card key={question.id} className="question-card">
              <Card.Content>
                <div className="question-header">
                  <Card.Header className="question-title">
                    {question.title}
                  </Card.Header>
                  <Button
                    icon="trash"
                    color="red"
                    size="mini"
                    onClick={() => openDeleteModal(question)}
                    className="delete-button"
                  />
                </div>
                
                <Card.Meta className="question-meta">
                  <span className="question-date">
                    <Icon name="calendar" />
                    {formatDate(question.createdAt)}
                  </span>
                  <span className="question-author">
                    <Icon name="user" />
                    {question.authorEmail}
                  </span>
                </Card.Meta>

                <Card.Description className="question-description">
                  {expandedCard === question.id ? (
                    <div>
                      <p>{question.articleText || question.abstract}</p>
                      {question.tags && question.tags.length > 0 && (
                        <div className="question-tags">
                          {question.tags.map((tag, index) => (
                            <span key={index} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p>{question.abstract || question.articleText?.substring(0, 150)}...</p>
                  )}
                </Card.Description>

                {question.tags && question.tags.length > 0 && expandedCard !== question.id && (
                  <div className="question-tags">
                    {question.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                    {question.tags.length > 3 && (
                      <span className="tag-more">+{question.tags.length - 3} more</span>
                    )}
                  </div>
                )}

                <div className="question-actions">
                  <Button
                    primary
                    onClick={() => toggleCardExpansion(question.id)}
                    className="expand-button"
                  >
                    {expandedCard === question.id ? 'Show Less' : 'Show Details'}
                  </Button>
                </div>
              </Card.Content>
            </Card>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteModalOpen}
        onClose={closeDeleteModal}
        size="small"
      >
        <Header icon="trash" content="Delete Question" />
        <Modal.Content>
          <p>Are you sure you want to delete this question? This action cannot be undone.</p>
          {questionToDelete && (
            <div className="question-preview">
              <strong>{questionToDelete.title}</strong>
            </div>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDeleteQuestion}>
            Delete
          </Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
};

export default FindQuestion;

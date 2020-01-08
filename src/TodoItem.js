import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Card, Image } from 'semantic-ui-react';
import { deleteTodo } from './store/store';
import User from './User';

const TodoItem = ({ todo, deleteTodo }) => {  // eslint-disable-line
  const { title, id, completed, user } = todo;
  const img = [
    'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
    'https://react.semantic-ui.com/images/avatar/large/molly.png',
    'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
    'https://react.semantic-ui.com/images/avatar/large/matthew.png',
    'https://react.semantic-ui.com/images/avatar/small/matt.jpg',
    'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
  ];
  const rnd = Math.floor(Math.random() * (5));

  return (

    <Card>
      <User user={user} />
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src={img[rnd]}

        />
        <Card.Description>
          <strong>{id}</strong>
          <p>{title}</p>
          <p style={completed
            ? { color: 'green' }
            : { color: 'red' }}
          >
            {completed
              ? 'completed'
              : 'not completed'}
          </p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green">
            Approve
          </Button>
          <Button onClick={() => deleteTodo(id)} basic color="red">
            DELETE
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

const mapStateToProps = state => ({
  combineData: state.combineData,
});

const mapDispatchToProps = dispatch => ({
  deleteTodo: id => dispatch(deleteTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);

TodoItem.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

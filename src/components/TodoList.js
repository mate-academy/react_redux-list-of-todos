import React from 'react';
import TodoItemHandler from './TodoItemHandler';

class TodoList extends React.Component {

  render() {
    if(this.props.requested) {
      if (this.props.items) {
        const itemsList = [];

        for(let item of this.props.items) {
          itemsList.push(<TodoItemHandler key={item.id} item={item}/>)
        }
        
        return (
          <table className='table'>
            <thead>
              <tr onClick = {event => this.props.sort(event.target.innerText)}>
                <th>id</th>
                <th>Title</th>
                <th>Author</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {itemsList}
            </tbody>
          </table>
         );
      } else {
        return 'Loading...'
      }
    } else {
      return <button onClick={this.props.getData}>Load</button>
    }
  
  }
}

  export default TodoList;

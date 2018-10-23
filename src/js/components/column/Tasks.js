import React from 'react';
import { Draggable } from 'react-beautiful-dnd'
import { Icon } from 'antd';
import SingleTask from '../Task/SingleTask'

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  background: isDragging ? 'lightgreen' : '#1890ff',
  ...draggableStyle
});


class Tasks extends React.Component {

  state = {
    task: '',
    taskEdit: ''
  }

  handleEdit = (content, id) => {
    console.log(content)
    this.setState({
      ...this.state,
      taskEdit: id,
      task: content
    })
  }

  handleSave = (id) => {

    let task = this.state.task
    console.log(task)

    if (task !== '') {

      this.props.onTaskUpdate(task, id)

      this.setState({
        ...this.state,
        task: '',
        taskEdit: ''
      })
    }
    else {
      alert('No Empty Title')
    }

  }

  updateTaskInput = (e) => {
    this.setState({ task: e.target.value })
  }

  handleaddTask = () => {
    this.setState({
      ...this.state,
      task: '',
      taskEdit: 1234
    })

    this.props.addTask()
  }

  render() {
    return (
      <ul className='taskList'>
        {
          this.props.tasks.map((task, index) => {
            return (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef} key={task.id}
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)
                    }>

                    <SingleTask
                      provided={provided}
                      task={task}
                      handleTaskDelete={this.props.handleTaskDelete}
                      taskEdit={this.state.taskEdit}
                      handleEdit={this.handleEdit}
                      updateTaskInput={this.updateTaskInput}
                      defaultValue={this.state.task}
                      handleSave={this.handleSave}
                    />
                    
                  </li>
                )}
              </Draggable>
            )
          })
        }
        <div className='taskContainer'>
          {
            this.state.taskEdit === '' && this.state.task === '' ?
              <Icon type="plus-circle" theme="filled" className='addTask' onClick={this.handleaddTask} /> :
              <div />
          }
        </div>
      </ul>
    )
  }

}

export default Tasks;
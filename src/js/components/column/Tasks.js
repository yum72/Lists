import React from 'react';
import { Draggable } from 'react-beautiful-dnd'
import { Input, Icon } from 'antd';

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
                  <li  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={task.id}
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)
                    }>
                    {
                      task.content === '' || this.state.taskEdit === task.id ?
                        <div className='taskContainer'>
                          <span className='task'>
                            <Input className='taskInput' onChange={(e) => this.setState({ task: e.target.value })} type="text" key={task.id} defaultValue={this.state.task} />
                          </span>
                          <Icon type="save" theme="filled" className='saveTask' onClick={() => this.handleSave(task.id)}/>
                        </div> :
                        <div className='taskContainer'>
                          <span className='task'>
                            {task.content}
                          </span>
                          <Icon type="edit" theme="filled" className='taskEdit' onClick={() => this.handleEdit(task.content, task.id)}/>
                          <Icon type="delete" theme="filled" className='taskDelete' onClick={() => this.props.handleTaskDelete(task.id)} />
                        </div>
                    }
                  </li>
                )}
              </Draggable>
            )
          })
        }
        <div className='taskContainer'>
        {
          this.state.taskEdit === '' && this.state.task === '' ?
          <Icon type="plus-circle" theme="filled" className='addTask' onClick={this.handleaddTask} />:
          <div/>
        }
        </div>
      </ul>
    )
  }

}

export default Tasks;
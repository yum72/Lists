import React from 'react';
import Tasks from './Tasks'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Card } from 'antd';
import ListHeader from './ListHeader'

class Column extends React.Component {

  state = {
    title: '',
    editIndex: false
  }

  handleSaveClick = (e) => {
    let title = this.state.title
    console.log(this.props.column.id)

    if (title === '' && this.props.column.title !== '') {
      title = this.props.column.title
    }

    if (title !== '') {
      this.props.onTitleUpdate(title, this.props.column.id)
      this.setState({
        ...this.state,
        editIndex: false
      })
    }
    else {
      alert('No Empty Title')
    }
  }

  handleTitleEditClick = () => {
    this.setState({
      ...this.state,
      editIndex: true,
      title: this.props.column.title
    })
  }

  updateTitleEdit = (e) => {
    this.setState({ title: e.target.value })
  }

  handleDelete = () => {

    const newColumns = this.props.columns.filter(column => column.id !== this.props.column.id)

    const newOrder = this.props.columnOrder.filter(column => column !== this.props.column.id)

    this.props.deleteColumn(newColumns, newOrder)

    if (this.props.tasks.length) {
      console.log(this.props.tasks)

      const newTasks = {
        ...this.props.allTasks
      }

      this.props.tasks.map(task => delete newTasks[task.id])

      this.props.updateTasks(newColumns, newTasks)

    }

  }

  handleTaskDelete = (taskID) => {
    console.log(taskID)
    const newColumns = this.props.columns.map(column => {
      if (column.id === this.props.column.id && column.taskIds.includes(taskID)) {
        let index = column.taskIds.indexOf(taskID)
        column.taskIds.splice(index, 1)
        return column
      }
      return column
    })

    console.log(newColumns)

    const newTasks = {
      ...this.props.allTasks
    }

    this.props.tasks.map(task => delete newTasks[taskID])

    this.props.updateTasks(newColumns, newTasks)

  }

  addTask = () => {

    const taskId = `task-${this.props.counter + 1}`
    this.props.updateTaskCounter(this.props.counter + 1)

    const newTask = {
      id: taskId,
      content: ''
    }

    const newTasks = {
      ...this.props.allTasks
    }

    newTasks[taskId] = newTask

    const newColumns = this.props.columns.map(column => {
      if (column.id === this.props.column.id) {
        column.taskIds = column.taskIds.concat(taskId)
        return column
      }
      return column
    })

    this.props.updateTasks(newColumns, newTasks)

  }


  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index} >
        {(provided) => (
          <div  {...provided.draggableProps} ref={provided.innerRef}>
            <Card className='columnList' hoverable={true}>
              <ListHeader
                provided={provided}
                editIndex={this.state.editIndex}
                updateTitleEdit={this.updateTitleEdit}
                column={this.props.column}
                handleDelete={this.handleDelete}
                handleTitleEditClick={this.handleTitleEditClick}
                handleSaveClick={this.handleSaveClick}
              />
              <Droppable key={this.props.column.id} droppableId={this.props.column.id} type='task'>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} style={getListStyle(snapshot.isDraggingOver)}>
                    <Tasks
                      addTask={this.addTask}
                      onTaskUpdate={this.props.onTaskUpdate}
                      handleTaskDelete={this.handleTaskDelete}
                      tasks={this.props.tasks}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Card>
          </div>
        )}
      </Draggable>
    )
  }
}

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#a4d7e7' : 'inherit',
  width: 250,
  borderRadius: '3px',
  minHeight: '80px'
});

export default Column;
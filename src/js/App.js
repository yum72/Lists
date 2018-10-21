import React from 'react'
import initialData from '../data/data'
import Column from './components/column/Column'
import { connect } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import * as Actions from './Actions/actions'
import '../css/styles.css'


class App extends React.Component {
    constructor() {
        super()
        this.state = initialData
    }

    componentDidMount(){
        this.props.updateCounter(this.props.columns.length)
        this.props.updateTaskCounter(Object.keys(this.props.tasks).length)
    }

    onDragEnd = result => {
        const { destination, source, draggableId, type } = result

        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }

        //update column order

        if (type === 'column') { 
            const newColumnOrder = Array.from(this.props.columnOrder)
            newColumnOrder.splice(source.index, 1)
            newColumnOrder.splice(destination.index, 0, draggableId)

            this.props.updateColumnOrder(newColumnOrder)

            return
        }

        const start = this.props.columns.find(column => column.id === source.droppableId)
        const finish = this.props.columns.find(column => column.id === destination.droppableId)
        
        //reorder task in same column

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds)
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }

            const newColumns = this.props.columns.map(start => {
                if (start.id === newColumn.id) {
                    return newColumn
                }
                return start
            })

            this.props.updateTasksOrder(newColumns)

            return
        }

        //tasks to new Column

        const startTaskIds = Array.from(start.taskIds)
        startTaskIds.splice(source.index, 1)
        const newStart = {
            ...start,
            taskIds: startTaskIds
        }

        const finishTaskIds = Array.from(finish.taskIds)
        finishTaskIds.splice(destination.index, 0, draggableId)
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        }

        const newColumns = this.props.columns.map(column => {
            if (column.id === newStart.id) {
                return newStart
            }
            else if (column.id === newFinish.id) {
                return newFinish
            }
            return column
        })

        this.props.updateTasksOrder(newColumns)

    }

    handleAddList = () => {

        const newColumn = {
            id: `column-${this.props.counter + 1}`,
            title: '',
            taskIds: []
        }

        this.props.updateCounter(this.props.counter + 1)

        const newColumns = this.props.columns.concat(newColumn)
        const newOrder = this.props.columnOrder.concat(newColumn.id)

        this.props.addNewColumn(newColumns, newOrder)

    }

    updateTitle = (title, id) => {

        const newColumns = this.props.columns.map(column => {
            if (column.id === id) {
                const newColumn = {
                    ...column,
                    title
                }
                return newColumn
            }
            return column
        })

        this.props.updateTasksOrder(newColumns)

    }

    handleUpdateTask = (content, id) => {

        const newTasks = {
            ...this.props.tasks,
        }

        console.log(id, newTasks)

        newTasks[id].content = content

        this.props.addTasks(newTasks)

        console.log(newTasks)

    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId='all-columns' direction="horizontal" type="column">
                    {provided => (
                        <div className="listsContainer" {...provided.droppableProps} ref={provided.innerRef}>
                            {this.props.columnOrder.map((columnId, index) => {
                                const column = this.props.columns.find(column => column.id === columnId)
                                const tasks = column.taskIds.map(taskId => this.props.tasks[taskId])
                                return (
                                    <div className='container' key={column.id}>
                                        <Column updateTaskCounter={this.props.updateTaskCounter} counter={this.props.tasksCounter} key={column.id} updateTasks={this.props.updateTasks} allTasks={this.props.tasks} deleteColumn={this.props.deleteColumn} columns={this.props.columns} columnOrder={this.props.columnOrder} column={column} index={index} tasks={tasks} onTitleUpdate={this.updateTitle} onTaskUpdate={this.handleUpdateTask}/>
                                    </div>
                                )
                            })}
                            {provided.placeholder}
                            <div className='container' key='123-add'>
                                <button className='addList' onClick={this.handleAddList}>Add New List</button>
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

const mapStateToProps = store => ({
    tasks: store.tasksReducer.tasks,
    columns: store.tasksReducer.columns,
    columnOrder: store.tasksReducer.columnOrder,
    counter : store.tasksReducer.counter,
    tasksCounter : store.tasksReducer.tasksCounter
})

const mapDispatchToProps = {
    updateColumnOrder: Actions.updateColumnOrder,
    updateTasksOrder: Actions.updateTasksOrder,
    addNewColumn: Actions.addNewColumn,
    deleteColumn: Actions.deleteColumn,
    updateCounter: Actions.updateCounter,
    updateTaskCounter: Actions.updateTaskCounter,
    updateTasks: Actions.updateTasks,
    addTasks: Actions.addTasks
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App
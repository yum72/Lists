const initialState = {
  tasks: {
    'task-1': {
      id: 'task-1',
      content: 'Task 1'
    },
    'task-2': {
      id: 'task-2',
      content: 'Task 2'
    },
    'task-3': {
      id: 'task-3',
      content: 'Task 3'
    },
    'task-4': {
      id: 'task-4',
      content: 'Task 4'
    },
    'task-5': {
      id: 'task-5',
      content: 'Lorem Ipsum is simply dummy text of the printing world.'
    }
  },

  columns: [
    {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    {
      id: 'column-2',
      title: 'Done',
      taskIds: ['task-5']
    },
    {
      id: 'column-3',
      title: 'Doing',
      taskIds: []
    }
  ],

  columnOrder: ['column-1', 'column-2', 'column-3'],

  counter: 0,
  tasksCounter: 0

}

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case "UPDATE_COLUMNS_ORDER": {
      return {
        ...state,
        columnOrder: action.payload.column
      }
    }
    case "UPDATE_COUNTER": {
      return {
        ...state,
        counter: action.payload.counter
      }
    }
    case "UPDATE_TASK_COUNTER": {
      return {
        ...state,
        tasksCounter: action.payload.counter
      }
    }
    case "UPDATE_TASKS_ORDER": {
      return {
        ...state,
        columns: action.payload.columns
      }
    }
    case "ADD_COLUMN": {
      return {
        ...state,
        columns: action.payload.columns,
        columnOrder: action.payload.order
      }
    }
    case "DELETE_COLUMN": {
      return {
        ...state,
        columns: action.payload.columns,
        columnOrder: action.payload.order
      }
    }
    case "UPDATE_TASKS": {
      return {
        ...state,
        columns: action.payload.columns,
        tasks: action.payload.tasks
      }
    }
    case "ADD_TASKS": {
      return {
        ...state,
        tasks: action.payload.tasks
      }
    }
    default: {
      return state
    }
  }

}
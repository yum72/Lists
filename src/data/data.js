const initialData = {
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
      title: 'To do',
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

  columnOrder: ['column-1', 'column-2', 'column-3']

}

export default initialData
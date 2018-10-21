


export function updateColumnOrder(newColumn) {
  return {
    type: "UPDATE_COLUMNS_ORDER",
    payload: {
      column: newColumn
    }
  }
}

export function updateTasksOrder(newColumns) {
  return {
    type: "UPDATE_TASKS_ORDER",
    payload: {
      columns: newColumns
    }
  }
}

export function addNewColumn(newColumns, order) {
  return {
    type: "ADD_COLUMN",
    payload: {
      columns: newColumns,
      order: order
    }
  }
}

export function deleteColumn(newColumns, order) {
  return {
    type: "DELETE_COLUMN",
    payload: {
      columns: newColumns,
      order: order
    }
  }
}

export function updateTasks(newColumns, newTasks) {
  return {
    type: "UPDATE_TASKS",
    payload: {
      columns: newColumns,
      tasks: newTasks
    }
  }
}

export function updateCounter(counter) {
  return {
    type: "UPDATE_COUNTER",
    payload: {
      counter
    }
  }
}

export function updateTaskCounter(counter) {
  return {
    type: "UPDATE_TASK_COUNTER",
    payload: {
      counter
    }
  }
}

export function addTasks(newTasks) {
  return {
    type: "ADD_TASKS",
    payload: {
      tasks: newTasks
    }
  }
}
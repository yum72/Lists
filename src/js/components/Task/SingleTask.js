import React from 'react'
import { Input, Icon } from 'antd';

export default function SingleTask(props) {
  return (
    <div>
      {
        props.task.content === '' || props.taskEdit === props.task.id ?
          <div className='taskContainer'>
            <span className='task'>
              <Input className='taskInput' onChange={(e) => props.updateTaskInput(e)} type="text" key={props.task.id} defaultValue={props.defaultValue} />
            </span>
            <Icon type="save" theme="filled" className='saveTask' onClick={() => props.handleSave(props.task.id)} />
          </div> :
          <div className='taskContainer'>
            <span className='task'>
              {props.task.content}
            </span>
            <Icon type="edit" theme="filled" className='taskEdit' onClick={() => props.handleEdit(props.task.content, props.task.id)} />
            <Icon type="delete" theme="filled" className='taskDelete' onClick={() => props.handleTaskDelete(props.task.id)} />
          </div>
      }
    </div>
  )
}

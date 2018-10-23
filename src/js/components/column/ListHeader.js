import React from 'react'
import { Input, Icon } from 'antd';

export default function ListHeader(props) {
  return (
    <div>
      {
        props.column.title === '' || props.editIndex ?
          <h3 className="title" {...props.provided.dragHandleProps} >
            <Input size="large" placeholder='List Title' onChange={(e) => props.updateTitleEdit(e)} type="text" key={props.column.id} defaultValue={props.column.title} />
            <Icon type="save" theme="filled" className='titleConfirm' onClick={(e) => props.handleSaveClick(e)} />
          </h3> :
          <h3 {...props.provided.dragHandleProps}>
            <span className='title'>
              {props.column.title}
            </span>
            <Icon type="edit" theme="filled" className='editTitle' onClick={props.handleTitleEditClick} />
            <Icon type="delete" theme="filled" className='columnDelete' onClick={props.handleDelete} />
          </h3>
      }
    </div>
  )
}
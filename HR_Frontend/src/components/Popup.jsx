import React from 'react'

function Popup({data , onClose , onUpdate , onDelete}) {

    if(!data) return null;
  return (
    <div className='popup-overlay'>
        <div className='popup-content'>
            <h3>Actions</h3>
            <div className='buttons'>
                <button onClick={() => onUpdate(data)}>Update</button>
                <button onClick={() => onDelete(data)}>Delete</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default Popup
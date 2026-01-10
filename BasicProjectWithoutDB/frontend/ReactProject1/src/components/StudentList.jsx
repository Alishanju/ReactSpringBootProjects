import React from 'react'

const StudentList = ({name,email,image}) => {
  return (
    <div className="inner">
        <img src={image} alt={name} className="image"/>
        <h3>{name}</h3>
        <p>Contact: {email}</p>
      
    </div>
  )
}

export default StudentList

import React, { useState } from 'react'
import axios from 'axios'

const AddCategory = () => {
  const [categoryData, setCategoryData] = useState({
    catgName: '',
    catgDesc: '',
    catgImage: null
  })

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target
    const newValue = type === 'file' ? files[0] : value

    setCategoryData({
      ...categoryData,
      [name]: newValue
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      catgDesc: categoryData.catgDesc,
      catgName: categoryData.catgName,
      catgImage: categoryData.catgImage
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/apicategory',
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )

      console.log('Category added:', response.data)
      setCategoryData({
        catgName: '',
        catgDesc: '',
        catgImage: null
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <h1> Add Category</h1>
      <div className="shadow p-3 mb-5 bg-body-tertiary rounded myForms">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              name="catgName"
              value={categoryData.catgName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="form-label">Description:</label>
            <textarea
              name="catgDesc"
              className="form-control"
              value={categoryData.catgDesc}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Image:</label>
            <input
              type="file"
              className="form-control"
              name="catgImage"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>

          <button className="btn btn-secondary" type="submit">
            Add Catgory
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddCategory

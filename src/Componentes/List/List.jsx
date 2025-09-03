
import { useState } from 'react'
import './list.css'
export const List = ({ data =[] }) => {
  const [actualPage, setActualPage] = useState(0)
  const [pageSize] = useState(1)

  const viewItems = (actualPage, pageSize) => {
    const start = actualPage * pageSize
    const end = start + pageSize
    return data.slice(start, end)
  }
  const totalPages = Math.ceil(data.length / pageSize)
  
  return (
    <>
      <div className="list-group">
        {viewItems(actualPage, pageSize).map((item, index) => (
          <div className="list-group-item" key={index}>
            {item}
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setActualPage(actualPage !== 0 ? actualPage - 1 : 0)}>Previous</button>
        <button onClick={() => setActualPage(actualPage !== totalPages - 1 ? actualPage + 1 : totalPages - 1)}>Next</button>
      </div>
  </>
  )
}
List.defaultProps = {
  data: []
}
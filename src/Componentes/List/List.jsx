
import { useState } from 'react'
import styles from './list.module.css'
export const List = ({ data =[] }) => {
  const [actualPage, setActualPage] = useState(0)
  const [pageSize] = useState(3)

  const viewItems = (actualPage, pageSize) => {
    const start = actualPage * pageSize
    const end = start + pageSize
    return data.slice(start, end)
  }
  const totalPages = Math.ceil(data.length / pageSize)
  
  return (
    <>
      <div className={styles.list_group}>
        {viewItems(actualPage, pageSize).map((item, index) => (
          <div className={styles.list_group_item} key={index}>
            {item}
          </div>
        ))}
      </div>
<div className="pagination">
  <button
    onClick={() => setActualPage(actualPage !== 0 ? actualPage - 1 : 0)}
    className={actualPage === 0 ? styles.disabled : styles.enabled}
  >
    Previous
  </button>

  <button
    onClick={() => setActualPage(actualPage !== totalPages - 1 ? actualPage + 1 : totalPages - 1)}
    className={actualPage === totalPages - 1 ? styles.disabled : styles.enabled}
  >
    Next
  </button>
</div>

  </>
  )
}
List.defaultProps = {
  data: []
}
import styles from './Form.module.css'
export const Form = ({onSubmit}) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.task.value)
        onSubmit(e.target.task.value)
    }
  return (
    <form onSubmit={handleSubmit} className={styles.Form}>
      {/* <label htmlFor="task">Inserte tareas a hacer </label> */}
      <input type="text" id="task" name="task" className={styles.Form__input }  placeholder='Inserte tareas a hacer'/>
      <button type="submit" className={styles.Form__button}>
        Agregar tarea
        </button>
    </form>
  )
}
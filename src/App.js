import React, { useState } from 'react';

const App = () => {
  const [listaTareas, setListaTareas] = useState([]); // Estado para la lista de tareas
  const [nuevaTarea, setNuevaTarea] = useState(""); // Estado para la nueva tarea

  // Manejador del cambio en el input de nueva tarea
  const handleNuevaTareaChange = (event) => {
    setNuevaTarea(event.target.value);
  }

  // Manejador del submit del formulario de nueva tarea
  const handleNuevaTareaSubmit = (event) => {
    event.preventDefault();
    if (nuevaTarea.trim() !== "") { // Validación para asegurarse de que la tarea no esté vacía
      setListaTareas(prevListaTareas => ([
        ...prevListaTareas,
        { id: Date.now(), tarea: nuevaTarea, completada: false }
      ]));
      setNuevaTarea(""); // Limpiar el input de nueva tarea después de agregarla
    }
  }

  // Manejador del cambio de estado de una tarea (completada o no)
  const handleCompletarTarea = (id) => {
    setListaTareas(prevListaTareas => (
      prevListaTareas.map(tarea => {
        if (tarea.id === id) {
          return { ...tarea, completada: !tarea.completada };
        }
        return tarea;
      })
    ));
  }

  // Manejador para eliminar una tarea
  const handleEliminarTarea = (id) => {
    setListaTareas(prevListaTareas => (
      prevListaTareas.filter(tarea => tarea.id !== id)
    ));
  }

  // Manejador para modificar una tarea
  const handleModificarTarea = (id, nuevaTarea) => {
    setListaTareas(prevListaTareas => (
      prevListaTareas.map(tarea => {
        if (tarea.id === id) {
          return { ...tarea, tarea: nuevaTarea };
        }
        return tarea;
      })
    ));
  }

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <form onSubmit={handleNuevaTareaSubmit}>
        <input type="text" value={nuevaTarea} onChange={handleNuevaTareaChange} placeholder="Agregar nueva tarea" />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {listaTareas.map(tarea => (
          <li key={tarea.id}>
            <input type="checkbox" checked={tarea.completada} onChange={() => handleCompletarTarea(tarea.id)} />
            <span style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>{tarea.tarea}</span>
            <button className="btn btn-delete" onClick={() => handleEliminarTarea(tarea.id)}>Eliminar</button>
            <button  className="btn btn-modify" onClick={() => handleModificarTarea(tarea.id, prompt("Ingrese la nueva tarea"))}>Modificar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

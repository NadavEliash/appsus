
const {useState} = React

import { noteService } from "../services/note.service.js"

export function NoteTodo({ note, loadNotes }) {

    const [isChecked, setIsChecked]= useState(false)

    function onChecked(todo){
        todo.done = !todo.done
        if (isChecked) setIsChecked(false)
        else setIsChecked(true)
        noteService.save(note)
            .then(() => {
                loadNotes()

            })
    }


    return (
        <section>
            <h3>{note.info.title} </h3>
            <br />
            <ul>
                {note.info.todos.map(todo =>
                <li key={todo.txt} className={`todo ${todo.done}`} onClick={()=> onChecked(todo)}>
                    {todo.txt}
                </li>
                
                )
                
                }
            </ul>
        </section>
    )
}

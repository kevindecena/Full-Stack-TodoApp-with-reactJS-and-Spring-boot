import { useEffect, useState } from "react";
import { deleteTodoApi, retrieveAllTodosForUsernameApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";


export default function ListTodosComponent(){

    const today = new Date();
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay())

    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)

    const authContext = useAuth()
    const username = authContext.username


    useEffect(
        () => refreshTodos(), []
    )

    function refreshTodos(){

        retrieveAllTodosForUsernameApi(username)
                .then( response => { 
                            setTodos(response.data)
                        }
                    )
                .catch( error => console.log(error))
    }

    function deleteTodo(id){
        console.log('clicked ' + id)
        deleteTodoApi(username, id)
        .then(  
            () => {
                setMessage(`Deleted todo with id =${id} successful`)
                refreshTodos()
            }
            )
        .catch( error => console.log(error))
    }

    return(
        <div className="container">
                <h1>Things you want to do:</h1>
                <div className="alert alert-warning">{message}</div>
                <div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is Done?</th>
                                <th>Target Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                todos.map(
                                    todo => (
                                            <tr key={todo.id}>
                                                <td>{todo.id}</td>
                                                <td>{todo.description}</td>
                                                <td>{todo.done.toString()}</td>
                                                <td>{todo.targetDate.toString()}</td>
                                                <td>
                                                    <button className="btn btn-warning" 
                                                            onClick={ () => deleteTodo(todo.id)} >Delete</button>
                                                </td>
                                            </tr>
                                    )
                                )

                            }
                            
                        </tbody>

                    </table>
                </div>
        </div>
    )
}

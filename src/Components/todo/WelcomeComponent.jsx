import { Link, useParams } from 'react-router-dom'
import { useState } from 'react';
import { retrieveHelloWorldPathVariable } from './api/HelloWorldApiService';

export default function WelcomeComponent(){


    const {username} = useParams();

    const [message, setMessage] = useState(null)

    function callHelloWorldRestApi(){

         console.log('called')
         
             retrieveHelloWorldPathVariable('kevin')
             .then(  (response) => successfulResponse(response) )
             .catch( (error) => errorResponse(error) )
             .finally( () => console.log('cleanup') )

    }

    function successfulResponse(response){
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(error){
        console.log(error)
    }

    return(
        <div>
            <h1>Welcome {username}</h1>

            <div className="Welcome">
                    manage your todos -  <Link to='/todos'>Go here</Link>
            </div>
            <div>
                <button className='btn btn-success m5' onClick={callHelloWorldRestApi}>
                    Call Hello World
                </button>
            </div>
            <div className='text-info'>{message}</div>
        </div>
    )
}
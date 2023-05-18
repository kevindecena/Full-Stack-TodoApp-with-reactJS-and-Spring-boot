import { Link, useParams } from 'react-router-dom'

export default function WelcomeComponent(){

    const {username} = useParams();

    return(
        <div>
            <h1>Welcome {username}</h1>

            <div className="Welcome">
                    manage your todos -  <Link to='/todos'>Go here</Link>
            </div>
        </div>
    )
}
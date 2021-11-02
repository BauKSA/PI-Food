import {Link} from 'react-router-dom';

export default function Home(){
    return(
        <div>
            <Link to="/search/byname">
                <button>Search recipe</button>
            </Link>
            <Link to="/addrecipe">
                <button>Create recipe</button>
            </Link>
        </div>
    )
}
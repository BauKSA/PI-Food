import { useState } from "react"
import { connect } from "react-redux"
import {searchByName} from '../store/actions'


function SearchBar(props) {
    const [search, setSearch] = useState('')
    function onSubmit(e) {
        e.preventDefault();
        props.searchByName(search);
    }
    function onInputChange(e) {
        setSearch(e.target.value)
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={search} onChange={onInputChange}/>
                <button>SEARCH</button>
            </form>
        </div>
    )
}

const mapDispatchToProps ={
    searchByName
}

export default connect(null, mapDispatchToProps)(SearchBar)
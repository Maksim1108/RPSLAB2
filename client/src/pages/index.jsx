import React from 'react'
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <ul className="home__list">
            <Link className="home__link" to="/inputandedit">INPUT & EDIT</Link>
            <Link className="home__link" to="/save">SAVE IN DATABASE</Link>
            <Link className="home__link" to="/outputlist">0UTPUT ARRAYS</Link>
            <Link className="home__link" to="/outputbyid">0UTPUT ARRAY FOR SORT & EDIT</Link>
            <Link className="home__link" to="/sort">SORT ARRAY</Link>
        </ul>
    )
}

export default Home
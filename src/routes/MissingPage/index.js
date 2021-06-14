import { Link } from "react-router-dom"

const MissingPage = () => {
    return(
        <div className="container">
            <h1>404: Page Not Found</h1>
            <Link to={'/'}>
                <h3>Go Home</h3>
            </Link>
        </div>
    )
}

export default MissingPage;
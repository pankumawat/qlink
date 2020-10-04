const quiteRedirect = (event) => {
    event.preventDefault();
    silentUrlChangeTo(event.target.href);
}
const Nav = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src="http://placehold.it/150x50?text=Logo" alt=""/>
                </a>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/home" onClick={quiteRedirect}>
                            Home
                            <span className="sr-only">(current)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/logout" onClick={props.logout}>Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
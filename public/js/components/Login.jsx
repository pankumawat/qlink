class Login extends React.Component {
    login = (event) => {
        event.preventDefault();
        const loginForm = event.target;
        const username = loginForm.elements.namedItem("username").value;
        const password = loginForm.elements.namedItem("password").value;

        fetch('/api/login', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((response) => response.json()).then((response) => {
            if (response.success) {
                const loggedInUser = response.data
                localStorage.setItem("user", JSON.stringify(loggedInUser));
                showSuccess('Login successful.', 1000);
                setTimeout(() => {
                    this.props.loginSuccess(loggedInUser)
                }, 1000);
            } else {
                showError(response.error, 3000);
            }
        }).catch((error) => {
            showError(`Something went wrong. details: ${error}`, 3000);
        });
    }

    render() {
        return (
            <div className="flex-column center box">
                <div className="login box center" aria-modal="true">
                    <div>
                        <div className="modal-header">
                            <h3>Sign in</h3>
                        </div>
                        <form id="login_form" onSubmit={this.login}>
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="text" className="form-control" name="username"
                                           placeholder="Username" required="required"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="password" className="form-control" name="password"
                                           placeholder="Password" required="required"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <button type="submit" className="btn btn-success form-control">Login</button>
                                </div>
                            </div>
                            <div className="right">
                                <a href="#" data-toggle="tooltip" data-placement="top"
                                   title="Login as a Guest user. Limited features only.">Login as Guest</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
class Shortener extends React.Component {
    createShortUrl = (event) => {
        event.preventDefault();
    }

    render = () => (
        <div className="shortener box center">
            <form class="shortener" id="shortener_form" onSubmit={this.createShortUrl}>
                <div className="form-group">
                    <div className="input-group">
                    <textarea type="url" className="form-control" name="long_url"
                              placeholder="Long URL" required="required" rows="5"/>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            <div className="input-group">
                                <input type="text" className="form-control" name="short_name"
                                       placeholder="Short-Name"
                                       required="required" disabled={this.props.loggedInUser.isGuest ? true : false}/>
                            </div>
                        </div>
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <div className="input-group">
                                <button type="submit" className="btn btn-success form-control">Generate</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
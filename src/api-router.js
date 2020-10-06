const apiRoute = require('express').Router();
const db = require('./db');
const core = require('./core');
const parseUserAgent = core.parseUserAgent;

// Functions
const getSuccessResponse = core.getSuccessResponse;
const getErrorResponse = core.getErrorResponse;
const getShortIdValidated = core.getShortIdValidated;
const getJwtToken = core.getJwtToken;

apiRoute.get('/', (req, res) => {
    res.status(200).json({message: 'Connected!'});
});

apiRoute.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        db.fetchUser(username).then(function (user) {
            if (user.password == password) {
                getJwtToken(
                    {username: username, ...user}
                ).then(tokenObj => {
                    const localUsrObj = {...user}
                    delete localUsrObj.password;
                    return res.json(getSuccessResponse({
                        user: {username: username, ...localUsrObj},
                        ...tokenObj
                    }))
                }).catch(error => {
                    console.log(error.stack)
                    return res.status(500).json(getErrorResponse(error.message));
                });
            } else {
                return res.status(401).json(getErrorResponse(`Incorrect username or password`));
            }
        }).catch(function (error) {
            console.log(error.message)
            return res.status(500).json(
                getErrorResponse(error.message));
        });
    } else {
        return res.status(400).json({user: username, pass: password});
    }
});

apiRoute.post('/short', (req, res) => {
    let short_name = req.body.short_name;
    const long_url = req.body.long_url;
    const isGuest = req.body.guest;
    const userProvidedShortName = short_name;
    getShortIdValidated(isGuest ? 5 : 3, short_name).then(response => {
        if (response.short_name) {
            res.status(200).json(
                getSuccessResponse({
                    short_name: response.short_name,
                    url: long_url,
                    link: `@${response.short_name}`,
                    full_url: `http://qlinks.in/@${response.short_name}`,
                })
            )
        } else {
            res.status(200).json(
                getErrorResponse("This short name has already been taken", response.data))
        }
    }).catch(error => {
        getErrorResponse(error.message)
    })
});


apiRoute.get('/p', (req, res) => {
    return res.send(JSON.stringify(parseUserAgent(req)));
});


module.exports = apiRoute;
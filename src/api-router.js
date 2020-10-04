const apiRoute = require('express').Router();
const db = require('./db');
const core = require('./core');
const parseUserAgent = core.parseUserAgent;

// Functions
const getSuccessResponse = core.getSuccessResponse;
const getErrorResponse = core.getErrorResponse;

const generateGuestShortIds = core.generateGuestShortIds;
const generateShortIds = core.generateShortIds;
const getJwtToken = core.getJwtToken;

apiRoute.get('/', (req, res) => {
    res.status(200).json({message: 'Connected!'});
});


apiRoute.get('/unique-ids/:len', (req, res) => {
    let len = req.params['len'];
    res.send(generateGuestShortIds(len));
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

apiRoute.get('/p', (req, res) => {
    return res.send(JSON.stringify(parseUserAgent(req)));
});


module.exports = apiRoute;
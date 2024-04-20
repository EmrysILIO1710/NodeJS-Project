
const userMiddleware = async (err, req, res, next) => {
    if(err === 'UC'){
        return res.status(403).send("student already present...");
    }
    else if(err === 'BF'){
        return res.status(403).send("empty fields...");
    }
    else if(err === 'WR'){
        return res.status(401).send("wrong password...");
    }
    else if(err === 'ENF'){
        return res.status(403).send("email not found...");
    }
    else if(err === 'UE'){
        return res.status(403).send("unauthorized entry...");
    }
    else if(err === 'Auth-token-blocker'){
        return res.status(403).send("invalid authorization...");
    }
    else{
        return res.status(500).send(err);
    }
};

module.exports = userMiddleware;
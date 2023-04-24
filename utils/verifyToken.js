import  jwt  from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    // const token = req.cookies.access_token;
   
    // if (!token) return res.status(401).json('You are not authenticated!')

    // jwt.verify(token, process.env.JWT, (err, user) => {
    //     if(err) return res.status(403).json('Token is not valid!')
    //     req.user = user;
    //     next();

    // })


    // let token = req.headers.authorization;
   
    // if (!token) return res.status(401).json('You are not authenticated!')
    // console.log(token);

    // token = token.split(' ')[1];


    const tokenFromHeaders = req.headers.authorization;
    if (tokenFromHeaders) {
        const headersToken = tokenFromHeaders.split(' ')[1];
        try {
        const decoded = jwt.verify(headersToken, process.env.JWT);
        req.user = decoded;
        next();
        return;
        } catch (err) {
        return res.status(401).json({ message: 'Token invalide' });
        }
    }

    const tokenFromCookies = req.cookies.token;
    if (tokenFromCookies) {
        try {
        const decoded = jwt.verify(tokenFromCookies, process.env.JWT);
        req.user = decoded;
        next();
        return;
        } catch (err) {
        return res.status(401).json({ message: 'Token invalide' });
        }
    }

    return res.status(401).json({ message: 'You are not authenticated!' });

}


export const verifyUser = (req, res, next) => {
    verifyToken(req, res,next, () => {
        if (req.user.id == req.params.id || req.user.isAdmin) {
            next();
        }
        else
        {
         return res.status(403).json('You are not authorized!')
        }
    })
}


export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res,next, () => {
        if (req.user.isAdmin) {
            next();
        }
        else
        {
         return res.status(403).json('You are not authorized!')
        }
    })
}
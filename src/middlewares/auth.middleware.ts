import jwt from 'jsonwebtoken';
import config from '../config';
import respond from '../utils/respond.util';
import User from '../models/user.model';

const verifyAuthToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return respond({
            res,
            status: 401,
            message: 'Authentication required!',
        });
    const token = authHeader.split(' ')[1];

    try {
        const decoded: any = jwt.verify(token, config.JWT_SECRET);

        const user = await User.findOne({
            _id: decoded._id,
            'tokens.token': token,
        });
        if (!user)
            return respond({
                res,
                status: 401,
                message: 'Authentication required!',
            });

        req.user = user;
        req.token = token;

        next();
    } catch (error) {
        respond({ res, status: 401, message: 'Invalid token!' });
    }
};

export default verifyAuthToken;

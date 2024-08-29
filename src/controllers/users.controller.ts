import bcrypt from 'bcrypt';
import User from '../models/user.model';
import UserService from '../services/users.service';
import respond from '../utils/respond.util';

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser)
            return respond({
                res,
                status: 409,
                message: 'User already exists',
            });

        const user = await UserService.signup(req.body);
        // res.status(201).send(user)
        respond({
            res,
            status: 201,
            message: 'successully signedup',
            data: user,
        });
    } catch (e) {
        console.log(e);
        respond({ res, status: 500, message: 'Something went wrong!' });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user)
            return respond({
                res,
                status: 401,
                message: 'Invalid email or password',
            });

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword)
            return respond({
                res,
                status: 401,
                message: 'Invalid email or password',
            });

        const token = await user.generateAuthToken();
        const obscuredUser = user.toJSON();
        const userData = { ...obscuredUser, token };
        respond({ res, message: 'successfully signed in', data: userData });
    } catch (e) {
        respond({ res, status: 500, message: 'Something went wrong!' });
    }
};

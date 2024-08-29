import User, { IUser } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

class UserService {
    private model = User;
    static async signup(userDetails: IUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userDetails.password, salt);
        const user = await User.create({
            ...userDetails,
            password: hashedPassword,
        });

        // await user.save();
        const token = await user.generateAuthToken();
        const userObject = user.toJSON();
        return { ...userObject, token };
    }
}

export default UserService;

import { Response } from 'express';
interface IRespond {
    res: Response;
    status?: number;
    message?: string;
    data?: any;
}

const respond = ({ res, status = 200, message, data = {} }: IRespond) => {
    const successCodes = [200, 201];

    res.status(status).json({
        status: successCodes.includes(status) ? 'success' : 'error',
        message,
        data,
    });
};

export default respond;

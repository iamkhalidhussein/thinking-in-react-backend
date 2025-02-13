import { Request, Response } from 'express';
import userModel from '../models/user-model';

const getUserData = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        const query = (req.query.query as string) || '';
        const role = req.query.role as string;
        const status = req.query.status as string;
        const sortBy = (req.query.sortBy as string) || 'name';
        const sortDirection = req.query.sortDirection === 'desc' ? -1 : 1;

        const skip = (page - 1) * pageSize;
        
        let filter: any = {};

        if (query) {
            filter.$or = [
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ];
        }
        if (role) filter.role = role;
        if (status) filter.status = status;

        const users = await userModel.find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize);

        const totalUsers = await userModel.countDocuments(filter);
        const totalPages = Math.ceil(totalUsers / pageSize);

        res.json({
            users,
            totalUsers,
            totalPages,
            currentPage: page,
            pageSize,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error in user-controller', error });
    }
};

export { getUserData };
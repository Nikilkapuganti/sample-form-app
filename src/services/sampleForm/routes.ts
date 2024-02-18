import { Request, Response, NextFunction } from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "./sampleFromController";


export default [
    {
        path: '/user/create',
        method: 'post',
        handler: [
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    let result = await createUser(req.body);
                    res.status(200).send(result);
                } catch (e) {
                    next(e);
                }
            },
        ],
    },
    {
        path: '/user/:userId/get',
        method: 'get',
        handler: [
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    let result = await getUser(req.params.userId);
                    res.status(200).send(result);
                } catch (e) {
                    next(e);
                }
            },
        ],
    },
    {
        path: '/user/:userId/update',
        method: 'post',
        handler: [
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    let result = await updateUser(req.params.userId,req.body);
                    res.status(200).send(result);
                } catch (e) {
                    next(e);
                }
            },
        ],
    },
    {
        path: '/user/:userId/delete',
        method: 'delete',
        handler: [
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    let result = await deleteUser(req.params.userId);
                    res.status(200).send(result);
                } catch (e) {
                    next(e);
                }
            },
        ],
    },
    {
        path: '/users/getall',
        method: 'get',
        handler: [
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    let result = await getAllUsers();
                    res.status(200).send(result);
                } catch (e) {
                    next(e);
                }
            },
        ],
    },

]
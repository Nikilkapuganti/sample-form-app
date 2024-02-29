import { Request, Response, NextFunction } from "express";
import { dashboard, login, register } from "./authController";
import { authenticateJWT } from "../../middleware/auth";
import { AuthenticatedRequest } from "../user/userModel";
export default [
    {
        path: '/register',
        method: 'post',
        handler: [
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    let result = await register(req.body);
                    res.status(200).send(result);
                } catch (e) {
                    next(e);
                }
            },
        ],
    },
    {
        path: '/login',
        method: 'post',
        handler: [
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    let result = await login(req.body);
                    res.status(200).send(result);
                } catch (e) {
                    next(e);
                }
            },
        ],
    },
    {
        path: '/dashboard',
        method: 'get',
        handler: [
            authenticateJWT,
            async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
                try {
                    
                    let result = await dashboard(req.user);
                    res.status(200).send(result);
                } catch (e) {
                    next(e);
                }
            },
        ],
    }

]
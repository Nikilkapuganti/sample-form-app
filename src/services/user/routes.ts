import { Request, Response, NextFunction } from "express";
import { login, register } from "./userController";
import { authenticateUser } from "./userModel";
import { TaskModel } from "../../interfaces/taskinterface";


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
        path: '/profile',
        method: 'get',
        handler: [
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    let result = await authenticateUser;
                    res.status(200).send(result);
                } catch (e) {
                    next(e);
                }
            },
        ],
    },
    {
        path: '/graphql/:id/delete',
        method: 'post',
        handler: [
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    console.log("hjbdsbsbh")
                    // Extract the task ID from the request body or parameters
                    const taskId = req.body.id || req.params.id;

                    if (!taskId) {
                        throw new Error('Task ID is required');
                    }

                    // Perform the deletion logic
                    const deletedTask = await TaskModel.findByIdAndDelete(taskId);

                    if (!deletedTask) {
                        res.status(404).json({ error: 'Task not found' });
                    } else {
                        console.log('Task deleted successfully:', deletedTask);
                        res.status(200).json(deletedTask);
                    }
                } catch (error) {
                    console.error('Error deleting task:', error);
                    res.status(500).json({ error: 'Failed to delete task' });
                }
            },
        ],
    },
    {
        path: '/graphql/create',
        method: 'post',
        handler: [

            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    //const requestBody = JSON.parse(req.body.query);
                    const requestBody = req.body;
                const { title, description, dueDate, assignee } = requestBody.variables.input;
                
                    console.log("dxfdf", req.body)
                    const task = new TaskModel({ title, description, dueDate, assignee });
                    const savedTask = await task.save();
                    console.log('Task saved successfully:', savedTask);
                    res.status(200).json(savedTask);
                } catch (error) {
                    console.error('Error saving task:', error);
                    res.status(500).json({ error: 'Failed to create task' });
                }
            }],
    },
    {
        path: '/graphql/:id/update',
        method: 'post',
        handler: [

            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    console.log(req.body)
                    // const requestBody = JSON.parse(req.body.query);

                    // Extract mutation variables
                    const { title, description, dueDate, assignee } =req.body.variables.input;
                    console.log("dxfdf", req.body)

                    const updatedTask = await TaskModel.findByIdAndUpdate(
                        req.params.id,
                        { title, description, dueDate, assignee },
                        { new: true }
                    );

                    if (!updatedTask) {
                        throw new Error('Task not found');
                    }

                    console.log('Task updated successfully:', updatedTask);
                    res.status(200).json(updatedTask);
                } catch (error) {
                    console.error('Error saving task:', error);
                    res.status(500).json({ error: 'Failed to create task' });
                }
            }],
    },
    // {
    //     path: '/graphql/:id/update',
    //     method: 'post',
    //     handler: [

    //         async (req: Request, res: Response, next: NextFunction) => {
    //             try {
    //                 const requestBody = JSON.parse(req.body.query);

    //                 // Extract mutation variables
    //                 const { title, description, dueDate, assignee } = requestBody.variables.input;
    //                 console.log("dxfdf", req.body)

    //                 const updatedTask = await TaskModel.findByIdAndUpdate(
    //                     req.params.id,
    //                     { title, description, dueDate, assignee },
    //                     { new: true }
    //                 );

    //                 if (!updatedTask) {
    //                     throw new Error('Task not found');
    //                 }

    //                 console.log('Task updated successfully:', updatedTask);
    //                 return updatedTask;
    //             } catch (error) {
    //                 console.error('Error updating task:', error);
    //                 throw new Error('Failed to update task');
    //             }
    //         }],
    // }
]
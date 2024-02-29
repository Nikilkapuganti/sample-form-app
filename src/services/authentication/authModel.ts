import { User, UserRole } from "../../interfaces/userInterface";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { v4 as uuidv4 } from 'uuid';



export const registerInDB= async(body:any) => {

    try {
        const { email, password } = body;
    
        if(!(email && password)){
            return 'All fileds manadatory'
        }
    
    //finding the user
        const existingUser=await User.findOne({email:email})
    
        if(existingUser){
            return 'Already Use'
        }
    
    
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser:any = new User({ email, password: hashedPassword });
        
    
       let token:any= jwt.sign(
            {
                id: uuidv4(),
                email,
                password: hashedPassword,
                role: UserRole.USER,
            },'shhh',{
                expiresIn:"2h"
            }
        )
        newUser.token=token
        await newUser.save();
    
        //res.status(201).json({ message: 'User registered successfully' });
        return 'User registered successfully'
      } catch (error) {
        console.error(error);
        return 'Internal Server Error'
        // res.status(500).json({ message: 'Internal Server Error' });
      }
    
}
export const loginInDB= async(body:any) => {

    try {
        const { email, password } = body;
    
        if(!(email && password)){
            return 'All fileds manadatory'
        }
    
    //finding the user
        const existingUser=await User.findOne({email:email})
    
        if(existingUser){
            return 'Already Use'
        }
    
    
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser:any = new User({ email, password: hashedPassword });
        
    
       let token:any= jwt.sign(
            {
                id: uuidv4(),
                email,
                password: hashedPassword,
                role: UserRole.USER,
            },'shhh',{
                expiresIn:"2h"
            }
        )
        newUser.token=token
        await newUser.save();
    
        //res.status(201).json({ message: 'User registered successfully' });
        return 'User registered successfully'
      } catch (error) {
        console.error(error);
        return 'Internal Server Error'
        // res.status(500).json({ message: 'Internal Server Error' });
      }
    
}

export const dashboardInDB= async(user:any) => {

    if (user.role !== 'admin') {
        
        return 'Access Forbidden'
       
      }
    

      return 'Admin Dashboard'
    
    
}
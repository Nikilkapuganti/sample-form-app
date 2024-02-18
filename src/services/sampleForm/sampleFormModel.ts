import { ObjectId } from "mongodb";
import { connectionObj } from "../../config/db";


export const createUserInDB = async (payload: object) => {
    return await connectionObj.db(`dm_details_db`)
        .collection('users')
        .insertOne(payload)
}

export const getUserFromDB = async (id: string) => {
    console.log("gvhjn", id)
    return await connectionObj.db(`dm_details_db`).collection('users')
        .find({ "_id": new ObjectId(id) }).toArray();
}

export const updateSpecifcUserInDB = async (id: string, payload: any) => {
    return await connectionObj.db(`dm_details_db`).collection('users')
        .updateOne({ "_id": new ObjectId(id) }, { $set: payload });
}

export const deleteSpecificUserFromDB = async (id: string) => {
    return await connectionObj.db(`dm_details_db`).collection('users')
        .deleteOne({ "_id": new ObjectId(id) })
}


export const getAllUserFromDB = async () => {
    return await connectionObj.db(`dm_details_db`).collection('users').find({}).toArray();
}
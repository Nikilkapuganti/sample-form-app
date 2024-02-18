import { createUserInDB, deleteSpecificUserFromDB, getAllUserFromDB, getUserFromDB, updateSpecifcUserInDB } from "./sampleFormModel";

export const createUser = async (payload: object) => {
  return await createUserInDB(payload);
}

export const getUser = async (id: string) => {
  return await getUserFromDB(id);
}

export const updateUser = async (id: string, userpayload: object) => {
  return await updateSpecifcUserInDB(id, userpayload);

}

export const deleteUser = async (id: string) => {
  return await deleteSpecificUserFromDB(id);
}

export const getAllUsers = async () => {
  return await getAllUserFromDB();
}

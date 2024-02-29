import { registerInDB,loginInDB, dashboardInDB } from "./authModel";

export const register= async(body:any) => {
    console.log('2');
    return await registerInDB(body);
}

export const login= async(body:any) => {
    return await loginInDB(body);
}
export const dashboard= async(user:any) => {
    return await dashboardInDB(user);
}



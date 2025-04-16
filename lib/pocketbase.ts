'use server'
// helpers/pocketbase.ts
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.PUBLIC_NEXT_PB_URL);

export const authenticateUser = async (email: string, password: string) => {
  try {
    console.log(email + ' '  +password)
    const authData = await pb.collection('users').authWithPassword(email, password);
    return authData;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
    return pb.authStore.model;
}

export const logout = async () => {
  pb.authStore.clear();
};

export const createNewUser = async (email: string, password: string, name: string) => {
  try {
    const user = await pb.collection('users').create({
      email,
      password,
      passwordConfirm: password,
      name,
    });
    return user;
  } catch (error) { throw error; }
};
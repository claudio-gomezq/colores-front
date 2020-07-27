export default interface  User{
  id?: number;
  name: string;
  email: string;
  type: 'admin' | 'normal';
  password?: string;
}

export function createUser(partialUser: Partial<User>) {
  return {...partialUser} as User;
}

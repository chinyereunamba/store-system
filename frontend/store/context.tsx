import { axiosInstance } from "@/lib/utils";
import { create } from "zustand";

type UserProps = {
  pk: number;
  email: string;
  username: string;
  access: string;
  refresh: string;
};

type ContextProps = {
  user: UserProps | null;
  setUser: (user: UserProps) => void;
};

const useUser = create<ContextProps>((set) => ({
  user: null,
  setUser: (user: UserProps) => set({ user }),
}));

type User = {
  pk: number;
  email: string;
  username: string;
};

type UserContextProps = {
  users: User[];
  fetchUsers: () => void;
};

const useUsers = create<UserContextProps>((set) => ({
  users: [],
  fetchUsers: async() => {
    const response = await axiosInstance.get("/users/");
    set({users: response.data})
  },
}));

export default useUser;
export {useUsers}
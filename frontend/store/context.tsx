import { create } from "zustand";

type UserProps = {
  pk: number
  email: string ;
  username: string;
  access: string ;
  refresh: string;
};

type ContextProps = {
  user: UserProps | null,
  setUser: (user: UserProps)=>void
}

const useUser = create<ContextProps>((set) => ({
  user: null,
  setUser: (user: UserProps) => set({ user }),
}));


export default useUser
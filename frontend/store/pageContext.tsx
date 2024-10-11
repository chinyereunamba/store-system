// useStore.ts
import { create } from 'zustand'

type PageProps = {
    currentPage: string;
    setCurrentPage: (page: string)=>void
}

const usePage = create<PageProps>((set) => ({
  currentPage: 'Dashboard', // Default page
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default usePage;

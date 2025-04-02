import { create } from 'zustand'

const useStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLoading: (loading) => set({ loading }),
  logout: () => set({ user: null, isAuthenticated: false })
}))

export default useStore 
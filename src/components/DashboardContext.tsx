import { createContext, useContext } from 'react';

export const DashboardContext = createContext<boolean>(false);

export function useDashboard() {
  return useContext(DashboardContext);
}

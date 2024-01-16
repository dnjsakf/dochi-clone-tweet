"use client";

import { ReactNode, createContext, useContext, useState } from "react";

export const TabContext = createContext({
  tab: "rec",
  setTab: (value: 'rec' | 'fol'): void => { },
})

type Props = { children: ReactNode };

export default function TabProvider({ children }: Props){
  const [tab, setTab] = useState('rec');
  return (
    <TabContext.Provider value={{ tab, setTab }}>
      { children }
    </TabContext.Provider>
  );
}
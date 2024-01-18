"use client";

import { useEffect } from "react";

export const MSWComponent = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      (async ()=>{
        if( typeof window === 'undefined' ){
          const { server } = await import("@/mocks/server");
          server.listen();
        } else {
          const { worker } = await import("@/mocks/browser");
          worker.start();
        }
      })();
    }
  }, []);
  return null;
};
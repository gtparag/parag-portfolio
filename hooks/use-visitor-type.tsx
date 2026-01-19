"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type VisitorType = "recruiter" | "other" | null;

interface VisitorTypeContextType {
  visitorType: VisitorType;
  setVisitorType: (type: VisitorType) => void;
  isRecruiter: boolean;
}

const VisitorTypeContext = createContext<VisitorTypeContextType | undefined>(undefined);

export function VisitorTypeProvider({ children }: { children: ReactNode }) {
  const [visitorType, setVisitorType] = useState<VisitorType>(null);

  return (
    <VisitorTypeContext.Provider
      value={{
        visitorType,
        setVisitorType,
        isRecruiter: visitorType === "recruiter",
      }}
    >
      {children}
    </VisitorTypeContext.Provider>
  );
}

export function useVisitorType() {
  const context = useContext(VisitorTypeContext);
  if (context === undefined) {
    throw new Error("useVisitorType must be used within a VisitorTypeProvider");
  }
  return context;
}

import { useState } from "react";
import { RequestContext } from "./RequestContext";

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState({ requests: [], pages: 0 });
  return <RequestContext.Provider value={{ requests, setRequests }}>{children}</RequestContext.Provider>;
};

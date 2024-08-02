import { UserProvider } from "./context/UserProvider";
import { AppRouter } from "./router/AppRouter";

export const App = () => {
  return (
    <>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </>
  );
};

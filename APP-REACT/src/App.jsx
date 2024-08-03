import { UserProvider } from "./context/User/UserProvider";
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

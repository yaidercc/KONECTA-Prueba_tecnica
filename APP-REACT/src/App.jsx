import { UserProvider } from "./context/Employees/EmployeeProvider";
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

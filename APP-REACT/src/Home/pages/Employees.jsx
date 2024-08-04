import { lazy, Suspense } from "react";
const TableUsers = lazy(() => import("../components/TableUsers"));
export const Employees = () => {
  return (
    <div>
      <h2>Empleados</h2>
      <hr />
      <Suspense fallback={<div>Loading...</div>}>
        <TableUsers />
        {/* <p>hola</p> */}
      </Suspense>
    </div>
  );
};

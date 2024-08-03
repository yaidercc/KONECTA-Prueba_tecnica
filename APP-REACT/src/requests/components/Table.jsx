

export const Table = ({role_id,handleDeleteRequest,requests}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Codigo</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Resumen</th>
          <th scope="col">Empleado</th>
          {role_id === 1 || <th scope="col">Eliminar</th>}
        </tr>
      </thead>
      <tbody>
        {requests.map((item, i) => (
          <tr key={i}>
            <th scope="row">{i + 1}</th>
            <td>{item.code}</td>
            <td>{item.description}</td>
            <td>{item.summary}</td>
            <td>{item.Employee.name}</td>
            {role_id === 1 || (
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteRequest(item.id)}>
                  Eliminar
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

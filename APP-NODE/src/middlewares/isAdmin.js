const isAdmin = (req, res, next) => {
  const { employee } = req;
  const { role_id } = employee;
  

  if (role_id === 1) {
    return res.status(401).json({
      success: false,
      msg: "No autorizado.",
    });
  }
  next();
};
module.exports = isAdmin
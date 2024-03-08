const Verify_User = (...Roles) => {
  return (Req, Res, Next) => {
    if (Roles.includes(Req.Verifyed_User.Role)) {
      Next();
    } else {
      return Res.json({
        Status: "Faild",
        message: "Unauthorized ! You Can't access this Route. ",
      });
    }
  };
};
export default Verify_User;

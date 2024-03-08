import JWT from "jsonwebtoken";

const Genetate_Token = async (USER) => {
  const Token = await JWT.sign(
    { email: USER.email, _id: USER._id, Role: USER.Role },
    process.env.JWT_SECRET_KEY
  );

  return Token;
};
const Verify_Token = async (Req, Res, Next) => {
  const Token = Req.headers["Authorization"] || Req.headers["authorization"];

  if (!Token) {
    // Token not in headers
    return Res.json({
      Status: "Faild",
      message: "Token is Required !",
    });
  }
  try {
    const Verifyed_User = await JWT.verify(Token, process.env.JWT_SECRET_KEY);
    Req.Verifyed_User = Verifyed_User;
    Next();
  } catch (err) {
    // Error in Token handelar
    return Res.json({
      Status: "Faild",
      message: "Unauthorized. Token is not valid !",
    });
  }
};

export default {
  Genetate_Token,
  Verify_Token,
};

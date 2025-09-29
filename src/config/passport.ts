import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStategy } from "passport-jwt";
import { User } from "../modules/user/user.model";
import { IsActive } from "../modules/user/user.inerface";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "./env";

export const localStrategy = new LocalStrategy(
  { usernameField: "username" },
  async function (username, password, done) {
    try {
      const userDoc = await User.findOne({
        $or: [{ email: username }, { phone: username }],
      }).select("+password");

      const isPasswordMatched = await userDoc?.matchPassword(password);

      const user = {
        _id: userDoc?._id,
        email: userDoc?.email,
        phone: userDoc?.phone,
        role: userDoc?.role,
      };

      if (!userDoc) return done(null, false, { message: "Account not found" });
      if (userDoc?.isDeleted)
        return done(null, false, { message: "This account has been deleted." });
      if (userDoc?.isActive != IsActive.ACTIVE)
        return done(null, false, { message: "This account is not active." });
      if (!isPasswordMatched)
        return done(null, false, { message: "Incorrect email or password." });

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
);

export const jwtStrategy = new JwtStategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: envVars.JWT_ACCESS_SECRET,
  },
  async (jwtPayload: JwtPayload, done) => {
    try {
      const userId = jwtPayload._id;
      const userDoc = await User.findById(userId);

      if (!userDoc) return done(null, false, { message: "Account not found" });
      if (userDoc?.isDeleted)
        return done(null, false, { message: "This account has been deleted." });
      if (userDoc?.isActive != IsActive.ACTIVE)
        return done(null, false, { message: "This account is not active." });

      return done(null, userDoc);
    } catch (error: unknown) {
      return done(error, false);
    }
  }
);

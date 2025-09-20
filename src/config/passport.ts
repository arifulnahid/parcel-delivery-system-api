import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../modules/user/user.model";
import bcryptjs from "bcryptjs";
import { IsActive } from "../modules/user/user.inerface";

export const localStrategy = new LocalStrategy(
  { usernameField: "email" },
  async function (email, password, done) {
    try {
      const userDoc = await User.findOne({ email }).select("+password");
      const isPasswordMatched = await bcryptjs.compare(
        password,
        userDoc!.password
      );

      const user = userDoc?.toJSON();

      if (!user) return done(null, false);
      if (user.isDeleted)
        return done(null, false, { message: "This account has been deleted." });
      if (user.isActive != IsActive.ACTIVE)
        return done(null, false, { message: "This account is not active." });
      if (!isPasswordMatched)
        return done(null, false, { message: "Incorrect email or password." });

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
);

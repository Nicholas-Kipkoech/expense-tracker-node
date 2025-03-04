import * as bcrypt from 'bcrypt';

export class PasswordUtil {
  /**
   * method for encrypting password
   * @param password user password passed in the request
   * @returns hashed password
   */
  static async encryptPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
  /**
   *
   * @param password plain text password
   * @param hashPassword hashedPassword
   * @returns
   */
  static async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch;
  }
}

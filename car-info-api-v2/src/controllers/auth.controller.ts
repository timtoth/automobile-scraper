import { Request, Response } from "express";
import { AuthenticatedUser, authenticateUser, generateToken, registerUser } from "../services/auth.service.js";

export interface IAuthController {
  login(req: Request, res: Response): Promise<void>;
  registerUser(req: Request, res: Response): Promise<void>;
}

export class AuthController implements IAuthController {

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const user: AuthenticatedUser = (await authenticateUser(email, password)) as AuthenticatedUser;

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role.name,
        name: user.name
      }
    })
  }

  public async registerUser(req: Request, res: Response): Promise<void> {
    const { email, password, name } = req.body;

    const user: AuthenticatedUser = (await registerUser(email, password, name)) as AuthenticatedUser;

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        role: user.role.name,
        name: user.name
      }
    });
  }
}

// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   const user = await authenticateUser(email, password);

//   if (!user) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   const token = generateToken(user);

//   res.json({
//     message: "Login successful",
//     token,
//     user: {
//       id: user.id,
//       email: user.email,
//       role: user.role.name,
//       name: user.name
//     }
//   });
// };

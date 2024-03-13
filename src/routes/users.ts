import { Router, Request, Response } from "express";

const router = Router();

const apiToken = "thisisavalidtokenrequiredforauthentication";

const validateToken = (token: string) => token === apiToken;

const authenticateToken = (req: Request, res: Response, next: any) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token is missing." });
  }

  if (!validateToken(token)) {
    return res.status(401).json({ message: "Access denied. Invalid token." });
  } 
  return next();
};

// Get all users route
router.get("/", authenticateToken, (req: Request, res: Response) => {
  const userData = [
    {
      id: 1,
      username: "User1",
      email: "user1@example.com",
    },
    {
      id: 2,
      username: "User2",
      email: "user2@example.com",
    },
    {
      id: 3,
      username: "User3",
      email: "user3@example.com",
    },
  ];

  res.json(userData);
});

export default router;

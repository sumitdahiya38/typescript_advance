import * as express from "express";
import * as bodyParser from "body-parser";
import userRoute from "./routes/users";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/users", userRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;

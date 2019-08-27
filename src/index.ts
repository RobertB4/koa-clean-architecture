import * as dotenv from "dotenv";
dotenv.config();
import * as Koa from "koa";
import * as Router from "koa-router";
import * as logger from "koa-logger";
import * as cors from "@koa/cors";
import * as bodyParser from "koa-bodyparser";
import * as passport from "koa-passport";
import * as mongoose from "mongoose";
import { authMiddleware } from "./utils/auth";
import { ContextState, CustomContext } from "./types";

import { authRoutes } from "./routes";
import { userRoutes } from "./routes";

mongoose
  .connect(process.env.MONGODB_URI as string, { useNewUrlParser: true })
  .then((): void => {
    console.log("Connected to MongoDB.");
  })
  .catch((err): void => {
    console.log(`Could not connect to MongoDB: ${err}`);
    process.exit();
  });

const app = new Koa<ContextState, CustomContext>();
const router = new Router<ContextState, CustomContext>();

if (process.env.NODE_ENV === "development") app.use(logger());

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(bodyParser());
app.use(passport.initialize());

authRoutes(router);

/**
 * Routes below this middleware can only be accessed by authorized users
 */
router.use(authMiddleware);

userRoutes(router);

router.get("/", (ctx): void => {
  ctx.body = "Hello World4";
});

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 5000;
app.listen(PORT, (): void => {
  console.log(`Server started on port ${PORT}.`);
});

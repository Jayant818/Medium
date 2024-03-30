import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "hono/adapter";
import { sign, verify } from "hono/jwt";
import { Blog } from "./routes/blog";
import { User } from "./routes/user";
import { cors } from "hono/cors";

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

app.use("/*", cors());

// app.use("/api/v1/blog/*", async (c, next) => {
// 	// get the headers
// 	const jwt = c.req.header("Authorization");
// 	if (!jwt) {
// 		c.status(401);
// 		return c.json({ error: "unauthorized" });
// 	}

// 	// jo hame header milega wo iss format mai hoga Bearer absfgdgdgjsgjghasshj
// 	// ab hame token chaiye to barer hatana padega
// 	// so use split function - ["Bearer","absfdhdfhdshjsjsshj"]
// 	const token = jwt.split(" ")[1];
// 	// verify the headers
// 	//@ts-ignore
// 	const response = await verify(token, c.env.JWT_SECRET);
// 	// if header is correct we need to proceed
// 	// otherwise return 403 error
// 	if (response.id) {
// 		await next();
// 	} else {
// 		c.status(403);
// 		return c.json({ error: "unauthorized user" });
// 	}
// });

app.route("/api/v1/blog", Blog);

app.route("/api/v1", User);

// app.get("/", (c) => {
// 	const prisma = new PrismaClient({
// 		// @ts-ignore
// 		datasourceUrl: c.env.DATABASE_URL,
// 	}).$extends(withAccelerate());
// 	return c.text("Hello Hono!");
// });

export default app;

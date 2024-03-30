import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { sign } from "hono/jwt";
import { SigninInput, signinInput, signupInput } from "@100xdevs/medium-common";

export const User = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

User.post("/signup", async (c) => {
	// in serveless env kya hota hai ki multiple nodes mai hamare code chla raha hota hai orr har node wo fully utilize nhi karta sare endpoint ko , so instead of connecting to the prisma globally we do that in every route
	const prisma = new PrismaClient({
		// we can't use env variables outside it cuz we need context object
		// here we are refering to the DB URL that is present in the wrangler.toml file
		// @ts-ignore
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	// as it is a post request so access the body
	// express - req.body()
	// ye json() hai to await karna padega
	const body = await c.req.json();
	// check karo ki correct hai na
	// const { success } = signupInput.safeParse(body);
	// if (!success) {
	// 	c.status(403);
	// 	return c.json({ message: "Invalid Type" });
	// }

	try {
		const newUser = await prisma.user.create({
			data: {
				name: body.name,
				email: body.email,
				password: body.password,
			},
		});
		// @ts-ignore
		const token = await sign({ id: newUser.id }, c.env.JWT_SECRET);

		return c.json({ jwt: token });
	} catch (e) {
		console.log(e);
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
});

User.post("/signin", async (c) => {
	const prisma = new PrismaClient({
		//@ts-ignore
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	// const { success } = signinInput.safeParse(body);
	// if (!success) {
	// 	c.status(403);
	// 	return c.json({ message: "Invalid Type" });
	// }

	try {
		const user = await prisma.user.findUnique({
			where: {
				email: body.email,
				password: body.password,
			},
		});

		if (!user) {
			c.status(403);
			return c.json({ error: "user not found" });
		}

		//@ts-ignore
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

		return c.json({
			jwt,
		});
	} catch (e) {
		console.log("Error", e);
		c.status(403);
		return c.json({ message: "Invalid User" });
	}
});

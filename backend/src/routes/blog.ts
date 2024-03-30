import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@100xdevs/medium-common";

export const Blog = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

Blog.use("/", async (c, next) => {
	// authorize the user
	// get the user id forward the user id to all request

	const header = c.req.header("Authorization") || "";
	// const token = header?.split(" ")[1];

	const response = await verify(header, c.env.JWT_SECRET);

	if (response.id) {
		c.set("userId", response.id);
		await next();
	} else {
		c.status(403);
		return c.json({
			message: "Invalid User",
		});
	}
});

// to submit a post
Blog.post("/", async (c) => {
	const authorId = c.get("userId");
	const prisma = new PrismaClient({
		//@ts-ignore
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = createBlogInput.safeParse(body);
	if (!success) {
		c.status(403);
		return c.json({ message: "Invalid Type" });
	}
	try {
		const newBlog = await prisma.post.create({
			data: {
				title: body.title,
				content: body.content,
				authorId: Number(authorId),
			},
		});
		return c.json({
			id: newBlog.id,
		});
	} catch (e) {
		c.status(411);
		return c.json({
			message: "can't create a blog post",
		});
	}
});

Blog.put("/", async (c) => {
	const authorId = c.get("userId");
	const prisma = new PrismaClient({
		//@ts-ignore
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = updateBlogInput.safeParse(body);
	if (!success) {
		c.status(403);
		return c.json({ message: "Invalid Type" });
	}
	try {
		const updatedBlog = await prisma.post.update({
			where: {
				id: Number(body.id),
			},
			data: {
				title: body.title,
				content: body.content,
			},
		});

		return c.json({
			id: updatedBlog.id,
		});
	} catch (e) {
		console.log(e);
		c.status(411);
		return c.json({
			message: "can't update  a blog post",
		});
	}
});

Blog.get("/bulk", async (c) => {
	const prisma = new PrismaClient({
		//@ts-ignore
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const AllBlogs = await prisma.post.findMany({
			select: {
				id: true,
				title: true,
				content: true,
				author: {
					select: {
						name: true,
					},
				},
			},
		});
		return c.json(AllBlogs);
	} catch (e) {
		c.status(411);
		return c.json({
			message: "can't create a blog post",
		});
	}
});

Blog.get("/:id", async (c) => {
	const id = c.req.param("id");
	const prisma = new PrismaClient({
		//@ts-ignore
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const blog = await prisma.post.findUnique({
			where: {
				id: Number(id),
			},
			select: {
				id: true,
				title: true,
				content: true,
				author: {
					select: {
						name: true,
					},
				},
			},
		});

		return c.json({ blog });
	} catch (e) {
		console.log(e);
		c.status(411);
		return c.json({
			message: "can't create a blog post",
		});
	}
});

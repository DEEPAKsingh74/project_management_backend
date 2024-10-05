import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSearch = async (req: Request, res: Response): Promise<void> => {
	try {
		const { query } = req.query;
		const tasks = await prisma.task.findMany({
			where: {
				OR: [
					{title: {contains: query as string}},
					{description: {contains: query as string}},
				]
			}
		});
		const projects = await prisma.project.findMany({
			where: {
				OR: [
					{name: {contains: query as string}},
					{description: {contains: query as string}},
				]
			}
		});
		const users = await prisma.user.findMany({
			where: {
				OR: [
					{username: {contains: query as string}},
				]
			}
		});
		res.json({tasks, projects, users});
	} catch (error) {
		res.status(500).json({ message: "Error retrieving query" });
	}
}
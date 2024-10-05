import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
	try {
		const { projectId } = req.query;
		console.log(projectId);
		
		let tasks = null;
		if (projectId) {
			tasks = await prisma.task.findMany({
				where: {
					projectId: Number(projectId),
				},
				include: {
					author: true,
					assignee: true,
					comments: true,
					attachments: true
				}
			});
		}else{
			tasks = await prisma.task.findMany({

				include: {
					author: true,
					assignee: true,
					comments: true,
					attachments: true
				}
			});
		}
		res.json(tasks);
	} catch (error) {
		res.status(500).json({ message: "Error retrieving projects" });
	}
}

export const createTask = async (req: Request, res: Response): Promise<void> => {
	try {
		const { title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId } = req.body;
		const task = await prisma.task.create({
			data: {
				title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId
			},
		});
		res.status(201).json(task);
	} catch (error: any) {
		res.status(500).json({ message: `Error creating task ${error.message}` });
	}
}


export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
	try {
		const { taskId } = req.params;
		const { status } = req.body;
		const updatedTask = await prisma.task.update({
			where: {
				id: Number(taskId)
			},
			data: {
				status
			}
		});
		res.json(updatedTask);
	} catch (error: any) {
		res.status(500).json({ message: `Error updating task ${error.message}` });
	}
}
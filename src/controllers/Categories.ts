import { Controller } from ".";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { dataSource } from "../config/datasource";
import { Category } from "../entities/Category";

export class CategoriesController implements Controller {
    async getAll(req: Request, res: Response) {
        try {
            const categories = await Category.find();
            res.send(categories);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const category = await Category.findOne({ where: { id: Number(req.params.id) } });
            res.send(category);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async createOne(req: Request, res: Response) {
        try {
            const newCategory = new Category();
            newCategory.name = req.body.name;
            const errors = await validate(newCategory)
            if (errors.length > 0) {
                throw new Error ("Validation failed !")
            } else {
                await dataSource.manager.save(newCategory)
            }
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async updateOne(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const category = await Category.findOneBy({ id })
            if (category !== null) {
                category.name = req.body.name;
                const errors = await validate(category)
            if (errors.length > 0) {
                throw new Error ("Validation failed !")
            } else {
                await dataSource.manager.save(category)
            }
        }
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async deleteOne(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await Category.delete({ id });
            res.send("OK");
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        } 
    }
}
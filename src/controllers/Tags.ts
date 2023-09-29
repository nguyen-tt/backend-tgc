import { Controller } from ".";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { dataSource } from "../config/datasource";
import { Tag } from "../entities/Tag";

export class TagsController implements Controller {
    async getAll(req: Request, res: Response) {
        try {
            const tags = await Tag.find();
            res.send(tags);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const tag = await Tag.findOne({ where: { id: Number(req.params.id) } });
            res.send(tag);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async createOne(req: Request, res: Response) {
        try {
            const newTag = new Tag();
            newTag.name = req.body.name;
            const errors = await validate(newTag)
            if (errors.length > 0) {
                throw new Error ("Validation failed !")
            } else {
                await dataSource.manager.save(newTag)
            }
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async updateOne(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const tag = await Tag.findOneBy({ id })
            if (tag !== null) {
                tag.name = req.body.name;
                const errors = await validate(tag)
            if (errors.length > 0) {
                throw new Error ("Validation failed !")
            } else {
                await dataSource.manager.save(tag)
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
            await Tag.delete({ id });
            res.send("OK");
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        } 
    }
}
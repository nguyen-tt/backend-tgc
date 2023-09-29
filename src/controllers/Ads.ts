import { Controller } from ".";
import { Request, Response } from "express";
import { Ad } from "../entities/Ad";
import { validate } from "class-validator";
import { dataSource } from "../config/datasource";

export class AdsController implements Controller {
  async getAll(req: Request, res: Response) {
    try {
      const ads = await Ad.find({
        relations: {
          category: true,
          tags: true,
        },
      });
      res.send(ads);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const ad = await Ad.findOne({ where: { id: Number(req.params.id) } });
      res.send(ad);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async createOne(req: Request, res: Response) {
    try {
      const newAd = new Ad();
      newAd.title = req.body.title;
      newAd.description = req.body.description;
      newAd.owner = req.body.owner;
      newAd.price = req.body.price;
      newAd.picture = req.body.picture;
      newAd.location = req.body.location;
      newAd.createdAt = new Date();
      newAd.category = req.body.category;
      //   newAd.tags = req.body.tags;
      const errors = await validate(newAd);
      if (errors.length > 0) {
        throw new Error("Validation failed !");
      } else {
        await dataSource.manager.save(newAd);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async updateOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const ad = await Ad.findOneBy({ id });
      if (ad) {
        Object.assign(ad, req.body, { id: ad.id });
        const errors = await validate(ad);
        if (errors.length === 0) {
          await ad.save();
          res.sendStatus(204);
        } else {
          res.sendStatus(400).json({ errors: errors });
        }
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async deleteOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await Ad.delete({ id });
      res.send("OK");
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

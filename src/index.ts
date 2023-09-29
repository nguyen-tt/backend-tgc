import "reflect-metadata";
import express from "express";
import cors from "cors";
import { dataSource } from "./config/datasource";
import { AdsController } from "./controllers/Ads";
import { CategoriesController } from "./controllers/Categories";
import { TagsController } from "./controllers/Tags";

const app = express();

app.use(cors());

const port = 5001;
app.use(express.json());

const adsController = new AdsController();
app.get("/ads", adsController.getAll);
app.get("/ads/:id", adsController.getOne);
app.post("/ads", adsController.createOne);
app.patch("/ads/:id", adsController.updateOne);
app.delete("/ads/:id", adsController.deleteOne);

const categoriesController = new CategoriesController();
app.get("/categories", categoriesController.getAll);
app.get("/categories/:id", categoriesController.getOne);
app.post("/categories", categoriesController.createOne);
app.patch("/categories/:id", categoriesController.updateOne);
app.delete("/categories/:id", categoriesController.deleteOne);

const tagsController = new TagsController();
app.get("/tags", tagsController.getAll);
app.get("/tags/:id", tagsController.getOne);
app.post("/tags", tagsController.createOne);
app.patch("/tags/:id", tagsController.updateOne);
app.delete("/tags/:id", tagsController.deleteOne);

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Server ready !`);
});

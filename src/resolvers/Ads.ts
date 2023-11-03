import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Ad, AdCreateInput, AdUpdateInput, AdsWhere } from "../entities/Ad";
import { validate } from "class-validator";
import { In, LessThanOrEqual, Like, MoreThanOrEqual } from "typeorm";
import { merge } from "../utils";

@Resolver(Ad)
export class AdsResolver {
  @Query(() => [Ad])
  async getAds(
    @Arg("where", { nullable: true }) where?: AdsWhere
  ): Promise<Ad[]> {
    const querywhere: any = {};

    if (where?.categoryIn) {
      querywhere.category = { id: In(where.categoryIn) };
    }

    if (where?.searchTitle) {
      querywhere.title = Like(`%${where.searchTitle}%`);
    }

    if (where?.priceGte) {
      querywhere.priceGte = MoreThanOrEqual(Number(where.priceGte));
    }

    if (where?.priceLte) {
      querywhere.priceLte = LessThanOrEqual(Number(where.priceLte));
    }

    const ads = await Ad.find({
      where: querywhere,
      relations: { tags: true, category: true },
    });
    return ads;
  }

  @Query(() => Ad)
  async getAdById(@Arg("id", () => ID) id: number): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id },
      relations: { tags: true, category: true },
    });
    return ad;
  }

  @Mutation(() => Ad)
  async createAd(
    @Arg("data", () => AdCreateInput) data: AdCreateInput
  ): Promise<Ad> {
    const newAd = new Ad();
    Object.assign(newAd, data);

    const errors = await validate(newAd);
    if (errors.length === 0) {
      await newAd.save();
      return newAd;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }

  @Mutation(() => Ad)
  async updateAd(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => AdUpdateInput) data: AdUpdateInput
  ): Promise<Ad> {
    const ad = await Ad.findOne({
      where: { id },
      relations: { tags: true, category: true },
    });
    if (ad) {
      merge(ad, data);

      const errors = await validate(ad);
      if (errors.length === 0) {
        await ad.save();
        return ad;
      } else {
        throw new Error(`Error occured: ${JSON.stringify(errors)}`);
      }
    } else {
      throw new Error("Ad not found");
    }
  }

  @Mutation(() => Ad)
  async deleteAd(@Arg("id", () => ID) id: number): Promise<any> {
    const ad = await Ad.findOne({ where: { id } });
    if (ad) {
      const deletedAd = Object.assign({}, ad);
      await ad.remove();
      return deletedAd;
    } else {
      throw new Error("Ad not found");
    }
  }
}

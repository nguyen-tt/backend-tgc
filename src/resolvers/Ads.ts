import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Ad, AdInput } from "../entities/Ad";
import { validate } from "class-validator";

@Resolver(Ad)
export class AdsResolver {
  @Query(() => [Ad])
  async getAds(): Promise<Ad[]> {
    const ads = await Ad.find({
      relations: { tags: true, category: true },
    });
    return ads;
  }

  @Query(() => Ad)
  async getAdById(@Arg("id", () => ID) id: number): Promise<Ad | null> {
    const ad = await Ad.findOne({ where: { id } });
    return ad;
  }

  @Mutation(() => Ad)
  async createAd(@Arg("data", () => AdInput) data: AdInput): Promise<Ad> {
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
    @Arg("data", () => AdInput) data: AdInput
  ): Promise<Ad> {
    const ad = await Ad.findOne({ where: { id } });
    if (ad) {
      Object.assign(ad, data, { id: ad.id });
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

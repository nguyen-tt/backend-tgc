import "reflect-metadata";
import { dataSource } from "./config/datasource";
import { TagsResolver } from "./resolvers/Tags";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AdsResolver } from "./resolvers/Ads";
import { CategoriesResolver } from "./resolvers/Categories";

async function initializeServer() {
  const schema = await buildSchema({
    resolvers: [TagsResolver, AdsResolver, CategoriesResolver],
  });

  const server = new ApolloServer({ schema });

  await dataSource.initialize();
  const { url } = await startStandaloneServer(server, {
    listen: { port: 5001 },
  });

  console.log(`Server ready at ${url}`);
}

initializeServer();

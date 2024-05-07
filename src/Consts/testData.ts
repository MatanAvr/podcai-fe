import { TEpisode } from "../Api/ApiTypesAndConsts";

export const testEpisode: TEpisode = {
  name: "test episdoe name",
  link: "test episdoe name",
  categories: ["general", "world", "nation"],
  articles_data: [
    {
      title: "test article title",
      description: "test article description",
      url: "test article url",
      publish_at: "test article publish_at",
      image: "test article image",
      source_name: "test article source_name",
      source_url: "test article source_url",
    },
  ],
  is_completed: false,
};

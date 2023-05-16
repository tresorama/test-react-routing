import { createRouter, defineRoute, param } from "type-route";

export const { RouteProvider, useRoute, routes, session } = createRouter({
  home: defineRoute("/"),
  userList: defineRoute(
    {
      page: param.query.optional.number,
    },
    () => "/user"
  ),
  user: defineRoute(
    {
      userId: param.path.string,
    },
    (p) => `/user/${p.userId}`
  ),
});

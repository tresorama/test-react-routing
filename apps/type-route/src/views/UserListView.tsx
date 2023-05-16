import type { Route } from "type-route";
import { routes } from "../router/router";

type UserListViewProps = {
  route: Route<typeof routes['userList']>;
};

export const UserListView = ({ route }: UserListViewProps) => {
  return (
    <div>
      <h1>UserListView</h1>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <span>url:</span><span>{route.href}</span>
        <span>page:</span><span>{route.params.page ?? 1}</span>
      </div>
    </div>
  );
};

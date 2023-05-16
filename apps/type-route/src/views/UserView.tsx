import type { Route } from "type-route";
import { routes } from "../router/router";

type UserViewProps = {
  route: Route<typeof routes['user']>;
};


export const UserView = ({ route }: UserViewProps) => {
  return (
    <div>
      <h1>UserView</h1>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <span>url:</span><span>{route.href}</span>
        <span>userId:</span><span>{route.params.userId}</span>
      </div>
    </div>
  );
};

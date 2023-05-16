import { ClickCounter } from "./components/ClickCounter";
import { routes, useRoute } from "./router/router";
import { HomeView } from "./views/HomeView";
import { NotFoundView } from "./views/NotFoundView";
import { UserListView } from "./views/UserListView";
import { UserView } from "./views/UserView";
import cx from 'classnames';

export function App() {
  return (
    <div className="h-screen flex flex-col">
      <div className="">
        <Navigation />
      </div>
      <div className="flex-grow min-h-0 overflow-auto">
        <div className="px-8 pt-4">
          <ClickCounter />
        </div>
        <Page />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}

const Navigation = () => {
  const currentRoute = useRoute();

  return (
    <div className="py-4 px-8 bg-zinc-200 flex gap-2">
      {([
        [routes.home(), 'Home'],
        [routes.userList(), 'User List'],
        [routes.userList({ page: 2 }), 'User List page 2'],
        [routes.user({ userId: 'abs' }), 'User abs'],
      ] as const).map(([route, name]) => {
        const isActive = currentRoute.href === route.href;
        const classes = cx(
          'py-2 px-4 rounded-xl bg-gray-100 hover:bg-gray-50 text-sm font-semibold cursor-pointer', {
          '!bg-green-300': isActive,
        });
        return <a {...route.link} className={classes}>{name}</a>;
      })}
    </div>
  );
};
const Page = () => {
  const route = useRoute();

  return (
    <div className="py-12 px-8 bg-zinc-50">
      {route.name === 'home' && <HomeView />}
      {route.name === 'userList' && <UserListView route={route} />}
      {route.name === 'user' && <UserView route={route} />}
      {route.name === false && <NotFoundView />}
    </div>
  );
};
const Footer = () => (
  <div className="py-4 px-8 bg-green-300 text-center text-sm italic text-green-900">
    Created with <code className="font-bold">type-route</code>
  </div>
);
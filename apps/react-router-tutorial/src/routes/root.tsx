import { Link, Outlet, useLoaderData, Form, redirect, NavLink, useNavigation } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";
import { getContacts, createContact, Contact } from "../data/contacts";
import type { InferLoaderData } from "../lib/react-router/react-router.utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('q');
  const contacts = await getContacts(searchTerm);
  return { contacts, searchTerm };
};

export const action = async () => {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export const RootView = () => {
  const { contacts, searchTerm } = useLoaderData() as InferLoaderData<typeof loader>;
  const navigation = useNavigation();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <HeaderTopBar initialSearchTerm={searchTerm} />
        <Nav contacts={contacts}
        />
      </div>
      <div
        id="detail"
        className={`
          ${navigation.state === 'loading' ? 'loading' : ''}
          ${navigation.state === 'submitting' ? 'loading' : ''}
        `}>
        <Outlet />
      </div>
    </>
  );
};

const HeaderTopBar = ({ initialSearchTerm }: { initialSearchTerm?: string | null; }) => (
  <div>
    <Form method="get" id="search-form" role="search">
      <input
        id="q"
        aria-label="Search contacts"
        placeholder="Search"
        type="search"
        name="q"
        defaultValue={!initialSearchTerm ? '' : initialSearchTerm}
      />
      <div
        id="search-spinner"
        aria-hidden
        hidden={true}
      />
      <div
        className="sr-only"
        aria-live="polite"
      ></div>
    </Form>
    <Form method="post">
      <button type="submit">New</button>
    </Form>
  </div>
);

const Nav = ({ contacts }: { contacts: Contact[]; }) => (
  <nav>
    {contacts.length ? (
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <NavLink
              to={`contacts/${contact.id}`}
              className={({ isActive, isPending }) => {
                if (isActive) return 'active';
                if (isPending) return 'pending';
                return '';
              }}
            >
              {contact.first || contact.last ? (
                <>
                  {contact.first} {contact.last}
                </>
              ) : (
                <i>No Name</i>
              )}{" "}
              {contact.favorite && <span>★</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    ) : (
      <p>
        <i>No contacts</i>
      </p>
    )}
  </nav>

);

export const RootChildView = () => {
  return (
    <p id="zero-state">
      This is a demo for React Router.
      <br />
      Check out{" "}
      <a href="https://reactrouter.com">
        the docs at reactrouter.com
      </a>
      .
    </p>
  );
};
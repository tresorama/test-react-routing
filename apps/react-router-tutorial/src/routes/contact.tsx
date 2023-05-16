import { ActionFunctionArgs, Form, useLoaderData } from "react-router-dom";
import { getContact } from "../data/contacts";
import type { LoaderFunctionArgs } from "react-router-dom";
import type { InferLoaderData } from "../lib/react-router/react-router.utils";
import type { Contact } from '../data/contacts';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const contactId = Number(params.contactId!);
  const contact = await getContact(contactId);
  return { contact };
};

export const ContactView = () => {
  const { contact } = useLoaderData() as InferLoaderData<typeof loader>;
  return (
    <div id="contact">
      {!contact ? <div>No contact</div> : (
        <>
          <div>
            <img
              key={contact.avatar}
              src={contact.avatar}
            />
          </div>

          <div>
            <h1>
              {contact.first || contact.last ? (
                <>
                  {contact.first} {contact.last}
                </>
              ) : (
                <i>No Name</i>
              )}{" "}
              <Favorite contact={contact} />
            </h1>

            {contact.twitter && (
              <p>
                <a
                  target="_blank"
                  href={`https://twitter.com/${contact.twitter}`}
                >
                  {contact.twitter}
                </a>
              </p>
            )}

            {contact.notes && <p>{contact.notes}</p>}

            <div>
              <Form action="edit">
                <button type="submit">Edit</button>
              </Form>
              <Form
                method="post"
                action="destroy"
                onSubmit={(event) => {
                  const confirmed = confirm("Please confirm you want to delete this record.");
                  if (!confirmed) event.preventDefault();
                }}
              >
                <button type="submit">Delete</button>
              </Form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function Favorite({ contact }: { contact: Contact; }) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
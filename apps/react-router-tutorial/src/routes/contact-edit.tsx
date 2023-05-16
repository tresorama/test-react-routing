import { ActionFunctionArgs, Form, LoaderFunctionArgs, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { getContact, updateContact } from "../data/contacts";
import { InferLoaderData } from "../lib/react-router/react-router.utils";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const contactId = Number(params.contactId!);
  const contact = await getContact(contactId);
  return { contact };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const contactId = Number(params.contactId!);
  await updateContact(contactId, updates);
  return redirect(`/contacts/${contactId}`);
};

export const ContactEditView = () => {
  const { contact } = useLoaderData() as InferLoaderData<typeof loader>;
  const navigate = useNavigate();
  const handleCancelClick = () => {
    navigate(-1);
  };

  if (!contact) return <p>No Contact</p>;
  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </p>
    </Form>
  );
};
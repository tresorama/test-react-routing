import { redirect } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import { deleteContact } from "../data/contacts";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const contactId = Number(params.contactId);
  await deleteContact(contactId);
  return redirect(`/`);
};
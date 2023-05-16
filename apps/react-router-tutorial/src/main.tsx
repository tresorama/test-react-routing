import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./styles/index.css";
import { RootView, RootChildView, loader as rootLoader, action as rootAction } from './routes/root';
import { ErrorPage } from './routes/error-page';
import { ContactView, loader as contactLoader } from './routes/contact';
import { ContactEditView, loader as contactEditLoader, action as contactEditAction } from './routes/contact-edit';
import { action as contactDestroyAction } from './routes/contact-destroy';

// Define Routes with React Router DOM
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootView />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        index: true,
        element: <RootChildView />
      },
      {
        path: 'contacts/:contactId',
        element: <ContactView />,
        loader: contactLoader,
      },
      {
        path: 'contacts/:contactId/edit',
        element: <ContactEditView />,
        loader: contactEditLoader,
        action: contactEditAction,
      },
      {
        path: 'contacts/:contactId/destroy',
        action: contactDestroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

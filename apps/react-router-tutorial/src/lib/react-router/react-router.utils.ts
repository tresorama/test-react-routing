import { LoaderFunction } from "react-router-dom";

export type InferLoaderData<Loader extends LoaderFunction> = Awaited<ReturnType<Loader>>;

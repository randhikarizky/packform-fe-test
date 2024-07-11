import { NextPage } from "next";

export type CustomNextPage = NextPage & { useErrorLayout?: boolean };

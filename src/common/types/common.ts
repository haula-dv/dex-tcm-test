import React from "react";

export interface IChildrenProps {
  children: React.ReactNode;
}

import { EmotionCache } from "@emotion/react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

/* Defining the props that the Layout component will receive. */
export interface LayoutProps {
  children: ReactNode;
}

export type NextPageWithLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

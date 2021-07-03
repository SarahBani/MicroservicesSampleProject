import * as  React from 'react';
import { FC, ReactNode } from "react";

export type BaseForm<T = {}> = {
    elementHandler: (event: any, id: string) => void,
    saveHandler: (event: any) => void,
} & FC<T>;
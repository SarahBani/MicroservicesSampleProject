import * as  React from 'react';
import { FC, FormEvent } from "react";

export type BaseForm<T = {}> = {
    elementHandler: (event: FormEvent, id: string) => void,
    saveHandler: (event: FormEvent) => void,
} & FC<T>;
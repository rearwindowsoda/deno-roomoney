// TODO: Do i need it?
import {signal} from "@preact/signals";
export const isLogged = signal<boolean>(false);
export const userLogin = signal<string | null>(null);
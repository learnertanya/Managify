import { string } from "joi";

export interface IBrand extends Document{
    name?: string;
    description?: string;
    logo?: string;
    video?: string;
}
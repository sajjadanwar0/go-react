import {RoleType} from "./roleType";

export type UserType = {
    id?: number
    first_name?: string
    last_name?: string
    email?: string
    role?:RoleType
}

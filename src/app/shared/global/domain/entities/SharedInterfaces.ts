import { User, Image } from "."

export interface ExpressValidator {
    value:      string
    msg:        string
    param:      string
    location:   string
}
export interface ExpressValidatorResponse {
    errors: ExpressValidator[]
}

export type GlobalResponse = ExpressValidatorResponse | User | Image
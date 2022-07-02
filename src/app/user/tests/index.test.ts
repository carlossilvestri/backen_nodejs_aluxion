import "mocha";
import { expect } from "chai"
import httpStatus from "http-status";
import request from "supertest"
import dotenv from "dotenv"
import { CreateUserRequestSent } from "../../shared/global/domain/entities"
dotenv.config()

const server_request = request(process.env.PAGE_LINK || "localhost:3000")

describe("User - Tests", () => {
    const urlUser    : string = "/auth"
    const user : CreateUserRequestSent = {
        name: "TEST USER",
        email: "test@test.com",
        password: "ABC123"
    }
    // convert JS object data to x-www-form-urlencoded
    let bodyToSend = new URLSearchParams(Object.entries(user)).toString();
    let authToken = ""
    it(`Should create a user. POST ${server_request}${urlUser}/user`, async () => {

        const res : any = await server_request.post(`${urlUser}/user`).send(bodyToSend)
        expect(res.status).to.equal(httpStatus.CREATED)
    })
    it(`Should login user POST ${server_request}${urlUser}/user_login`, async () => {

        const res : any = await server_request.post(`${urlUser}/user_login`).send(bodyToSend)
        authToken = res.body.token
        expect(res.status).to.equal(httpStatus.OK)
    })
    it(`Should update user PUT ${server_request}${urlUser}/user`, async () => {
        const userUpdate : any = {
            name: "TEST USER2"
        }
        let bodyToSendUser = new URLSearchParams(Object.entries(userUpdate)).toString();
        const res : any = await server_request.put(`${urlUser}/user`).set("authorization", authToken).send(bodyToSendUser)
        expect(res.status).to.equal(httpStatus.OK)
    })
    it(`Should delete user DELETE ${server_request}${urlUser}/user`, async () => {

         const res : any = await server_request.delete(`${urlUser}/user`).set("authorization", authToken).send()
        expect(res.status).to.equal(httpStatus.OK)
    })
})


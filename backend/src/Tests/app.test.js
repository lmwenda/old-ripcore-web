import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";

dotenv.config();

const connect = { 
    mongoose,
    connect: () => {
        try{
            mongoose.Promise = Promise;
            mongoose.connect(process.env.DB_CONNECTION);
        } catch(err){
            console.error("Failed to Connect to the DB: " + err)
        }
    }
}

describe("Testing the Connectivity for the Database", () => {
    test("Connects to the Database", () => {
        return request(app) 
        .then(() => {
            beforeAll(() => {
                connect();
            })
        });
    })
})
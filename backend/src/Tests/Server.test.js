import { PORT } from "../server.js";

describe("Testing the PORT Value", () => {
    test("Checking if the PORT'S value is equal to 5000", () => {
        expect(PORT).toBe(5000);
    })
})
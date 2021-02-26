import requests from "superagent";
import UserRoutes from "../Routes/UserRoutes.js";

describe('Test the Register Post Request', function () {
    test('Tests for the Post Request', () => {
        return requests(UserRoutes)
            .post('/api/users/register')
            .then(response => expect(response.statusCode).toBe(200))
    })
});
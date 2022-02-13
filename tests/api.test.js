const Anegdot = require('../models/anegdot');
const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

jest.setTimeout(10000);

const initialAnegdots = [
    {
        text: "dasda",
        category: "ddd",
        likes: 8,
        id: "62092c057118c6bfca1b961d"
    },
    {
        text: "dasda",
        category: "ddddada",
        likes: 5,
        id: "62093474fa42a7b046772297"
    }
];

// this functionality ensrures that everytime we run the tests database will be in the same state as before
beforeEach(async () => {
    await Anegdot.deleteMany({});
    let anegdotObject = new Anegdot(initialAnegdots[0]);
    await anegdotObject.save();
    anegdotObject = new Anegdot(initialAnegdots[1]);
    await anegdotObject.save();
});

describe('getting anegdots', () => {
    test('anegdots are returned as json', async () => {
        await request
            .get('/anegdots')
            .expect(200)
            .expect('Content-Type', /json/)
    });

    test('all anegdots are returned', async () => {
        const response = await request.get('/anegdots');

        expect(response.body).toHaveLength(initialAnegdots.length);
    });

    test('anegdots when given invalid endpoint are not returned', async () => {
        await request
            .get('/anegdotss')
            .expect(404)
    });
});

describe('creating anegdots', () => {
    test('anegdot can be created', async () => {
        const anegdot = {
            text: 'dadasdsadas',
            category: 'dasdasdasdaseqda',
            likes: 12
        };

        await request
            .post('/anegdots')
            .send(anegdot)
            .expect(201)
    });

    test('anegdot without providing text cannot be created', async () => {
        const anegdot = {
            category: 'dsadasdasda',
            likes: 15
        };

        await request
            .post('/anegdots')
            .send(anegdot)
            .expect(500)
    });
});

describe('updating anegdots', () => {
    test('anegdot can be updated', async () => {
        const anegdots = await request.get('/anegdots');
        const anegdotToUpdate = anegdots.body[0];

        const anegdotEdit = {
            text: 'dsadasdaseqweqwe12',
            category: 'dsadalkda',
            likes: 2
        };

        await request
            .put(`/anegdots/${anegdotToUpdate.id}`)
            .send(anegdotEdit)
            .expect(201)
    });

    test('anegdot with malformatted id cannot be updated', async () => {
        const anegdots = await request.get('/anegdots');
        let anegdotToUpdate = anegdots.body[0];
        anegdotToUpdate.id = 'blabla3131'

        const anegdotEdit = {
            category: 'dsadalkda',
            likes: 2
        };

        await request
            .put(`/anegdots/${anegdotToUpdate.id}`)
            .send(anegdotEdit)
            .expect(500)
    });
});

// after everything is done close the connection
afterAll(() => {
    mongoose.connection.close();
});
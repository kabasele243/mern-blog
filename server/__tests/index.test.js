import app from '../app';
import mongoose from 'mongoose';
import supertest from 'supertest';

test("Get All Posts", async () => {

    const post = {
        title: 'Mon titre',
        summary: 'Ma description',
        body: "Mon body"
    }

    await supertest(app).get('/api/posts')
        .expect(200)
        .then((response) => {
            expect(response.body.title).toBe(post.title);
            expect(response.body.summary).toBe(post.summary);
            expect(response.body.body).toBe(post.body);
          });
})

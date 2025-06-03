import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ name: 'John', age: 28 })
      .expect(201)
      .expect({ name: 'John', age: 28 });
  });

  it('/users/:name (GET)', async () => {
    await request(app.getHttpServer()).post('/users').send({ name: 'Jane', age: 33 });
    return request(app.getHttpServer())
      .get('/users/Jane')
      .expect(200)
      .expect({ name: 'Jane', age: 33 });
  });

  it('/users/:name (PUT)', async () => {
    await request(app.getHttpServer()).post('/users').send({ name: 'Mark', age: 40 });
    return request(app.getHttpServer())
      .put('/users/Mark')
      .send({ age: 41 })
      .expect(200)
      .expect({ name: 'Mark', age: 41 });
  });

  it('/users/:name (DELETE)', async () => {
    await request(app.getHttpServer()).post('/users').send({ name: 'Lara', age: 20 });
    return request(app.getHttpServer())
      .delete('/users/Lara')
      .expect(200)
      .expect({result: true}); // match controller's return type
  });

  it('/users/nonexistent (DELETE) returns false', () => {
    return request(app.getHttpServer())
      .delete('/users/NoOne')
      .expect(200)
      .expect({result: false}); // match controller's return type
  });
});

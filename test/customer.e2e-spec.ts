import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('CustomersController (e2e) - Main Flow', () => {
  let app: any;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new customer', () => {
    const createCustomerDto = {
      name: 'any_name',
      email: 'anyemail@test.com',
    };

    return request(app.getHttpServer())
      .post('/customers')
      .send(createCustomerDto)
      .expect(201)
      .then((response) => {
        expect(response.body).toMatchObject({
          name: 'any_name',
          email: 'anyemail@test.com',
          instagram: null,
          facebook: null,
        });
      });
  });

  it('should find a customer by id', async () => {
    const createCustomerDto = {
      name: 'any_name',
      email: 'anyemail@test.com',
    };

    const responseCreateCustomer = await request(app.getHttpServer())
      .post('/customers')
      .send(createCustomerDto)
      .expect(201);

    return request(app.getHttpServer())
      .get(`/customers/${responseCreateCustomer.body.id}`)
      .expect(200)
      .then((response) => {
        console.log(response.body);
        expect(response.body).toMatchObject(responseCreateCustomer.body);
      });
  });
});

describe('CustomersController (e2e) - Alternative Flow', () => {
  let app: any;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should not create a new customer if a name field is missing', () => {
    const createCustomerDto = {
      email: 'anyemail@test.com',
    };

    return request(app.getHttpServer())
      .post('/customers')
      .send(createCustomerDto)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe('Its missing the name field');
      });
  });

  it('should not create a new customer if a email field is missing', () => {
    const createCustomerDto = {
      name: 'any_name',
    };

    return request(app.getHttpServer())
      .post('/customers')
      .send(createCustomerDto)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe('Its missing the email field');
      });
  });

  it('should not find a customer by id if the id is missing', async () => {
    return request(app.getHttpServer())
      .get(`/customers/${undefined}`)
      .expect(400)
      .then((response) => {
        console.log(response.body);
        expect(response.body.message).toBe('The id was not found');
      });
  });
});

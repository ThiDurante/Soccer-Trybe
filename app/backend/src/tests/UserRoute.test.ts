import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import UserModel from '../database/models/UserModel'
import Jwt from '../classes/Jwt'

import { Response } from 'superagent';
import { Model } from 'sequelize';
import { teamsMock, usersMock } from './mocks';
// import { after, before } from 'node:test';

chai.use(chaiHttp);

const { expect } = chai;

describe('User Tests', () => {

  it('Test login invalid email', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login').send(usersMock.loginInvalidEmail);
    
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({
    message: "Invalid email or password"
  });
});

  it('Test login without field', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login').send(usersMock.loginNoEmail);
    
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({
      message: "All fields must be filled"
  });
});

  it('Test complete login', async () => {
    // sinon.stub(Model, "findOne").resolves(usersMock.completeUser as UserModel);
    // const jwtInstanceStub = sinon.createStubInstance(Jwt);
    // jwtInstanceStub.generate.resolves(usersMock.token);
    
    const chaiHttpResponse = await chai.request(app).post('/login').send(usersMock.usersToLogin[0]);
    
    // expect(jwtInstanceStub.generate.calledOnce).to.be.true;
    expect(chaiHttpResponse.status).to.be.equal(200);
    // (Model.findOne as sinon.SinonStub).restore();
  });
  // it('Test getById', async () => {
  //   sinon.stub(Model, "findOne").resolves(teamsMock[2] as TeamModel);
  //   const chaiHttpResponse = await chai.request(app).get('/teams/2');

  //   expect(chaiHttpResponse.body).to.deep.equal(teamsMock[2]);
  //   expect(chaiHttpResponse.status).to.be.equal(200);
  //   (Model.findOne as sinon.SinonStub).restore();
  // });
});

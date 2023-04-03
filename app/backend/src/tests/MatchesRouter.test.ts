import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchesModel'


import Jwt from '../classes/Jwt'

import { Response } from 'superagent';
import { Model } from 'sequelize';
import { matchCreate, matchesMock, usersMock } from './mocks';
// import { after, before } from 'node:test';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches Tests', () => {
  afterEach(()=>{
    sinon.restore();
  })
  it('Test matches getAll', async () => {
    // sinon.stub(Model, "findAll").resolves(matchesMock as unknown as MatchModel[]);

    // const chaiHttpResponse = await chai.request(app).get('/matchs');
    
    // expect(chaiHttpResponse.status).to.be.equal(200);
    // expect(chaiHttpResponse.body).to.deep.equal(matchesMock);
    // (Model.findAll as sinon.SinonStub).restore();
    const chaiHttpResponse = await chai
       .request(app).get('/matches');

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
});

  it('Test matches/:id/finished beeing false', async () => {
    const chaiHttpResponse = await chai
       .request(app).get('/matches?inProgress=false');

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
});
  it('Test matches/:id/finished being true', async () => {
    const chaiHttpResponse = await chai
       .request(app).get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
});

  it('Test matches no token', async () => {
    const chaiHttpResponse = await chai
    .request(app).patch('/matches/12/finish')
     .set('authorization', '')
     .send({
       "homeTeamGoals": 6,
       "awayTeamGoals": 2
     });
     expect(chaiHttpResponse.status).to.be.deep.equal(401);
     expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Token not found" });
  });
  it('Test matches invalid token', async () => {
    const chaiHttpResponse = await chai
    .request(app).patch('/matches/12/finish')
     .set('authorization', 'thistokenisnotvalid')
     .send({
       "homeTeamGoals": 6,
       "awayTeamGoals": 2
     });
     expect(chaiHttpResponse.status).to.be.deep.equal(401);
     expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Token must be a valid token" });
  });
  it('Test matches/:id finishing game', async () => {
    // !stub db response
    sinon.stub(Model, "update").resolves(matchCreate as any);

    const token = new Jwt().generate(usersMock.completeUserWithId)
    const chaiHttpResponse = await chai
       .request(app)
       .patch('/matches/5')
       .set('authorization', `${token}`);

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Finished" });
});
  it('Test matches create game', async () => {
    // !stub db response
    sinon.stub(Model, "create").resolves(matchCreate as any);
    const token = new Jwt().generate(usersMock.completeUserWithId)
    const chaiHttpResponse = await chai
       .request(app)
       .post('/matches')
       .send({
        homeTeamId: 16,
        awayTeamId: 8,
        homeTeamGoals: 5,
        awayTeamGoals: 6,
      })
       .set('authorization', `${token}`);

    expect(chaiHttpResponse.status).to.be.deep.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 5,
      "awayTeamId": 8,
      "awayTeamGoals": 6,
      "inProgress": true,
    });
});
 
});

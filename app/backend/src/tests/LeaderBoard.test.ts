import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel'


import { Response } from 'superagent';
import { Model } from 'sequelize';
import { teamsMock } from './mocks';
// import { after, before } from 'node:test';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team Tests', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;
  // before works, but type error, importing it from node:test breaks everything
  // beforeEach(async () => {
  //   sinon
  //     .stub(Model, "findAll")
  //     .resolves(
  //       teamsMock as TeamModel[]);
  // });
  // // same here with after
  // afterEach(()=>{
  //   (Model.findAll as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Test fullLeaderboard', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderboard');

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
  it('Test homeTeamLeaderboard', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
  it('Test awayTeamLeaderboard', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});

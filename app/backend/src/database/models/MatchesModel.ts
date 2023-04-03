import { INTEGER, Model } from 'sequelize';
import db from '.';
import Team from './TeamModel';

export default class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  homeTeamGoals: {
    type: INTEGER,
  },
  awayTeamId: {
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  awayTeamGoals: {
    type: INTEGER,
  },
  inProgress: {
    type: INTEGER,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Matches.belongsTo(Team, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});
Matches.belongsTo(Team, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

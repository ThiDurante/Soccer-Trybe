export const teamsMock = [
    {
      id: 1,
      teamName: "Avaí/Kindermann"
    },
    {
      id: 2,
      teamName: "Bahia"
    },
    {
      id: 3,
      teamName: "Botafogo"
    },
]

export const usersMock = {
  usersToLogin: [
    {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: 'secret_admin',
    }, {
      id: 2,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: 'secret_user',
    },
  ],
  loginInvalidEmail: {
    "email": "geronironimo.com",
    "password": "bananasDePijamas"
  },
  loginInvalidPassword: {
    "email": "geronimo@geronimo.com",
    "password": "ban"
  },
  loginNoEmail: {
    "password": "bananasDePijamas"
  },
  loginNoPassword: {
    "email": "geronimo@geronimo.com",
  },
  token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc",
  completeUser: {
    username: 'Fedorovics',
    role: 'admin',
    email: 'fedo@rovics.com',
    password: '123456'
  },
  completeUserWithId: {
    id: 2,
    username: 'Fedorovics',
    role: 'admin',
    email: 'fedo@rovics.com',
    password: '123456'
  }
}

export const matchesMock = [
  {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: 0,      
  },
  {
      id: 2,
      homeTeamId: 9,
      homeTeamGoals: 1,
      awayTeamId: 14,
      awayTeamGoals: 1,
      inProgress: 0,
  },
  {
      id: 3,
      homeTeamId: 4,
      homeTeamGoals: 3,
      awayTeamId: 11,
      awayTeamGoals: 0,
      inProgress: 0,
  },
]
export const matchCreate = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 5,
  awayTeamId: 8,
  awayTeamGoals: 6,
  inProgress: true,
}
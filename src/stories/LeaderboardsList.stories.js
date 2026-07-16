import LeaderboardsList from './../components/LeaderboardsList';

const meta = {
  title: 'Components/LeaderboardsList',
  component: LeaderboardsList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

const leaderboardsData = [
  {
    user: {
      id: 'users-1',
      name: 'Muhammad Ilham Fauzan',
      email: 'fauzanilham630@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=Muhammad+Ilham+Fauzan',
    },
    score: 125,
  },
  {
    user: {
      id: 'users-2',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    },
    score: 100,
  },
  {
    user: {
      id: 'users-3',
      name: 'Jane Doe',
      email: 'janedoe@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Doe',
    },
    score: 85,
  },
];

export const Default = {
  args: {
    leaderboards: leaderboardsData,
  },
};

export const SingleUser = {
  args: {
    leaderboards: [leaderboardsData[0]],
  },
};

export const Empty = {
  args: {
    leaderboards: [],
  },
};

export const LongNames = {
  args: {
    leaderboards: [
      {
        user: {
          id: 'users-4',
          name: 'Muhammad Ilham Fauzan Pakai Nama Pengguna sangat Panjang',
          email: 'muhammad.ilham.fauzan.long.email.address@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Muhammad+Ilham+Fauzan',
        },
        score: 999,
      },
      ...leaderboardsData,
    ],
  },
};
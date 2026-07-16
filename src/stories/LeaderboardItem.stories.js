import LeaderboardItem from './../components/LeaderboardItem';

const meta = {
  title: 'Components/LeaderboardItem',
  component: LeaderboardItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const FirstRank = {
  args: {
    rank: 1,
    user: {
      id: 'users-1',
      name: 'Muhammad Ilham Fauzan',
      email: 'fauzanilham630@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=Muhammad+Ilham+Fauzan',
    },
    score: 125,
  },
};

export const SecondRank = {
  args: {
    rank: 2,
    user: {
      id: 'users-2',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    },
    score: 100,
  },
};

export const LowScore = {
  args: {
    rank: 10,
    user: {
      id: 'users-10',
      name: 'New User',
      email: 'newuser@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=New+User',
    },
    score: 0,
  },
};
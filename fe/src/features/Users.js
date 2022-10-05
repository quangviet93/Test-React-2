import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk('fetchData', async () => {
  const response = await axios(
    'https://opentdb.com/api.php?amount=3&type=multiple'
  );
  return response.data.results;
});

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    // users: JSON.parse(localStorage.getItem('listUser')) || [],
    users: [],
    answer: {
      // name: {
      //   name: "",
      //   awnserPlayer: [],
      //   score: 0,
      // },
    },
    question: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.users = action.payload;
      // localStorage.setItem('listUser', JSON.stringify(state.users));
    },
    dataAnswer: (state, action) => {
      const data = action.payload;
      if (!state.answer[data.namePlayer]) {
        state.answer[data.namePlayer] = {
          namePlayer: '',
          answerPlayer: [],
          answerApi: [],
          score: 0,
          isValid: true,
        };
      }
      state.answer[data.namePlayer].namePlayer = data.namePlayer;
      state.answer[data.namePlayer].answerPlayer.push(data.answerPlayer);
      state.answer[data.namePlayer].answerApi.push(data.answerApi);
      if (data.answerPlayer === data.answerApi) {
        state.answer[data.namePlayer].score =
          state.answer[data.namePlayer].score + 1;
      }
    },
    searchPlayerName: (state, action) => {
      Object.keys(state.answer).forEach((name) => {
        if (
          action.payload.searchNamePlayer === undefined ||
          action.payload.searchNamePlayer === '' ||
          name === action.payload.searchNamePlayer
        ) {
          state.answer[name].isValid = true;
        } else {
          state.answer[name].isValid = false;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      // Add user to the state array
      state.question = action.payload;
    });
  },
});

export const { addUser, addMatch, dataAnswer, searchPlayerName } =
  userSlice.actions;
export default userSlice.reducer;

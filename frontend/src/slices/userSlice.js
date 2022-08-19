import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import userService from '../services/userService';

const initialState = {
  user: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// funções
export const profile = createAsyncThunk(
  'user/profile',
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.profile(user, token);

    return data;
  },
);

export const updateProfile = createAsyncThunk(
  'user/update',
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.updateProfile(user, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        // se a req estiver pendente
        state.loading = true;
        state.error = false;
      })
      .addCase(profile.fulfilled, (state, action) => {
        // se a req for executada com sucesso, passando o estado e uma ação
        state.loading = false;
        state.error = null;
        state.success = true; // definem os estados
        state.user = action.payload; // define a ação
      })
      .addCase(updateProfile.pending, (state) => {
        // se a req estiver pendente
        state.loading = true;
        state.error = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        // se a req for executada com sucesso, passando o estado e uma ação
        state.loading = false;
        state.error = null;
        state.success = true; // definem os estados
        state.user = action.payload; // define a ação
        state.message = 'Usuário atualizado com sucesso!'; // define a mensagem de sucesso
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // pega o erro
        state.user = {}; // nao tem usuário, então ele é anulado
      });
  },
});

export const { resetMessage } = userSlice.actions;

export default userSlice.reducer;

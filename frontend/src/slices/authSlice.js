import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authService from '../services/authService';

// slice serve para gerenciar os estados

const user = JSON.parse(localStorage.getItem('user')); // Busca o token do usuário salvo no local storage, se houver

const initialState = {
  // estados iniciais
  user: user ? user : null, // se houver pega o user, se não null
  error: false,
  success: false,
  loading: false,
};

// Registrar um usuário e entrar (register & sign in)
export const register = createAsyncThunk(
  'auth/register', // 1° argumento: Nome da função (Entidade(auth) e ação(register) por convenção)
  async (user, thunkAPI) => {
    // 2° argumento: Função
    const data = await authService.register(user); // Tenta fazer o cadastro do usuário passado pelo formulário enviado, utilizando a função authService

    // Checagem de erros
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]); // Se der erro, irá retornar o primeiro item do array de erros
    }

    return data; // Se funcionar, irá retornar o usuário cadastrado
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const login = createAsyncThunk(
  'auth/login', // 1° argumento: Nome da função (Entidade(auth) e ação(login) por convenção)
  async (user, thunkAPI) => {
    // 2° argumento: Função
    const data = await authService.login(user); // Tenta fazer o cadastro do usuário passado pelo formulário enviado, utilizando a função authService

    // Checagem de erros
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]); // Se der erro, irá retornar o primeiro item do array de erros
    }

    return data; // Se funcionar, irá retornar o usuário cadastrado
  },
);

export const authSlice = createSlice({
  // cria o slice
  name: 'auth', // nome pelo qual ele será chamado no store
  initialState, // estado inicial
  reducers: {
    // reducers
    reset: (state) => {
      // reseta todos os estados
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // execuções da API, trabalhando com o estado atual de cada requisição
    builder
      .addCase(register.pending, (state) => {
        // se a req estiver pendente
        state.loading = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        // se a req for executada com sucesso, passando o estado e uma ação
        state.loading = false;
        state.error = null;
        state.success = true; // definem os estados
        state.user = action.payload; // define a ação
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // pega o erro
        state.user = null; // nao tem usuário, então ele é anulado
      })
      .addCase(logout.fulfilled, (state) => {
        // se a req for executada com sucesso, passando o estado e uma ação
        state.loading = false;
        state.error = null;
        state.success = true; // definem os estados
        state.user = null; // define a ação
      })
      .addCase(login.pending, (state) => {
        // se a req estiver pendente
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        // se a req for executada com sucesso, passando o estado e uma ação
        state.loading = false;
        state.error = null;
        state.success = true; // definem os estados
        state.user = action.payload; // define a ação
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // pega o erro
        state.user = null; // nao tem usuário, então ele é anulado
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

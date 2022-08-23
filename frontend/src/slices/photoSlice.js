import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import photoService from '../services/photoService';

const initialState = {
  photos: [],
  photo: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// publicar foto de usuario

export const publishPhoto = createAsyncThunk(
  'photo/publish',
  async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.publishPhoto(photo, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  },
);

// receber fotos do usuário
export const getUserPhotos = createAsyncThunk(
  'photo/userphotos',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.getUserPhotos(id, token);

    return data;
  },
);

// deletar foto
export const deletePhoto = createAsyncThunk(
  'photo/delete',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.deletePhoto(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  },
);

// editar foto
export const updatePhoto = createAsyncThunk(
  'photo/update',
  async (photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.updatePhoto(
      { title: photoData.title },
      photoData.id,
      token,
    );

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  },
);

// foto por id
export const getPhoto = createAsyncThunk(
  'photo/getphoto',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.getPhoto(id, token);

    return data;
  },
);
// like
export const like = createAsyncThunk('photo/like', async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;
  const data = await photoService.like(id, token);

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});
export const dislike = createAsyncThunk(
  'photo/dislike',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.like(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  },
);

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        // se a req estiver pendente
        state.loading = true;
        state.error = false;
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        // se a req for executada com sucesso, passando o estado e uma ação
        state.loading = false;
        state.error = null;
        state.success = true; // definem os estados
        state.photo = action.payload; // define a ação
        state.photos.unshift(state.photo); // o método unshift traz o elemento para o primeiro do array, neste caso define a foto adicionada como a primeira do array de fotos
        state.message = 'Foto publicada com sucesso!';
      })
      .addCase(publishPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // pega o erro
        state.photo = {}; // define a foto como um objeto vazio para previnir erros
      })
      .addCase(getUserPhotos.pending, (state) => {
        // se a req estiver pendente
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
        // se a req for executada com sucesso, passando o estado e uma ação
        state.loading = false;
        state.error = null;
        state.success = true; // definem os estados
        state.photos = action.payload; // define a ação
      })
      .addCase(deletePhoto.pending, (state) => {
        // se a req estiver pendente
        state.loading = true;
        state.error = false;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        // se a req for executada com sucesso, passando o estado e uma ação
        state.loading = false;
        state.error = null;
        state.success = true; // definem os estados
        state.photos = state.photos.filter((photo) => {
          return photo._id !== action.payload.id;
        });
        state.message = action.payload.message;
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // pega o erro
        state.photo = {}; // define a foto como um objeto vazio para previnir erros
      })
      .addCase(updatePhoto.pending, (state) => {
        // se a req estiver pendente
        state.loading = true;
        state.error = false;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        // se a req for executada com sucesso, passando o estado e uma ação
        state.loading = false;
        state.error = null;
        state.success = true; // definem os estados
        state.photos.map((photo) => {
          if (photo._id === action.payload.photo._id) {
            return (photo.title = action.payload.photo.title);
          }
          return photo;
        });
        state.message = action.payload.message;
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // pega o erro
        state.photo = {}; // define a foto como um objeto vazio para previnir erros
      })
      .addCase(getPhoto.pending, (state) => {
        // se a req estiver pendente
        state.loading = true;
        state.error = false;
      })
      .addCase(getPhoto.fulfilled, (state, action) => {
        // se a req for executada com sucesso, passando o estado e uma ação
        state.loading = false;
        state.error = null;
        state.success = true; // definem os estados
        state.photo = action.payload; // define a ação
      })
      .addCase(like.fulfilled, (state, action) => {
        // se a req for executada com sucesso, passando o estado e uma ação
        state.loading = false;
        state.error = null;
        state.success = true; // definem os estados

        if (state.photos.likes) {
          state.photo.likes.push(action.payload.userId);
        }

        state.photos.map((photo) => {
          if (photo._id === action.payload.photoId) {
            return photo.likes.push(action.payload.userId);
          }
          return photo;
        });

        state.message = action.payload.message;
      })
      .addCase(like.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // pega o erro
      })
      .addCase(dislike.fulfilled, (state, action) => {
        // se a req for executada com sucesso, passando o estado e uma ação
        state.loading = false;
        state.error = null;
        state.success = true; // definem os estados

        console.log(state.photos.likes);
        if (state.photos.likes) {
          state.photo.likes.filter((user) => user !== action.payload.userId);
        }

        // state.photos.map((photo) => {
        //   if (photo._id === action.payload.photoId) {
        //     return photo.likes.push(action.payload.userId);
        //   }
        //   return photo;
        // });

        // state.message = action.payload.message;
      })
      .addCase(dislike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // pega o erro
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;

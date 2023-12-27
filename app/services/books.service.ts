import axios from 'axios';

export const getAllBooks = async () => {
  try {
    const response = await axios.get('http://localhost:3001/books');
    return response.data;
  } catch (e) {
    return e;
  }
};

export const deleteBook = async (id: number) => {
  try {
    await axios.delete(`http://localhost:3001/books/${id}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const addNewBook = async (data: Record<string, any>) => {
  try {
    await axios.post('http://localhost:3001/books', data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const updateBook = async (id: number, data: Record<string, any>) => {
  try {
    await axios.put(`http://localhost:3001/books/${id}`, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

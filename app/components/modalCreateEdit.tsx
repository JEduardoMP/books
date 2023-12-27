'use client';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { addNewBook, updateBook } from '../services/books.service';

interface ModalCreateEditProps {
  isModalOpen: boolean;
  handleModalClose: () => void;
  bookData?: Record<string, any>;
  setBooks: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
}

const ModalCreateEdit: FC<ModalCreateEditProps> = ({
  isModalOpen,
  handleModalClose,
  bookData,
  setBooks,
}) => {
  const [inputs, setInputs] = useState({
    title: '',
    author: '',
    inStock: false,
  });

  const [requiredFields, setRequiredFields] = useState({
    title: false,
    author: false,
  });

  useEffect(() => {
    const inputFields = {
      title: bookData?.title ?? '',
      author: bookData?.author ?? '',
      inStock: !!bookData?.inStock ?? false,
    };
    setInputs(inputFields);
  }, [bookData]);

  const handleCreateEdit = async () => {
    const values: any = {
      title: false,
      author: false,
    };
    Object.entries(inputs).forEach(([key, val]) => {
      if (val === '') {
        values[key] = true;
      }
    });
    if (Object.values(values).every((val) => !val)) {
      if (!bookData) {
        await addNewBook(inputs);
        setBooks((prev) => [...prev, inputs]);
      } else {
        await updateBook(bookData.id, inputs)
        setBooks((prev) => prev.map(book => {
          if (book.id === bookData.id) {
            return {
              id: bookData.id,
              title: inputs.title,
              author: inputs.author,
              inStock: inputs.inStock,
            };
          }
          return book;
        }));
      }
      handleModalClose();
    } else {
      setRequiredFields(values);
    }
  };

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === 'inStock' ? e.target.checked : e.target.value,
    }));
  };

  return (
    <Dialog open={isModalOpen} onClose={handleModalClose}>
      <DialogTitle className='pb-0'>Create New Book</DialogTitle>
      <DialogContent className='!pt-6'>
        <TextField
          error={requiredFields.title}
          helperText={requiredFields.title && 'This is a required field'}
          name='title'
          onChange={handleInputs}
          value={inputs.title}
          required
          label='Book Title'
          fullWidth
        />
        <TextField
          error={requiredFields.author}
          helperText={requiredFields.author && 'This is a required field'}
          required
          className='mt-4'
          value={inputs.author}
          onChange={handleInputs}
          name='author'
          label='Author'
          fullWidth
        />
        <Checkbox
          name='inStock'
          onChange={handleInputs}
          checked={inputs.inStock}
        />{' '}
        Available
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose}>Cancel</Button>
        <Button color='primary' onClick={handleCreateEdit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCreateEdit;

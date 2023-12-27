'use client';
import React, { FC, useState } from 'react';
import {
  IconButton,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Button,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteBook } from '../services/books.service';
import ModalCreateEdit from './modalCreateEdit';

interface Props {
  books?: Record<string, any>[];
}

const BooksList: FC<Props> = ({ books: booksProps }) => {
  const [books, setBooks] = useState(booksProps || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookData, setBookData] = useState<Record<string, any> | undefined>(
    undefined
  );

  const handleDelete = async (id: number) => {
    const wasDeleted = await deleteBook(id);
    if (wasDeleted) {
      setBooks((prev) => [...prev].filter((book) => book.id !== id));
    }
  };

  const handleEdit = (book: Record<string, any>) => {
    setBookData(book);
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setBookData(undefined);
    setIsModalOpen(true);
  };

  return (
    <>
      <ModalCreateEdit
        isModalOpen={isModalOpen}
        handleModalClose={() => setIsModalOpen(false)}
        bookData={bookData}
        setBooks={setBooks}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Button
            onClick={handleCreateNew}
            className='bg-green-600 w-full'
            variant='contained'
            color='success'
          >
            Create new
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell className='font-bold'>Books</TableCell>
                  <TableCell className='font-bold'>Author</TableCell>
                  <TableCell className='font-bold'>Available</TableCell>
                  <TableCell align='right'></TableCell>
                  <TableCell align='right'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books?.map((book) => (
                  <TableRow
                    key={book.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {book.title}
                    </TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>
                      <Checkbox disabled checked={book.inStock} />
                    </TableCell>
                    <TableCell width={100} align='right'>
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        color='error'
                        onClick={() => handleDelete(book.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell width={100} align='right'>
                      <IconButton
                        edge='end'
                        aria-label='edit'
                        color='primary'
                        onClick={() => handleEdit(book)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default BooksList;

import { Container, Grid } from '@mui/material';
import BooksList from './components/booksList';
import { getAllBooks } from './services/books.service';

const Books = async () => {
  const books: Record<string, any>[] | any = await getAllBooks();
  return (
    <Container className='py-6'>
      <Grid container spacing={2}>
        <Grid item>
          <h1 className='text-2xl font-bold'>List of Books</h1>
        </Grid>
        <Grid item xs={12}>
          <BooksList books={books} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Books;

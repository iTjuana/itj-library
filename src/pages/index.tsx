import { Box, CircularProgress, Container, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { type NextPage } from "next";
import { api } from "utils/trpc";
import { SimpleCarousel } from "~/components/carousel";

const Home: NextPage = () => {
  const books = api.books.getCarrouselBooks.useQuery();

  return (
    <>
    <main className="bg-[#F7F8FC]">
      <br/>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', marginBottom: 4}}>
        Books
      </Typography>
        {books.isLoading ? (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        ) : !books.data?.length ? (
          <></>
        ) : (
          <SimpleCarousel
            books={books.data.map((book) => ({
              title: book.title,
              image: book.image,
              isbn: book.isbn,
            }))}
          />
        )}
        {/* Instructions */}
        <Typography variant="h4" align="center" sx={{marginBottom: 2}}>
          Instructions
        </Typography>
        <Container maxWidth="md" sx={{marginBottom: 3}}>
          <Box sx={{ bgcolor: 'white', padding: 2}}>
            <Typography sx={{ fontWeight: 'bold'}}>
              To borrow
            </Typography>

            <List sx={{ listStyle: "decimal", pl: 4 }}>
              <ListItem sx={{ display: "list-item" }}>
                <ListItemText
                primary="
                Visit the online library website.
                "/>
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                <ListItemText 
                primary="
                Log in or create an account.
                "/>
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                <ListItemText 
                primary="
                Once you are logged in, browse the library catalog to find the
                book you want to borrow.
                "/>
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                <ListItemText 
                primary="
                Click on the book title to view its details. Look for the
                availability status, which will indicate if the book is
                currently available for borrowing.
                "/>
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                <ListItemText 
                primary="
                If the book is available, click on the option to borrow or add
                it to your borrowing list.
                "/>
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                <ListItemText 
                primary="
                Once you have selected the book, you will receive a due date for
                returning the book. Take note of this date, as it will determine
                when you need to return the book to the library. The due date is
                usually displayed in your account or can be sent to you via
                email.
                "/>
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                <ListItemText 
                primary="
                With the book successfully borrowed, you can start reading and
                enjoying it during the borrowing period.
                "/>
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                <ListItemText 
                primary="
                Return the book on time.
                "/>
              </ListItem>
            </List>
          </Box>
        </Container>
        <Container maxWidth="md">
          <Box sx={{ bgcolor: 'white', padding: 2}}>
            <Typography sx={{ fontWeight: 'bold'}}>
              To Donate
            </Typography>
            <List sx={{ listStyle: "decimal", pl: 4 }}>
              <ListItem sx={{ display: "list-item" }}>
                <ListItemText 
                primary="
                Visit the online library website.
                "/>
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                <ListItemText 
                primary="
                In the contact section, search for Melissa Lira's name or look 
                for a specific department or person responsible for handling 
                donations.
                "/>
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                <ListItemText 
                primary="
                Open your email client or use the contact form provided on 
                the website to compose a message.
                "/>
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                <ListItemText 
                primary="
                In the message, state that you would like to donate a book to the 
                library. Provide a brief description of the book, including the 
                title, author, and any other relevant details.
                "/>
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                <ListItemText 
                primary="
                Send the message, and patiently wait for a response from Melissa Lira 
                or the library staff. They will likely contact you to discuss the 
                book donation further, provide any necessary instructions, or express 
                their gratitude for your generosity.
                "/>
              </ListItem>
            </List>
          </Box>
        </Container>
        <br/>
        </main>
    </>
  );
};

export default Home;

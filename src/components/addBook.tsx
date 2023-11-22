import { api } from "utils/trpc";

const addBook = () => {
    const bookInfo = api.books.getBookInfoByIsbn.useQuery("978-8420473352"); 
    console.log(bookInfo)
};

export default addBook;
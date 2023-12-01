const sheetdb = require("sheetdb-node");
const address: any = 'https://sheetdb.io/api/v1/'; // ask for token @fabian
const client: any = sheetdb({ address: address });
import { Format, Language, Status, Condition } from "utils/enum";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type BookOpenlibrary = {
    publish_date: string;
    title: string;
    subtitle: string;
    description: string;
    authors: [{ url: string; name: string }];
    number_of_pages: number;
    publishers: [{ name: string }];
    subjects: [{ name: string; url: string }];
    cover: { small: string; medium: string; large: string };
}

type CsvBook = {
    ID_ISBN_BOOK: string;
    ISBN: string;
    TITLE: string;
    SUBTITLE: string;
    DESCRIPTION: string;
    LANGUAGE: string;
    AUTHORS: string;
    SUBJECTS: string;
    PUBLISHDATE: string;
    PUBLISHERS: string;
    NUMBER_OF_PAGES: number;
    IMAGE: string;
    ID_INVENTORY: string;
    BOOK_ID: string;
    STATUS: string;
    FORMAT: string;
    CONDITION: string;
    OWNER: string;
    DATE_ADDED: string;
    LAST_UPDATE: string;
}

type BookStructure = {
    isbn: string;
    title: string;
    subtitle: string;
    description: string;
    language: number;
    authors: string;
    subjects: string;
    publishDates: string;
    publishers: string;
    numberOfPages: number;
    image: string;
}

type InventoryStructure = {
    bookId: string,
    status: number,
    format: number,
    condition: number,
    bookOwner: string,
    dateAdded: Date,
}

type SheetBooks = Array<CsvBook>;

type ApiResponse = {
    [key: string]: BookOpenlibrary;
}

const description: string = `
  Explore a diverse collection of knowledge generously donated by ITJUANA's talented employees. 
  While some books may not have a specific topic description, each one holds the potential to 
  surprise and enlighten. Discover hidden gems and broaden your horizons as you delve into the 
  pages of these literary contributions from our vibrant community.
`;

function getCode(value: string, dataMapping: any): number {
    if (value in dataMapping) {
        return dataMapping[value];
    } else {
        return dataMapping['Other'];
    }
}

async function addBooks(bookDataPrivate: BookStructure, inventoryDataPrivate: InventoryStructure) {
    const responseBook = await prisma.book.create({
        data: bookDataPrivate
    });
    const bookID: string = responseBook.id;
    inventoryDataPrivate.bookId = bookID;
    const responseInventory = await prisma.inventory.create({
        data: inventoryDataPrivate
    });
    console.log('Data uploaded successfully')
}

async function fetchData(sheetBook: CsvBook): Promise<ApiResponse | undefined> {
    try {
        const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${sheetBook.ISBN}&jscmd=data&format=json`);
        const data: ApiResponse | undefined = await response.json() as ApiResponse;

        if (data) {
            return data;
        } else {
            console.error('Book not found')
            return undefined;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function readSheet(): Promise<SheetBooks | undefined> {
    try {
        const response = await fetch(`${address}?&sheet=Sheet1`);
        const data = await response.json() as SheetBooks;
        if (data) {
            return data;
        } else {
            console.error('No Books')
            return undefined;
        }

    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}

function updateData(sheetBook: CsvBook, data: ApiResponse) {
    const book: BookOpenlibrary | undefined = data['ISBN:' + sheetBook.ISBN] as BookOpenlibrary;
    client.update('ISBN', sheetBook.ISBN, {
        'TITLE': sheetBook.TITLE || (book?.title || ''),
        'SUBTITLE': sheetBook.SUBTITLE || (book?.subtitle || ''),
        'DESCRIPTION': sheetBook.DESCRIPTION || (book?.description || ''),
        'SUBJECTS': sheetBook.SUBJECTS || ((book?.subjects?.map(subject => subject.name).join(', ') || '')),
        'AUTHORS': sheetBook.AUTHORS || ((book?.authors?.map(author => author.name).join(', ') || '')),
        'PUBLISHDATE': sheetBook.PUBLISHDATE || (book?.publish_date || ''),
        'PUBLISHERS': sheetBook.PUBLISHERS || ((book?.publishers?.map(publisher => publisher.name).join(', ') || '')),
        'NUMBER_OF_PAGES': sheetBook.NUMBER_OF_PAGES || (book?.number_of_pages || 0),
        'IMAGE': sheetBook.IMAGE || (book?.cover?.large || (book?.cover?.medium || '')),
    }, 'Sheet1').then(
        (data: any) => {
            console.log(data);
        },
        (err: any) => {
            console.log(err);
        }
    );
}

function bookExists(isbn: string): Promise<boolean> {
    return prisma.book
        .findFirst({
            where: {
                isbn: isbn
            },
        })
        .then((foundBook) => {
            return !!foundBook;
        })
        .catch((error) => {
            throw error;
        });
}

function fetchBooks() {
    readSheet().then((csvdata) => {
        if (csvdata) {
            csvdata.map(function (sheetBook) {
                if (sheetBook.ISBN) {
                    bookExists(sheetBook.ISBN)
                        .then((exists) => {
                            if (exists == false) {
                                fetchData(sheetBook).then((data) => {
                                    if (data) {
                                        updateData(sheetBook, data);
                                    }
                                    else {
                                        console.log('Book not found or error occurred');
                                    }
                                }).catch((error) => {
                                    console.error('Error in fetch:', error)
                                });
                            }
                            else {
                                console.log('Book already exists in the database. Skipping update/fetch data process...')
                            }
                        })
                        .catch((error) => {
                            console.error('Error checking book existence:', error);
                        })
                }
                else {
                    console.log('Book without ISBN');
                }
            })
        }
        else {
            console.log('No data');
        }
    }).catch((error) => {
        console.error('Error in read:', error);
    });
}

function uploadBooks() {
    readSheet().then((csvdata) => {
        if (csvdata) {
            csvdata.map(function (sheetBook) {
                if (sheetBook.ISBN) {
                    bookExists(sheetBook.ISBN)
                        .then((exists) => {
                            if (exists == false) {
                                const bookDataPrivate: BookStructure = {
                                    isbn: sheetBook.ISBN,
                                    title: sheetBook.TITLE || 'No title',
                                    subtitle: sheetBook.SUBTITLE || '',
                                    description: sheetBook.DESCRIPTION || description,
                                    language: sheetBook.LANGUAGE ? getCode(sheetBook.LANGUAGE, Language) : getCode('Other', Language),
                                    authors: sheetBook.AUTHORS || 'Unknown Author',
                                    subjects: sheetBook.SUBJECTS || 'Unknown Subject',
                                    publishDates: sheetBook.PUBLISHDATE || 'Unknown Publish Date',
                                    publishers: sheetBook.PUBLISHERS || 'Unknown Publisher',
                                    numberOfPages: sheetBook.NUMBER_OF_PAGES ? Number(sheetBook.NUMBER_OF_PAGES) : 0,
                                    image: sheetBook.IMAGE || 'https://www.mobileread.com/forums/attachment.php?attachmentid=111307&d=1378926764'
                                }

                                const inventoryDataPrivate: InventoryStructure = {
                                    bookId: "", // This data will be added once we add the book
                                    status: sheetBook.STATUS ? getCode(sheetBook.STATUS, Status) : getCode('Other', Status),
                                    format: sheetBook.FORMAT ? getCode(sheetBook.FORMAT, Format) : getCode('Other', Format),
                                    condition: sheetBook.CONDITION ? getCode(sheetBook.CONDITION, Condition) : getCode('Other', Condition),
                                    bookOwner: sheetBook.OWNER || 'Anonymous',
                                    dateAdded: new Date(),
                                }

                                try {
                                    addBooks(bookDataPrivate, inventoryDataPrivate);
                                }
                                catch (error) {
                                    console.error('Error uploading data:', error);
                                }
                            }
                            else {
                                console.log('Book already exists in the database. Skipping upload process...')
                            }
                        })
                        .catch((error) => {
                            console.error('Error checking book existence:', error);
                        })
                }
                else {
                    console.log('Book without ISBN');
                }
            })
        }
        else {
            console.log('No data');
        }
    }).catch((error) => {
        console.error('Error in read:', error);
    });
}

function main() {
    fetchBooks();
    uploadBooks();
}

main();
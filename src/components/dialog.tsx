/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from 'react';
import * as React from 'react';
import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from '@mui/material/Autocomplete';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { Format, Language, Status, Condition, enumObjToAutocompleteItem } from "utils/enum";
import { api } from "utils/trpc";


// Interfaces for autocomplete component, they need {value, label} format in order to work correctly
export interface AutocompleteInterface {
  value: number;
  label: string;
}

// Options for status, format, language and condition (Autocomplete component)
const statusOptions: AutocompleteInterface[] = enumObjToAutocompleteItem(Status);
const formatOptions: AutocompleteInterface[] = enumObjToAutocompleteItem(Format);
const languageOptions: AutocompleteInterface[] = enumObjToAutocompleteItem(Language);
const conditionOptions: AutocompleteInterface[] = enumObjToAutocompleteItem(Condition);

type responseStructure = {
  success: boolean,
  message: string,
}

type bookStructure = {
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
};

type inventoryStructure = {
  bookId: string,
  status: number,
  format: number,
  condition: number,
  bookOwner: string,
  tagId: string,
  ownerNote: string,
  isDonated: boolean,
  dateAdded: Date,
};

type excelStructure = {
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
  bookId: string;
  status: number;
  format: number;
  condition: number;
  bookOwner: string;
  tagId: string;
  ownerNote: string;
  isDonated: boolean;
  dateAdded: Date;
};

const optionsIsDonated = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


// Main Function (FormDialog)
export default function FormDialog({textButton} : { textButton: string; }) {
  const [open, setOpen] = useState(false);
  const [bookData, setBookData] = useState({
    isbn: "",
    title: "",
    subtitle: "",
    description: "",
    language: 0,
    numberOfPages: "0",
    image: "",
  });

  const [inventoryData, setInventoryData] = useState({
    bookId: "",
    status: 0,
    format: 0,
    condition: 0,
    bookOwner: "",
    tagId: "",
    ownerNote: "",
    isDonated: false,
    dateAdded: new Date(),
  });
  
  const [file, setFile] = useState<File>();
  const [textPublishDates, setTextPublishDates] = useState<Dayjs | null>(dayjs());
  const [objectAuthors, setObjectAuthors] = useState([{ authorName: "" }]);
  const [objectPublishers, setObjectPublishers] = useState([{ publisherName: "" }]);
  const [objectSubjects, setObjectSubjects] = useState([{ subjectName: "" }]);
  const [textDateAdded, setDateAdded] = useState<Dayjs | null>(dayjs());
  const [alertData, setAlertData] = useState({
    type: '',
    message: ''
  });

  const addBook = api.books.addBook.useMutation();

  const getInitState = () => {
    setBookData({
      isbn: "",
      title: "",
      subtitle: "",
      description: "",
      language: 0,
      numberOfPages: "0",
      image: "",
    });
    setInventoryData({
      bookId: "",
      status: 0,
      format: 0,
      condition: 0,
      bookOwner: "",
      tagId: "",
      ownerNote: "",
      isDonated: false,
      dateAdded: new Date(),
    });
    setTextPublishDates(dayjs());
    setObjectAuthors([{ authorName: "" }]);
    setObjectPublishers([{ publisherName: "" }]);
    setObjectSubjects([{ subjectName: "" }]);
    setDateAdded(dayjs());
  }
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
    const selectedFile = event.target.files?.[0]!;
    // Read excel file content
    const reader = new FileReader();
    reader.readAsBinaryString(selectedFile);
    reader.onload = async (e) => {
      if(e !== null && e.target !== null) {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary"});
        const sheetName = workbook.SheetNames[0] == undefined ? "Books" : workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet || {});
        
        // Iterate Books
        for(const book of json as excelStructure[]){ 
          const bookDataPrivate: bookStructure = {
            isbn: book.isbn,
            title: book.title,
            subtitle: book.subtitle,
            description: book.description,
            language: book.language,
            authors: book.authors,
            subjects: book.subjects,
            publishDates: book.publishDates,
            publishers: book.publishers,
            numberOfPages: book.numberOfPages,
            image: book.image
          }
      
          const InventoryDataPrivate: inventoryStructure = {
            bookId: "", // This data will be added once we add the book
            status: book.status,
            format: book.format,
            condition: book.condition,
            bookOwner: book.bookOwner,
            tagId: inventoryData.tagId,
            ownerNote: inventoryData.ownerNote,
            isDonated: inventoryData.isDonated,
            dateAdded: new Date(),
          }
          
          const response: responseStructure = await addBook.mutateAsync({
            inventoryData: InventoryDataPrivate,
            bookData: bookDataPrivate
          })
        // Finish iteration
        }
        handleClose();
      }
    }
    setFile(selectedFile || null)
  };

  const handleAddInputAuthor = () => {
    setObjectAuthors([...objectAuthors, { authorName: "" }]);
  };

  const handleAddInputPublisher = () => {
    setObjectPublishers([...objectPublishers, { publisherName: "" }]);
  };

  const handleAddInputSubject = () => {
    setObjectSubjects([...objectSubjects, { subjectName: "" }]);
  };

  const handleDeleteInputAuthor = (index: number) => {
    const newArrayObjects = [...objectAuthors];
    newArrayObjects.splice(index, 1);
    setObjectAuthors(newArrayObjects);
  };

  const handleDeleteInputPublisher = (index: number) => {
    const newArrayObjects = [...objectPublishers];
    newArrayObjects.splice(index, 1);
    setObjectPublishers(newArrayObjects);
  };

  const handleDeleteInputSubject= (index: number) => {
    const newArrayObjects = [...objectSubjects];
    newArrayObjects.splice(index, 1);
    setObjectSubjects(newArrayObjects);
  };

  const handleChangeAuthor = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const authorName  = event.target.value;
    const onChangeValue = [...objectAuthors];
    onChangeValue[index]!.authorName = authorName;
    setObjectAuthors(onChangeValue);
  };

  const handleChangePublisher = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const publisherName  = event.target.value;
    const onChangeValue = [...objectPublishers];
    onChangeValue[index]!.publisherName = publisherName;
    setObjectPublishers(onChangeValue);
  };

  const handleChangeSubject = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const subjectName  = event.target.value;
    const onChangeValue = [...objectSubjects];
    onChangeValue[index]!.subjectName = subjectName;
    setObjectSubjects(onChangeValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    getInitState();
    setAlertData({
      type: '',
      message: ''
    });
  };

  // const objectToCommaSeparatedString = (object: object[], attribute: string) => {
  //   let stringCommaSeparated = "";
  //   object.forEach((element: any) => {
  //     stringCommaSeparated += element[`${attribute}`] as string + ",";
  //   });
  //   stringCommaSeparated = stringCommaSeparated.slice(0, -1);
  //   return stringCommaSeparated;
  // }

  function ShowAlert(){
    if (alertData.type == 'success') {
      return <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                {alertData.message}
              </Alert>;
    }
    else if(alertData.type == 'failure'){
      return <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {alertData.message}
      </Alert>
    }
    else{
      return <></>;
    }
  }
  
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const authorString = objectAuthors.map(s => s.authorName).toString();
    const publisherString = objectPublishers.map(s => s.publisherName).toString();
    const subjectString = objectSubjects.map(s => s.subjectName).toString();

    const bookDataPrivate: bookStructure = {
      isbn: bookData.isbn,
      title: bookData.title,
      subtitle: bookData.subtitle,
      description: bookData.description,
      language: bookData.language,
      authors: authorString,
      subjects: subjectString,
      publishDates: textPublishDates!.toISOString(),
      publishers: publisherString,
      numberOfPages: Number(bookData.numberOfPages),
      image: bookData.image
    }

    const InventoryDataPrivate: inventoryStructure = {
      bookId: "", // This data will be added once we add the book
      status: inventoryData.status,
      format: inventoryData.format,
      condition: inventoryData.condition,
      bookOwner: inventoryData.bookOwner,
      tagId: inventoryData.tagId,
      ownerNote: inventoryData.ownerNote,
      isDonated: inventoryData.isDonated,
      dateAdded: new Date(),
    }
    
    const response: responseStructure = await addBook.mutateAsync({
      inventoryData: InventoryDataPrivate,
      bookData: bookDataPrivate
    })
    
    if(response.success == true){
      setAlertData({
        type: 'success',
        message: response.message
      })
      getInitState();
    }else{
      setAlertData({
        type: 'failure',
        message: response.message
      })
    }
  }

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        {textButton}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box component="form" autoComplete="off" onSubmit={ (e) => void onSubmit(e)}>
          <DialogTitle sx={{ fontWeight: 'bold' }}>{textButton} Book</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            <ShowAlert/>
              <Divider />
              </Grid>
              <Grid item xs={6}>
                <TextField id="isbn" label="ISBN" variant="outlined"  value = {bookData?.isbn} onChange = {(e) => setBookData({...bookData, isbn: e.target.value}) } fullWidth required />
              </Grid>
              <Grid item xs={6}>
                <TextField id="title" label="Title" variant="outlined" value = {bookData?.title} onChange = {(e) => setBookData({...bookData, title: e.target.value}) } fullWidth required />
              </Grid>
              <Grid item xs={6}>
                <TextField id="subtitle" label="Subtitle" variant="outlined" value = {bookData?.subtitle} onChange = {(e) => setBookData({...bookData, subtitle: e.target.value}) } fullWidth />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  disablePortal
                  id="combo-box-language"
                  options={languageOptions}
                  onChange = {(e,item) => { setBookData({...bookData, language: Number(item?.value)}) }}
                  renderInput={(params) => <TextField {...params} label="Language" required/>}
                />
              </Grid>
              {/* Authors Dynamic Input */}
              {objectAuthors.map((item, index) => (
                <>
                  <Grid item xs={6}>
                    <TextField label={`Author ${index + 1}`} variant="outlined" value = {item.authorName} onChange={(event) => handleChangeAuthor(event, index)} fullWidth /> 
                  </Grid>
                  <Grid item xs={6}>
                    {objectAuthors.length > 1 && (
                      <IconButton aria-label="Delete Author" onClick={() => handleDeleteInputAuthor(index)}>
                          <DeleteIcon/>
                      </IconButton>
                    )}
                    {index === objectAuthors.length - 1 && (
                      <IconButton aria-label="Add Author" onClick={() => handleAddInputAuthor()}>
                          <AddCircleIcon />
                      </IconButton>
                    )}
                  </Grid>
                </>
              ))}
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                  label="Publish Date" 
                  value = {textPublishDates} 
                  onChange = {(e) => setTextPublishDates(e)}    
                  slotProps={{
                  textField: {
                    id: 'publishDates',
                  },
                  }}/>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <TextField type="number" id="numberOfPages" label="Number Of Pages" variant="outlined" value = { bookData?.numberOfPages } onChange = {(e) => setBookData({...bookData, numberOfPages: e.target.value}) } fullWidth /> 
              </Grid>
              <Grid item xs={12}>
                <TextField
                id="description"
                label="Description"
                multiline
                minRows={2}
                maxRows={3}
                value = {bookData?.description} onChange = {(e) => setBookData({...bookData, description: e.target.value})}
                fullWidth
                />
              </Grid>
              {/* Publisher Dynamic Input */}
              {objectPublishers.map((item, index) => (
                <>
                  <Grid item xs={6}>
                    <TextField label={`Publisher ${index + 1}`} variant="outlined" value = {item.publisherName} onChange={(event) => handleChangePublisher(event, index)} fullWidth /> 
                  </Grid>
                  <Grid item xs={6}>
                    {objectPublishers.length > 1 && (
                      <IconButton aria-label="Delete Publisher" onClick={() => handleDeleteInputPublisher(index)}>
                          <DeleteIcon/>
                      </IconButton>
                    )}
                    {index === objectPublishers.length - 1 && (
                      <IconButton aria-label="Add Publisher" onClick={() => handleAddInputPublisher()}>
                          <AddCircleIcon />
                      </IconButton>
                    )}
                  </Grid>
                </>
              ))}
              <Grid item xs={6}>
                <Autocomplete
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  disablePortal
                  id="combo-box-status"
                  options={statusOptions}
                  onChange = {(e,item) => { setInventoryData({...inventoryData, status: Number(item?.value)}) }}
                  renderInput={(params) => <TextField {...params} label="Status" required/>}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  disablePortal
                  id="combo-box-format"
                  options={formatOptions}
                  onChange = {(e,item) => { setInventoryData({...inventoryData, format: Number(item?.value)}) }}
                  renderInput={(params) => <TextField {...params} label="Format" required/>}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  disablePortal
                  id="combo-box-condition"
                  options={conditionOptions}
                  onChange = {(e,item) => { setInventoryData({...inventoryData, condition: Number(item?.value)}) }}
                  renderInput={(params) => <TextField {...params} label="Condition" required/>}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField id="isbn" label="Tag ID" variant="outlined"  value = {inventoryData?.tagId} onChange = {(e) => setInventoryData({...inventoryData, tagId: e.target.value}) } fullWidth/>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  disablePortal
                  id="combo-box-donated"
                  options={optionsIsDonated}
                  onChange = {(e,item) => { setInventoryData({...inventoryData, isDonated: Boolean(item?.value)}) }}
                  renderInput={(params) => <TextField {...params} label="Donated" required/>}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField id="isbn" label="Book Owner" variant="outlined"  value = {inventoryData?.bookOwner} onChange = {(e) => { setInventoryData({...inventoryData, bookOwner: e.target.value}) }} fullWidth required/>
              </Grid>
              <Grid item xs={12}>
                <TextField
                id="OwnerNote"
                label="Owner Note"
                multiline
                minRows={2}
                maxRows={3}
                value = {inventoryData?.ownerNote} onChange = {(e) => { setInventoryData({...inventoryData, ownerNote: e.target.value}) }}
                fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider  dateAdapter={AdapterDayjs}>
                <DatePicker 
                  disabled={true}
                  label="Date Added" 
                  value = {textDateAdded} 
                  slotProps={{
                  textField: {
                    id: 'dateAdded',
                    disabled: true
                  },
                  }}/>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                {/* Align Item to center */}
              </Grid>
              {/* Subject Dynamic Input */}
              {objectSubjects.map((item, index) => (
                <>
                  <Grid item xs={6}>
                    <TextField label={`Subject ${index + 1}`} variant="outlined" value = {item.subjectName} onChange={(event) => handleChangeSubject(event, index)} fullWidth /> 
                  </Grid>
                  <Grid item xs={6}>
                    {objectSubjects.length > 1 && (
                      <IconButton aria-label="Delete Subject" onClick={() => handleDeleteInputSubject(index)}>
                          <DeleteIcon/>
                      </IconButton>
                    )}
                    {index === objectSubjects.length - 1 && (
                      <IconButton aria-label="Add Subject" onClick={() => handleAddInputSubject()}>
                          <AddCircleIcon />
                      </IconButton>
                    )}
                  </Grid>
                </>
              ))}
              <Grid item xs={12}>
                <TextField id="image" label="Image" variant="outlined" value = {bookData?.image} onChange = {(e) => setBookData({...bookData, image: e.target.value}) } fullWidth />
              </Grid>
              <Grid item xs={3}>
                {/* Align Item to center */}
              </Grid>
              <Grid item xs={6}>
                <img
                  src={bookData?.image}
                  alt={""}
                  loading="lazy"
                />
              </Grid>
              <Grid item xs={3}>
                {/* Align Item to center */}
              </Grid>            
            </Grid>
          </DialogContent>
        <DialogActions>
          <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}> Upload file<VisuallyHiddenInput id="file" type="file" accept=".xlsx, .xls" onChange={handleFileChange} /></Button> 
          <Button variant="contained" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit">{textButton}</Button>
        </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

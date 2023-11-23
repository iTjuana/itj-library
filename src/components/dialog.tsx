import { useState } from 'react';
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

// Main Function (FormDialog)
export default function FormDialog({textButton} : { textButton: string; }) {
  const [open, setOpen] = useState(false);
  const [bookData, setBookData] = useState({
    isbn: "",
    title: "",
    subtitle: "",
    description: "",
    language: 0,
    numberOfPages: 0,
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

  const [textPublishDates, setTextPublishDates] = useState<Dayjs | null>(dayjs());
  const [objectAuthors, setObjectAuthors] = useState([{ authorName: "" }]);
  const [objectPublishers, setObjectPublishers] = useState([{ publisherName: "" }]);
  const [objectSubjects, setObjectSubjects] = useState([{ subjectName: "" }]);
  const [textDateAdded, setDateAdded] = useState<Dayjs | null>(dayjs());

  const addthingy = api.books.addThingy.useMutation();

  const optionsIsDonated = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];

  const handleAddInputAuthor = () => {
    setObjectAuthors([...objectAuthors, { authorName: "" }]);
  };

  const handleAddInputPublisher = () => {
    setObjectPublishers([...objectPublishers, { publisherName: "" }]);
  };

  const handleAddInputSubject = () => {
    setObjectSubjects([...objectSubjects, { subjectName: "" }]);
  };

  const handleDeleteInput = (index: any, setInputs: any, state: any) => {
    const newArray = [...state];
    newArray.splice(index, 1);
    setInputs(newArray);
  };

  const handleChangeAuthor = (event: any, index: any) => {
    let authorName  = event.target.value;
    let onChangeValue = [...objectAuthors];
    onChangeValue[index]!.authorName = authorName;
    setObjectAuthors(onChangeValue);
  };

  const handleChangePublisher = (event: any, index: any) => {
    let publisherName  = event.target.value;
    let onChangeValue = [...objectPublishers];
    onChangeValue[index]!.publisherName = publisherName;
    setObjectPublishers(onChangeValue);
  };

  const handleChangeSubject = (event: any, index: any) => {
    let subjectName  = event.target.value;
    let onChangeValue = [...objectSubjects];
    onChangeValue[index]!.subjectName = subjectName;
    setObjectSubjects(onChangeValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const objectToCommaSeparatedString = (object: any, attribute: string) => {
    let stringCommaSeparated = "";
    object.forEach((element: any) => {
      stringCommaSeparated += element[`${attribute}`] + ",";
    });
    stringCommaSeparated = stringCommaSeparated.slice(0, -1);
    return stringCommaSeparated;
  }
  
  const onSubmit = (e: any) =>{
    e.preventDefault();
    const authorString = objectToCommaSeparatedString(objectAuthors, "authorName");
    const publisherString = objectToCommaSeparatedString(objectPublishers, "publisherName");
    const subjectString = objectToCommaSeparatedString(objectSubjects, "subjectName");

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
      bookId: "",
      status: inventoryData.status,
      format: inventoryData.format,
      condition: inventoryData.condition,
      bookOwner: inventoryData.bookOwner,
      tagId: inventoryData.tagId,
      ownerNote: inventoryData.ownerNote,
      isDonated: inventoryData.isDonated,
      dateAdded: new Date(),
    }

    console.log(InventoryDataPrivate)
    console.log(bookDataPrivate)
    // console.log(inventoryData);
    addthingy.mutate({
      inventoryData: InventoryDataPrivate,
      bookData: bookDataPrivate
    });
  }

  return (
    <>
      <Button onClick={handleClickOpen}>
        {textButton}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box component="form" autoComplete="off" onSubmit={onSubmit}>
          <DialogTitle sx={{ fontWeight: 'bold' }}>{textButton} Book</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
            <Grid item xs={12}>
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
                      <IconButton aria-label="Delete Author" onClick={() => handleDeleteInput(index, setObjectAuthors, objectAuthors)}>
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
                      <IconButton aria-label="Delete Publisher" onClick={() => handleDeleteInput(index, setObjectPublishers, objectPublishers)}>
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
                      <IconButton aria-label="Delete Subject" onClick={() => handleDeleteInput(index, setObjectSubjects, objectSubjects)}>
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{textButton}</Button>
        </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

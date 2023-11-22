import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
//npm install @mui/x-date-pickers
//npm install dayjs
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

export interface AutocompleteInterface {
  value: number;
  label: string;
}

export default function FormDialog({textButton} : { textButton: string; }) {
  const [open, setOpen] = React.useState(false);
  const [textISBN, setTextISBN] = React.useState("");
  const [textTitle, setTextTitle] = React.useState("");
  const [textSubtitle, setTextSubtitle] = React.useState("");
  const [textLanguage, setTextLanguage] = React.useState("");
  const [textPublishDates, setTextPublishDates] = React.useState<Dayjs | null>(dayjs());
  const [textNumberOfPages, setTextNumberOfPages] = React.useState("");
  const [textDescription, setTextDescription] = React.useState("");
  const [objectAuthors, setObjectAuthors] = React.useState([{ authorName: "" }]);
  const [objectPublishers, setObjectPublishers] = React.useState([{ publisherName: "" }]);
  const [objectSubjects, setObjectSubjects] = React.useState([{ subjectName: "" }]);
  const [textStatus, setTextStatus] = React.useState("");
  const [textFormat, setTextFormat] = React.useState("");
  const [textCondition, setTextCondition] = React.useState("");
  const [textBookOwner, setTextBookOwner] = React.useState("");
  const [textTagID, setTextTagID] = React.useState("");
  const [textOwnerNote, setOwnerNote] = React.useState("");
  const [textIsDonated, setIsDonated] = React.useState("");
  const [textDateAdded, setDateAdded] = React.useState<Dayjs | null>(dayjs());
  const [textImage, setTextImage] = React.useState("");

  const optionsIsDonated = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];

  const statusOptions: AutocompleteInterface[] = enumObjToAutocompleteItem(Status);
  const formatOptions: AutocompleteInterface[] = enumObjToAutocompleteItem(Format);
  const languageOptions: AutocompleteInterface[] = enumObjToAutocompleteItem(Language);
  const conditionOptions: AutocompleteInterface[] = enumObjToAutocompleteItem(Condition);

  const getInitState = () => {
    setTextISBN("");
    setTextTitle("");
    setTextSubtitle("");
    setTextLanguage("");
    setTextPublishDates(dayjs());
    setTextNumberOfPages("");
    setTextDescription("");
    setObjectAuthors([{ authorName: "" }]);
    setObjectPublishers([{ publisherName: "" }]);
    setObjectSubjects([{ subjectName: "" }]);
    setTextStatus("");
    setTextFormat("");
    setTextCondition("");
    setTextBookOwner("");
    setTextTagID("");
    setOwnerNote("");
    setTextImage("");
    setIsDonated("");
  }

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
    onChangeValue[index].authorName = authorName;
    setObjectAuthors(onChangeValue);
  };

  const handleChangePublisher = (event: any, index: any) => {
    let publisherName  = event.target.value;
    let onChangeValue = [...objectPublishers];
    onChangeValue[index].publisherName = publisherName;
    setObjectPublishers(onChangeValue);
  };

  const handleChangeSubject = (event: any, index: any) => {
    let subjectName  = event.target.value;
    let onChangeValue = [...objectSubjects];
    onChangeValue[index].subjectName = subjectName;
    setObjectSubjects(onChangeValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    getInitState();
  };
  
  // const bookInfo = api.books.getBookInfoByIsbn.useQuery("978-8420473352"); 
  // If data = null 
  // Inject data to Books and Inventory
  // If bookInfo != null
  // Inject data in inventory only

  const onSubmit = (e: any) =>{
    e.preventDefault();
    // const bookInfo = api.books.getBookInfoByIsbn.useQuery("978-8420473352"); 
    console.log(`
    isbn: ${textISBN}
    title: ${textTitle}
    Subtitle: ${textSubtitle}
    Language: ${textLanguage}
    PublishDate: ${textPublishDates}
    Number of Pages: ${textNumberOfPages}
    Description: ${textDescription}
    Authors: ${objectAuthors}
    Publishers: ${objectPublishers}
    Subjects: ${objectSubjects}
    status: ${textStatus}
    format: ${textFormat}
    condition: ${textCondition}
    bookowner: ${textBookOwner}
    tagid: ${textTagID}
    ownernote: ${textOwnerNote}
    isDonated: ${textIsDonated}
    dateAdded: ${textDateAdded}
    Image: ${textImage}
    `)
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
                <TextField id="isbn" label="ISBN" variant="outlined"  value = {textISBN} onChange = {(e) => { setTextISBN(e.target.value); }} fullWidth required />
              </Grid>
              <Grid item xs={6}>
                <TextField id="title" label="Title" variant="outlined" value = {textTitle} onChange = {(e) => { setTextTitle(e.target.value); }} fullWidth required />
              </Grid>
              <Grid item xs={6}>
                <TextField id="subtitle" label="Subtitle" variant="outlined" value = {textSubtitle} onChange = {(e) => { setTextSubtitle(e.target.value); }} fullWidth />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  disablePortal
                  id="combo-box-language"
                  options={languageOptions}
                  onChange = {(e,item) => { setTextLanguage(item?.value) }}
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
                <TextField type="number" id="numberOfPages" label="Number Of Pages" variant="outlined" value = {textNumberOfPages} onChange = {(e) => { setTextNumberOfPages(e.target.value); }} fullWidth /> 
              </Grid>
              <Grid item xs={12}>
                <TextField
                id="description"
                label="Description"
                multiline
                minRows={2}
                maxRows={3}
                value = {textDescription} onChange = {(e) => { setTextDescription(e.target.value); }}
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
                  onChange = {(e,item) => { setTextStatus(item?.value) }}
                  renderInput={(params) => <TextField {...params} label="Status" required/>}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  disablePortal
                  id="combo-box-format"
                  options={formatOptions}
                  onChange = {(e,item) => { setTextFormat(item?.value) }}
                  renderInput={(params) => <TextField {...params} label="Format" required/>}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  disablePortal
                  id="combo-box-condition"
                  options={conditionOptions}
                  onChange = {(e,item) => { setTextCondition(item?.value) }}
                  renderInput={(params) => <TextField {...params} label="Condition" required/>}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField id="isbn" label="Tag ID" variant="outlined"  value = {textTagID} onChange = {(e) => { setTextTagID(e.target.value); }} fullWidth/>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  disablePortal
                  id="combo-box-donated"
                  options={optionsIsDonated}
                  onChange = {(e,item) => { setIsDonated(item?.value) }}
                  renderInput={(params) => <TextField {...params} label="Donated" required/>}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField id="isbn" label="Book Owner" variant="outlined"  value = {textBookOwner} onChange = {(e) => { setTextBookOwner(e.target.value); }} fullWidth required/>
              </Grid>
              <Grid item xs={12}>
                <TextField
                id="OwnerNote"
                label="Owner Note"
                multiline
                minRows={2}
                maxRows={3}
                value = {textOwnerNote} onChange = {(e) => { setOwnerNote(e.target.value); }}
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
                <TextField id="image" label="Image" variant="outlined" value = {textImage} onChange = {(e) => { setTextImage(e.target.value); }} fullWidth /> {/** How do we manage images? */}
              </Grid>
              <Grid item xs={3}>
                {/* Align Item to center */}
              </Grid>
              <Grid item xs={6}>
                <img
                  src={textImage}
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

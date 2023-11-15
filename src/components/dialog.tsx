import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
//npm install @mui/x-date-pickers
//npm install dayjs
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function FormDialog({textButton}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const alert = () => {
    console.log("Added");
  }

  return (
    <>
      <Button onClick={handleClickOpen}>
        {textButton}
      </Button>
      <Dialog open={open} onClose={handleClose}>
      <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1 },
            }}
            autoComplete="off"
          >
        <DialogTitle>{textButton} Book</DialogTitle>
        <DialogContent>
            <TextField id="isbn" label="ISBN" variant="outlined" required />
            <TextField id="title" label="Title" variant="outlined" required />
            <TextField id="subtitle" label="Subtitle" variant="outlined" required />
            <TextField id="language" label="Language" variant="outlined" required />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
                label="Publish Date"     
                slotProps={{
                textField: {
                  required: true,
                  id: 'publishDates',
                },
              }}/>
            </LocalizationProvider>
            <TextField type="number" id="numberOfPages" label="Number Of Pages" variant="outlined" required /> 
            <TextField
              id="description"
              label="Description"
              multiline
              maxRows={4}
              fullWidth
            />
            <TextField id="authors" label="Authors" variant="outlined" fullWidth required /> {/** Is this a comma separated value? */}
            <TextField id="publishers" label="Publishers" variant="outlined" fullWidth required /> {/** Is this a comma separated value? */}
            <TextField id="image" label="Image" variant="outlined" fullWidth required /> {/** How do we manage images? */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onSubmit={alert}>{textButton}</Button>
        </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { KeyboardDatePicker } from '@material-ui/pickers';

const options = [
  'Severely Elevated',
  'Moderately Elevated',
  'Mildly Elevated',
  'Stable',
  'Mildly Depressed',
  'Moderately Depressed',
  'Severely Depressed'
];

export interface MoodDialogProps {
  classes: Record<'paper', string>;
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  date: Date | null;
  actionType: string;
  onDateChange: (date: Date | null) => void;
  onClose: (value?: string) => void;
}

export default function MoodDialog(props: MoodDialogProps) {
  const { onClose, onDateChange, value: valueProp, open, date, actionType, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    > <Grid container direction='column'>
        <Typography variant='h4' align='center'>Core Mood</Typography>
        <Grid container justify='space-between'>
          <DialogTitle id="confirmation-dialog-title">{actionType === 'add' ? 'Add Record' : actionType === 'modify' ? 'Modify Record' : 'Delete Record'}</DialogTitle>
          <KeyboardDatePicker 
            disableToolbar
            variant='inline'
            format='yyyy/MM/dd'
            margin='normal'
            label='Date'
            value={date}
            onChange={onDateChange}
            />
        </Grid>
      </Grid>
      <DialogContent dividers>
        {actionType === 'delete' && <Typography variant='body1'>Please select date which you want to delete</Typography>}
        {actionType !== 'delete' && 
          <RadioGroup
            ref={radioGroupRef}
            aria-label="ringtone"
            name="ringtone"
            value={value}
            onChange={handleChange}
          >
            {options.map((option) => (
              <FormControlLabel value={option} key={option} control={<Radio color='primary'/>} label={option} />
            ))}
          </RadioGroup>
        }
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
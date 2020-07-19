import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export interface ChartActionsProps {
  click: (action: string) => void
}

export default function ChartActions(props: ChartActionsProps) {
  const { click } = props;
  return (
    <Grid container>
      <ButtonGroup
        color="primary"
        aria-label="outlined primary button group"
      >
        <Button onClick={() => click('add')}>Add Record</Button>
        <Button onClick={() => click('modify')}>Modify Record</Button>
        <Button onClick={() => click('delete')}>Delete Record</Button>
      </ButtonGroup>
    </Grid>
  )
}
// import built in hook for functional component state
import React, { useState, useCallback } from "react";

// material-ui hook functions
import { makeStyles, useTheme } from "@material-ui/styles";
// import material-ui components
import { Paper, TextField, Typography } from "@material-ui/core";

//create a custom material-ui hook to access class styles
const useStyles = makeStyles(
  theme => ({
    root: {
      padding: theme.spacing.unit * 3
    }
  }),
  { withTheme: true }
);

function Form1() {
  // use of custom hook to bring in styles (usually done with HOC and prop)
  const classes = useStyles();
  // we can also use a hook to access the theme object (as above)
  const theme = useTheme();

  // create and init state variable and state mutator with useState React hook
  const [data, setData] = useState("");

  // create memoised event handler for input field onChange event
  // similar to this.handleChange in class component
  const handleChange = useCallback(e => {
    setData(e.target.value);
  }, []);

  return (
    <Paper className={classes.root}>
      <Typography variant="h4">NearForm Hooks Demo</Typography>
      <Typography variant="body1" color="primary">
        Theme primary color = {theme.palette.primary.main} (obtained from
        useTheme hook)
      </Typography>
      <TextField name="test" value={data} onChange={handleChange} />
      <Typography color="primary">Data: {data}</Typography>
    </Paper>
  );
}

export default Form1;

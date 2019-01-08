import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import {
  Grid,
  Paper,
  Button,
  Typography,
  Table,
  TableRow,
  TableCell,
  TextField,
  TableBody,
  TableHead
} from "@material-ui/core";
import { useInput, useSubmit } from "../hooks/form";
import { useClock } from "../hooks/timer";
import { usePos } from "../hooks/mouse";
import { useScroll, useSize } from "../hooks/window";

//create a hook for classes objects
const useStyles = makeStyles(
  theme => ({
    root: {
      minWidth: "500px",
      height: "100vh"
    },
    paper: {
      padding: theme.spacing.unit * 3
    },
    form: {
      marginTop: theme.spacing.unit * 3
    },
    input: {
      marginBottom: theme.spacing.unit * 3
    }
  }),
  { withTheme: true }
);

const validations = {
  // eslint-disable-next-line
  EMAIL: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  NUMBER: /^\d*$/
};

function Form() {
  // use of hooks to bring classes style sheet in (usually done with HOC)
  const classes = useStyles();
  // we can alse use a hook to access the theme
  const theme = useTheme();

  function handleValidation(value, regex) {
    // we could get fancy here with validations based on type of input
    // could be put in a form hook library and imported
    if (value && regex && value.match(regex)) return true;
    return false;
  }

  const email = useInput("Email", "", handleValidation, validations.EMAIL);
  const age = useInput("Number", "", handleValidation, validations.NUMBER);

  // the data we're going to submit, just using a hook to display
  const [data, setData] = useState(null);

  function handleSuccess(data) {
    // we're just setting the state here, but typically this would
    // be sent to the server for further validation and persistence
    setData(data);
  }

  //pass in array of hooks to validate onSubmit (that's where the data is)
  const submit = useSubmit([email, age], handleSuccess);

  // custom hook using both useState and useEffect
  const time = useClock();

  // custom hook using both useState and useEffect
  const pos = usePos();

  // custom hook using both useState and useEffect
  const scroll = useScroll();

  // custom hook using both useState and useEffect
  const size = useSize();

  return (
    <Grid
      container
      alignContent="stretch"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Paper className={classes.paper}>
        <Typography variant="h4">NearForm Hooks Demo</Typography>
        <Typography color="primary">
          Theme Hook (primary color): {theme.palette.primary.main}
        </Typography>
        <Typography>Time Hook: {time}</Typography>
        <Typography>
          Mouse Position Hook: {pos.x}, {pos.y}
        </Typography>
        <Typography>
          Window Size Hook: {size.width}, {size.height}
        </Typography>
        <Typography>
          Window Scroll Hook: {scroll.top}, {scroll.left}
        </Typography>
        <Typography variant="h5">Input and Form Submit Hooks</Typography>
        <form className={classes.form} {...submit.props}>
          <div className={classes.input}>
            <TextField label="Email" variant="outlined" {...email.props} />
            {email.props.error && (
              <Typography variant="body1" color="error">
                Invalid Email address
              </Typography>
            )}
          </div>
          <div className={classes.input}>
            <TextField label="Age" variant="outlined" {...age.props} />
            {age.props.error && (
              <Typography variant="body1" color="error">
                Invalid age
              </Typography>
            )}
          </div>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
          {submit.errorItems && submit.errorItems.length > 0 && (
            <Typography variant="body1" color="error">
              {`Please fix ${submit.errorItems && submit.errorItems.length} form
            field error(s)`}
            </Typography>
          )}
        </form>
        {data && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Input Field</TableCell>
                <TableCell>Validated Input</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={`form-${index}`}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Grid>
  );
}

export default Form;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  gridList: {
      position:'absolute',
      right:'5px',
      maxWidth:'250px',
  },
    image: {
        border: '1px solid #ddd;',
        borderRadius: '4px;',
        padding: '5px;',
        maxWidth: '250px;'
    }
}));

export default function ImgList(props) {
  const classes = useStyles();

  return (
    <div >
    <Paper>
        <GridList className={classes.gridList} cols={1}>
            {props.images.map((image) => (
            <GridListTile onClick={props.changeImage} >
                <img className={classes.image} src={image} />
            </GridListTile>
            ))}
        </GridList>
    </Paper>
    </div>
  );
}


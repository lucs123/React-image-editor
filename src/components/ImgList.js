import React,{Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


// const useStyles = makeStyles((theme) => ({
//     image: {
//         border: '1px solid #ddd;',
//         borderRadius: '4px;',
//         padding: '5px;',
//         width: '50px;',
//         float: 'right'
//     }
// }));

// export default function ImgList(props){
//     const classes = useStyles();
//         return(
//             <div>
//                 <ul>
//                     {props.images.map(image=>
//                             <img className={classes.image} src={image} onClick={props.changeImage}/>
//                     )}
//                 </ul>
//             </div>
//         )
// }

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
    // image: {
    //     border: '1px solid #ddd;',
    //     borderRadius: '4px;',
    //     padding: '5px;',
    //     width: '150px;'
    // }
}));

export default function ImgList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cellHeight={50} cols={2.5}>
        {props.images.map((image) => (
          <GridListTile onClick={props.changeImage}>
            <img className={classes.image} src={image} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}


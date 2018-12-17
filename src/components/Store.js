import React, { Component } from 'react';
let request = require('request');
let cheerio = require('cheerio');
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import StoreItem from './StoreItem'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

export class Store extends Component{
  constructor() {
    super()
    this.state = {
      images: [],
      imagesArrived: false
    }
  }

  componentDidMount() {
    request('https://cors-anywhere.herokuapp.com/https://toysrus.co.il/all-products.html?limit=32&no_cache=1&p=1&price=-150', (err, resp, html) => {
      if (!err){
        const $ = cheerio.load(html);
        let images = Array.from($('.swatchProdImg')).map(obj => obj.attribs.src)       
        this.setState({ images, imagesArrived: true })
      } else console.log(err)
    });
  }

  render() {
    const { images, imagesArrived } = this.state,
          { classes } = this.props
    return (
      <div>
        { !imagesArrived && <div className="loader">
          <CircularProgress className={classes.progress} size={80} />
        </div>}
        {imagesArrived && images.map((imgSrc, index) => <StoreItem src={imgSrc}/>)}    
      </div>
    )
  }
}
export default withStyles(styles)(Store);
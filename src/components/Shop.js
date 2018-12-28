import React, { Component } from 'react';
let request = require('request');
let cheerio = require('cheerio');
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ShopItem from './ShopItem'
import UserShopInfo from './UserShopInfo'

const ITEMS_IN_ROW = 5

const sliceToRows = arr => {
  for(let i = 0; i < Math.ceil(arr.length / ITEMS_IN_ROW); i++) {
    arr[i] = arr.slice(i * ITEMS_IN_ROW, (i + 1) * ITEMS_IN_ROW)
  }
  arr.splice(Math.ceil(arr.length / ITEMS_IN_ROW))
}

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

const corsAnywhere = 'https://cors-anywhere.herokuapp.com/'

export class Shop extends Component{
  constructor() {
    super()
    this.state = {
      images: [],
      titles: [],
      prices: [],
      imagesArrived: false
    }
  }

  componentDidMount() {
    request(`${corsAnywhere}https://toysrus.co.il/all-products.html?limit=32&no_cache=1&p=1&price=-150`, (err, resp, html) => {
      if (!err){
        const $ = cheerio.load(html);
        let images = Array.from($('.swatchProdImg')).map(obj => obj.attribs.src)               
        let hrefs = Array.from($('.prodtitle')).map(obj => obj.attribs.href)
        let titles = Array.from($('.prodtitle')).map(obj => obj.children[0].data)       
        let prices = Array.from($('.ourPrice2')).map(price => {
          let data = price.children[0].data
          return `${Math.floor(parseFloat(
            data
              .split('')
              .slice(0, data.length - 2)
              .join('')
            ) * 100)} אסימונים`
        })

        sliceToRows(images) 
        sliceToRows(hrefs)
        sliceToRows(titles)
        sliceToRows(prices)

        this.setState({ images, titles, prices, hrefs, imagesArrived: true })
      } else console.log(err)
    });
  }

  render() {
    const { images, titles, prices, hrefs, imagesArrived } = this.state,
          { classes } = this.props
    return (
      <div className="shop">
        { !imagesArrived && <div className="loader">
          <CircularProgress className={classes.progress} size={80} />
        </div>}
        {
          imagesArrived &&
          <div>
            {
              images.map((imageRow, index) => 
                <div key={index} className="shop-row">
                  {
                    imageRow && imageRow.map((imgSrc, indexInRow) => 
                      <ShopItem 
                        key={indexInRow} 
                        src={imgSrc} 
                        title={titles[index][indexInRow]} 
                        price={prices[index][indexInRow]}
                        href={hrefs[index][indexInRow]}
                      />
                    )
                  }
                </div>
              )
            }
          </div>
        }
      </div>
    )
  }
}
export default withStyles(styles)(Shop);

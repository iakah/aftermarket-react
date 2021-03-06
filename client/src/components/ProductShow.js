import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/productActions'
import AddToCart from '../components/AddToCart'

class ProductShow extends Component {

  componentDidMount() {
    this.props.actions.fetchProduct(this.props)
  }

  render() {
    const product = this.props.product


    return (
      <div className='product-div'>
        <Link to='/products'>Back</Link>
        <h2>{product.name}</h2>
        <div className='full-img'>
          <img src={product.img_full} alt={product.name} />
        </div>
        <div className='price-and-description'>
          <h3><em>${product.price}</em></h3>
          { this.props.token &&
            <AddToCart cartId={this.props.cartId} productId={this.props.productId}/>
          }
          { !this.props.token &&
            <Link to='/login'>
              <Button primary className='login-button'>Log In to Add to Cart</Button>
            </Link>
          }
          <p dangerouslySetInnerHTML={{__html: product.description}} />
        </div>
      </div>
    )
  }

  componentWillUnmount() {
    this.props.actions.cleanupProduct()
  }
}

function mapStateToProps(state, ownProps) {
  if (state.user.hasOwnProperty('cart')) {
    return {
      token: state.user.token,
      cartId: state.user.cart.id,
      productId: ownProps.match.params.productId,
      product: state.currentProduct
    }
  } else {
    return {
      productId: ownProps.match.params.productId,
      product: state.currentProduct
    }
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductShow)

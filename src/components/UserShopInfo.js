import React from 'react';
import { connect } from 'react-redux';

export const UserShopInfo = ({ tokens }) => 
  <div>
    נותרו לך עוד {tokens} אסימונים
  </div>

const mapStateToProps = (state) => ({
  tokens: state.shop.tokens
})

export default connect(mapStateToProps)(UserShopInfo)
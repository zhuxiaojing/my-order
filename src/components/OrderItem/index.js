import React, { Component } from "react";
import './style.css'
class OrderItem extends Component {
  constructor(props){
    super(props)
    this.state={
      editing:false,
      comment:'',
      stars:this.props.data.stars,
    }
  }
  render() {
    const {picture,product,shop,price,ifCommented}=this.props.data
    return (
      <div className="orderItem">
        <div className="orderItem__picContainer">
          <img className="orderItem__pic" src={picture} alt=""/>
        </div>
        <div className="orderItem__content">
          <div className="orderItem__product">{product}</div>
          <div className="orderItem__shop">{shop}</div>
          <div className="orderItem__detail">
            <div className="orderItem__price">{price}</div>
            <div>
              {
               ifCommented?(<button className="orderItem__btn orderItem__btn--grey">已评价</button>):
               (<button className="orderItem__btn orderItem__btn--red" onClick={this.handleOpenEditArea}>去评价</button>)
              }
            </div>
          </div>
          {this.state.editing?this.renderEditArea():null}
        </div>
      </div>
    );
  }

  // 防止render中内容非常庞大，评论部分单独写在一个方法中
  renderEditArea(){
     return (
       <div className="orderItem_commentContainer">
         <textarea className="orderItem__comment" onChange={this.handleCommentChange} value={this.state.comment}/>
         {this.rendrStars()}
         <button className="orderItem__btn  orderItem__btn--red" onClick={this.handleSubmitCommit}>提交</button>
         <button className="orderItem__btn  orderItem__btn--grey" onClick={this.handleCancleComment}>取消</button>
       </div>
     ) 
  }

  rendrStars(){
    const {stars}=this.state
    return (
      <div>
        {
           [1,2,3,4,5].map((item,index)=>{
            const light=stars>=item?"orderItem__start--light":"";
            return  (
              <span className="orderItem__star" key={index} className={light} onClick={this.handleClickStars.bind(this,item)}>★</span>
            )
          })
        }
      </div>
    )
  }
  
  // 用ES6的事件处理写法，保证内部的this指的是本按钮的  
  // 注：vue中原生调用：var $this=this  $this.$options.methods.方法名()简写成：方法名(){}等价于：方法名:function(){}
  handleOpenEditArea=()=>{
    this.setState({
      editing:true
    })
  }

  handleCommentChange=(e)=>{
    this.setState({
      comment:e.target.value
    })
  }
  handleClickStars=(stars)=>{
    this.setState({
       stars
    })
  }
  handleCancleComment=()=>{
    this.setState({
      editing:false,
      comment:"",
      stars:this.props.data.stars
   })
  }

  handleSubmitCommit=()=>{
    const {id}=this.props.data;
    const comment=this.state.comment;
    const stars=this.state.stars
    this.setState({
      editing:false,
    })
   this.props.onSubmit(id,comment,stars)
  }
}
export default OrderItem;

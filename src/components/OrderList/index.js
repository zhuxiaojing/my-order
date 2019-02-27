import React, { Component } from 'react';
import OrderItem from '../OrderItem'
class OrderList extends Component {
		// 定义变量
	  constructor (props){
			super(props)
			this.state={
				data:[]
			}
		}
    //组件挂载的时候完成AJAX请求
    componentDidMount(){
			fetch('/mock/orders.json').then(res=>{
				if(res.ok){
					res.json().then(data=>{
						this.setState({
							data
						})
					})
				}
			})
		}
    render() {
        return (
            <div>
							{
								this.state.data.map((item,index)=>{
									return <OrderItem key={index}   data={item} onSubmit={this.handleSubmit}/>
								})
							}
						</div>
        );
		}
		handleSubmit=(id,comment,stars)=>{
			const newData=this.state.data.map((item)=>{
					return item.id==id?(
															{...item,comment,stars,ifCommented:true}
														):item;
			})
			this.setState({
				data:newData
			})
		};		
}
export default OrderList;
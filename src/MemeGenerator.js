import React, {Component} from "react"

class MemeGenerator extends Component{
	constructor(){
		super()
		this.state = {
			topTxt:"Top Text",
			botTxt:"Bottom Text",
			rImg:"https://i.imgflip.com/1bij.jpg",
			allMemeImgs:[]
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount(){
		console.log(process.env.REACT_SAMPLE_ENV);
		fetch("https://api.imgflip.com/get_memes")
		.then(response => response.json())
		.then(response => {
			const {memes} = response.data
			this.setState({allMemeImgs:memes})
		})
		

	}
	handleChange(event){
		const {name, value} = event.target
		this.setState({[name]:value})  
	}
	handleSubmit(event){

		event.preventDefault()
		const rn = Math.floor(Math.random() * this.state.allMemeImgs.length);
		const url = this.state.allMemeImgs[rn].url
		this.setState({rImg:url})
	}
	render(){
		return(
			<div className="container">
				<div className="forms">
					<form onSubmit={this.handleSubmit}>
						<input 
						name="topTxt"
						type="text"
						placeholder="Top Text"
						onChange={this.handleChange}
						/>
						
						<input
						name="botTxt"
						type="text"
						placeholder="Bottom Text"
						onChange={this.handleChange}
						/>
						<button>Generate</button>
					</form>
				</div>
				<div className="content">
					<img src={this.state.rImg} alt="meme"/>
					<p className="top">{this.state.topTxt.toUpperCase()}</p>
					<p className="bot">{this.state.botTxt.toUpperCase()}</p>
				</div>
				

			</div>
			)
	}
}

export default MemeGenerator
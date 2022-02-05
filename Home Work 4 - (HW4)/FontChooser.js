class FontChooser extends React.Component {// eslint-disable-line 

	constructor(props) {
		super(props);

		this.state = {
			hidden: true,
			bold: this.convertStrToBool(this.props.bold),
			fontSize: parseInt(this.props.size, 10),
			fontWeight: this.boldTextFromStr(this.props.bold),
			max: parseInt(this.props.max, 10),
			min: parseInt(this.props.min, 10),
			color: 'black',
			initialFontSize: parseInt(this.props.size, 10)
		};

		this.handleTextSpanClick = this.handleTextSpanClick.bind(this);
		this.handleDecreaseButtonClick = this.handleDecreaseButtonClick.bind(this);
		this.handleIncreaseButtonClick = this.handleIncreaseButtonClick.bind(this);
		this.handleBoldCheckbox = this.handleBoldCheckbox.bind(this);
		this.handleFontSizeSpanDoubleClick = this.handleFontSizeSpanDoubleClick.bind(this);
	}

	handleTextSpanClick() {
		this.setState({hidden: !this.state.hidden});
	}

	handleDecreaseButtonClick() {
		if(this.state.min < this.state.fontSize - 1) {
			this.setState({
				fontSize: this.state.fontSize - 1,
				color: 'black'
			});
		}
		else if(this.state.min === this.state.fontSize - 1) {
			this.setState({
				fontSize: this.state.fontSize - 1,
				color: 'red'
			});
		}
	}

	handleIncreaseButtonClick() {
		if (this.state.max > this.state.fontSize + 1) {
			this.setState({
				fontSize: this.state.fontSize + 1,
				color: 'black'
			});
		}
		else if (this.state.max === this.state.fontSize + 1) {
			this.setState({
				fontSize: this.state.fontSize + 1,
				color: 'red'
			});
		}
	}

	convertStrToBool(str) {
		if (str === 'true') {
			return true;
		}

		return false;
	}

	boldTextFromStr(str) {
		if (str === 'true') {
			return 'bold';
		}

		return 'normal';
	}

	boldTextFromBool(bool) {
		if (bool) {
			return 'normal';
		}

		return 'bold';
	}

	handleBoldCheckbox() {
		this.setState({
			bold: !this.state.bold,
			fontWeight: this.boldTextFromBool(this.state.bold)
		});
	}

	handleFontSizeSpanDoubleClick() {
		this.setState({
			fontSize: this.state.initialFontSize,
			color: 'black'
		});
	}

	render() {
		return(
			<div>
				<input type="checkbox" onChange={this.handleBoldCheckbox} id="boldCheckbox" hidden={this.state.hidden} checked={this.state.bold}/>
				<button id="decreaseButton" onClick={this.handleDecreaseButtonClick} hidden={this.state.hidden}>-</button>
				<span id="fontSizeSpan" hidden={this.state.hidden} style={{color: this.state.color}} onDoubleClick={this.handleFontSizeSpanDoubleClick}>{this.state.fontSize}</span>
				<button id="increaseButton" onClick={this.handleIncreaseButtonClick} hidden={this.state.hidden}>+</button>
				<span id="textSpan" onClick={this.handleTextSpanClick} style={{
					fontSize: this.state.fontSize,
					fontWeight: this.state.fontWeight
				}}>{this.props.text}</span>
			</div>
		);
	}
}
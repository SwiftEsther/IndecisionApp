import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    state = {
        options : [],
        selectedOption: false
    }

    handleRemoveOptions = () => {
        this.setState(() => ({options: []}));
    }

    handleRemoveOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }

    handlePick = () => {
        const randomNum = Math.floor(Math.random()*this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({selectedOption: option}))
    }

    handleClose = () => {
        this.setState(() => ({selectedOption: undefined}));
    }

    handleAddOption = (option) => {
        if(!option) {
            return 'Enter a valid value';
        }else if(this.state.options.indexOf(option) > -1){
            return 'This option exists already';
        }
        this.setState((prevState) => ({options: prevState.options.concat(option)}));
    }

    componentDidMount = () => {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options) {
                this.setState(() => ({options}));
            }
        } catch (error) {
            // do nothing
        }
    }

    componentDidUpdate = (prevProps,prevState) => {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    
    render() {
        const subtitle = "Put your life in the hands of a computer";
        return (
            <div>
                <Header subtitle = {subtitle}/>
                <div className= "container">
                    <Action handlePick={this.handlePick} hasOptions = {this.state.options.length > 0}/>
                    <div className= "widget">
                        <Options 
                            options = {this.state.options} 
                            handleRemoveOptions = {this.handleRemoveOptions}
                            handleRemoveOption = {this.handleRemoveOption}
                        />
                        <AddOption handleAddOption={this.handleAddOption}/>
                    </div>
                    <OptionModal selectedOption = {this.state.selectedOption} handleClose = {this.handleClose}/>
                </div>
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
}
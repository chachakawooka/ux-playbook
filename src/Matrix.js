import React from 'react';
import styles from './Matrix.module.css'
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from 'react-tooltip'

class Matrix extends React.Component {
    constructor(props) {
        super(props);

        let items = this.props.items;
        items.map(function(item,i){
            items[i].style = this.getStyle(item.ease, item.impact);
        }.bind(this))

        this.state = {
            items: this.props.items
        };


    }

    componentWillReceiveProps(nextProps) {
        let items = nextProps.items;
        items.map(function(item,i){
            items[i].style = this.getStyle(item.ease, item.impact);
        }.bind(this))

        this.setState({items: items});
    }


    getStyle(ease,impact){
        let bottom = Math.floor((Math.random() * 30) + 3) + ((ease-1)*33);
        let left = Math.floor((Math.random() * 30) + 3) + ((impact-1)*33);

        return {bottom: bottom+'%', left: left+'%'}
    }

    mark(i){
        let items = this.state.items;
        items[i].done = items[i].done ? false : true;
        this.setState({items: items});
    }

    easeToText(i){
        let easeText = ['Hard','Medium','Easy'];
        return easeText[i-1];;
    }

    impactToText(i){
        let easeText = ['Low','Medium','High'];
        return easeText[i-1];;
    }

    render() {
        return (
            <>
                <div className={styles.gridContainer}>
                    <div className={styles.grid}>
                        <div className={styles.grid_maybe}></div>
                        <div className={styles.grid_do}></div>
                        <div className={styles.grid_do}></div>

                        <div className={styles.grid_dont}></div>
                        <div className={styles.grid_maybe}></div>
                        <div className={styles.grid_do}></div>

                        <div className={styles.grid_dont}></div>
                        <div className={styles.grid_dont}></div>
                        <div className={styles.grid_maybe}></div>

                        <ul className={styles.grid_dots}>
                            {this.state.items.map((item,i) => { return (
                                <li style={item.style} onClick={() => this.mark(i)}>
                                    <a href="#" data-tip data-for={'icon'+i}>
                                    {item.done ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}
                                    </a>
                                    <ReactTooltip id={'icon'+i} effect='solid'>
                                        {item.name}
                                    </ReactTooltip>
                                </li>
                            )})}
                        </ul>
                    </div>
                    <label className={styles.yaxis}>Ease of Implementation</label>
                    <label className={styles.xaxis}>Impact</label>
                </div>
                <table>
                    {this.state.items.map((item,i) => { return (
                        <tr  onClick={() => this.mark(i)} className={item.done ? styles.done : null}>
                            <td>
                                {item.done ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}
                            </td>
                            <td>{item.name}</td>
                            <td>{this.easeToText(item.ease)}</td>
                            <td>{this.impactToText(item.impact)}</td>
                            <td>
                                    <ul>
                                {item.keyMetric.map((metric,i) => { return (
                                    <li>{metric}</li>
                                )})}
                                </ul>
                            </td>
                        </tr>
                    )})}
                </table>
            </>
        )
    }
}

export default Matrix;
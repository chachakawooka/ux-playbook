import React from 'react';
import styles from './Stepper.module.css'

class Stepper extends React.Component {

    render(){
        return (
            <ol className={styles.steps}>
                {this.props.steps.map((step,i) => { return (
                    <li className={[styles.steps__item, (step==this.props.selected ? styles.active : null)].join(' ')} onClick={() => this.props.onClick(step)}>
                        <a>{step}</a>
                    </li>
                )})}
            </ol>
        )
    }
}

export default Stepper;
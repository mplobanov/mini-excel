import React, {ReactNode} from "react";
import styles from './Popper.module.css'
import ReactLoading from 'react-loading';

export interface PopperProps {
  filters: Array<ReactNode>,
  hidden: boolean,
  right?: boolean
}

export const Popper: React.FC<PopperProps> = ({filters, hidden, right}: PopperProps) => {
  return <span className={`${styles.container} ${hidden && styles.hidden} ${right ? styles.right : styles.left}`} onClick={(e) => {e.stopPropagation();}}>
    {filters.map((filter, i) => <div key={i}>{filter}</div>)}
    {!filters.length &&
    <div className={`${styles.loading}`}>
      <ReactLoading type={"bubbles"} height={"40px"} width={"40px"} color={'black'}/>
    </div>}
  </span>
}
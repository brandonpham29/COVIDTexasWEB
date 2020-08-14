import React from 'react';
import style from './county.module.css';

const County = ({countyName,countyCases,countyDeaths}) => {
    return(
        <div className={style.county}>
            <h1>{countyName}</h1>
            <p>{countyCases} Cases</p>
            <p>{countyDeaths} Deaths</p>
        </div>
    );
}

export default County;
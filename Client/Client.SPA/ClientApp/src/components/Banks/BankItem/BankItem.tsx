import * as React from 'react';
import { FC, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import classes from './BankItem.module.scss';
import { Bank } from '../../../models/Bank.model';

const BankItem: FC<{ bank: Bank }> = ({ bank }) => {

    const [imageUrl, setImageUrl] = useState('images/no-image.png');

    return (
        <Link className={["list-group-item", "clearfix", classes.BankItem].join(' ')}
            to={`/Banks/${bank.id}`}>
            <img src={imageUrl} className="img-response" />
            <strong className="list-group-item-heading">{bank.name}</strong>
        </Link>
    );
};

export default BankItem;
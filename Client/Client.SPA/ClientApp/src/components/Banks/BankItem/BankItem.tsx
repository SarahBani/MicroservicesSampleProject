import * as React from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import * as classes from './BankItem.module.scss';
import { Bank } from '../../../models/Bank.model';
import * as Constants from '../../../shared/constants';

const BankItem: FC<{ bank: Bank }> = ({ bank }) => {

    const imageUrl = (bank.logoUrl ? `${Constants.FILE_MANAGER_URL}/Resources/Images/Banks/${bank.logoUrl}`: 'images/no-image.png');

    return (
        <Link className={["list-group-item", "clearfix", classes.BankItem].join(' ')}
            to={`/Banks/${bank.id}`}>
            <img src={imageUrl} className="img-response" />
            <strong className="list-group-item-heading">{bank.name}</strong>
        </Link>
    );
};

export default BankItem;
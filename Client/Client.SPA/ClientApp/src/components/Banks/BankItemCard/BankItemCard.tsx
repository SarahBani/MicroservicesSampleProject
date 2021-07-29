import * as React from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import * as classes from './BankItemCard.module.scss';
import { Bank } from '../../../models/Bank.model';
import * as Constants from '../../../shared/constants';

interface Props {
    bank: Bank
};

const BankItemCard: FC<Props> = props => {

    const imageUrl = (props.bank.logoUrl ? `${Constants.FILE_MANAGER_URL}/Resources/Images/Banks/${props.bank.logoUrl}` : 'images/no-image.png');

    return (
        <div className={["card", classes.BankItemCard].join(' ')}>
            <Link to={'/banks/' + props.bank.id}>
                <img src={imageUrl} alt={props.bank.name} />
            </Link>
            <div className="card-body text-center">
                <Link to={'/banks/' + props.bank.id}>
                    <strong className="card-title">{props.bank.name}</strong>
                </Link>
            </div>
        </div>
    );
};

export default BankItemCard;
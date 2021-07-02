import * as React from 'react';
import { FC } from 'react';

import * as classes from './ConfirmDelete.module.scss';

interface OwnProps {
    onOK: (event) => void,
    onCancel: (event) => void
};

const ConfirmDelete: FC<OwnProps> = ({ onOK, onCancel }) => (
    <div className={["container", classes.ConfirmDelete].join(' ')}>
        <div className="row text-left">
            <div className="col-12">
                <span>Are you sure to delete this item?</span>
            </div>
        </div>
        <br />
        <div className="row">
            <div className="col-12 text-right">
                <button className="btn btn-danger" type="button" onClick={onOK}>Yes</button >
                <button className="btn btn-warning" type="button" onClick={onCancel}> No</button >
            </div>
        </div>
    </div>
);

export default ConfirmDelete;
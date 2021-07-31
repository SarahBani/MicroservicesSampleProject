import * as React from 'react';
import { useState, useEffect, useCallback, memo, ReactElement, FormEvent, useMemo, useRef } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as classes from './BankNew.module.scss';
import { getUpdatedForm, getFormElements, ValidateForm } from '../../../shared/utility';
import FormElement from '../../UI/FormElement/FormElement';
import { ElementConfigTypeEnum, ElementTypeEnum, SuccessfulOperationEnum } from '../../../shared/enums';
import * as actions from '../../../store/actions/bankActions';
//import * as locationActions from '../../../store/actions/locationActions';
import * as authActions from '../../../store/actions/authActions';
import * as uploadActions from '../../../store/actions/uploadActions';
import { AppState } from '../../../store';
import { Bank } from '../../../models/Bank.model';
import { Dictionary, FormControlElement, FormControlElementContent } from '../../../shared/types';
import * as Constants from '../../../shared/constants';

interface StoreProps {
    loggedIn: boolean
    token: string,
    uploadedPercentage: number,
    logoPath: string,
    loading: boolean,
    successfulOperation: SuccessfulOperationEnum,
};

const initialFormState: Dictionary<FormControlElementContent> = {
    name: {
        elementType: ElementTypeEnum.Input,
        elementConfig: {
            type: ElementConfigTypeEnum.Text,
            placeholder: 'Name',
        },
        value: '',
        validation: {
            required: true
        },
        valid: false
    },
    //grade: {
    //    elementType: ElementTypeEnum.Input,
    //    elementConfig: {
    //        type: ElementConfigTypeEnum.Number,
    //        placeholder: 'Grade',
    //        maxLength: 1
    //    },
    //    value: '',
    //    validation: {
    //        maxLength: 1,
    //        max: 5
    //    },
    //    valid: true
    //}
    grade: {
        elementType: ElementTypeEnum.Select,
        elementConfig: {
            placeholder: 'Grade',
            options: [
                { value: '', text: '---' },
                { value: '1', text: 'A' },
                { value: '2', text: 'B' },
                { value: '3', text: 'C' },
                { value: '4', text: 'D' },
                { value: '5', text: 'E' }
            ],
        },
        value: '',
        validation: {
        },
        valid: true
    }
};

const BankNew = memo(() => {

    const { loggedIn, token, uploadedPercentage, logoPath, loading, successfulOperation }: StoreProps = useSelector((state: AppState) => ({
        loggedIn: state.auth.loggedIn,
        token: state.auth.token,
        uploadedPercentage: state.upload.fileUploadPercentage,
        logoPath: state.upload.filePath,
        loading: state.common.isLoading,
        successfulOperation: state.common.successfulOperation
    }));
    const dispatch = useDispatch();

    const location = useLocation();
    const [formControls, setFormControls] = useState(initialFormState);
    //const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const logoFileUploader = useRef<HTMLInputElement | null>(null);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [redirect, setRedirect] = useState<ReactElement>();

    useEffect(() => {
        return () => {
            dispatch(uploadActions.reset());
        }
    }, []);

    const logo = useMemo(() => {
        if (logoPath) {
            const fileManagerUrl = Constants.FILE_MANAGER_URL;
            return (
                <div className={classes.ImageUploader}>
                    <img src={`${fileManagerUrl}/Resources/Images/Banks/${logoPath}`} className="img-response" />
                    <div>
                        <img className={classes.DeleteImage} src='/images/delete.png' alt="Delete Image"
                            onClick={() => deleteLogoHandler()} />
                    </div>
                </div>
            );
        }
        else {
            return (
                <img src='images/no-image.png' className={["img-response", classes.NoImage].join(' ')} />
            );
        }
    }, [logoPath]);

    const deleteLogoHandler = () => {
        if (logoFileUploader) {
            logoFileUploader.current!.value = '';
        }
        dispatch(uploadActions.reset());
    };

    useEffect(() => {
        if (!loggedIn) {
            dispatch(authActions.setAuthRedirectPath(location.pathname));
            setRedirect(<Redirect to="/auth/" />);
        }
    }, [loggedIn]);

    useEffect(() => {
        setIsFormValid(ValidateForm(formControls));
    }, [formControls]);

    useEffect(() => {
        if (successfulOperation === SuccessfulOperationEnum.Insert) {
            cancelHandler();
        }
    }, [successfulOperation]);

    const elementHandler = (event: FormEvent, id: string) => {
        setFormControls(getUpdatedForm(event, formControls, id));
    };

    const uploadImageHandler = useCallback((event) => {
        const files = event.target.files;
        if (files.length == 0) {
            return;
        }
        dispatch(actions.uploadBankLogo(files[0], token))
    }, []);

    const cancelHandler = useCallback(() => {
        setRedirect(<Redirect to="/banks/" />);
    }, [setRedirect]);

    const saveHandler = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const bank: Bank = {
            id: 0,
            name: formControls.name.value.toString(),
            grade: (formControls.grade.value ? parseInt(formControls.grade.value.toString()) : undefined),
            logoUrl: logoPath
        };
        dispatch(actions.saveBank(bank, token));
    };

    const formElements = getFormElements(formControls).map((formElement: FormControlElement) => (
        <FormElement formElement={formElement}
            key={formElement.id}
            onChange={(event) => elementHandler(event, formElement.id)}
            onLostFocus={(event) => elementHandler(event, formElement.id)}
        />
    ));

    return (
        <div className={classes.BankNew}>
            {redirect}
            <form onSubmit={saveHandler}>
                {formElements}
                <div className="row">
                    <div className="col-12 ">
                        {logo}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 ">
                        <input type="file" id="customFile" className="form-control-file border"
                            accept="image/*" onChange={uploadImageHandler} ref={logoFileUploader} />
                    </div>
                </div>
                {
                    uploadedPercentage &&
                    <div className="row">
                        <div className="col-12">
                            <progress id="file" value={uploadedPercentage} max="100"></progress>
                            <small className="align-top"> {uploadedPercentage}%</small>
                        </div>
                    </div>
                }
                <div className="row">
                    <div className="col-12 text-center">
                        <button className="btn btn-primary" type="reset">Clear</button>
                        <button className="btn btn-success" type="submit"
                            disabled={!isFormValid || loading}>Save</button>
                        <button className="btn btn-warning" type="button" onClick={cancelHandler}> Cancel</button >
                    </div>
                </div>
            </form>
        </div>
    );
});

export default BankNew;
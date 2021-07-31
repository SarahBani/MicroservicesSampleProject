import * as React from 'react';
import { useState, useEffect, useCallback, useMemo, memo, FC, ReactElement, useRef } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormEvent } from 'react';

import * as classes from './BankEdit.module.scss';
import { getUpdatedForm, getFormElements, ValidateForm } from '../../../shared/utility';
import FormElement from '../../UI/FormElement/FormElement';
import ConfirmDelete from '../../UI/ConfirmDelete/ConfirmDelete';
import Modal from '../../UI/Modal/Modal';
import { SuccessfulOperationEnum, FailedOperationEnum, ElementTypeEnum, ModalTypeEnum, ElementConfigTypeEnum } from '../../../shared/enums';
import * as actions from '../../../store/actions/bankActions';
import * as authActions from '../../../store/actions/authActions';
//import * as locationActions from '../../../store/actions/locationActions';
import * as uploadActions from '../../../store/actions/uploadActions';
import { Dictionary, FormControlElement, FormControlElementContent } from '../../../shared/types';
import { AppState } from '../../../store';
import { Bank } from '../../../models/Bank.model';
import * as Constants from '../../../shared/constants';

interface StoreProps {
    bank: Bank,
    loggedIn: boolean,
    token: string,
    uploadedPercentage: number,
    logoFilePath: string,
    loading: boolean,
    successfulOperation: SuccessfulOperationEnum,
    failedOperation: FailedOperationEnum
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
    //    },
    //    value: '',
    //    validation: {
    //        required: true
    //    },
    //    valid: false
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

const BankEdit: FC<{ id: number }> = memo(({ id }) => {

    const { bank, loggedIn, token, uploadedPercentage, logoFilePath, loading, successfulOperation, failedOperation }: StoreProps = useSelector((state: AppState) => ({
        bank: state.bank.selectedBank,
        loggedIn: state.auth.loggedIn,
        token: state.auth.token,
        uploadedPercentage: state.upload.fileUploadPercentage,
        logoFilePath: state.upload.filePath,
        loading: state.common.isLoading,
        successfulOperation: state.common.successfulOperation,
        failedOperation: state.common.failedOperation
    }));
    const dispatch = useDispatch();
    const location = useLocation();
    const [formControls, setFormControls] = useState(initialFormState);
    const [logoUrl, setLogoUrl] = useState<string | undefined>();
    const logoFileUploader = useRef<HTMLInputElement | null>(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [redirect, setRedirect] = useState<ReactElement>();
    const [isDeleteConfirmShown, setIsDeleteConfirmShown] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        if (failedOperation && failedOperation === FailedOperationEnum.FetchBank) {
            setRedirect(<Redirect to={'/banks'} />);
        }
    }, [failedOperation]);

    useEffect(() => {
        if (!loggedIn) {
            dispatch(authActions.setAuthRedirectPath(location.pathname));
            setRedirect(<Redirect to="/auth/" />);
        }
    }, [loggedIn]);

    useEffect(() => {
        if (!bank) {
            dispatch(actions.fetchBank(id));
        }
        return () => {
            dispatch(uploadActions.reset());
        };
    }, [id]);

    useEffect(() => {
        setLogoUrl(() => logoFilePath);
    }, [logoFilePath]);

    useEffect(() => {
        let updatedForm = {
            ...formControls
        };
        if (bank && updatedForm && isInitializing) {
            updatedForm = {
                ...updatedForm,
                ['name']: {
                    ...updatedForm['name'],
                    value: bank.name,
                    valid: true
                },
                ['grade']: {
                    ...updatedForm['grade'],
                    value: bank.grade?.toString() ?? '',
                    valid: true
                },
            };
            setIsInitializing(false);
            setLogoUrl(() => bank!.logoUrl);
        }
        setFormControls(updatedForm);
    }, [bank]);

    const logo = useMemo(() => {
        if (isInitializing) {
            return;
        }
        if (logoUrl) {
            const fileManagerUrl = Constants.FILE_MANAGER_URL;
            return (
                <div className={classes.ImageUploader}>
                    <img src={`${fileManagerUrl}/Resources/Images/Banks/${logoUrl}`} className="img-response" />
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
    }, [logoUrl]);

    const deleteLogoHandler = () => {
        if (logoFileUploader) {
            logoFileUploader.current!.value = '';
        }
        dispatch(uploadActions.reset());
    };

    useEffect(() => {
        setIsFormValid(ValidateForm(formControls));
    }, [formControls]);

    useEffect(() => {
        switch (successfulOperation) {
            case SuccessfulOperationEnum.Update:
                cancelHandler();
                break;
            case SuccessfulOperationEnum.Delete:
                setRedirect(<Redirect to="/banks/" />);
                break;
        }
    }, [successfulOperation]);

    const elementHandler = (event: FormEvent, id: string): void => {
        setFormControls(getUpdatedForm(event, formControls, id));
    };

    const uploadImageHandler = useCallback((event) => {
        const files = event.target.files;
        if (files.length == 0) {
            return;
        }
        dispatch(actions.uploadBankLogo(files[0], token))
    }, []);

    const cancelHandler = useCallback((): void => {
        setRedirect(<Redirect to={`/banks/${id}`} />);
    }, [id, setRedirect]);

    const saveHandler = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const bank: Bank = {
            id: id,
            name: formControls.name.value.toString(),
            grade: (formControls.grade.value ? parseInt(formControls.grade.value.toString()) : undefined),
            logoUrl: logoUrl
        };
        dispatch(actions.saveBank(bank, token));
    };

    const deleteConfirmContent = useMemo((): ReactElement => {
        return (
            <Modal isShown={isDeleteConfirmShown} type={ModalTypeEnum.Component}>
                <ConfirmDelete onOK={() => confirmDeleteHandler(true)}
                    onCancel={() => confirmDeleteHandler(false)} />
            </Modal>
        );
    }, [isDeleteConfirmShown]);

    const deleteHandler = useCallback((): void => {
        setIsDeleteConfirmShown(true);
    }, [setIsDeleteConfirmShown]);

    const confirmDeleteHandler = useCallback((isConfirmed): void => {
        if (isConfirmed) {
            dispatch(actions.deleteBank(id, token));
        }
        setIsDeleteConfirmShown(false);
    }, [id, token, setIsDeleteConfirmShown]);

    const formElements: ReactElement[] = getFormElements(formControls).map((formElement: FormControlElement) => (
        <FormElement formElement={formElement}
            key={formElement.id}
            onChange={(event) => elementHandler(event, formElement.id)}
            onLostFocus={(event) => elementHandler(event, formElement.id)}
        />));

    return (
        <div className={classes.BankEdit}>
            {redirect}
            {deleteConfirmContent}

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
                        <button className="btn btn-primary" type="reset" >Clear</button>
                        <button className="btn btn-success" type="submit" disabled={!isFormValid || loading}>Save</button>
                        <button className="btn btn-danger" type="button" onClick={deleteHandler}> Delete</button >
                        <button className="btn btn-warning" type="button" onClick={cancelHandler}> Cancel</button >
                    </div>
                </div>
            </form>
        </div>
    );
});

export default BankEdit;
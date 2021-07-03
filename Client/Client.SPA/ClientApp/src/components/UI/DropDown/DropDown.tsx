import * as React from 'react';
import { useState, useEffect, useMemo, useCallback, useRef, Fragment, FC, ReactElement, FocusEventHandler } from 'react';

import * as classes from './DropDown.module.scss';

export interface DropDownItem {
    id: string,
    text: string,
    imageUrl?: string
}

interface Props {
    id: string,
    data: DropDownItem[],
    value: string,
    title?: string,
    placeholder?: string,
    disabled?: boolean,
    className?: string,
    onSelect: (id: string) => void,
    onBlur?: FocusEventHandler
};

const DropDown: FC<Props> = (props) => {

    const initialItem: DropDownItem = {
        id: '',
        text: props.placeholder ? '--- Select ' + props.placeholder + ' ---' : '------'
    };
    const [selectedItem, setSelectedItem] = useState<DropDownItem>(null);
    const [label, setLabel] = useState(null);
    const [idAttribute, setIdAttribute] = useState(null);
    const itemListControl = useRef<HTMLUListElement>();

    const listItems = useMemo(() => {
        const list: ReactElement[] = props.data?.map(item =>
            <li className={['dropdown-item', (selectedItem?.id === item.id ? classes.SelecedItem : '')].join(' ')}
                key={item.id} id={item.id} onClick={() => selectHandler(item)}>
                {item.imageUrl && <img src={item.imageUrl} />}
                {item.text}
            </li>);
        list?.unshift(
            <li className={['dropdown-item', (!selectedItem ? classes.SelecedItem : '')].join(' ')}
                key={initialItem.id} id={initialItem.id} onClick={() => selectHandler(initialItem)}
            /*style={{ paddingLeft: '30px' }}*/ >
                {initialItem.text}
            </li>);
        return list;
    }, [props.data, selectedItem]);

    useEffect(() => {
        if (props.data?.length === 0) {
            setSelectedItem(null);
        }
        else {
            if (props.value != '') {
                const item: DropDownItem = props.data?.filter(q => q.id === props.value)[0];
                setSelectedItem(item);
            }
            else {
                setSelectedItem(null);
            }
        }
    }, [props.data]);

    useEffect(() => {
        if (props.title) {
            setLabel(<label htmlFor={props.title}>{props.title}: </label>);
            setIdAttribute(` id='${props.title}' `);
        }
    }, [props.title]);

    const selectHandler = useCallback((item) => {
        setSelectedItem(item);
        props.onSelect(item?.id);
    }, [props.onSelect, setSelectedItem]);

    const filterHandler = useCallback((event) => {
        const key: string = event.key.toLowerCase();
        const filteredData: DropDownItem[] = props.data?.filter(q => q.text.toLowerCase().startsWith(key))
        if (filteredData.length > 0) {
            const ul: HTMLUListElement = itemListControl.current;
            const li: HTMLLIElement = ul.querySelector(`li[id="${filteredData[0].id}"]`);
            ul.scrollTop = li.offsetTop;
        }
    }, [props.data]);

    return (
        <Fragment>
            {label}
            <div id={props.id} className={["dropdown", classes.DropDown, props.className].join(' ')}
                onKeyDown={(event) => filterHandler(event)}
                onBlur={props.onBlur}>
                <button type="button" className="btn dropdown-toggle"
                    data-toggle="dropdown" disabled={props.disabled}>
                    <div>{selectedItem?.text ?? initialItem.text}</div>
                </button>
                <ul ref={itemListControl} className="dropdown-menu">
                    {listItems}
                </ul>
            </div>
        </Fragment>
    );
};

export default DropDown;
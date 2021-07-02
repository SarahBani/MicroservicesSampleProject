import * as React from 'react';
import { useState, useEffect, useMemo, useCallback, useRef, Fragment, FC, ReactElement } from 'react';

import * as classes from './DropDown.module.scss';

export interface DropDownItem {
    id: string,
    text: string,
    imageUrl?: string
}

interface Props {
    data: DropDownItem[],
    title: string,
    value: string,
    placeholder: string,
    disabled: boolean,
    onSelect: (id: string) => void
};

const DropDown: FC<Props> = ({ data, title, value, placeholder, disabled, onSelect }) => {

    const initialItem: DropDownItem = {
        id: '',
        text: placeholder ? '--- Select ' + placeholder + ' ---' : '------'
    };
    const [selectedItem, setSelectedItem] = useState<DropDownItem>(null);
    const [label, setLabel] = useState(null);
    const [idAttribute, setIdAttribute] = useState(null);
    const itemListControl = useRef<HTMLUListElement>();

    const listItems = useMemo(() => {
        const list: ReactElement[] = data?.map(item =>
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
    }, [data, selectedItem]);

    useEffect(() => {
        if (data?.length === 0) {
            setSelectedItem(null);
        }
        else {
            if (value != '') {
                const item: DropDownItem = data?.filter(q => q.id === value)[0];
                setSelectedItem(item);
            }
            else {
                setSelectedItem(null);
            }
        }
    }, [data]);

    useEffect(() => {
        if (title) {
            setLabel(<label htmlFor={title}>{title}: </label>);
            setIdAttribute(` id='${title}' `);
        }
    }, [title]);

    const selectHandler = useCallback((item) => {
        setSelectedItem(item);
        onSelect(item?.id);
    }, [onSelect, setSelectedItem]);

    const filterHandler = useCallback((event) => {
        const key: string = event.key.toLowerCase();
        const filteredData: DropDownItem[] = data?.filter(q => q.text.toLowerCase().startsWith(key))
        if (filteredData.length > 0) {
            const ul: HTMLUListElement = itemListControl.current;
            const li: HTMLLIElement = ul.querySelector(`li[id="${filteredData[0].id}"]`);
            ul.scrollTop = li.offsetTop;
        }
    }, [data]);

    return (
        <Fragment>
            {label}
            <div id={title} className={["dropdown", classes.DropDown].join(' ')}
                onKeyDown={(event) => filterHandler(event)}>
                <button type="button" className="btn dropdown-toggle"
                    data-toggle="dropdown" disabled={disabled}>
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
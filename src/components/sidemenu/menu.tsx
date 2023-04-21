import React from 'react'
import {useSelector} from 'react-redux'
// components
import SideMenu from '@/components//sidemenu/sidemenu'
import NavItem from '@/components/sidemenu/NavItem'
// types
import {RootState} from '@/slices'
import Book from '@/types/book'
import Toc from '@/types/toc'
import {MenuControl} from '@/lib/useMenu'

const Nav = ({control, onToggle, onLocation}: Props, ref: any) => {

    const bookToc = useSelector<RootState, Toc[]>(state => state.book.toc);

    /** Click nav item */
    const onClickItem = (loc: string, idx: number) => {
        onLocation(loc);
        onToggle();
    }

    const Tocs = bookToc.map((t, idx) =>
        <NavItem
            key={idx}
            chap={t.href}
            message={t.label}
            onClick={() => onClickItem(t.href, idx)}
        />
    );


    return (<>
        {control.display &&
            <SideMenu title="Contents"
                      show={control.open}
                      onClose={onToggle}
                      ref={ref}>
                {Tocs}
            </SideMenu>
        }
    </>);
}

interface Props {
    control: MenuControl;
    onToggle: () => void;
    onLocation: (loc: string) => void;
}

export default React.forwardRef(Nav)
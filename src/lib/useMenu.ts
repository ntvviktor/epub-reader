import {useCallback, useEffect, useState} from "react";

function useMenu(ref: { current: any }, delay: number) {
    const [eventSignal, setEventSignal] = useState<boolean>(true);
    const [control, setControl] = useState<MenuControl>({
        display: false,
        open: false,
    });

    const onToggle = useCallback(() => {
        let event: any = null;
        window.clearTimeout(event);
        if (!control.display) {
            setControl({display: true, open: false});
            event = window.setTimeout(
                () => setControl({display: true, open: true}),
                0
            );
        } else {
            setControl({display: true, open: false});
            event = window.setTimeout(
                () => setControl({display: false, open: false}),
                delay - 50
            );
        }
    }, [control.display, delay]);

    const onClose = useCallback(
        (e: any) => {
            if (!ref || !ref.current) return;
            if (!e.composedPath().includes(ref.current)) {
                onToggle();
            }
        },
        [ref, onToggle]
    );

    const emitEvent = useCallback(() => {
        window.setTimeout(() => setEventSignal(true), 300);
    }, [setEventSignal]);

    useEffect(() => {
        if (!eventSignal && control.display) return;
        setEventSignal(false);
    }, [control.display, onClose, eventSignal]);

    return [control, onToggle, emitEvent] as const;
}

export type MenuControl = {
    display: boolean;
    open: boolean;
};

export default useMenu;

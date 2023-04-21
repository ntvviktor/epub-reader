import React, {useCallback, useEffect, useRef, useState,} from 'react'
import {Book, Rendition} from 'epubjs'
import {EpubViewerProps, ViewerRef} from '@/types';
import Toc from '@/types/toc';
import Loc from '@/types/loc';
import {Container, forwardRef} from '@chakra-ui/react';
import "@fontsource/atkinson-hyperlegible";

const EpubViewer = (
    {
        url,
        epubFileOptions,
        epubOptions,
        location,
        bookChanged,
        rendtionChanged,
        pageChanged,
        tocChanged,
    }: EpubViewerProps,
    ref: React.RefObject<ViewerRef> | any,
) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [book, setBook] = useState<Book | null>(null);
    const [rendition, setRendition] = useState<Rendition | null>(null);
    const currentCfi = useRef<string>('');

    const movePage = useCallback(
        (type: 'PREV' | 'NEXT') => {
            if (!rendition) return;
            if (type === 'PREV') rendition.prev();
            else rendition.next();
        },
        [rendition],
    );

    const handleKeyPress = useCallback(
        ({key}: any) => {
            key && key === 'ArrowLeft' && movePage('PREV');
            key && key === 'ArrowRight' && movePage('NEXT');
        },
        [movePage],
    );

    const onLocationChange = useCallback(
        (loc: Loc) => {
            const startCfi = loc && loc.start;
            const endCfi = loc && loc.end;
            const base = loc && loc.start.slice(8).split('!')[0];

            if (!book) return;

            const spineItem = book.spine.get(startCfi);
            const navItem = book.navigation.get(spineItem.href);
            const chapterName = navItem && navItem.label.trim();

            const locations: any = book.locations;
            const currentPage = locations.locationFromCfi(startCfi);
            const totalPage = locations.total;

            pageChanged &&
            pageChanged({
                chapterName,
                currentPage,
                totalPage,
                startCfi,
                endCfi,
                base,
            });

            currentCfi.current = startCfi;
        },
        [book, pageChanged]
    );

    const registerGlobalFunc = useCallback(() => {
        if (!ref.current) return;
        if (movePage) {
            ref.current.prevPage = () => movePage('PREV');
            ref.current.nextPage = () => movePage('NEXT');
        }
        ref.current.getCurrentCfi = () => currentCfi.current;
        if (rendition) {
            ref.current.setLocation = (location: string) =>
                rendition.display(location);
        }
    }, [ref, rendition, movePage])

    useEffect(() => {
        if (!ref) {
            throw new Error(
                '[React-Epub-Viewer] Put a ref argument that has a ViewerRef type.',
            );
        }
    }, [ref]);

    useEffect(() => {
        if (!url) return;

        let mounted: boolean = true;
        let book_: Book | any = null;

        if (!mounted) return;

        if (book_) {
            book_.destroy();
        }

        book_ = new Book(url, epubFileOptions);

        setBook(book_);

        return () => {
            mounted = false;
        };
    }, [url, epubFileOptions, setBook, setIsLoaded]);

    /** Book Changed */
    useEffect(() => {
        if (!book) return;

        if (bookChanged) bookChanged(book);

        book.loaded.navigation.then(({toc}) => {
            const toc_: Toc[] = toc.map(t => ({
                label: t.label,
                href: t.href,
            }));

            setIsLoaded(true);
            if (tocChanged) tocChanged(toc_);
        });

        book.ready
            .then(function () {
                if (!book) return;

                const stored = localStorage.getItem(book.key() + '-locations');
                if (stored) {
                    return book.locations.load(stored);
                } else {
                    return book.locations.generate(1024);
                }
            })
            .then(() => {
                if (!book) return;
                localStorage.setItem(book.key() + '-locations', book.locations.save());
            })

    }, [book, bookChanged, tocChanged]);

    /** Rendition Changed */
    useEffect(() => {
        if (!rendition) return;
        if (rendtionChanged) rendtionChanged(rendition);
    }, [rendition, rendtionChanged]);

    useEffect(() => {
        if (!ref.current || !location) return;
        if (ref.current.setLocation) ref.current.setLocation(location);
    }, [ref, location]);

    useEffect(() => {
        if (!rendition) return;

        // Emit global control function
        registerGlobalFunc();

        document.addEventListener('keyup', handleKeyPress, false);
        rendition.on('keyup', handleKeyPress);
        rendition.on('locationChanged', onLocationChange);

        return () => {
            document.removeEventListener('keyup', handleKeyPress, false);
            rendition.off('keyup', handleKeyPress);
            rendition.off('locationChanged', onLocationChange);
        };
    }, [rendition, registerGlobalFunc, handleKeyPress, onLocationChange]);

    useEffect(() => {
        if (!rendition) return;

        if (rendtionChanged) rendtionChanged(rendition);
    }, [rendition, rendtionChanged]);

    /** Viewer Option Changed */
    useEffect(() => {
        let mounted = true;
        if (!book) return;
        const node = ref.current;
        if (!node) return;
        node.innerHTML = '';


        book.ready.then(function () {
            if (!mounted) return;

            if (book.spine) {
                const loc = book.rendition?.location?.start?.cfi;
                const rendition_ = book.renderTo(node, {
                    width: '100%',
                    height: '100%',
                    ...epubOptions,
                });
                setRendition(rendition_);

                rendition_.flow('scrolled-doc');
                rendition_.spread('auto');

                if (loc) {
                    rendition_.display(loc);
                } else {
                    rendition_.display();
                }
            }
        });

        return () => {
            mounted = false;
        };
    }, [ref, book, epubOptions, setRendition]);

    return (
        <Container 
        position={"relative"} 
        maxW={['2xl','3xl']} 
        mt={'5'} 
        mb={'24'}
        ref={ref} 
        centerContent>
        </Container>
    )
}

export default forwardRef(EpubViewer)
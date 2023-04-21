import React, {forwardRef, useEffect, useState} from "react";
import {Book, Rendition} from "epubjs";
import EpubViewer from "@/modules/EpubViewer/EpubViewer";
import {ReactViewerProps, ViewerRef} from "@/types";
import BookType from "@/types/book";

const ReactViewer = (
    {url, onBookInfoChange, onPageChange, onTocChange}: ReactViewerProps,
    ref: React.RefObject<ViewerRef> | any
) => {
    // TODO Fix the ref type correctly instead 'any' type.
    const [book, setBook] = useState<Book | null>(null);

    const [rendition, setRendition] = useState<Rendition | null>(null);

    const bookChanged = (book: Book) => setBook(book);

    const rendtionChanged = (rendition: Rendition) => setRendition(rendition);

    /** Ref checker */
    useEffect(() => {
        if (!ref) {
            throw new Error(
                "[React-Epub-Viewer] Put a ref argument that has a ViewerRef type."
            );
        }
    }, [ref]);

    /** Epub parsing */
    // TODO Fix the infinite re-rendering issue, when inlcude `onBookInfoChange` to dependencies array.
    /* eslint-disable */
    useEffect(() => {
        if (!book) return;

        Promise.all([book.loaded.metadata, book.opened])
            .then(([metaData, bookData]: any[]) => {
                const newBookData: BookType = {
                    coverURL: bookData.archive.urlCache[bookData.cover],
                    title: metaData.title,
                    description: metaData.description,
                    author: metaData.creator,
                    publisher: metaData.publisher,
                    language: metaData.language,
                    published_date: "",
                    modified_date: "",
                };

                onBookInfoChange && onBookInfoChange(newBookData);
            })
            .catch((error) => {
                throw `${error.stack} \n\n Message : Epub parsing failed.`;
            });
    }, [book]);
    /* eslint-enable */


    /**
     * Change the font, try better hooks to change
     */
    useEffect(() => {
        if (!rendition) return;

        const iframe = ref.current.querySelector('iframe');
        if (!iframe) return;
        const doc = iframe.contentWindow.document;
        const link1 = doc.createElement('link');
        link1.rel = 'preconnect';
        link1.href = 'https://fonts.googleapis.com'
        const link2 = doc.createElement('link');
        link2.rel = 'preconnect';
        link2.href = 'https://fonts.gstatic.com';
        link2.crossorigin = true;
        const link3 = doc.createElement('link');
        link3.rel = 'stylesheet';
        link3.href = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible&display=swap'
        doc.head.appendChild(link1);
        doc.head.appendChild(link2);
        doc.head.appendChild(link3);

        const newStyle = {
            body: {
                'font-size': `16px !important`,
                'font-family': '\'Atkinson Hyperlegible\' !important',
                'margin': 'auto !important',
            },
        };

        rendition.themes.register('default', newStyle);
        rendition.themes.select('main');
    })

    return (
        <EpubViewer
            url={url}
            bookChanged={bookChanged}
            rendtionChanged={rendtionChanged}
            tocChanged={onTocChange}
            pageChanged={onPageChange}
            ref={ref}
        />
    );
};

export default forwardRef(ReactViewer);
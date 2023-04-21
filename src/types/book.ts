type Book = {
    coverURL: string;
    title: string;
    description: string;
    published_date: string;
    modified_date: string;
    author: string;
    publisher: string;
    language: string;
}

export type BookStyle = {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
    marginalHorizontal: number;
    marginalVertical: number;
}

export type BookOption = {
    flow: 'scrolled-doc';
    resizeOrientationChange: boolean;
    spread: "auto" | "none";
}

export default Book
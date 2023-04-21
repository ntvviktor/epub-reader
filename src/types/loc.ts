type EpubCFI = string;

interface Loc {
    index: number;
    href: string;
    start: EpubCFI;
    end: EpubCFI;
    percentage: number
}

export default Loc
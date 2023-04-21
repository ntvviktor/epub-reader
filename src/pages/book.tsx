import { useContext, useRef } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Menu from "@/components/sidemenu/menu";
import { Provider, useDispatch, useSelector } from "react-redux";
import ReactViewer from "@/modules/ReactViewer/ReactViewer";
import store, { RootState } from "@/slices";
import { updateBook, updateCurrentPage, updateToc } from "@/slices/book";
import useMenu from "@/lib/useMenu";
import { ViewerRef } from "@/types";
import BookType from "@/types/book";
import Page from "@/types/page";
import Toc from "@/types/toc";
import Head from "next/head";
import { UserContext } from "@/lib/context";
import { Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SignInButton } from "@/components/enter";

const Reader = ({ url }: Props) => {
  const dispatch = useDispatch();
  const currentLocation = useSelector<RootState, Page>(
    (state) => state.book.currentLocation
  );

  const viewerRef = useRef<ViewerRef | any>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  const [navControl, onNavToggle] = useMenu(navRef, 300);

  const onBookInfoChange = (book: BookType) => dispatch(updateBook(book));

  const onLocationChange = (loc: string) => {
    if (!viewerRef.current) return;
    viewerRef.current.setLocation(loc);
  };

  const onPageMove = (type: "PREV" | "NEXT") => {
    const node = viewerRef.current;
    if (!node || !node.prevPage || !node.nextPage) return;

    type === "PREV" && node.prevPage();
    type === "NEXT" && node.nextPage();
  };
  const onTocChange = (toc: Toc[]) => dispatch(updateToc(toc));
  const onPageChange = (page: Page) => dispatch(updateCurrentPage(page));

  return (
    <main style={{ marginTop: "5rem" }}>
      <div>
        <Head>
          <title>WillRead</title>
          <meta name="description" content="Epub Reader" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/icon.png?v=2" />
        </Head>
        <Header onNavToggle={onNavToggle} />
        <ReactViewer
          url={url}
          onBookInfoChange={onBookInfoChange}
          onPageChange={onPageChange}
          onTocChange={onTocChange}
          ref={viewerRef}
        />
      </div>
      <Footer
        title={currentLocation.chapterName}
        nowPage={null}
        totalPage={null}
        onPageMove={onPageMove}
      />
      <Menu
        control={navControl}
        onToggle={onNavToggle}
        onLocation={onLocationChange}
        ref={navRef}
      />
    </main>
  );
};

const ReaderWrapper = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const url = router.query.link as string;
  return (
    <>
      {user && (
        <Provider store={store}>
          <Reader url={url} />
        </Provider>
      )}
      {!user && (
        <Center
          position={"fixed"}
          left={"50%"}
          top={"50%"}
          transform={"translateX(-50%)"}
        >
          <SignInButton />
        </Center>
      )}
    </>
  );
};

interface Props {
  url: string;
}

export default ReaderWrapper;

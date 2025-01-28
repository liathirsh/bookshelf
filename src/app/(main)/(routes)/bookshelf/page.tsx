import Bookshelf from "../../_components/bookshelf/bookshelf";

const BookshelfRoute = () => {
    return (
        <div className="min-h-full flex flex-col">
            <div className="flex flex-col items-center justify-center text-center md:justify-start gap-y-8 flex-1 px-6 pb-10">
              <Bookshelf />
            </div> 
        </div>
    )
}

export default BookshelfRoute;
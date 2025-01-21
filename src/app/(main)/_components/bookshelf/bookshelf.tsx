import CurrentReadingWrapper from "./CurrentReadingWrapper";
import ReadBooks from "./read-books";
import WantToRead from "./want-to-read";


const Bookshelf = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
                <WantToRead />
            </div>
            <div className="flex flex-row items-center gap-2">
                <CurrentReadingWrapper />
            </div>
            <div className="flex flex-row items-center gap-2">
                <ReadBooks />
            </div>
        </div>
    )
}

export default Bookshelf;
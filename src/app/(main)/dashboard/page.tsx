import  CurrentReading  from "../_components/bookshelf/current-reading";
import  Feed  from "../_components/community/feed";
import  Recommendations  from "../_components/recommendations";
import BookshelfPreview from "../_components/bookshelf/bookshelf-preview";

export default function DashboardPage() {
    return (
      <div className="grid grid-cols-12 gap-4">
        <section className="col-span-12 lg:col-span-3">
          <CurrentReading />
        </section>
        <section className="col-span-12 lg:col-span-6">
          <Feed />
        </section>
        <section className="col-span-12 lg:col-span-3 space-y-6">
          <Recommendations />
          <BookshelfPreview />
        </section>
    </div>
  );
}


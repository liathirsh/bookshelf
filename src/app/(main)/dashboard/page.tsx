import Shelf from "../_components/bookshelf/shelf";
import  Feed  from "../_components/community/feed";
import  Recommendations  from "../_components/recommendations";

export default function DashboardPage() {
    return (
      <div className="grid grid-cols-12 gap-4">
        <section className="col-span-12 lg:col-span-3">
          <Shelf status="currentlyReading" heading="Currently Reading" />
        </section>
        <section className="col-span-12 lg:col-span-6">
          <Feed />
        </section>
        <section className="col-span-12 lg:col-span-3 space-y-6">
          <Recommendations />
        </section>
    </div>
  );
}


import Shelf from "../_components/bookshelf/shelf";
import  Feed  from "../_components/community/feed";
import  Recommendations  from "../_components/recommendations";
import { getAuthenticatedUser } from "@/lib/auth";

export default async function DashboardPage() {

  const decodedToken = await getAuthenticatedUser();

    return (
      <div className="grid grid-cols-12 gap-4">
        <section className="col-span-12 lg:col-span-3">
          <Shelf status="currentlyReading" heading="Currently Reading" variant="dashboard" userId={decodedToken.uid} />
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


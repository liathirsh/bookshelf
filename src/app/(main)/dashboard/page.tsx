import Shelf from "../_components/bookshelf/shelf";
import  Feed  from "../_components/community/feed";
import { getAuthenticatedUser } from "@/lib/auth";

export default async function DashboardPage() {

  const decodedToken = await getAuthenticatedUser();

    return (
      <div className="grid grid-cols-12 gap-6 p-8">
        <section className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Shelf status="currentlyReading" heading="Currently Reading" variant="dashboard" userId={decodedToken.uid} />
          </div>
        </section>
        <section className="col-span-12 lg:col-span-9">
          <Feed />
        </section>
      </div>
    );
}


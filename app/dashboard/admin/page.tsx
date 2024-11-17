import Users from '@/app/ui/dashboard/users';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { UsersSkeleton } from '@/app/ui/skeletons';
export default async function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Admin Dashboard
            </h1>
            {/* TODO: could add information like number of job favourites, number of jobs, etc. */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<UsersSkeleton />}>
                    <Users/>
                </Suspense>
            </div>
        </main>
    );
}
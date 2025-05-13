"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetSeriesQuery } from "@/redux/features/series/seriesApi";

export default function SeriesPage() {
    const router = useRouter();
    const page = Number(router?.query?.page) || 1;

    const { data, isLoading, isError } = useGetSeriesQuery(page);

    if (isLoading) return <p>Loading...</p>;
    if (isError || !data?.data?.series) return <p>Error loading series</p>;

    const { series, next } = data.data;

    return (
        <div className="max-full py-6">
            <h1 className="text-2xl font-bold mb-6 text-blue-900">
                Cricket Series
            </h1>

            <div className="space-y-4">
                {series.map((s) => (
                    <Link href={`/series/${s.id}`} key={s.id} className="mb-4 block">
                        <div className="bg-white shadow hover:shadow-lg transition rounded-lg p-4 cursor-pointer border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {s.name}
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">
                                <span className="capitalize">
                                    {s.playing_format}
                                </span>
                                , {s.playing_level}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Season: {s.season}
                            </p>
                            <div className="flex flex-wrap mt-2 gap-2">
                                {s.teams.map((team) => (
                                    <span
                                        key={team.id}
                                        // className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                                    >
                                        {team.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {next && (
                <div className="mt-6 text-center">
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                        onClick={() => router.push(`/series?page=${page + 1}`)}
                    >
                        Next Page →
                    </button>
                </div>
            )}
        </div>
    );
}

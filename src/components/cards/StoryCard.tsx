import Link from "next/link";

export interface TheirStoryProps {
    id?: number | string;
    image: string;
    type: string;
    date: string;
    title: string;
    author: string;
    storyType: string;
    caption: string;
    kinyarwanda: {
        contents: string;
        title: string;
    };
    english: {
        contents: string;
        title: string;
    };
    french: {
        contents: string;
        title: string;
    };
    file?: string;
}

export default function StoryCard({ props }: { props: TheirStoryProps }) {
    return (<>
        <div className="w-full md:w-1/2 p-3">
            <div className="h-full bg-white rounded-3xl px-6 md:px-12 py-12 border border-gray-200">
                <span className="block text-neutral-600 text-xl font-semibold mb-6 tracking-tight">{props.type}</span>
                <Link className="block text-neutral-800 text-3xl md:text-4xl font-semibold hover:underline mb-3 max-w-sm md:max-w-lg tracking-tight" href={props.type === "Illustrated" && props.file ? props.file : `/stories/${props.id}`} {...(props.type === "Illustrated" && props.file ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{props.title}</Link>
                <p className="text-neutral-600 text-lg font-medium mb-11 max-w-lg tracking-tight">{props.caption}</p>

                <div className="flex flex-wrap gap-6 mb-10">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-200"></div>
                        <p className="text-neutral-600 font-medium tracking-tight">{props.author}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <p className="text-neutral-600 text-xl font-semibold tracking-tight">
                        {new Date(props.date).toLocaleString('en-US', {
                            weekday: 'short',
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        })}
                    </p>
                    {props.type === "Illustrated" && props.file ? (
                        <Link href={props.file} target="_blank" rel="noopener noreferrer" className="inline-flex text-slate-800 justify-center items-center text-center h-16 p-5 font-semibold tracking-tight text-xl hover:text-white focus:text-white bg-white hover:bg-neutral-900 focus:bg-neutral-900 border border-neutral-900 rounded-lg focus:ring-4 focus:ring-neutral-400 transition duration-200">
                            Read File
                        </Link>
                    ) : (<Link href={`/stories/${props.id}`} className="inline-flex text-slate-800 justify-center items-center text-center h-16 p-5 font-semibold tracking-tight text-xl hover:text-white focus:text-white bg-white hover:bg-neutral-900 focus:bg-neutral-900 border border-neutral-900 rounded-lg focus:ring-4 focus:ring-neutral-400 transition duration-200">
                        Read more
                    </Link>)}
                </div>
            </div>
        </div>
    </>
    );
}
import { TableProps } from '@/types/memories';
import Image from 'next/image';

const Table: React.FC<TableProps> = ({ headers, data, onDelete, onPreview, onApproved, onRejected }) => {
    return (
        <div className='bg-white rounded-xl flex flex-col items-center justify-center p-4 w-full'>
            <table className="w-full text-left whitespace-nowrap">
                <thead className=''>
                    <tr className="bg-gray-100 text-black text-sm">
                        {headers.map((header) => (
                            <th key={header} className="p-4">
                                {header.toUpperCase()}
                            </th>
                        ))}
                        <th className="p-4">ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={headers.length + 2} className="text-center">
                                <div className='bg-white rounded-xl flex flex-col items-center justify-center p-4'>
                                    <Image src={'/svgs/empty.svg'} alt='' width={400} height={400} />
                                    <span className='text-slate-700 font-semibold text-base'>No memories found</span>
                                </div>
                            </td>
                        </tr>
                    )}

                    {data.map((memory) => (
                        <tr key={memory.id} className="focus:outline-none h-16 border border-gray-100 rounded-lg bg-white text-black text-sm">
                            <td className={`p-4`}>
                                {memory.firstName}
                            </td>
                            <td className={`p-4`}>
                                {memory.lastName}
                            </td>
                            <td className="p-4">{memory.email}</td>
                            <td className="p-4">{memory.phone}</td>
                            <td className="p-4">{memory.victimFullName}</td>
                            <td className="p-4 max-w-xs truncate" title={memory.memory}>{memory.memory}</td>
                            <td className="p-4 text-sm">
                                {memory.status === 'approved' ? (
                                    <span className="text-white bg-green-500 rounded-lg px-4 py-2 text-xsm">Approved</span>
                                ) : memory.status === 'rejected' ? (
                                    <span className="bg-red-700  rounded-lg px-4 py-2 text-xsm text-white">Rejected</span>
                                ) : (
                                    <span className="bg-yellow-700  rounded-lg px-4 py-2 text-xsm text-white">Pending</span>
                                )}
                            </td>
                            <td className="p-4">
                                <button onClick={() => onApproved && onApproved(memory.id)} title="Approve" className="text-gray-500 hover:text-green-500 bg-green-200 rounded-xl p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path opacity=".34" d="m8.38 11.998 2.41 2.42 4.83-4.84" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.75 2.45c.69-.59 1.82-.59 2.52 0l1.58 1.36c.3.26.86.47 1.26.47h1.7c1.06 0 1.93.87 1.93 1.93v1.7c0 .39.21.96.47 1.26l1.36 1.58c.59.69.59 1.82 0 2.52l-1.36 1.58c-.26.3-.47.86-.47 1.26v1.7c0 1.06-.87 1.93-1.93 1.93h-1.7c-.39 0-.96.21-1.26.47l-1.58 1.36c-.69.59-1.82.59-2.52 0l-1.58-1.36c-.3-.26-.86-.47-1.26-.47H6.18c-1.06 0-1.93-.87-1.93-1.93V16.1c0-.39-.21-.95-.46-1.25l-1.35-1.59c-.58-.69-.58-1.81 0-2.5l1.35-1.59c.25-.3.46-.86.46-1.25V6.2c0-1.06.87-1.93 1.93-1.93h1.73c.39 0 .96-.21 1.26-.47l1.58-1.35Z" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </button>

                                {memory.status !== 'rejected' && (
                                    <button onClick={() => onRejected && onRejected(memory.id)} title="Reject" className="text-gray-700 ml-2 hover:text-red-700 bg-yellow-200 rounded-xl px-3 py-2 text-xs font-semibold">
                                        Reject
                                    </button>
                                )}

                                <button onClick={() => onPreview && onPreview(memory)} className="text-gray-500 ml-2 hover:text-red-500 bg-gray-200 rounded-xl p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>
                                </button>

                                <button onClick={() => onDelete(memory.id)} className="text-gray-500 ml-2 hover:text-red-500 bg-red-200 rounded-xl p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
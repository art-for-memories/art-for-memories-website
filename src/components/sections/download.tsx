import Image from 'next/image'
import React from 'react'
import MobileFrame from './mobile-frame'

function Download() {
    return (<>
        <section className="bg-[#439ace] 2xl:py-24 2xl:bg-white relative">
            <div className='w-full h-10 bg-white rounded-br-3xl rounded-bl-3xl absolute top-0 right-0 left-0'></div>

            <div className="px-4 mx-auto overflow-hidden bg-[#439ace] max-w-7xl sm:px-6 lg:px-16">
                <div className="py-10 sm:py-16 lg:py-24 2xl:pl-24"></div>

                <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-8 2xl:gap-x-20">
                    <div className='pb-20 z-10'>
                        <span className="mb-10 font-semibold text-sm font-heading text-slate-900 capitalize bg-white rounded-full px-4 py-2 inline-block">
                            Art for memories Now Live
                        </span>

                        <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl lg:leading-tight capitalize">
                            Download the App for Enhanced Stories and Memories
                        </h2>

                        <p className="mt-4 text-sm text-gray-50 sm:text-base leading-6">
                            Experience cleared stories and image sharing with our mobile app. Enhanced features and a user-friendly interface designed for your convenience.
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start lg:mt-12 w-full mt-8 gap-4">
                            <a
                                href="https://apps.apple.com/us/app/art-for-memories/id6746222458"
                                title="Open Testing"
                                className="min-w-0"
                                role="button"
                                style={{ minWidth: 0 }}
                            >
                                <Image
                                    width={500}
                                    height={500}
                                    className="w-full max-w-[180px] h-12 sm:h-14 rounded-xl object-contain"
                                    src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/8/btn-app-store.svg"
                                    alt="App Store (TestFlight)"
                                />
                            </a>

                            <a
                                href="https://play.google.com/store/apps/details?id=com.art_for_memories.mobile&hl=en"
                                title="Google Play Store"
                                className="min-w-0"
                                role="button"
                                style={{ minWidth: 0 }}
                            >
                                <Image
                                    width={500}
                                    height={500}
                                    className="w-full max-w-[180px] h-12 sm:h-14 rounded-xl object-contain"
                                    src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/8/btn-play-store.svg"
                                    alt="Google Play Store (Open Testing)"
                                />
                            </a>
                        </div>
                    </div>

                    <div className="relative px-6 sm:px-12 hidden lg:block">
                        <svg
                            className="absolute inset-x-0 bottom-0 left-1/2 -translate-x-1/2 -mb-72 lg:-mb-96 text-[#e6bf5d] w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px]"
                            fill="currentColor"
                            viewBox="0 0 8 8"
                        >
                            <circle cx="4" cy="4" r="3" />
                        </svg>

                        <div className="absolute inset-x-0 bottom-0 md:left-1/2 -translate-x-1/2 -mb-72 lg:-mb-96">
                            <MobileFrame title="" image="/images/screen1.png" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default Download
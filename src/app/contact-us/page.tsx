import Layout from '@/components/Layout'
import Navbar from '@/components/Navbar'
import ContactForm from '@/components/forms/ContactForm'
import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Art for Memories Rwanda for inquiries, collaborations, or support. We are here to help you preserve memories through art.",
  keywords: ["Contact Art for Memories", "Inquiries", "Support", "Art for Memories Rwanda", "art", "memories", "rwanda", "genocide", "survivors"],
};

function ContactUs() {
    return (<>
        <Layout>
            <div className="overflow-x-hidden">
                <Navbar />

                <section className="py-12 md:py-24 md:px-16 bg-neutral-900">
                    <div className="container mx-auto px-4">
                        <h2 className="flex flex-wrap mb-2 pb-14 text-4xl md:text-6xl text-white font-semibold border-b border-neutral-600 font-heading">
                            <span className="mr-4 font-boldonse">Contact us</span>
                        </h2>

                        <h4 className="text-4xl text-white font-semibold tracking-tight font-heading my-10">Do you have any question?</h4>

                        <div className="flex flex-wrap -m-2">
                            <div className="w-full md:w-2/3 p-2">
                                <div className="mb-4 p-10 pb-16 bg-white rounded-3xl">
                                    <div className="max-w-lg">
                                        <h4 className="mb-2 text-5xl font-medium tracking-tight font-heading text-slate-900">Contact</h4>
                                        <p className="mb-12 text-lg text-neutral-600 font-medium tracking-tight">Can create, connect, verify, and search across all you knowledge platforms is one centralized.</p>
                                    </div>
                                    <div className="flex flex-wrap -m-4">
                                        <div className="w-full md:w-1/2 p-4">
                                            <ul>
                                                <li className="mb-6 flex">
                                                    <div className="flex items-center justify-center w-6 h-6 mr-4">
                                                        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M11 24H5C2.243 24 0 21.757 0 19V5C0 2.243 2.243 0 5 0H11C13.757 0 16 2.243 16 5V19C16 21.757 13.757 24 11 24ZM5 2C3.346 2 2 3.346 2 5V19C2 20.654 3.346 22 5 22H11C12.654 22 14 20.654 14 19V5C14 3.346 12.654 2 11 2H5ZM10 19C10 18.448 9.552 18 9 18H7C6.448 18 6 18.448 6 19C6 19.552 6.448 20 7 20H9C9.552 20 10 19.552 10 19Z" fill="#19191B"></path>
                                                        </svg>
                                                    </div><span className="text-xl font-medium tracking-tight text-slate-900">+41 3372 003 00</span>
                                                </li>
                                                <li className="flex">
                                                    <div className="flex items-center justify-center w-6 h-6 mr-4">
                                                        <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M19 0H5C3.67441 0.00158786 2.40356 0.528882 1.46622 1.46622C0.528882 2.40356 0.00158786 3.67441 0 5L0 17C0.00158786 18.3256 0.528882 19.5964 1.46622 20.5338C2.40356 21.4711 3.67441 21.9984 5 22H19C20.3256 21.9984 21.5964 21.4711 22.5338 20.5338C23.4711 19.5964 23.9984 18.3256 24 17V5C23.9984 3.67441 23.4711 2.40356 22.5338 1.46622C21.5964 0.528882 20.3256 0.00158786 19 0ZM5 2H19C19.5988 2.00118 20.1835 2.18151 20.679 2.5178C21.1744 2.85409 21.5579 3.33095 21.78 3.887L14.122 11.546C13.5584 12.1073 12.7954 12.4225 12 12.4225C11.2046 12.4225 10.4416 12.1073 9.878 11.546L2.22 3.887C2.44215 3.33095 2.82561 2.85409 3.32105 2.5178C3.81648 2.18151 4.40121 2.00118 5 2ZM19 20H5C4.20435 20 3.44129 19.6839 2.87868 19.1213C2.31607 18.5587 2 17.7956 2 17V6.5L8.464 12.96C9.40263 13.8963 10.6743 14.422 12 14.422C13.3257 14.422 14.5974 13.8963 15.536 12.96L22 6.5V17C22 17.7956 21.6839 18.5587 21.1213 19.1213C20.5587 19.6839 19.7956 20 19 20Z" fill="#19191B"></path>
                                                        </svg>
                                                    </div><span className="text-xl font-medium tracking-tight text-slate-900">contactcontact@email.com</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="w-full md:w-1/2 p-4">
                                            <ul className="flex flex-wrap md:justify-end -m-1.5">
                                                <li className="p-1.5"><a className="flex items-center justify-center w-12 h-12 bg-neutral-50 hover:bg-opacity-80 rounded-full transition duration-200" href="#">
                                                    {/* <img className="h-5" src="template-assets/images/contact/fb.svg" alt="" /> */}
                                                </a></li>
                                                <li className="p-1.5"><a className="flex items-center justify-center w-12 h-12 bg-neutral-50 hover:bg-opacity-80 rounded-full transition duration-200" href="#">
                                                    {/* <img className="h-5" src="template-assets/images/contact/instagram.svg" alt="" /> */}
                                                </a></li>
                                                <li className="p-1.5"><a className="flex items-center justify-center w-12 h-12 bg-neutral-50 hover:bg-opacity-80 rounded-full transition duration-200" href="#">
                                                    {/* <img className="h-5" src="template-assets/images/contact/x.svg" alt="" /> */}
                                                </a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-10 pb-16 bg-white rounded-3xl">
                                    <div className="mb-12 max-w-sm">
                                        <h4 className="mb-2 text-5xl font-medium tracking-tight font-heading text-slate-900">Send a message</h4>
                                        <p className="text-lg text-neutral-600 font-medium tracking-tight">Do you have a question? Use the form to send a direct message.</p>
                                    </div>
                                    <ContactForm />
                                </div>
                            </div>
                            
                            <div className="w-full md:flex-1 p-2">
                                <div className="p-10 bg-white rounded-3xl">
                                    <div className="flex flex-col justify-between h-full">
                                        <div className="mb-8 w-full">
                                            <h4 className="mb-2 text-4xl font-medium tracking-tight font-heading text-slate-900">Live chat</h4>
                                            <p className="mb-8 text-lg text-neutral-600 font-medium tracking-tight">Chat with Jesse for expert help!</p>
                                            {/* <img className="mx-auto h-56 object-cover" src="template-assets/images/contact/woman.png" alt="" /> */}
                                        </div>
                                        <div className="w-full"><a className="inline-flex justify-center items-center text-center h-16 p-5 font-semibold tracking-tight text-xl text-slate-900 hover:text-white focus:text-white bg-white hover:bg-neutral-900 focus:bg-neutral-900 border border-neutral-900 rounded-lg focus:ring-4 focus:ring-neutral-400 transition duration-200" href="#">Open Chat</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    </>)
}

export default ContactUs
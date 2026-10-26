import PageHeader from '@/components/headers/page-header'
import Layout from '@/components/Layout'
import React from 'react'

function PrivacyPolicy() {
    return (
        <Layout>
            <PageHeader
                title='Privacy Policy'
                description='This Privacy Policy describes how Art for Memories (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects your information when you use our website and services.'
                sup_title='Last updated: May 21, 2025'
            />
            <div className="bg-white">
                <div className="max-w-3xl mx-auto py-10 px-4 text-slate-800 bg-white">
                    <h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
                    <ul className="list-disc pl-6 mb-4">
                        <li><strong>Personal Information:</strong> When you submit forms (such as stories, memories, or contact forms), we may collect your name, email address, phone number, and any other information you provide.</li>
                        <li><strong>Uploaded Content:</strong> We collect images, videos, PDFs, and other files you upload to our platform. These may be stored on third-party services such as Cloudinary or UploadThing.</li>
                        <li><strong>Usage Data:</strong> We may collect information about how you interact with our website, such as IP address, browser type, device information, and pages visited.</li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
                    <ul className="list-disc pl-6 mb-4">
                        <li>To provide, operate, and maintain our website and services.</li>
                        <li>To process and display your submitted stories, memories, and media content.</li>
                        <li>To communicate with you, respond to inquiries, and provide support.</li>
                        <li>To improve our website, services, and user experience.</li>
                        <li>To ensure the security and integrity of our platform.</li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-8 mb-2">3. How We Share Your Information</h2>
                    <ul className="list-disc pl-6 mb-4">
                        <li>We may share your submitted content (stories, images, videos, etc.) publicly on our website as part of our mission to preserve and share memories.</li>
                        <li>We may use third-party services (such as Cloudinary, UploadThing, and analytics providers) to store and process your data. These providers are required to protect your information in accordance with their own privacy policies.</li>
                        <li>We do not sell your personal information to third parties.</li>
                        <li>We may disclose your information if required by law or to protect our rights and users.</li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-8 mb-2">4. Data Security</h2>
                    <p className="mb-4">We implement reasonable security measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.</p>

                    <h2 className="text-xl font-semibold mt-8 mb-2">5. Your Rights and Choices</h2>
                    <ul className="list-disc pl-6 mb-4">
                        <li>You may request access to, correction of, or deletion of your personal information by contacting us at <a href="mailto:artformemoriesrwanda@gmail.com" className="underline">artformemoriesrwanda@gmail.com.</a>.</li>
                        <li>You may opt out of receiving communications from us at any time.</li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-8 mb-2">6. Children&apos;s Privacy</h2>
                    <p className="mb-4">Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us to have it removed.</p>

                    <h2 className="text-xl font-semibold mt-8 mb-2">7. Changes to This Privacy Policy</h2>
                    <p className="mb-4">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date.</p>

                    <h2 className="text-xl font-semibold mt-8 mb-2">8. Contact Us</h2>
                    <p>If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:artformemoriesrwanda@gmail.com" className="underline">artformemoriesrwanda@gmail.com.</a>.</p>
                </div>
            </div>
        </Layout>
    )
}

export default PrivacyPolicy
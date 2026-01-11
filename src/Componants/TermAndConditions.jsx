import React from "react";

const TermAndConditions = () => {
  return (
    <div className="min-h-screen mt-5 bg-gradient-to-br from-indigo-50 via-sky-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <title>Terms & Conditions | eTutionTrack</title>
      <div className="max-w-5xl mx-auto backdrop-blur-md p-6 sm:p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-sky-500 to-purple-600 dark:from-blue-400 dark:via-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
            Terms & Conditions
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            Please read these terms carefully before using{" "}
            <span className="font-semibold text-indigo-600 dark:text-blue-400">
              eTutionTrack
            </span>
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="bg-indigo-50/60 dark:bg-gray-800/50 rounded-xl p-4 sm:p-6 border dark:border-gray-700">
            <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using eTutionTrack, you agree to be bound by these
              Terms and Conditions. If you do not agree, please discontinue use
              of the platform.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-sky-50/60 dark:bg-gray-800/50 rounded-xl p-4 sm:p-6 border dark:border-gray-700">
            <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-400 mb-2">
              2. User Accounts
            </h2>
            <p>
              Users must provide accurate and complete information when creating
              an account. You are responsible for maintaining the
              confidentiality of your login credentials.
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-purple-50/60 dark:bg-gray-800/50 rounded-xl p-4 sm:p-6 border dark:border-gray-700">
            <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-2">
              3. Use of Services
            </h2>
            <p>
              eTutionTrack is intended solely for educational purposes. Any
              misuse, including fraudulent or illegal activity, may result in
              suspension or termination of your account.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-indigo-50/60 dark:bg-gray-800/50 rounded-xl p-4 sm:p-6 border dark:border-gray-700">
            <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
              4. Tutor & Student Responsibilities
            </h2>
            <p>
              Tutors and students are responsible for their communication,
              conduct, and commitments. eTutionTrack is not liable for disputes
              arising between users.
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-sky-50/60 dark:bg-gray-800/50 rounded-xl p-4 sm:p-6 border dark:border-gray-700">
            <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-400 mb-2">
              5. Payments & Fees
            </h2>
            <p>
              All payments must be completed through authorized payment methods.
              Fees are non-refundable unless stated otherwise under specific
              conditions.
            </p>
          </section>

          {/* Section 6 */}
          <section className="bg-purple-50/60 dark:bg-gray-800/50 rounded-xl p-4 sm:p-6 border dark:border-gray-700">
            <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-2">
              6. Intellectual Property
            </h2>
            <p>
              All content, logos, and materials on eTutionTrack are the property
              of the platform. Unauthorized use or reproduction is strictly
              prohibited.
            </p>
          </section>

          {/* Section 7 */}
          <section className="bg-indigo-50/60 dark:bg-gray-800/50 rounded-xl p-4 sm:p-6 border dark:border-gray-700">
            <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
              7. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              these Terms without prior notice.
            </p>
          </section>

          {/* Section 8 */}
          <section className="bg-sky-50/60 dark:bg-gray-800/50 rounded-xl p-4 sm:p-6 border dark:border-gray-700">
            <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-400 mb-2">
              8. Changes to Terms
            </h2>
            <p>
              eTutionTrack may update these Terms & Conditions at any time.
              Continued use of the platform indicates acceptance of the revised
              terms.
            </p>
          </section>

          {/* Section 9 */}
          <section className="bg-purple-50/60 dark:bg-gray-800/50 rounded-xl p-4 sm:p-6 border dark:border-gray-700">
            <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-2">
              9. Contact Information
            </h2>
            <p>
              For any questions regarding these Terms, please contact us at{" "}
              <span className="font-medium text-indigo-600 dark:text-indigo-400">
                support@etuitiontrack.com
              </span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermAndConditions;

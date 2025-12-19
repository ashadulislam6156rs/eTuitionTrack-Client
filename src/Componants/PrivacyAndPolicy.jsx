import React from "react";

const PrivacyAndPolicy = () => {
  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto rounded-2xl p-6 sm:p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Privacy Policy
          </h1>
          <p className="mt-3 text-gray-500 text-sm sm:text-base">
            Your privacy is important to us at{" "}
            <span className="font-semibold">eTutionTrack</span>
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-700 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              1. Information We Collect
            </h2>
            <p>
              We collect personal information such as your name, email address,
              phone number, and account details when you register or use our
              services. This information helps us provide a better learning
              experience.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>To create and manage user accounts</li>
              <li>To connect students with tutors</li>
              <li>To improve our services and platform performance</li>
              <li>To communicate important updates and notifications</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              3. Data Security
            </h2>
            <p>
              We use industry-standard security measures to protect your
              personal data. However, no online system is 100% secure, and we
              cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              4. Sharing of Information
            </h2>
            <p>
              We do not sell, trade, or rent your personal information to third
              parties. Your data may only be shared when required by law or to
              provide essential services.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              5. Cookies
            </h2>
            <p>
              eTutionTrack may use cookies to enhance user experience, analyze
              usage, and improve platform functionality. You can control cookie
              preferences through your browser settings.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              6. Your Rights
            </h2>
            <p>
              You have the right to access, update, or delete your personal
              information at any time. Please contact us if you wish to exercise
              these rights.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              7. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated effective date.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              8. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <span className="font-medium text-indigo-600">
                support@etuitiontrack.com
              </span>
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-xs sm:text-sm text-gray-400">
          © {new Date().getFullYear()} eTutionTrack. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default PrivacyAndPolicy;

export default function PrivacyPolicy() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: September 2026</p>

      <p className="mb-4">
        This application (&quot;the App&quot;) is a personal, non-commercial
        learning project created for educational purposes as part of a web
        development course. It is not a commercial product and is not affiliated
        with Instagram, Meta, or any other company.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        Information We Collect
      </h2>
      <p className="mb-4">
        When you sign in with Google, we access and store the following
        information from your Google account:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Your name</li>
        <li>Your email address</li>
        <li>Your Google profile picture</li>
      </ul>
      <p className="mb-4">
        We also store content you choose to create within the App, such as
        photos you upload, captions, comments, and likes.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        How We Use Your Information
      </h2>
      <p className="mb-4">
        Your information is used solely to operate the App&apos;s features:
        displaying your name and photo next to your posts and comments, and
        identifying your account for sign-in purposes.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Data Sharing</h2>
      <p className="mb-4">
        We do not sell, rent, or share your personal information with third
        parties. Data is stored using Google Firebase (Firestore) and Cloudinary
        for image hosting.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Data Retention</h2>
      <p className="mb-4">
        Since this is a learning project, data may be deleted at any time
        without notice as part of ongoing development and testing.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Contact</h2>
      <p className="mb-4">
        If you have questions about this privacy policy or your data, please
        contact the developer at{" "}
        <a
          href="mailto:aaron16210301@gmail.com"
          className="text-blue-500 hover:underline"
        >
          aaron16210301@gmail.com
        </a>
        .
      </p>
    </div>
  );
}

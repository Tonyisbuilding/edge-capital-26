import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="w-[98%] max-w-[1700px] mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold mb-10 text-center">Privacy Policy / Privacybeleid</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
        <p className="mb-4">
          <strong>English:</strong> When you visit our website, we place cookies on your computer, tablet, or mobile phone. A cookie is a small text file placed on your device by your browser. Some cookies are essential for the website to function properly. Cookies also help us understand how visitors find and use our website, analyze site performance, and deliver personalized content.
        </p>
        <p className="mb-4">
          <strong>Dutch:</strong> Als u onze website bezoekt, plaatsen we cookies op uw computer, tablet of mobiele telefoon. Een cookie is een klein tekstbestand dat door een browser op uw computer wordt geplaatst. Sommige cookies zijn nodig om een website goed te laten functioneren. Ook kunnen we dankzij cookies achterhalen hoeveel mensen de site bezoeken en hoe ze er terecht komen.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Benefits of Cookies / Voordelen van cookies</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>English:</strong> A well-functioning website that lets you log in and use forms.</li>
          <li><strong>Dutch:</strong> Een goed werkende website. U kunt bijvoorbeeld inloggen en gebruikmaken van webformulieren.</li>
          <li><strong>English:</strong> More relevant information based on your visit.</li>
          <li><strong>Dutch:</strong> U ziet (meer) relevante informatie op basis van uw bezoek.</li>
          <li><strong>English:</strong> Personalized offers and user-friendly experience.</li>
          <li><strong>Dutch:</strong> U profiteert van interessante aanbiedingen en een gebruiksvriendelijke website.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Are cookies safe? / Zijn cookies veilig?</h2>
        <p className="mb-4">
          <strong>English:</strong> Cookies are safe and cannot cause harm to your computer. They are not related to viruses or malware and do not slow down your system.
        </p>
        <p className="mb-4">
          <strong>Dutch:</strong> Een cookie kan geen kwaad en heeft niets te maken met computervirussen of andere kwalijke zaken. Cookies kosten uw computer geen extra geheugen en maken uw computer ook niet trager.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Cookie Duration / Bewaartijd</h2>
        <p className="mb-4">
          <strong>English:</strong> Some cookies are temporary and are deleted when you close your browser. Others remain longer on your device. We use both temporary and persistent cookies.
        </p>
        <p className="mb-4">
          <strong>Dutch:</strong> Een tijdelijke cookie wordt automatisch verwijderd als u uw browser afsluit. Wij gebruiken tijdelijke cookies en cookies die langer op uw computer blijven staan.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Types of Cookies / Soorten cookies</h2>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left border border-gray-300">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Purpose</th>
                <th className="px-4 py-2 border">Partners</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="px-4 py-2 border">Functionele / Functional</td>
                <td className="px-4 py-2 border">Nodig voor goede werking / Required for basic functionality</td>
                <td className="px-4 py-2 border">Internal use only</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-2 border">Analytisch / Analytical</td>
                <td className="px-4 py-2 border">Analyse en verbetering / Analysis and improvement</td>
                <td className="px-4 py-2 border">Google Analytics, Adobe Analytics, tawk.to</td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-2 border">Tracking</td>
                <td className="px-4 py-2 border">Persoonlijke content / Personalized content</td>
                <td className="px-4 py-2 border">Blueconic</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <p className="mt-12 text-center text-sm text-gray-500">Last updated: May 2025</p>
    </div>
  );
};

export default PrivacyPolicy;

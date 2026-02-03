import { useState } from "react";

interface historyDataType{
    year: string;
    front: string;
    back: string;
}
const historyData = [
  {
    year: "2015",
    front: "Paul Lamain establishes Algorithmic Services B.V., a company specializing in developing and optimizing algorithms for financial enterprises.",
    back: "Additional details or insights for 2015."
  },
  {
    year: "2016",
    front: "Tradeoitt B.V. launched a low-cost trading platform and completed a fully subscribed bond issuance in 83 days, aiming to disrupt major brokerages.",
    back: "Additional details or insights for 2016."
  },
  {
    year: "2019",
    front: "In partnership with JFD Bank, Tradeoitt becomes the first entity in the Netherlands to introduce free stock trading, allowing investors to trade physical shares without transaction costs.",
    back: "Additional details or insights for 2019."
  },
  {
    year: "2022",
    front: "Tradeoitt expands its offerings by launching Tradeoitt EdgeFund, its first regulated hedge fund. Additionally, it initiates Tradeoitt Bond Issuance II, further strengthening its financial product lineup.",
    back: "Additional details or insights for 2022."
  },
  {
    year: "2023",
    front: "Tradeoitt rebrands as Edge Capital, a name that better reflects its mission and vision. Edge Capital aligns fully with the company’s goal of empowering investors—true to its motto: Investing with an edge!",
    back: "Additional details or insights for 2023."
  },
  {
    year: "Future",
    front: "Edge Capital remains committed to innovation and growth. In 2024, the company will focus on obtaining a full AFM license, enabling it to serve a broader audience and compete more effectively in the investment industry.",
    back: "Additional details or insights for the future."
  }
];

const FlipCard = ({ year, front, back }: historyDataType) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full sm:w-1/3 p-4 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`w-full h-60 bg-blue-100 rounded-lg shadow-lg transition-transform duration-500 transform ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute w-full h-full backface-hidden flex flex-col justify-center items-center p-4">
          <div
            className="w-[60px] h-[60px] border-2 border-[#0E7C84] rounded-full flex items-center justify-center mb-2"
            style={{ lineHeight: "1" }}
          >
            <span className="text-[#0E7C84] font-bold text-sm leading-none">
              {year}
            </span>
          </div>
          <p className="text-sm mt-2 text-center">{front}</p>
        </div>
        <div className="absolute w-full h-full backface-hidden flex flex-col justify-center items-center p-4 rotate-y-180 bg-blue-200 rounded-lg">
          <p className="text-sm text-center">{back}</p>
        </div>
      </div>
    </div>
  );
};

export default function OurHistory() {
  return (
    <section className="py-10 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold">Our History</h2>
      <p className="text-gray-600 mb-6">
        We're building a platform that gives investors an edge.
      </p>
      <div className="flex flex-wrap justify-center">
        {historyData.map((item, index) => (
          <FlipCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
}

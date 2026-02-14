import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import images from "@/constant/images";
import { fetchFundReturns, FundReturnsResponse, FundClassData } from "@/Api/googleSheetsClient";
import "./InvestmentPerformance.css";
import calendarIcon from "@/assets/icons/calendar.svg";

interface PerformanceCard {
  participation: string;
  monthName: string;
  percentage: string;
  metrics: { label: string; value: string }[];
}

const InvestmentPerformance = () => {
  const { language } = useChangeLanguageContext();
  const [fundData, setFundData] = useState<FundReturnsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFundReturns = async () => {
      setIsLoading(true);
      const data = await fetchFundReturns();
      setFundData(data);
      setIsLoading(false);
    };
    loadFundReturns();
  }, []);

  const translations = {
    en: {
      returns: "Returns",
      participationFrom: "participation from",
      metrics: {
        netReturn2024: "Net return 2024:",
        netReturnSinceInception: "Net return since inception :",
        averageAnnualReturn: "Average annual return since inception:"
      },
      downloadFactsheet: "Download our factsheet for a detailed overview.",
      requestFactsheet: "Request factsheet",
      receiveInfoMemorandum: "Receive the information memorandum",
      performanceSubheader: "Delivering high-performing interest isn't just a goal; it's our standard. Here is the latest report on our investment results, across different participation tiers, demonstrating the reliability of our approach since inception.",
      disclaimer: {
        title: "General disclaimer on returns:",
        content: "Bolder Funds Services B.V. (administrator) calculates the fund's results on a monthly basis. The above results are net of the 22.5% profit share and the 1.50% annual management fee. The returns from October 1, 2022, represent the actual results of the fund. Returns prior to October 1, 2022, are based on forward testing (live account) and not on backtesting. These returns should not be considered as an indication of future results."
      }
    },
    nl: {
      returns: "Rendementen",
      participationFrom: "participatie vanaf",
      metrics: {
        netReturn2024: "Nettorendement 2024:",
        netReturnSinceInception: "Nettorendement sinds start  strategie:",
        averageAnnualReturn: "Gemiddeld jaarlijks rendement sinds oprichting:"
      },
      downloadFactsheet: "Download onze factsheet voor een gedetailleerd overzicht.",
      requestFactsheet: "Factsheet aanvragen",
      receiveInfoMemorandum: "Ontvang het informatiememorandum",
      performanceSubheader: "Het leveren van goed presterende rente is niet slechts een doel; het is onze standaard. Hier is het nieuwste rapport over onze beleggingsresultaten, over verschillende deelnameniveaus heen, wat de betrouwbaarheid van onze aanpak sinds de oprichting aantoont.",
      disclaimer: {
        title: "Algemene disclaimer rendementen:",
        content: "Bolder Funds Services B.V. (administrateur) berekent maandelijks de resultaten van het fonds. Bovenstaande resultaten zijn na aftrek van de winstdeling en de jaarlijkse beheervergoeding. De rendementen vanaf 1 October 2025 vertegenwoordigen de werkelijke resultaten van het fonds. De rendementen vóór 1 October 2025 zijn gebaseerd op forward testing (live rekening) en niet op basis van backtesting. Deze rendementen dienen niet als indicatie voor toekomstige resultaten."
      }
    }
  };

  const t = translations[language] || translations.en;

  // Fallback data when API is unavailable
  const fallbackData: PerformanceCard[] = [
    {
      participation: "€100,000",
      monthName: language === 'nl' ? "November" : "November",
      percentage: "-0.05%",
      metrics: [
        { label: t.metrics.netReturn2024, value: "5.17%" },
        { label: t.metrics.netReturnSinceInception, value: "100.60%" },
        { label: t.metrics.averageAnnualReturn, value: "12.60%" },
      ],
    },
    {
      participation: "€250,000",
      monthName: language === 'nl' ? "November" : "November",
      percentage: "-0.03%",
      metrics: [
        { label: t.metrics.netReturn2024, value: "5.84%" },
        { label: t.metrics.netReturnSinceInception, value: "113.43%" },
        { label: t.metrics.averageAnnualReturn, value: "13.80%" },
      ],
    },
    {
      participation: "€500,000",
      monthName: language === 'nl' ? "November" : "November",
      percentage: "-0.01%",
      metrics: [
        { label: t.metrics.netReturn2024, value: "6.55%" },
        { label: t.metrics.netReturnSinceInception, value: "124.86%" },
        { label: t.metrics.averageAnnualReturn, value: "14.81%" },
      ],
    },
  ];

  // Format number for display (Dutch uses comma, English uses dot)
  const formatNumber = (num: number, addPlus = true): string => {
    const formatted = language === 'nl'
      ? num.toFixed(2).replace('.', ',')
      : num.toFixed(2);
    return addPlus && num > 0 ? `+${formatted}%` : `${formatted}%`;
  };

  // Convert API data to display format
  const mapFundDataToCards = (data: FundReturnsResponse): PerformanceCard[] => {
    const classes: { key: keyof FundReturnsResponse; participation: string }[] = [
      { key: 'EN_Class_I', participation: '\u20AC100,000' },
      { key: 'EN_Class_II', participation: '\u20AC250,000' },
      { key: 'EN_Class_III', participation: '\u20AC500,000' },
    ];

    return classes.map(({ key, participation }, index) => {
      const classData: FundClassData | null = data[key];

      if (!classData) {
        return fallbackData[index];
      }

      const { month, returns } = classData;

      let monthName = language === 'nl' ? month.nl : month.en;
      if (!monthName || monthName.trim() === "") {
        monthName = month.en;
      }

      // Extract just the month name (e.g., "Januari 2026" -> "Januari"), handling potential leading/trailing spaces
      const shortMonth = (monthName || "").trim().split(' ')[0];

      return {
        participation,
        monthName: shortMonth,
        percentage: formatNumber(returns.monthly),
        metrics: [
          { label: t.metrics.netReturn2024, value: formatNumber(returns.ytd) },
          { label: t.metrics.netReturnSinceInception, value: formatNumber(returns.since_inception) },
          { label: t.metrics.averageAnnualReturn, value: formatNumber(returns.cagr, false) },
        ],
      };
    });
  };

  const performanceData = fundData ? mapFundDataToCards(fundData) : fallbackData;

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -6, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: {
      y: -2,
      backgroundColor: "#185663",
      transition: { duration: 0.3 },
    },
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="bg-white rounded-[20px] shadow-md border border-gray-100 overflow-hidden animate-pulse">
      <div className="p-7 border-b border-gray-100 bg-gradient-to-r from-gray-100 to-transparent flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-gray-200 rounded-full w-10 h-10" />
          <div className="bg-gray-200 h-5 w-20 rounded" />
        </div>
        <div className="bg-gray-200 h-8 w-16 rounded-full" />
      </div>
      <div className="p-7">
        <div className="bg-gray-200 h-8 w-48 rounded-full mb-7" />
        <div className="space-y-4 mb-7">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between">
              <div className="bg-gray-200 h-4 w-40 rounded" />
              <div className="bg-gray-200 h-4 w-16 rounded" />
            </div>
          ))}
        </div>
        <div className="bg-gray-200 h-4 w-full rounded mb-7" />
        <div className="bg-gray-200 h-12 w-full rounded-full" />
      </div>
    </div>
  );

  return (
    <div className="w-[98%] max-w-[1700px] mx-auto px-[10px] sm:px-6 lg:px-8 py-12 bg-[#F6FEFF]">
      <motion.div
        variants={cardVariants}
        className="mb-12 text-center flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-[#00222C] relative inline-block z-10">
          Correlation Arbitrage Fund <span className="relative inline-block">
            Performance
            <img
              src={images.landingPage.Brush}
              alt=""
              className="absolute bottom-[-6px] left-0 w-full h-[8px] -z-10 bg-contain bg-no-repeat"
            />
          </span> Overview
        </h2>
        <p className="mt-6 text-[#3A494D] max-w-3xl mx-auto text-center leading-relaxed text-base md:text-lg">
          {t.performanceSubheader}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {isLoading ? (
          <>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </>
        ) : (
          performanceData.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="ip-card"
            >
              <div className="ip-header-container">
                {/* Left Half: Date with Background */}
                <div className="ip-date-half">
                  <div className="ip-bg-img"></div>
                  <div className="ip-overlay"></div>
                  <div className="ip-content-layer flex items-center gap-3">
                    <img src={calendarIcon} alt="Calendar" className="w-5 h-5 text-white" />
                    <span className="text-lg font-semibold text-white">
                      {card.monthName}
                    </span>
                  </div>
                </div>

                {/* Right Half: Return Percentage (Transparent) */}
                <div className="ip-return-half">
                  <span className="text-base font-bold text-[#2C7C7D] bg-[rgba(44,124,125,0.2)] px-3.5 py-1.5 rounded-full">
                    {card.percentage}
                  </span>
                </div>
              </div>

              <div className="ip-card-content">
                <div className="ip-participation-container">
                  <div className="inline-block bg-[rgba(32,94,112,0.2)] text-gray-900 font-medium text-sm px-4 py-2 rounded-full">
                    {t.participationFrom} {card.participation}
                  </div>
                </div>
                <ul>
                  {card.metrics.map((metric, i) => (
                    <li key={i} className="ip-report-row">
                      <span className="ip-col-label">
                        {metric.label}
                      </span>
                      <span className="ip-col-sep">:</span>
                      <span className="ip-col-value before:content-['\2191'] before:mr-1">
                        {metric.value}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-gray-600">
                    {t.downloadFactsheet}
                  </p>
                  <Link to="/requestinfo">
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      className="ip-button"
                    >
                      <div className="ip-bg-img"></div>
                      <div className="ip-overlay"></div>
                      <span className="ip-content-layer">
                        {t.requestFactsheet}
                      </span>
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="flex justify-center mb-12">
        <Link to="/requestinfo" className="max-w-md w-full flex justify-center">
          <motion.button
            whileHover={{ y: -2, backgroundColor: "#185663" }}
            transition={{ duration: 0.3 }}
            className="bg-[#008487] text-white px-9 py-4.5 rounded-[40px] font-semibold flex items-center gap-3 shadow-md w-full justify-center"
          >
            {t.receiveInfoMemorandum}
          </motion.button>
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#192227] text-white p-9 rounded-[20px] shadow-md relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-2 h-full bg-black/10" />
        <div className="flex items-center gap-3 mb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 9V13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3 className="text-xl font-bold">{t.disclaimer.title}</h3>
        </div>
        <p className="text-sm leading-relaxed">
          {t.disclaimer.content}
        </p>
      </motion.div>
    </div>
  );
};

export default InvestmentPerformance;

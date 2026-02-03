import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import images from "@/constant/images";
import { fetchFundReturns, FundReturnsResponse, FundClassData } from "@/Api/googleSheetsClient";

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
        netReturnSinceInception: "Net return since inception (2021):",
        averageAnnualReturn: "Average annual return since inception:"
      },
      downloadFactsheet: "Download our factsheet for a detailed overview.",
      requestFactsheet: "Request factsheet",
      receiveInfoMemorandum: "Receive the information memorandum",
      disclaimer: {
        title: "General disclaimer on returns:",
        content: "Bolder Funds Services B.V. (administrator) calculates the fund's results on a monthly basis. The above results are net of the 22.5% profit share and the 1.50% annual management fee. The returns from September 1, 2022, represent the actual results of the fund. Returns prior to September 1, 2022, are based on forward testing (live account) and not on backtesting. These returns should not be considered as an indication of future results."
      }
    },
    nl: {
      returns: "Rendementen",
      participationFrom: "participatie vanaf",
      metrics: {
        netReturn2024: "Nettorendement 2024:",
        netReturnSinceInception: "Nettorendement sinds oprichting (2021):",
        averageAnnualReturn: "Gemiddeld jaarlijks rendement sinds oprichting:"
      },
      downloadFactsheet: "Download onze factsheet voor een gedetailleerd overzicht.",
      requestFactsheet: "Factsheet aanvragen",
      receiveInfoMemorandum: "Ontvang het informatiememorandum",
      disclaimer: {
        title: "Algemene disclaimer rendementen:",
        content: "Bolder Funds Services B.V. (administrateur) berekent maandelijks de resultaten van het fonds. Bovenstaande resultaten zijn na aftrek van de 22,5% winstdeling en de 1,50% jaarlijkse beheervergoeding. De rendementen vanaf 1 september 2022 vertegenwoordigen de werkelijke resultaten van het fonds. De rendementen vóór 1 september 2022 zijn gebaseerd op forward testing (live rekening) en niet op basis van backtesting. Deze rendementen dienen niet als indicatie voor toekomstige resultaten."
      }
    }
  };

  const t = translations[language] || translations.en;

  // Fallback data when API is unavailable
  const fallbackData: PerformanceCard[] = [
    {
      participation: "€100,000",
      monthName: language === 'nl' ? "November" : "November",
      percentage: language === 'nl' ? "+1,47%" : "+1.47%",
      metrics: [
        { label: t.metrics.netReturn2024, value: language === 'nl' ? "+18,47%" : "+18.47%" },
        { label: t.metrics.netReturnSinceInception, value: language === 'nl' ? "+146,69%" : "+146.69%" },
        { label: t.metrics.averageAnnualReturn, value: language === 'nl' ? "22,62%" : "22.62%" },
      ],
    },
    {
      participation: "€250,000",
      monthName: language === 'nl' ? "November" : "November",
      percentage: language === 'nl' ? "+1,58%" : "+1.58%",
      metrics: [
        { label: t.metrics.netReturn2024, value: language === 'nl' ? "+19,76%" : "+19.76%" },
        { label: t.metrics.netReturnSinceInception, value: language === 'nl' ? "+163,53%" : "+163.53%" },
        { label: t.metrics.averageAnnualReturn, value: language === 'nl' ? "24,44%" : "24.44%" },
      ],
    },
    {
      participation: "€500,000",
      monthName: language === 'nl' ? "November" : "November",
      percentage: language === 'nl' ? "+1,69%" : "+1.69%",
      metrics: [
        { label: t.metrics.netReturn2024, value: language === 'nl' ? "+21,28%" : "+21.28%" },
        { label: t.metrics.netReturnSinceInception, value: language === 'nl' ? "+180,92%" : "+180.92%" },
        { label: t.metrics.averageAnnualReturn, value: language === 'nl' ? "26,37%" : "26.37%" },
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
      { key: 'EC_Class_I', participation: '€100,000' },
      { key: 'EC_Class_II', participation: '€250,000' },
      { key: 'EC_Class_III', participation: '€500,000' },
    ];

    return classes.map(({ key, participation }, index) => {
      const classData: FundClassData | null = data[key];

      if (!classData) {
        return fallbackData[index];
      }

      const { month, returns } = classData;
      const monthName = language === 'nl' ? month.nl : month.en;
      // Extract just the month name (e.g., "Januari 2026" -> "Januari")
      const shortMonth = monthName.split(' ')[0] || monthName;

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        variants={cardVariants}
        className="mb-6"
      >
        <div className="relative inline-block text-left">
          <h2 className="text-3xl lg:text-[3rem] font-bold text-gray-900 relative z-10">
            {t.returns}
          </h2>
          <img
            src={images.landingPage.Brush}
            alt="Brush underline"
            className="absolute bottom-[-3px] left-0 h-[5px] z-0"
          />
        </div>
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
              className="bg-white rounded-[20px] shadow-md border border-gray-100 overflow-hidden"
            >
              <div className="p-7 border-b border-gray-100 bg-gradient-to-r from-[rgba(32,106,124,0.08)] to-transparent flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm border border-gray-100">
                    <svg
                      className="w-9 h-6"
                      viewBox="0 0 36 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 22 L8 14 L14 16 L20 10 L26 6 L34 4"
                        stroke="#206A7C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M2 22 L8 14 L14 16 L20 10 L26 6 L34 4 L34 22 L2 22"
                        fill="rgba(32, 106, 124, 0.1)"
                      />
                    </svg>
                  </div>
                  <span className="text-lg font-semibold text-[#206A7C]">
                    {card.monthName}
                  </span>
                </div>
                <span className="text-base font-bold text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full">
                  {card.percentage}
                </span>
              </div>
              <div className="p-7">
                <div className="inline-block bg-gray-100 text-gray-900 font-medium text-sm px-4 py-2 rounded-full mb-7">
                  ({t.participationFrom} {card.participation})
                </div>
                <ul className="mb-7">
                  {card.metrics.map((metric, i) => (
                    <li
                      key={i}
                      className={`flex justify-between items-center pb-3 ${i === card.metrics.length - 1
                        ? ""
                        : "border-b border-gray-100"
                        }`}
                    >
                      <span className="text-gray-600 font-medium text-sm">
                        {metric.label}
                      </span>
                      <span className="text-emerald-600 font-bold text-base before:content-['↑'] before:mr-1">
                        {metric.value}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600 mb-7">
                  {t.downloadFactsheet}
                </p>
                <Link to="/requestinfo">
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    className="w-full bg-[#206A7C] text-white px-6 py-3.5 rounded-full font-semibold 
                  text-sm shadow-sm hover:cursor-pointer"
                  >
                    {t.requestFactsheet}
                  </motion.button>
                </Link>
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

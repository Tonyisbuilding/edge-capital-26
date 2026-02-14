import React from "react";
import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import { ReactNode } from "react";
import images from "@/constant/images";
import "../landingPage/component.css";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

export type metricCardType = {
  title: string;
  value: string;
  icon: ReactNode;
};

const MetricCard = ({ title, value, icon }: metricCardType) => {
  return (
    <motion.div
      className="bg-[#EEF4F5] rounded-xl p-6 flex flex-col items-center hover:cursor-pointer
      relative border-[1px] border-[#367B8C1A]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
    >
      {/* Effect */}
      <div className="absolute top-[3.5rem] md:left-[10%] left-[16.5%] right-0 bottom-0 z-10">
        <img src={images.edgefund.effect} alt="" className=" w-[15rem] h-[1rem]" />
      </div>

      {/* Icon */}
      <div className="mb-4 relative">
        <motion.div
          className="w-[5rem] h-[5rem] bg-gray-900  rounded-3xl flex items-center justify-center inter"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
        >
          {icon}
        </motion.div>
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 bg-gray-400 rounded-3xl -z-10 opacity-20 inter"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1.05 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        />
      </div>

      {/* Value */}
      <motion.h3
        className="text-[29.63px] font-semibold mb-1 text-[#111111] inter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {value}
      </motion.h3>

      {/* Title */}
      <motion.p
        className="text-[#3D3D3D] text-center text-[16.73px] font-medium inter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {title}
      </motion.p>
    </motion.div>
  );
};

const Target = () => {
  const { language } = useChangeLanguageContext();

  // Metrics data with translations
  const metrics = {
    en: [
      { title: "Annual target", value: "20%", id: 1 },
      { title: "Total cumulative result", value: "143.11%", id: 2 },
      { title: "Monthly net return target", value: "1.66%", id: 3 },
      { title: "Best month", value: "8.15%", id: 4 },
    ],
    nl: [
      { title: "Jaarlijks netto rendementsdoel", value: "20%", id: 1 },
      { title: "Totaal cumlatief resultaat", value: "143.11%", id: 2 },
      { title: "Maandelijks netto rendementsdoel", value: "1.66%", id: 3 },
      { title: "Beste maand", value: "8.15%", id: 4 },
    ]
  };

  // Use the appropriate language
  const currentMetrics = metrics[language] || metrics.en;

  return (
    <div className="w-[98%] max-w-[1700px] mx-auto px-4 md:pb-16 pb-5 bg-[#F6FEFF]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {currentMetrics.map((metric) => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            icon={
              <Smartphone className="text-white h-[56.25px] w-[36.875px]" />
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Target;

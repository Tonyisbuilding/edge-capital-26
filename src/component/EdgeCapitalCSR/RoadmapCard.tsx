import { motion } from "framer-motion";

interface RoadmapCardProps {
  number: number;
  title: string;
  content: string;
  index: number;
}

const RoadmapCard = ({ number, title, content, index }: RoadmapCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className="bg-[#192227] text-white rounded-lg p-6 shadow-lg relative overflow-hidden h-auto"
    >
      <span 
        className="text-5xl md:text-[75px] font-bold text-yellow-400 opacity-90 mb-4 block py-[10px]" 
        aria-hidden="true"
      >
        {number}
      </span>
      <h3 className="text-2xl font-bold mb-3 md:text-[22px] py-[10px]">{title}</h3>
      <p className="text-gray-300 leading-relaxed md:text-[26px] font-normal">{content}</p>
    </motion.div>
  );
};

export default RoadmapCard;
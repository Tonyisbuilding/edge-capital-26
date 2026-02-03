import React from 'react';
import { motion } from 'framer-motion';

interface ScrollAnimationWrapperProps {
    children: React.ReactNode;
    className?: string;
}

const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({ children, className = "" }) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollAnimationWrapper;

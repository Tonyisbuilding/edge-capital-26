import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import images from "@/constant/images";
import checklistIcon from '../../assets/icons/checklist.svg';
import arrowRepeatIcon from '../../assets/icons/arrow-repeat.svg';
import infoIcon from '../../assets/icons/info.svg';
import columnSummaryIcon from '../../assets/icons/column-summary.svg';


const Feature = () => {
    const { language } = useChangeLanguageContext();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    // Translations object
    const translations = {
        en: {
            features: 'Features',
            description: 'An open-end mutual fund offering sophisticated investment strategies with institutional-level management.',
            investmentStrategy: {
                title: 'Investment strategy',
                description: 'Sophisticated approaches to maximize returns with Managed risk',
                items: [
                    {
                        title: 'Correlation arbitrage',
                        description: 'An advanced trading method with a proven track record.'
                    }
                ]
            },
            keyInformation: {
                title: 'Characteristics',
                description: 'Institutional-grade structure and oversight',
                items: [
                    {
                        title: 'Professional management',
                        description: 'Managed by Edge Capital Management B.V.'
                    },
                    {
                        title: 'Secure custody',
                        description: 'Edge Capital EdgeFund Custody Foundation is the legal owner of the fund, ensuring your assets are separated from our company funds.'
                    },
                    {
                        title: 'Banking partner',
                        description: 'CitiBank is our partner for banking services.'
                    },
                    {
                        title: 'Administration',
                        description: 'Bolder Fund Services B.V. handles fund administration'
                    }
                ]
            },
            liquidityTerms: {
                title: 'Entry and exit',
                description: 'Flexible entry and exit terms without fees',
                items: [
                    {
                        title: 'Monthly entry options',
                        description: 'New investments are accepted on a monthly basis.'
                    },
                    {
                        title: 'Flexible exit',
                        description: 'You can exit on a monthly basis.'
                    },
                    {
                        title: 'No fees',
                        description: 'Entering and exiting involves No fees.'
                    },
                    {
                        title: 'Monthly reporting',
                        description: 'Detailed statements provided monthly for all participants'
                    }
                ]
            },
            participationRequirements: {
                title: 'Participation Requirements',
                description: 'Investment thresholds and guidelines',
                items: [
                    {
                        title: '\u20AC100,000 initial investment required',
                        description: ''
                    },
                    {
                        title: 'Minimum \u20AC10,000 for subsequent investments',
                        description: ''
                    },
                    {
                        title: 'Minimum \u20AC10,000 withdrawal with \u20AC100,000 remaining balance required',
                        description: ''
                    },
                    {
                        title: 'Subscription: Via these forms.',
                        description: '',
                        linkText: 'Click to show these forms'
                    }
                ]
            }
        },
        nl: {
            features: 'Kenmerken',
            description: 'Een open-end beleggingsfonds dat geavanceerde investeringsstrategie\u00EBn biedt met beheer op institutioneel niveau.',
            investmentStrategy: {
                title: 'Beleggingsstrategie',
                description: 'Geavanceerde benaderingen om rendement te maximaliseren met een beheerst risico',
                items: [
                    {
                        title: 'Correlatie arbitrage',
                        description: 'Een geavanceerde trading methode, met een bewezen trackrecord'
                    }
                ]
            },
            keyInformation: {
                title: 'Kenmerken',
                description: 'Structuur en toezicht op institutioneel niveau',
                items: [
                    {
                        title: 'Professioneel beheer',
                        description: 'Beheerd door Edge Capital Management B.V.'
                    },
                    {
                        title: 'Veilige bewaring',
                        description: 'Stichting Bewaring Edge Capital EdgeFund is juridisch eigenaar van het fonds, zo worden uw gelden gescheiden van onze bedrijfsgelden.'
                    },
                    {
                        title: 'Bank',
                        description: 'CitiBank is onze partner voor banking services'
                    },
                    {
                        title: 'Administratie',
                        description: 'Bolder Fund Services B.V. verzorgt de fondsadministratie'
                    }
                ]
            },
            liquidityTerms: {
                title: 'In en uitstappen',
                description: 'Flexibele in en uitstap voorwaarden zonder kosten',
                items: [
                    {
                        title: 'Maandelijkse instapmogelijkheden',
                        description: 'Nieuwe investeringen worden maandelijks geaccepteerd'
                    },
                    {
                        title: 'Flexibel uitstappen',
                        description: 'u kunt maandelijks uitstappen'
                    },
                    {
                        title: 'Geen kosten',
                        description: 'In en uitstappen brengt geen kosten met zich mee'
                    },
                    {
                        title: 'Maandelijkse rapportage',
                        description: 'Gedetailleerde overzichten worden maandelijks verstrekt aan alle deelnemers'
                    }
                ]
            },
            participationRequirements: {
                title: 'Deelnamevoorwaarden',
                description: 'Beleggingsdrempels en richtlijnen',
                items: [
                    {
                        title: 'Minimale initi\u00EBle investering: \u20AC100.000',
                        description: ''
                    },
                    {
                        title: 'Minimaal \u20AC10.000 voor vervolginvesteringen',
                        description: ''
                    },
                    {
                        title: 'Minimale opname van \u20AC10.000 met een resterend saldo van \u20AC100.000 vereist',
                        description: ''
                    },
                    {
                        title: 'Inschrijven:',
                        description: '',
                        linkText: ' Via deze formulieren.'
                    }
                ]
            }
        }
    };

    // Data structure for features with IDs
    const features = [
        {
            id: 'investment-strategy',
            translationKey: 'investmentStrategy',
            icon: columnSummaryIcon,
            items: [
                { id: 'correlation-arbitrage' }
            ]
        },
        {
            id: 'key-information',
            translationKey: 'keyInformation',
            icon: infoIcon,
            items: [
                { id: 'professional-management' },
                { id: 'secure-custody' },
                { id: 'banking-partner' },
                { id: 'administration' }
            ]
        },
        {
            id: 'liquidity-terms',
            translationKey: 'liquidityTerms',
            icon: arrowRepeatIcon,
            items: [
                { id: 'monthly-subscriptions' },
                { id: 'redemption-notice' },
                { id: 'position-management' },
                { id: 'monthly-reporting' }
            ]
        },
        {
            id: 'participation-requirements',
            translationKey: 'participationRequirements',
            icon: checklistIcon,
            items: [
                { id: 'initial-investment' },
                { id: 'subsequent-investments' },
                { id: 'minimum-balance' },
                { id: 'subscription-process', hasLink: true }
            ]
        }
    ];

    // Get current language content - default to English if language selection is invalid
    const t = translations[language] || translations.en;

    return (
        <div className="bg-[#F6FEFF] py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-[98%] max-w-[1700px] mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={containerVariants}
                    className="space-y-6 text-center"
                >
                    <motion.div
                        variants={itemVariants}
                        className="relative inline-block mb-4"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 relative z-10">
                            {t.features}
                        </h2>
                        <img
                            src={images.landingPage.Brush}
                            alt="Brush underline"
                            className="absolute bottom-[-3px] left-0 h-[5px] z-0"
                        />
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-gray-700 mb-8"
                    >
                        {t.description}
                    </motion.p>

                    <div className="space-y-12 bg-[#EEF5F6] rounded-[25px] p-8 text-left">
                        {features.map((feature, index) => {
                            const featureTranslation = t[feature.translationKey as keyof typeof t] as {
                                title: string;
                                description: string;
                                items: { title: string; description: string; linkText?: string }[];
                            };

                            return (
                                <React.Fragment key={feature.id}>
                                    <motion.div
                                        variants={itemVariants}
                                        className="lg:grid lg:grid-cols-3 gap-6"
                                    >
                                        <div className="col-span-1">
                                            <div className="flex items-start mb-4">
                                                <div className="flex-shrink-0 mr-3">
                                                    <div className="flex items-center justify-center w-12 h-12 bg-[#206A7C] rounded-md">
                                                        <img
                                                            src={feature.icon}
                                                            alt=""
                                                            className="w-6 h-6 invert brightness-0"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900">{featureTranslation.title}</h3>
                                                    <p className="text-gray-600 mt-1">{featureTranslation.description}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-2 mt-4 lg:mt-0">
                                            <div className="space-y-4">
                                                {feature.items.map((item, index) => {
                                                    const itemTranslation = featureTranslation.items[index] as { title: string; description: string; linkText?: string };

                                                    return (
                                                        <motion.div
                                                            key={item.id}
                                                            whileHover={{ scale: 1.01 }}
                                                            className="bg-[#F6FEFF] rounded-lg shadow-sm p-4 border border-gray-100"
                                                        >
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 text-primary-500 mr-3">
                                                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-medium text-gray-900">{itemTranslation.title}</h4>
                                                                    {itemTranslation.description && (
                                                                        <p className="text-sm text-gray-500 mt-1">{itemTranslation.description}</p>
                                                                    )}
                                                                    {item.hasLink && (
                                                                        <button className="text-sm text-primary-600 font-medium hover:text-primary-800
                                    mt-1 underline focus:outline-none text-black hover:cursor-pointer">
                                                                            <Link to='/participate'>
                                                                                {itemTranslation.linkText}
                                                                            </Link>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>
                                    {index < features.length - 1 && <hr className="border-gray-200 my-8" />}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Feature;

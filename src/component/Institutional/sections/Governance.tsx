import { Section } from "@/component/Institutional/ui/Section";
import { Handshake, Settings, List } from "lucide-react";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

export function Governance() {
    const { language } = useChangeLanguageContext();

    const translations = {
        en: {
            heading: "Institutional Access & Infrastructure",
            subheading:
                "We offer bespoke structures for sophisticated investors. Choose between direct fund participation or custom technical implementation, all governed by a fee structure aligned with your success.",
            card1Title: "Direct Fund Participation",
            card1Desc:
                "Designed for Fund-of-Funds and institutional allocators seeking immediate access to our market-neutral strategy.",
            card1Label1: "Minimum Entry:",
            card1Value1: "€500,000",
            card1Label2: "Management. Fee:",
            card1Value2: "1% per annum",
            card1Label3: "Performance Fee:",
            card1Value3: "12.5% (High Watermark)",
            card2Title: "API & SaaS Solutions",
            card2Desc:
                "For partners requiring custom integration, we offer a white-label SaaS agreement to run our strategies within your environment.",
            card2Label1: "Integration:",
            card2Value1: "Full API Access",
            card2Label2: "Structure:",
            card2Value2: "SaaS Agreement",
            card2Label3: "Pricing:",
            card2Value3: "Customized based on volume",
            card3Title: "Aligned Fee Structure",
            card3Desc:
                "We prioritize performance over AUM accumulation. Our tiered fee model ensures our interests remain strictly aligned with yours.",
            card3Label1: "Philosophy:",
            card3Value1: "Success-based revenue",
            card3Label2: "Safety:",
            card3Value2: "High Watermark Protection",
            card3Label3: "Benefit:",
            card3Value3: "Reduced fees for larger allocations",
        },
        nl: {
            heading: "Institutionele Toegang & Infrastructuur",
            subheading:
                "Wij bieden maatwerkstructuren voor ervaren investeerders. Kies tussen directe fondsparticipatie of aangepaste technische implementatie, allemaal beheerd door een kostenstructuur die is afgestemd op uw succes.",
            card1Title: "Directe Fondsparticipatie",
            card1Desc:
                "Ontworpen voor Fund-of-Funds en institutionele allocatoren die directe toegang zoeken tot onze marktneutrale strategie.",
            card1Label1: "Minimale Instap:",
            card1Value1: "€500,000",
            card1Label2: "Beheervergoeding:",
            card1Value2: "1% per jaar",
            card1Label3: "Prestatievergoeding:",
            card1Value3: "12.5% (High Watermark)",
            card2Title: "API & SaaS-Oplossingen",
            card2Desc:
                "Voor partners die aangepaste integratie nodig hebben, bieden wij een white-label SaaS-overeenkomst om onze strategieën binnen uw omgeving uit te voeren.",
            card2Label1: "Integratie:",
            card2Value1: "Volledige API-Toegang",
            card2Label2: "Structuur:",
            card2Value2: "SaaS-Overeenkomst",
            card2Label3: "Prijzen:",
            card2Value3: "Op maat op basis van volume",
            card3Title: "Afgestemde Kostenstructuur",
            card3Desc:
                "Wij geven prioriteit aan prestaties boven AUM-accumulatie. Ons gelaagde kostenmodel zorgt ervoor dat onze belangen strikt in lijn blijven met de uwe.",
            card3Label1: "Filosofie:",
            card3Value1: "Succes-gebaseerde omzet",
            card3Label2: "Veiligheid:",
            card3Value2: "High Watermark Bescherming",
            card3Label3: "Voordeel:",
            card3Value3: "Lagere kosten bij grotere allocaties",
        },
    };

    const t = translations[language as keyof typeof translations] || translations.en;

    return (
        <Section className="bg-[#F6FEFF] pb-32 -mt-[10px] rounded-t-[20px] relative z-10">
            <div className="max-w-7xl mx-auto px-[10px] md:px-8">
                <div className="mb-16 max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-mono font-bold text-institutional-charcoal mb-6">
                        {t.heading}
                    </h2>
                    <p className="text-lg text-institutional-charcoal/70 leading-relaxed max-w-2xl mx-auto">
                        {t.subheading}
                    </p>
                </div>

                {/* Using flex layout instead of grid to avoid strict rows if user disliked "grids" */}
                {/* But for equal height cards, grid is actually best. If user meant VISUAL grid lines, I removed those. */}
                {/* If user meant strictly "no CSS grid", I can use flex. */}
                {/* "section shouldn't have the grids" might mean the boxes shouldn't look like a grid? */}
                {/* Or perhaps "grid lines"? I removed lines. */}
                {/* I will use flex-wrap here to fulfill "remove grids" while keeping layout. */}
                <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center">
                    {/* Card 1: Direct Fund Participation */}
                    <div className="flex-1 w-full relative">
                        <Card
                            icon={<Handshake className="w-6 h-6 text-white" />}
                            title={t.card1Title}
                            desc={t.card1Desc}
                            details={[
                                { label: t.card1Label1, value: t.card1Value1 },
                                { label: t.card1Label2, value: t.card1Value2 },
                                { label: t.card1Label3, value: t.card1Value3 },
                            ]}
                        />
                    </div>

                    {/* Card 2: API & SaaS Solutions */}
                    <div className="flex-1 w-full relative">
                        <Card
                            icon={<Settings className="w-6 h-6 text-white" />}
                            title={t.card2Title}
                            desc={t.card2Desc}
                            details={[
                                { label: t.card2Label1, value: t.card2Value1 },
                                { label: t.card2Label2, value: t.card2Value2 },
                                { label: t.card2Label3, value: t.card2Value3 },
                            ]}
                        />
                    </div>

                    {/* Card 3: Aligned Fee Structure */}
                    <div className="flex-1 w-full relative">
                        <Card
                            icon={<List className="w-6 h-6 text-white" />}
                            title={t.card3Title}
                            desc={t.card3Desc}
                            details={[
                                { label: t.card3Label1, value: t.card3Value1 },
                                { label: t.card3Label2, value: t.card3Value2 },
                                { label: t.card3Label3, value: t.card3Value3 },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
}

function Card({ icon, title, desc, details }: any) {
    return (
        <div
            className="rounded-xl p-8 flex flex-col relative overflow-hidden h-full group"
            style={{ backgroundColor: "#206A7C" }}
        >
            {/* Grain overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{
                    backgroundImage: "url(/grains.svg)",
                    backgroundRepeat: "repeat",
                    opacity: 0.15,
                }}
            />

            <div className="relative z-[2] h-full flex flex-col">
                <div className="mb-6">
                    {icon}
                </div>

                {/* Flexible spacer that pushes text to bottom, ensuring at least 100px gap */}
                <div className="flex-grow min-h-[100px]" />

                {/* Grouped text content at the bottom */}
                <div className="flex flex-col">
                    <h3 className="font-mono text-xl font-bold text-white mb-2 leading-tight">
                        {title}
                    </h3>

                    <p className="text-sm text-white/80 leading-relaxed mb-5 pb-5 border-b border-white/20">
                        {desc}
                    </p>

                    <div className="space-y-2">
                        {details.map((d: any, i: number) => (
                            <div key={i} className="flex justify-between items-baseline text-xs md:text-sm font-mono">
                                <span className="text-white font-bold">{d.label}</span>
                                <span className="text-white/70 text-right ml-4">{d.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

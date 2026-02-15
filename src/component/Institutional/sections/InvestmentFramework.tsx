import { Section } from "@/component/Institutional/ui/Section";
import { Grid } from "@/component/Institutional/ui/Grid";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

export function InvestmentFramework() {
    const { language } = useChangeLanguageContext();

    const translations = {
        en: {
            heading: "Investment Framework",
            fundTitle: "The Fund (Commingled)",
            fundEntity: "Dutch Closed-End AIF B.V.",
            fundRegime: "AFM AIFMD Light Regime (Reg. no. 50027774)",
            minInvestment: "Min Investment:",
            managedTitle: "Managed Accounts",
            managedDesc:
                "Available upon request for professional investors requiring specific mandates.",
            managedNote:
                "Tailored currency universes and volatility risk caps available.",
            partnersTitle: "Service Partners",
            admin: "Admin",
            depositary: "Depositary",
            counsel: "Counsel",
        },
        nl: {
            heading: "Investeringskader",
            fundTitle: "Het Fonds (Gemengd)",
            fundEntity: "Dutch Closed-End AIF B.V.",
            fundRegime: "AFM AIFMD Light Regime (Reg. no. 50027774)",
            minInvestment: "Min. Investering:",
            managedTitle: "Beheerde Rekeningen",
            managedDesc:
                "Beschikbaar op aanvraag voor professionele investeerders die specifieke mandaten nodig hebben.",
            managedNote:
                "Op maat gemaakte valutauniversums en volatiliteitsrisicolimieten beschikbaar.",
            partnersTitle: "Servicepartners",
            admin: "Administratie",
            depositary: "Bewaarder",
            counsel: "Juridisch",
        },
    };

    const t = translations[language as keyof typeof translations] || translations.en;

    return (
        <Section className="bg-institutional-white border-b border-institutional-charcoal/10 pb-32">
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-mono font-bold text-institutional-charcoal mb-4">
                    {t.heading}
                </h2>
            </div>

            <Grid cols={3} className="divide-y md:divide-y-0 md:divide-x divide-institutional-charcoal/10">
                {/* Col 1: The Fund */}
                <div className="pt-8 md:pt-0 md:pr-8">
                    <h3 className="font-mono text-xl font-bold text-institutional-charcoal mb-6">
                        {t.fundTitle}
                    </h3>
                    <ul className="space-y-4 text-sm text-institutional-charcoal/80">
                        <li className="flex gap-3">
                            <span className="text-institutional-teal font-bold">/</span>
                            <span>{t.fundEntity}</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-institutional-teal font-bold">/</span>
                            <span>{t.fundRegime}</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-institutional-teal font-bold">/</span>
                            <span>{t.minInvestment} <span className="font-mono font-bold">USD 500,000</span></span>
                        </li>
                    </ul>
                </div>

                {/* Col 2: Managed Accounts */}
                <div className="pt-8 md:pt-0 md:px-8">
                    <h3 className="font-mono text-xl font-bold text-institutional-charcoal mb-6">
                        {t.managedTitle}
                    </h3>
                    <div className="space-y-4 text-sm text-institutional-charcoal/80 leading-relaxed">
                        <p>
                            {t.managedDesc}
                        </p>
                        <div className="bg-institutional-charcoal/5 p-4 border-l-2 border-institutional-charcoal/20">
                            <p>{t.managedNote}</p>
                        </div>
                    </div>
                </div>

                {/* Col 3: Service Partners */}
                <div className="pt-8 md:pt-0 md:pl-8">
                    <h3 className="font-mono text-xl font-bold text-institutional-charcoal mb-6">
                        {t.partnersTitle}
                    </h3>
                    <ul className="space-y-4 text-sm text-institutional-charcoal/80">
                        <li className="grid grid-cols-[80px_1fr] gap-2">
                            <span className="font-mono text-xs uppercase tracking-wider text-institutional-charcoal/50">{t.admin}</span>
                            <span className="font-bold">Bolder Fund Services B.V.</span>
                        </li>
                        <li className="grid grid-cols-[80px_1fr] gap-2">
                            <span className="font-mono text-xs uppercase tracking-wider text-institutional-charcoal/50">{t.depositary}</span>
                            <span className="font-bold">Citibank Europe plc</span>
                        </li>
                        <li className="grid grid-cols-[80px_1fr] gap-2">
                            <span className="font-mono text-xs uppercase tracking-wider text-institutional-charcoal/50">{t.counsel}</span>
                            <span className="font-bold">Fennek Advocaten</span>
                        </li>
                    </ul>
                </div>
            </Grid>
        </Section>
    );
}

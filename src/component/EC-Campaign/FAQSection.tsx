import React, { useState } from 'react';
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import "./faq.css";
import FaqIcon from "@/assets/icons/faq.svg";
// Actually, looking at the design screenshot (uploaded previously, though not for this specific task, usually they use badges).
// The user provided screenshot shows a "Veel gestelde vragen" badge with a chat icon above it? No, the screenshot shows a comment bubble icon above the badge?
// I'll stick to the text structure for now.

const FAQSection = () => {
    const { language } = useChangeLanguageContext();
    const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default? Or null. Screenshot shows first closed? No, usually first open is good UX, or all closed. Let's do all closed or first open. The prompt text implies standard accordion.

    const toggleExact = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const translations = {
        en: {
            badge: "Frequently Asked Questions",
            subtitle: "Below you will find answers to questions often asked by clients and interested parties.",
            faqs: [
                {
                    question: "How does EdgeFund generate returns?",
                    answer: "In the EdgeFund we earn money by receiving premiums on options. You can compare this to selling insurance: Investors are sometimes afraid that the market will move sharply. That fear causes option premiums to rise, especially if volatility increases; investors (both retail and institutional) want to protect their portfolios by buying options (which we sell). We capitalize on this by selling options when premiums are high. In exchange, we receive a premium immediately. Because we fully hedge the price risk, it does not matter to us whether the market rises or falls. We do not earn from the direction of the market, but from the fact that fear and uncertainty are temporary. In short: More unrest in the market = higher premiums = more opportunities to collect premiums, without price risk."
                },
                {
                    question: "What exactly does an AFM registration entail?",
                    answer: "We are registered with the AFM under the AIFM light regime. This means that we are supervised by the AFM, but in a lighter supervisory framework than fully licensed managers. Concretely, this means: We must strict legal requirements regarding transparency, reporting, and organization. The AFM supervises compliance with these rules. There is no prior testing or approval of a prospectus by the AFM. The AFM registration is not a quality mark, but it does indicate that we operate within the legal framework and are under supervision."
                },
                {
                    question: "What does market-neutral investing mean, and what does it imply for my investment?",
                    answer: "With market-neutral investing, we ensure that rising and falling market movements cancel each other out. We do this by hedging positions against each other. Here's how it works in practice: We take a position that can yield money, for example by receiving option premiums. At the same time, we take an opposite position in the same market. If the market goes up or down, that effect is compensated. The result: The direction of the market has barely any influence on the return. There is no or very limited price risk. The return comes from premiums and market movements, not from rising prices. You can compare it to a scale: what one side wins or loses due to price movements, is absorbed on the other side. This keeps the whole in balance. In short: Market-neutral investing means we seize opportunities in the market, while simultaneously protecting ourselves against large price fluctuations."
                },
                {
                    question: "What are the key risks?",
                    answer: <div className="ec-faq-rich-text">
                        <p><strong>Liquidity Risk</strong><br />The risk that a position cannot be closed immediately or at the desired price because there is temporarily insufficient trading in the used investment instrument.<br /><em>Measures:</em> Trading in the most liquid markets (S&P 500), spreading transactions across multiple exchanges and brokers.</p>
                        <p><strong>Volatility Risk</strong><br />The risk that extremely low or very sudden volatility temporarily negatively affects the strategy's return.<br /><em>Measures:</em> Dynamically adjusting positions to market conditions, strict risk management and limits per strategy.</p>
                        <p><strong>Execution Risk</strong><br />The risk that an order is not (fully) executed due to a technical problem.<br /><em>Measures:</em> Automated risk management scenarios, 24/7 human monitoring, redundant systems/backups, extensive test periods.</p>
                        <p><strong>Counterparty Risk</strong><br />The risk that an exchange or broker is unable to meet its financial obligations.<br /><em>Measures:</em> Spreading across multiple largest/reliable exchanges, continuous monitoring of counterparties.</p>
                    </div>
                },
                {
                    question: "What makes Edge Capital different from traditional asset managers?",
                    answer: "Traditional asset managers are often dependent on rising stock and bond markets. Edge Capital consciously chooses a different approach. We focus on market-neutral strategies where price risk is hedged as much as possible. The return does not come from market growth, but from premiums and volatility, including via our premium-risk strategy on the S&P 500. Concretely: No dependence on market prices for return. Fewer fluctuations than classic portfolios. Focus on risk control and stability. Systematic and reproducible strategies. In short: Where traditional managers hope for the right market direction, we focus on control over risk and consistency of return."
                },
                {
                    question: "What is an absolute return strategy?",
                    answer: "Absolute-return strategies strive for positive results in varying markets. In practice this means we: bet on market-neutral, hedged strategies like premium-risk on the S&P 500; eliminate price risk so return is not dependent on rising markets; continuously measure and adjust risk; combine different strategies that reinforce each other. The result is a portfolio aimed at stable and repeatable return, regardless of how the market moves."
                },
                {
                    question: "Are these investments not only for institutional parties?",
                    answer: "Solutions such as our market-neutral, hedged premium-risk strategy were for a long time mainly available to institutional investors. We now make this accessible to private and professional investors who choose stability, diversification, and potentially return that is not dependent on rising prices."
                },
                {
                    question: "Is there a fixed term? And are there costs associated with depositing or withdrawing money?",
                    answer: "There is no mandatory minimum term; we phase clients in and out on a monthly basis. This means you can enter or exit monthly without costs."
                }
            ]
        },
        nl: {
            badge: "Veel gestelde vragen",
            subtitle: "Hieronder vind u de antwoorden op vragen die ons vaak worden gesteld door klanten en geïnteresseerden.",
            faqs: [
                {
                    question: "Hoe maakt EdgeFund rendement?",
                    answer: "In het EdgeFund verdienen we geld door premies te ontvangen op opties. U kunt dit vergelijken met het verkopen van een verzekering: Beleggers zijn soms bang dat de markt hard gaat bewegen. Die angst zorgt ervoor dat optiepremies stijgen, vooral als de volatiliteit toeneemt, beleggers zowel particulier als institutioneel willen hun portfolio beschermen door opties te schrijven. Wij spelen daarop in door opties te verkopen wanneer die premies hoog zijn. In ruil daarvoor ontvangen we direct een premie. Omdat we het koersrisico volledig afdekken, maakt het voor ons niet uit of de markt stijgt of daalt. We verdienen niet aan de richting van de markt, maar aan het feit dat angst en onzekerheid tijdelijk zijn. Kort gezegd: Meer onrust in de markt = hogere premies = meer kansen om premie te incasseren, zonder koersrisico."
                },
                {
                    question: "Wat houdt een AFM registratie precies in?",
                    answer: "Wij zijn bij de AFM geregistreerd onder het AIFM light-regime. Dat betekent dat wij onder toezicht staan van de AFM, maar in een lichter toezichtkader dan volledig vergunde beheerders. Concreet houdt dit in: Wij moeten voldoen aan wettelijke eisen op het gebied van transparantie, rapportage en organisatie. De AFM houdt toezicht op de naleving van deze regels. Er is geen voorafgaande toetsing of goedkeuring van een prospectus door de AFM. De AFM-registratie is geen kwaliteitskeurmerk, maar geeft wel aan dat wij binnen het wettelijk kader opereren en onder toezicht staan."
                },
                {
                    question: "Wat betekent markt-neutraal beleggen, en wat houdt dit in voor mijn belegging?",
                    answer: "Bij markt-neutraal beleggen zorgen we ervoor dat stijgende en dalende marktbewegingen elkaar opheffen. Dat doen we door posities tegen elkaar af te dekken. Zo werkt dat in de praktijk: We nemen een positie die geld kan opleveren, bijvoorbeeld door optiepremies te ontvangen. Tegelijk nemen we een tegenovergestelde positie in dezelfde markt. Gaat de markt omhoog of omlaag, dan wordt dat effect gecompenseerd. Het resultaat: De richting van de markt heeft nauwelijks invloed op het rendement. Er is geen of sterk beperkt koersrisico. Het rendement komt uit premies en marktbewegingen, niet uit stijgende koersen. U kunt het vergelijken met een weegschaal: wat de ene kant wint of verliest door koersbewegingen, wordt aan de andere kant opgevangen. Zo blijft het geheel in balans. Kort gezegd: Markt-neutraal beleggen betekent dat we kansen benutten in de markt, terwijl we ons tegelijk beschermen tegen grote koersschommelingen."
                },
                {
                    question: "Wat zijn de belangrijkste risico’s?",
                    answer: <div className="ec-faq-rich-text">
                        <p><strong>Liquiditeitsrisico</strong><br />Het risico dat een positie niet direct of tegen de gewenste prijs kan worden gesloten, doordat er tijdelijk onvoldoende handel is in het gebruikte beleggingsinstrument.<br /><em>Maatregelen:</em> Handelen in de meest liquide markten, zoals de S&P 500, spreiding van transacties over meerdere beurzen en brokers.</p>
                        <p><strong>Volatiliteitsrisico</strong><br />Het risico dat extreem lage of juist zeer plotselinge volatiliteit het rendement van de strategie tijdelijk negatief beïnvloedt.<br /><em>Maatregelen:</em> Dynamisch aanpassen van posities aan marktomstandigheden, strikt risicobeheer en limieten per strategie.</p>
                        <p><strong>Executierisico</strong><br />Het risico dat een order door een technisch probleem geheel of gedeeltelijk niet wordt uitgevoerd.<br /><em>Maatregelen:</em> Geautomatiseerde risicobeheerscenario’s, 24/7 menselijke monitoring, redundante systemen en back-ups, uitgebreide test- en validatieperiodes.</p>
                        <p><strong>Tegenpartijrisico</strong><br />Het risico dat een beurs of broker niet in staat is om aan haar financiële verplichtingen te voldoen.<br /><em>Maatregelen:</em> Spreiding over meerdere van de grootste en meest betrouwbare beurzen, continue monitoring van tegenpartijen.</p>
                    </div>
                },
                {
                    question: "Wat maakt Edge Capital anders dan traditionele vermogensbeheerders?",
                    answer: "Traditionele vermogensbeheerders zijn vaak afhankelijk van stijgende aandelen- en obligatiemarkten. Edge Capital kiest bewust voor een andere aanpak. Wij richten ons op markt-neutrale strategieën waarbij het koersrisico zoveel mogelijk wordt afgedekt. Het rendement komt niet uit marktstijging, maar uit premies en volatiliteit, onder andere via onze premium-risk strategie op de S&P 500. Wat dat concreet betekent: Geen afhankelijkheid van marktkoersen voor rendement. Minder schommelingen dan bij klassieke portefeuilles. Focus op risicobeheersing en stabiliteit. Systematische en reproduceerbare strategieën. Kort gezegd: Waar traditionele beheerders hopen op de juiste marktrichting, richten wij ons op controle over risico en consistentie van rendement."
                },
                {
                    question: "Wat is een absolute return strategie?",
                    answer: "Absolute-return strategieën streven naar positieve resultaten in uiteenlopende markten. In de praktijk betekent dit dat we: inzetten op markt neutrale, afgedekte strategieën zoals premium-risk op de S&P 500; het koersrisico elimineren zodat rendement niet afhankelijk is van stijgende markten; risico continu meten en bijsturen; verschillende strategieën combineren die elkaar versterken. Het resultaat is een portefeuille die gericht is op stabiel en herhaalbaar rendement, ongeacht hoe de markt beweegt."
                },
                {
                    question: "Zijn deze beleggingen niet alleen voor institutionele partijen?",
                    answer: "Oplossingen zoals onze marktneutrale, afgedekte premium-risk strategie waren lange tijd vooral voor institutionele beleggers beschikbaar. Wij maken dit nu ook toegankelijk voor particuliere en professionele beleggers die kiezen voor stabiliteit, diversificatie en rendement dat niet afhankelijk is van stijgende koersen."
                },
                {
                    question: "Is er een looptijd? En zijn er kosten verbonden aan geld storten of opnemen?",
                    answer: "Er is geen verplichte minimale looptijd, we faseren klanten per maand in en uit. Dit houdt in dat u op maandbasis zonder kosten kan in of uitstappen."
                }
            ]
        }
    };

    const t = translations[language];

    // Safe toggle function
    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="ec-faq-section">
            <div className="ec-faq-container">
                <div className="ec-faq-header">
                    <img src={FaqIcon} alt="" className="ec-faq-icon" />
                    <span className="ec-faq-badge">
                        {t.badge}
                    </span>
                    <h3>{t.subtitle}</h3>
                </div>

                <div className="ec-faq-list">
                    {t.faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`ec-faq-item ${openIndex === index ? 'active' : ''}`}
                            onClick={() => handleClick(index)}
                        >
                            <div className="ec-faq-question">
                                <h4>{faq.question}</h4>
                                <span className="ec-faq-chevron"></span>
                            </div>
                            <div className="ec-faq-answer">
                                <div className="ec-faq-answer-inner">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;

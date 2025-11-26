import CardItem from "./card-item";
import { Sparkles2, TrendingUp, Maximize2 } from "@deemlol/next-icons"


const Cards = () => {
    const cards = [
        {
            title: "Personalization",
            description: "AI-driven plans tailored to your unique body, goals, and fitness level. Every workout is designed just for you.",
            icon: <Sparkles2 size={40} />
        },
        {
            title: "Progression",
            description: "Smart algorithms adjust your workouts as you improve, ensuring continuous challenge and consistent results.",
            icon: <TrendingUp size={40} />
        },
        {
            title: "Flexibility",
            description: "Work out anywhere, anytime. Adapt your plan instantly to fit your schedule, equipment, or location changes.",
            icon: <Maximize2 size={40} />
        },
    ];

    return (
        <section className="w-full z-20 relative">
            <div className="flex flex-col md:flex-row justify-center pt-5 lg:p-10 lg:pt-30 lg:gap-20">
                {cards.map((card, index) => (
                    <CardItem key={index} title={card.title} description={card.description} icon={card.icon} />
                ))}
            </div>
        </section>
    );
};
export default Cards;
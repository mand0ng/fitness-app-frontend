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
        <section>
            <div className="flex flex-row justify-center p-10 m-35 gap-10">
                {cards.map((card, index) => (
                    <CardItem key={index} title={card.title} description={card.description} icon={card.icon} />
                ))}
            </div>
        </section>
    );
};
export default Cards;
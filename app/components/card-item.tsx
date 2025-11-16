interface CardItemProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

const CardItem = ({ title, description, icon }: CardItemProps) => {
    return (
        <div className="card-item my-card-bg p-12 m-4 border border-(--muted) rounded-lg shadow-lg justify-items-center text-center">
            <div className="icon mb-10">{icon}</div>
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            <p className="text-sm sub-text">{description}</p>
        </div>
    );
};

export default CardItem;

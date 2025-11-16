'use client';
import Header from "../components/header";
import Footer from "../components/footer";
import MyCalendar from "./components/my-calendar";


const Dashboard = () =>{
    return (
        <section>
            <Header />
                <section className="m-20">
                    <div className="border border-(--muted) rounded-lg shadow-lg p-10 my-secondary-bg mb-10">
                        <h1 className="text-2xl font-bold mb-2">Welcome back Jane Doe!</h1>
                    </div>
                    <MyCalendar />
                </section>
            <Footer />
        </section>
    );
};

export default Dashboard;
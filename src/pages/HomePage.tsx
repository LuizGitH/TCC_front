import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ComoFuncionaSection from "../components/ComoFuncionaSection";

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen">

            <Header />

            <HeroSection />

            <ComoFuncionaSection />

        </div>
    );
};

export default HomePage;
'use client'
import Head from "next/head";
import { Col, Row } from "reactstrap";
import SalesChart from "@/app/(DashboardLayout)/components/dashboard/SalesChart";
import Feeds from "@/app/(DashboardLayout)/components/dashboard/Feeds";
import ProjectTables from "@/app/(DashboardLayout)/components/dashboard/ProjectTable";
import TopCards from "@/app/(DashboardLayout)/components/dashboard/TopCards";
import Blog from "@/app/(DashboardLayout)/components/dashboard/Blog";
import bg1 from "../../../public/images/bg/bg1.jpg";
import bg2 from "../../../public/images/bg/bg2.jpg";
import bg3 from "../../../public/images/bg/bg3.jpg";
import bg4 from "../../../public/images/bg/bg4.jpg";
import HomePage from "./pages/page";
import Header from "./layouts/header/Header";
import BottomNav from "./layouts/bottomNav/bottomNav";
import { useRouter } from 'next/router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    })
  }, [])

  return (
    <>
    
      <Head>
        <title>Home - Dream Academy</title>
        <meta name="description" content="Selamat datang di Dream Academy, web tryout pertama di Indonesia Timur." />
      </Head>
      <Header />
      <HomePage />
      <BottomNav />
    </>
  );
}

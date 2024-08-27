'use client'
import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    CardTitle,
    CardBody,
    Button,
    Card,
    CardSubtitle,
    Input,
} from "reactstrap";
import Image from "next/image";
import logo from "../../../../../public/images/logos/aboutLogo.svg"
import usertry from "../../../../../public/images/users/usertry.svg"
import Link from "next/link";
import TryOutSaya from "./tryoutsaya";
import AllTryOut from "./alltryout";
import { useRouter } from "next/navigation";
import BundlingTryOut from "./bundlingtryout";

const About = () => {
    const [allTryOut, setAllTryOut] = useState(true);
    const [tryOutSaya, setTryOutSaya] = useState(false);
    const [bundling, setBundling] = useState(false);
    const [activeLink, setActiveLink] = useState('saya');

    const handleAll = (linkName) => {
        setAllTryOut(false);
        setTryOutSaya(true);
        setBundling(false)
        setActiveLink(linkName);
    }
    const handleSaya = (linkName) => {
        setAllTryOut(true);
        setTryOutSaya(false);
        setBundling(false)
        setActiveLink(linkName);
    }
    const handleBundling = (linkName) => {
        setAllTryOut(false);
        setTryOutSaya(false);
        setBundling(true)
        setActiveLink(linkName);
    }
    return (
        <>
            <span className="position-fixed w-100 navtry d-flex flex-column justify-content-end" style={{ height: '10vh', top: '8%', left: 0, zIndex: '99' }}>
                <section className="d-flex justify-content-center gap-5 pt-3">
                    <Link href="#saya" onClick={() => handleAll('all')} className={activeLink === 'all' ? 'fw-bolder active-link' : ''}>
                        Try Out Saya
                    </Link>
                    <Link href="#" onClick={() => handleSaya('saya')} className={activeLink === 'saya' ? 'fw-bolder active-link' : ''}>
                        Try Out Dream Academy
                    </Link>
                    <Link href="#" onClick={() => handleBundling('bundling')} className={activeLink === 'bundling' ? 'fw-bolder active-link' : ''}>
                        Bundling Try Out Dream Academy
                    </Link>
                </section>
                <hr className="mt-1 mb-0" />
            </span>
            <div className="mt-5 pt-5">
                {allTryOut ? (
                    <AllTryOut />
                ) : tryOutSaya ? (
                    <TryOutSaya />
                ): bundling && (
                    <BundlingTryOut />
                )}
            </div>
        </>
    );
};

export default About;

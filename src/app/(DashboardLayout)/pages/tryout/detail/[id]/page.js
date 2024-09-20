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
} from "reactstrap";
import Image from "next/image";
import logo from "../../../../../../../public/images/logos/aboutLogo.svg"
import usertry from "../../../../../../../public/images/users/usertry.svg"
import Link from "next/link";
import { db } from "../../../../../../../public/firebaseConfig";
import { useAuth } from "../../../../../../../public/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';
import ProtectedRoute from "../../ProtectedRoute";

async function fetchUserData(uid) {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        return userDoc.data();
    } else {
        console.log('No such document!');
        return null;
    }
}


const formatDate = (dateString) => {
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const date = new Date(dateString);

    // Convert to WITA time zone (UTC+8)
    const witaOffset = 8 * 60; // 8 hours in minutes
    const localDate = new Date(date.getTime() + witaOffset * 60000);

    const day = localDate.getDate().toString().padStart(2, '0'); // Pad day to 2 digits
    const month = months[localDate.getMonth()]; // Get month name
    const year = localDate.getFullYear(); // Get year
    const hours = localDate.getHours().toString().padStart(2, '0'); // Get hours
    const minutes = localDate.getMinutes().toString().padStart(2, '0'); // Get minutes

    return `${day} ${month} ${year} ${hours}:${minutes} WITA`;
};

const About = () => {
    const [show, setShow] = useState(true);
    const router = useRouter();
    const { currentUser } = useAuth(); // Get the logged-in user from your AuthContext
    const [dataUser, setDataUser] = useState([]);

    const TPS = ["Kemampuan Penalaran Umum", "Pengetahuan dan Pemahaman Umum", "Kemampuan Memahami Bacaan dan Menulis", "Pengetahuan Kuantitatif"];
    const regDetail = ["Akses semua modul", "Hasil nilai, beanar & salah", "Pembahasan Soal", "Rasionalisasi PTN"];

    const { id } = useParams(); // Ambil parameter dinamis dari URL
    const [detailData, setDetailData] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchDetailData = async () => {
                const docRef = doc(db, 'tryout_v1', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setDetailData(docSnap.data());
                } else {
                    console.log('No such document!');
                }
            };
            fetchDetailData();
        }
    }, [id]);

    useEffect(() => {
        if (currentUser?.uid) {
            async function fetchData() {
                const userData = await fetchUserData(currentUser.uid);
                if (userData) {
                    setDataUser(userData);
                }
            }
            fetchData();
        }
    }, [currentUser]);

    if (!dataUser) {
        return <div>Loading...</div>;
    }

    const handleShow = () => {
        setShow(!show);
    }

    const handleUbah = () => {
        router.push('/pages/profile');
    }

    const tps = detailData?.listTest?.filter(item => item.nameTest === "TPS") ?? [];
    let tpsListSubtests = tps.flatMap(element => element.listSubtest);

    //literasi
    const literiasi = detailData?.listTest?.filter(item => item.nameTest === "Tes Literasi") ?? [];
    let listSubtests = literiasi.flatMap(element => element.listSubtest);

    if (!detailData) {
        return <div>Loading...</div>;
    }

    console.log('data', id);

    console.log('detail', detailData);

    return (
        <ProtectedRoute>
            <div className="detailAll" style={{ padding: '12vh 10% 20px' }}>
                <section className="d-flex align-items-center mb-4">
                    <Link href="/pages/tryout">
                        <svg className="me-2 cursor-pointer" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="14" cy="14" r="14" fill="#27B262" />
                            <path d="M15.3111 8.31405C15.2128 8.2145 15.0961 8.13552 14.9675 8.08163C14.839 8.02774 14.7012 8 14.5621 8C14.423 8 14.2852 8.02774 14.1567 8.08163C14.0281 8.13552 13.9114 8.2145 13.8131 8.31405L8.93667 13.2431C8.83818 13.3425 8.76004 13.4605 8.70673 13.5904C8.65342 13.7203 8.62598 13.8596 8.62598 14.0002C8.62598 14.1409 8.65342 14.2801 8.70673 14.41C8.76004 14.54 8.83818 14.658 8.93667 14.7573L13.8131 19.6864C13.9115 19.7858 14.0282 19.8647 14.1568 19.9185C14.2853 19.9723 14.423 20 14.5621 20C14.7012 20 14.8389 19.9723 14.9675 19.9185C15.096 19.8647 15.2127 19.7858 15.3111 19.6864C15.4095 19.587 15.4875 19.469 15.5407 19.3391C15.5939 19.2092 15.6213 19.0699 15.6213 18.9293C15.6213 18.7887 15.5939 18.6495 15.5407 18.5196C15.4875 18.3897 15.4095 18.2717 15.3111 18.1722L11.189 13.9949L15.3111 9.82822C15.7148 9.4094 15.7148 8.72212 15.3111 8.31405Z" fill="white" />
                        </svg>
                    </Link>
                    Try Out Dream Academy
                </section>
                <div className="ps-0 ps-lg-5">
                    <section style={{ height: '30vh' }}>
                        <Row className="h-100">
                            <Col sm="12" lg="3">
                                <div className="border-primer d-flex justify-content-center align-items-center rounded-3 w-100 h-100">
                                    <img src={detailData.image} className="rounded-3 h-100 w-100" style={{ objectFit: 'cover' }} />
                                </div>
                            </Col>
                            <Col sm="12" lg="9" className="mt-3 mt-lg-0">
                                <span className="text-center text-lg-start">
                                    <h5>{detailData.toName}</h5>
                                    <p className="m-0">{formatDate(detailData.created)} s.d. {formatDate(detailData.ended)}</p>
                                    <p className="mt-4">{detailData.desk}</p>
                                </span>
                            </Col>
                        </Row>
                    </section>
                    <section className="w-100">
                        <div className="p-4 text-black rounded-4 mt-0 mt-lg-5" style={{ width: window.innerWidth < 576 ? '100%' : '40%', backgroundColor: 'rgb(000, 000, 000, 0.05)' }}>
                            <div className="d-flex tryoutSec2 justify-content-between align-items-center">
                                <span>
                                    <div className="rounded-circle">
                                        <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.93305 14.3361V12.0672H12.202V14.3361H9.93305ZM5.39524 14.3361V12.0672H7.66414V14.3361H5.39524ZM14.4709 14.3361V12.0672H16.7398V14.3361H14.4709ZM9.93305 18.8739V16.605H12.202V18.8739H9.93305ZM5.39524 18.8739V16.605H7.66414V18.8739H5.39524ZM14.4709 18.8739V16.605H16.7398V18.8739H14.4709ZM0.857422 23.4117V2.99156H4.26078V0.722656H6.52969V2.99156H15.6053V0.722656H17.8742V2.99156H21.2776V23.4117H0.857422ZM3.12633 21.1428H19.0087V9.79829H3.12633V21.1428Z" fill="white" />
                                        </svg>
                                    </div>
                                    <p>Fase TO</p>
                                </span>
                                <span>
                                    <b>{detailData.phase == false ? 'Belum Selesai' : 'Selesai'}</b>
                                </span>
                            </div>
                            <hr />
                            <div className="d-flex tryoutSec2 justify-content-between align-items-center">
                                <span>
                                    <div className="rounded-circle">
                                        <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.66667 2.28571V0H13.3333V2.28571H6.66667ZM8.88889 14.8571H11.1111V8H8.88889V14.8571ZM10 24C8.62963 24 7.33778 23.7288 6.12444 23.1863C4.91111 22.6438 3.85111 21.9055 2.94444 20.9714C2.03778 20.0373 1.32037 18.9467 0.792222 17.6994C0.264074 16.4522 0 15.1238 0 13.7143C0 12.3048 0.264074 10.976 0.792222 9.728C1.32037 8.48 2.03778 7.38971 2.94444 6.45714C3.85111 5.52457 4.91148 4.78666 6.12556 4.24343C7.33963 3.70019 8.63111 3.42857 10 3.42857C11.1481 3.42857 12.25 3.61905 13.3056 4C14.3611 4.38095 15.3519 4.93333 16.2778 5.65714L17.8333 4.05714L19.3889 5.65714L17.8333 7.25714C18.537 8.20952 19.0741 9.22857 19.4444 10.3143C19.8148 11.4 20 12.5333 20 13.7143C20 15.1238 19.7359 16.4526 19.2078 17.7006C18.6796 18.9486 17.9622 20.0389 17.0556 20.9714C16.1489 21.904 15.0885 22.6423 13.8744 23.1863C12.6604 23.7303 11.3689 24.0015 10 24Z" fill="white" />
                                        </svg>
                                    </div>
                                    <p>Total Waktu</p>
                                </span>
                                <span>
                                    <b>{detailData.totalTime} Menit</b>
                                </span>
                            </div>
                            <hr />
                            <div className="d-flex tryoutSec2 justify-content-between align-items-center">
                                <span>
                                    <div className="rounded-circle">
                                        <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.4545 2.76923H20V24H0V2.76923H4.54545V4.61538H15.4545V2.76923ZM3.63636 12H16.3636V10.1538H3.63636V12ZM3.63636 19.3846H16.3636V17.5385H3.63636V19.3846ZM6.36364 2.76923V0H13.6364V2.76923H6.36364Z" fill="white" />
                                        </svg>
                                    </div>
                                    <p>Jumlah Soal</p>
                                </span>
                                <span>
                                    <b>{detailData.numberQuestions} Soal</b>
                                </span>
                            </div>
                        </div>
                    </section>
                    <section className="w-100">
                        <div className="tryoutSec3">
                            <span className="me-3">
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="6.5" cy="6.5" r="5.5" stroke="#27B262" stroke-width="2" />
                                </svg>
                            </span>
                            <span className="w-100">
                                <h5> TPS</h5>
                                <span>
                                    {tpsListSubtests.map((item, index) => (
                                        <div key={index}>
                                            <p>{item.name}</p>
                                            <b>{item.timeMinute} Menit | {item.numberQuestions} Soal</b>
                                        </div>
                                    ))}
                                </span>
                            </span>
                        </div>
                        <div className="tryoutSec3">
                            <span className="me-3">
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="6.5" cy="6.5" r="5.5" stroke="#27B262" stroke-width="2" />
                                </svg>
                            </span>
                            <span className="w-100">
                                <h5>Tes Literasi</h5>
                                <span>
                                    {listSubtests.map((item, index) => (
                                        <div key={index}>
                                            <p>{item.name}</p>
                                            <b>{item.timeMinute} Menit | {item.numberQuestions} Soal</b>
                                        </div>
                                    ))}
                                </span>
                            </span>
                        </div>
                    </section>
                    <section className="tryoutSec4">
                        <Row className="h-100">
                            <Col sm="12" lg="3">
                                <Image src={usertry} style={{ width: '100%' }} alt="" />
                            </Col>
                            <Col sm="12" lg="9">
                                <div className="d-flex ps-2 text-center text-lg-start flex-column justify-content-between h-100 w-100">
                                    <Row>
                                        <Col xs='6' sm='12' lg='3' className="p-0 m-0">
                                            <span>
                                                <b>Target Universitas 1</b>
                                                <h5 className="text-black fw-light">{dataUser.universitas}</h5>
                                            </span>
                                            <span className="jurusan">
                                                <h5 className="d-flex align-items-center">
                                                    <svg className="me-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z" fill="#27B262" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="white" />
                                                        <path d="M4.36189 9.25719C4.84441 8.7872 5.62672 8.7872 6.10924 9.25719L9.38261 12.4455C9.86513 12.9155 9.86513 13.6775 9.38261 14.1475C8.90009 14.6175 8.11777 14.6175 7.63526 14.1475L4.36189 10.9592C3.87937 10.4892 3.87937 9.72717 4.36189 9.25719Z" fill="white" />
                                                        <path d="M15.6381 6.35249C16.1206 6.82247 16.1206 7.58447 15.6381 8.05446L9.38261 14.1475C8.90009 14.6175 8.11777 14.6175 7.63526 14.1475C7.15274 13.6775 7.15273 12.9155 7.63525 12.4455L13.8908 6.35249C14.3733 5.8825 15.1556 5.8825 15.6381 6.35249Z" fill="white" />
                                                    </svg>
                                                    {dataUser.jurusan1}</h5>
                                                <h5 className="d-flex align-items-center">
                                                    <svg className="me-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z" fill="#27B262" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="white" />
                                                        <path d="M4.36189 9.25719C4.84441 8.7872 5.62672 8.7872 6.10924 9.25719L9.38261 12.4455C9.86513 12.9155 9.86513 13.6775 9.38261 14.1475C8.90009 14.6175 8.11777 14.6175 7.63526 14.1475L4.36189 10.9592C3.87937 10.4892 3.87937 9.72717 4.36189 9.25719Z" fill="white" />
                                                        <path d="M15.6381 6.35249C16.1206 6.82247 16.1206 7.58447 15.6381 8.05446L9.38261 14.1475C8.90009 14.6175 8.11777 14.6175 7.63526 14.1475C7.15274 13.6775 7.15273 12.9155 7.63525 12.4455L13.8908 6.35249C14.3733 5.8825 15.1556 5.8825 15.6381 6.35249Z" fill="white" />
                                                    </svg>
                                                    {dataUser.jurusan2}</h5>
                                            </span>
                                        </Col>
                                        <Col xs='6' sm='12' lg='3' className="p-0 m-0">
                                            <span>
                                                <b>Target Universitas 2</b>
                                                <h5 className="text-black fw-light">{dataUser.universitas3}</h5>
                                            </span>
                                            <span className="jurusan">
                                                <h5 className="d-flex align-items-center">
                                                    <svg className="me-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z" fill="#27B262" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="white" />
                                                        <path d="M4.36189 9.25719C4.84441 8.7872 5.62672 8.7872 6.10924 9.25719L9.38261 12.4455C9.86513 12.9155 9.86513 13.6775 9.38261 14.1475C8.90009 14.6175 8.11777 14.6175 7.63526 14.1475L4.36189 10.9592C3.87937 10.4892 3.87937 9.72717 4.36189 9.25719Z" fill="white" />
                                                        <path d="M15.6381 6.35249C16.1206 6.82247 16.1206 7.58447 15.6381 8.05446L9.38261 14.1475C8.90009 14.6175 8.11777 14.6175 7.63526 14.1475C7.15274 13.6775 7.15273 12.9155 7.63525 12.4455L13.8908 6.35249C14.3733 5.8825 15.1556 5.8825 15.6381 6.35249Z" fill="white" />
                                                    </svg>
                                                    {dataUser.jurusan1_3}</h5>
                                                <h5 className="d-flex align-items-center">
                                                    <svg className="me-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z" fill="#27B262" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="white" />
                                                        <path d="M4.36189 9.25719C4.84441 8.7872 5.62672 8.7872 6.10924 9.25719L9.38261 12.4455C9.86513 12.9155 9.86513 13.6775 9.38261 14.1475C8.90009 14.6175 8.11777 14.6175 7.63526 14.1475L4.36189 10.9592C3.87937 10.4892 3.87937 9.72717 4.36189 9.25719Z" fill="white" />
                                                        <path d="M15.6381 6.35249C16.1206 6.82247 16.1206 7.58447 15.6381 8.05446L9.38261 14.1475C8.90009 14.6175 8.11777 14.6175 7.63526 14.1475C7.15274 13.6775 7.15273 12.9155 7.63525 12.4455L13.8908 6.35249C14.3733 5.8825 15.1556 5.8825 15.6381 6.35249Z" fill="white" />
                                                    </svg>
                                                    {dataUser.jurusan2_3}</h5>
                                            </span>
                                        </Col>
                                        <Col xs='6' sm='12' lg='3' className="p-0 m-0">
                                            <span>
                                                <b>Target Universitas 3</b>
                                                <h5 className="text-black fw-light">{dataUser.universitas2}</h5>
                                            </span>
                                            <span className="jurusan">
                                                <h5 className="d-flex align-items-center">
                                                    <svg className="me-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z" fill="#27B262" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="white" />
                                                        <path d="M4.36189 9.25719C4.84441 8.7872 5.62672 8.7872 6.10924 9.25719L9.38261 12.4455C9.86513 12.9155 9.86513 13.6775 9.38261 14.1475C8.90009 14.6175 8.11777 14.6175 7.63526 14.1475L4.36189 10.9592C3.87937 10.4892 3.87937 9.72717 4.36189 9.25719Z" fill="white" />
                                                        <path d="M15.6381 6.35249C16.1206 6.82247 16.1206 7.58447 15.6381 8.05446L9.38261 14.1475C8.90009 14.6175 8.11777 14.6175 7.63526 14.1475C7.15274 13.6775 7.15273 12.9155 7.63525 12.4455L13.8908 6.35249C14.3733 5.8825 15.1556 5.8825 15.6381 6.35249Z" fill="white" />
                                                    </svg>
                                                    {dataUser.jurusan1_2}</h5>
                                                <h5 className="d-flex align-items-center">
                                                    <svg className="me-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z" fill="#27B262" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="white" />
                                                        <path d="M4.36189 9.25719C4.84441 8.7872 5.62672 8.7872 6.10924 9.25719L9.38261 12.4455C9.86513 12.9155 9.86513 13.6775 9.38261 14.1475C8.90009 14.6175 8.11777 14.6175 7.63526 14.1475L4.36189 10.9592C3.87937 10.4892 3.87937 9.72717 4.36189 9.25719Z" fill="white" />
                                                        <path d="M15.6381 6.35249C16.1206 6.82247 16.1206 7.58447 15.6381 8.05446L9.38261 14.1475C8.90009 14.6175 8.11777 14.6175 7.63526 14.1475C7.15274 13.6775 7.15273 12.9155 7.63525 12.4455L13.8908 6.35249C14.3733 5.8825 15.1556 5.8825 15.6381 6.35249Z" fill="white" />
                                                    </svg>
                                                    {dataUser.jurusan2_2}</h5>
                                            </span>
                                        </Col>
                                        <Col xs='6' sm='12' lg='3' className="p-0 m-0">
                                            <span>
                                                <b>Target Universitas 4</b>
                                                <h5 className="text-black fw-light">{dataUser.universitas4}</h5>
                                            </span>
                                            <span className="jurusan">
                                                <h5 className="d-flex align-items-center">
                                                    <svg className="me-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z" fill="#27B262" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="white" />
                                                        <path d="M4.36189 9.25719C4.84441 8.7872 5.62672 8.7872 6.10924 9.25719L9.38261 12.4455C9.86513 12.9155 9.86513 13.6775 9.38261 14.1475C8.90009 14.6175 8.11777 14.6175 7.63526 14.1475L4.36189 10.9592C3.87937 10.4892 3.87937 9.72717 4.36189 9.25719Z" fill="white" />
                                                        <path d="M15.6381 6.35249C16.1206 6.82247 16.1206 7.58447 15.6381 8.05446L9.38261 14.1475C8.90009 14.6175 8.11777 14.6175 7.63526 14.1475C7.15274 13.6775 7.15273 12.9155 7.63525 12.4455L13.8908 6.35249C14.3733 5.8825 15.1556 5.8825 15.6381 6.35249Z" fill="white" />
                                                    </svg>
                                                    {dataUser.jurusan1_4}</h5>
                                                <h5 className="d-flex align-items-center">
                                                    <svg className="me-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z" fill="#27B262" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="white" />
                                                        <path d="M4.36189 9.25719C4.84441 8.7872 5.62672 8.7872 6.10924 9.25719L9.38261 12.4455C9.86513 12.9155 9.86513 13.6775 9.38261 14.1475C8.90009 14.6175 8.11777 14.6175 7.63526 14.1475L4.36189 10.9592C3.87937 10.4892 3.87937 9.72717 4.36189 9.25719Z" fill="white" />
                                                        <path d="M15.6381 6.35249C16.1206 6.82247 16.1206 7.58447 15.6381 8.05446L9.38261 14.1475C8.90009 14.6175 8.11777 14.6175 7.63526 14.1475C7.15274 13.6775 7.15273 12.9155 7.63525 12.4455L13.8908 6.35249C14.3733 5.8825 15.1556 5.8825 15.6381 6.35249Z" fill="white" />
                                                    </svg>
                                                    {dataUser.jurusan2_4}</h5>
                                            </span>
                                        </Col>
                                        <div className="bg-blur w-lg-100 text-start">
                                            <svg className="me-2" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.133789" y="22.8667" width="22.7333" height="22.7333" rx="11.3667" transform="rotate(-90 0.133789 22.8667)" fill="#27B262" />
                                                <rect x="12.7637" y="10.2368" width="8.84074" height="2.52593" rx="1.26296" transform="rotate(90 12.7637 10.2368)" fill="white" />
                                                <rect x="12.7637" y="5.18506" width="2.52593" height="2.52593" rx="1.26296" transform="rotate(90 12.7637 5.18506)" fill="white" />
                                            </svg>
                                            Jurusan yang kamu pilih akan mempengaruhi progressmu loh
                                        </div>
                                    </Row>
                                    <span className="text-center">
                                        <p>Ingin mengubah target yang kamu atur sebelumnya?</p>
                                        <Button className="border-primer bg-transparent w-100" onClick={handleUbah}>Ubah Sekarang</Button>
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </section>
                    <section className="tryoutSec5">
                        <a href="#detail">
                            <Button className="bg-primer border-0 w-100" onClick={handleShow}>Daftar Sekarang</Button>
                        </a>
                    </section>
                    <section className="tryoutSec6"></section>
                </div>
            </div>
            {!show && (
                <div id="detail" className="regTrigger">
                    <Card className="px-4 pt-1 pt-lg-3 pb-2 h-100 w-50 w-lg-90 bg-light m-0">
                        <section className="d-flex mb-2 justify-content-end">
                            <svg onClick={handleShow} className="cursor-pointer" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="23.4775" y="7.06396" width="2.52178" height="22.4051" rx="1.26089" transform="rotate(45 23.4775 7.06396)" fill="black" />
                                <rect x="25.2607" y="22.8384" width="2.52178" height="22.4051" rx="1.26089" transform="rotate(135 25.2607 22.8384)" fill="black" />
                            </svg>
                        </section>
                        <section className="tables">
                            <Row>
                                <Col xs='4' sm="4" lg="4" className="px-1">
                                    <div className="rounded pt-2 bg-transparent">
                                        <span className="invisible">
                                            <b>Daftar</b>
                                        </span>
                                        <hr className="invisible m-1" />
                                        {regDetail.map((item) => (
                                            <span key={item}>
                                                <div style={{ height: '50px' }} className="d-flex align-items-center">
                                                    <p className="ps-1 m-0">{item}</p>
                                                </div>
                                                <hr className="m-0" />
                                            </span>
                                        ))}
                                        <div style={{ height: '50px' }} className="d-flex align-items-center">
                                            <p className="ps-1 m-0">Report TO Analysis</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs='4' sm="4" lg="4" className="px-1">
                                    <div className="rounded pt-2" style={{ backgroundColor: 'rgb(39, 178, 98, 0.2)' }}>
                                        <span className="text-center">
                                            <h5>Premium</h5>
                                        </span>
                                        <hr className="m-0" />
                                        {regDetail.map((item) => (
                                            <span key={item}>
                                                <div className="d-flex justify-content-center align-items-center" style={{ height: '50px' }}>
                                                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M32.0141 16.4387C32.0141 25.0761 25.0121 32.0781 16.3747 32.0781C7.73734 32.0781 0.735352 25.0761 0.735352 16.4387C0.735352 7.8013 7.73734 0.799316 16.3747 0.799316C25.0121 0.799316 32.0141 7.8013 32.0141 16.4387Z" fill="#27B262" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3747 28.9502C23.2846 28.9502 28.8862 23.3486 28.8862 16.4387C28.8862 9.52878 23.2846 3.92719 16.3747 3.92719C9.46481 3.92719 3.86323 9.52878 3.86323 16.4387C3.86323 23.3486 9.46481 28.9502 16.3747 28.9502ZM16.3747 32.0781C25.0121 32.0781 32.0141 25.0761 32.0141 16.4387C32.0141 7.8013 25.0121 0.799316 16.3747 0.799316C7.73734 0.799316 0.735352 7.8013 0.735352 16.4387C0.735352 25.0761 7.73734 32.0781 16.3747 32.0781Z" fill="white" />
                                                        <path d="M7.55718 15.2771C8.31181 14.5421 9.5353 14.5421 10.2899 15.2771L15.4093 20.2635C16.1639 20.9986 16.1639 22.1903 15.4093 22.9253C14.6546 23.6603 13.4312 23.6603 12.6765 22.9253L7.55718 17.9389C6.80255 17.2039 6.80255 16.0122 7.55718 15.2771Z" fill="white" />
                                                        <path d="M25.1925 10.7344C25.9471 11.4694 25.9471 12.6611 25.1925 13.3961L15.4093 22.9253C14.6546 23.6603 13.4312 23.6603 12.6765 22.9253C11.9219 22.1903 11.9219 20.9985 12.6765 20.2635L22.4597 10.7344C23.2144 9.99935 24.4379 9.99935 25.1925 10.7344Z" fill="white" />
                                                    </svg>
                                                </div>
                                                <hr className="m-0" />
                                            </span>
                                        ))}
                                        <div className="d-flex justify-content-center align-items-center" style={{ height: '50px' }}>
                                            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M32.0141 16.4387C32.0141 25.0761 25.0121 32.0781 16.3747 32.0781C7.73734 32.0781 0.735352 25.0761 0.735352 16.4387C0.735352 7.8013 7.73734 0.799316 16.3747 0.799316C25.0121 0.799316 32.0141 7.8013 32.0141 16.4387Z" fill="#27B262" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3747 28.9502C23.2846 28.9502 28.8862 23.3486 28.8862 16.4387C28.8862 9.52878 23.2846 3.92719 16.3747 3.92719C9.46481 3.92719 3.86323 9.52878 3.86323 16.4387C3.86323 23.3486 9.46481 28.9502 16.3747 28.9502ZM16.3747 32.0781C25.0121 32.0781 32.0141 25.0761 32.0141 16.4387C32.0141 7.8013 25.0121 0.799316 16.3747 0.799316C7.73734 0.799316 0.735352 7.8013 0.735352 16.4387C0.735352 25.0761 7.73734 32.0781 16.3747 32.0781Z" fill="white" />
                                                <path d="M7.55718 15.2771C8.31181 14.5421 9.5353 14.5421 10.2899 15.2771L15.4093 20.2635C16.1639 20.9986 16.1639 22.1903 15.4093 22.9253C14.6546 23.6603 13.4312 23.6603 12.6765 22.9253L7.55718 17.9389C6.80255 17.2039 6.80255 16.0122 7.55718 15.2771Z" fill="white" />
                                                <path d="M25.1925 10.7344C25.9471 11.4694 25.9471 12.6611 25.1925 13.3961L15.4093 22.9253C14.6546 23.6603 13.4312 23.6603 12.6765 22.9253C11.9219 22.1903 11.9219 20.9985 12.6765 20.2635L22.4597 10.7344C23.2144 9.99935 24.4379 9.99935 25.1925 10.7344Z" fill="white" />
                                            </svg>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs='4' sm="4" lg="4" className="px-1">
                                    <div className="rounded pt-2 w-100" style={{ backgroundColor: 'rgb(249, 164, 25, 0.2)' }}>
                                        <span className="text-center">
                                            <h5>Gratis</h5>
                                        </span>
                                        <hr className="m-0" />
                                        {regDetail.map((item) => (
                                            <span key={item}>
                                                <div className="d-flex justify-content-center align-items-center" style={{ height: '50px' }}>
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M31.9047 16.073C31.9047 24.7104 24.9027 31.7123 16.2653 31.7123C7.62796 31.7123 0.625977 24.7104 0.625977 16.073C0.625977 7.43558 7.62796 0.433594 16.2653 0.433594C24.9027 0.433594 31.9047 7.43558 31.9047 16.073Z" fill="#B22727" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2653 28.5845C23.1753 28.5845 28.7768 22.9829 28.7768 16.073C28.7768 9.16306 23.1753 3.56147 16.2653 3.56147C9.35544 3.56147 3.75385 9.16306 3.75385 16.073C3.75385 22.9829 9.35544 28.5845 16.2653 28.5845ZM16.2653 31.7123C24.9027 31.7123 31.9047 24.7104 31.9047 16.073C31.9047 7.43558 24.9027 0.433594 16.2653 0.433594C7.62796 0.433594 0.625977 7.43558 0.625977 16.073C0.625977 24.7104 7.62796 31.7123 16.2653 31.7123Z" fill="white" />
                                                        <path d="M20.2419 8.90743C21.1207 8.03541 22.5454 8.03542 23.4241 8.90743C24.3028 9.77944 24.3028 11.1932 23.4241 12.0653L12.2865 23.1177C11.4078 23.9897 9.98309 23.9897 9.10436 23.1177C8.22563 22.2457 8.22563 20.8319 9.10436 19.9598L20.2419 8.90743Z" fill="white" />
                                                        <path d="M9.10589 12.1864C8.22716 11.3144 8.22716 9.90054 9.10589 9.02853C9.98462 8.15652 11.4093 8.15652 12.2881 9.02853L23.4256 20.0809C24.3044 20.953 24.3044 22.3668 23.4256 23.2388C22.5469 24.1108 21.1222 24.1108 20.2435 23.2388L9.10589 12.1864Z" fill="white" />
                                                    </svg>
                                                </div>
                                                <hr className="m-0" />
                                            </span>
                                        ))}
                                        <div className="d-flex justify-content-center align-items-center" style={{ height: '50px' }}>
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M31.9047 16.073C31.9047 24.7104 24.9027 31.7123 16.2653 31.7123C7.62796 31.7123 0.625977 24.7104 0.625977 16.073C0.625977 7.43558 7.62796 0.433594 16.2653 0.433594C24.9027 0.433594 31.9047 7.43558 31.9047 16.073Z" fill="#B22727" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2653 28.5845C23.1753 28.5845 28.7768 22.9829 28.7768 16.073C28.7768 9.16306 23.1753 3.56147 16.2653 3.56147C9.35544 3.56147 3.75385 9.16306 3.75385 16.073C3.75385 22.9829 9.35544 28.5845 16.2653 28.5845ZM16.2653 31.7123C24.9027 31.7123 31.9047 24.7104 31.9047 16.073C31.9047 7.43558 24.9027 0.433594 16.2653 0.433594C7.62796 0.433594 0.625977 7.43558 0.625977 16.073C0.625977 24.7104 7.62796 31.7123 16.2653 31.7123Z" fill="white" />
                                                <path d="M20.2419 8.90743C21.1207 8.03541 22.5454 8.03542 23.4241 8.90743C24.3028 9.77944 24.3028 11.1932 23.4241 12.0653L12.2865 23.1177C11.4078 23.9897 9.98309 23.9897 9.10436 23.1177C8.22563 22.2457 8.22563 20.8319 9.10436 19.9598L20.2419 8.90743Z" fill="white" />
                                                <path d="M9.10589 12.1864C8.22716 11.3144 8.22716 9.90054 9.10589 9.02853C9.98462 8.15652 11.4093 8.15652 12.2881 9.02853L23.4256 20.0809C24.3044 20.953 24.3044 22.3668 23.4256 23.2388C22.5469 24.1108 21.1222 24.1108 20.2435 23.2388L9.10589 12.1864Z" fill="white" />
                                            </svg>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </section>
                        <section className="bg-white mt-3 p-1 p-lg-3 text-center rounded-3">
                            <b>TO GRATIS</b>
                            <p className="fw-light mb-2 mb-lg-4">(Syarat dan ketentuan berlaku)</p>
                            <Link href={`/pages/tryout/detail/${id}/pembayaran?type=toGratis`}>
                                <Button className="rounded-5 w-50 w-lg-100">Daftar</Button>
                            </Link>
                        </section>
                        <p className="fw-light my-2 my-lg-3 text-center">TO Premium</p>
                        <section>
                            <Row>
                                <Col sm="12" lg="6" className="mb-3 mb-lg-0">
                                    <div className="text-center p-2 p-lg-3 bg-white rounded-3">
                                        <b>Pakai DA Coin</b>
                                        <span className="d-flex justify-content-center align-items-center">
                                            <div className="bg-warning me-2 text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: '22px', height: '22px' }}>
                                                $
                                            </div>
                                            <p className="m-0 fw-light my-1">4 DA Coin</p>
                                        </span>
                                        <Link href={`/pages/tryout/detail/${id}/pembayaran?type=coin`}>
                                            <Button className="w-100 rounded-5">Gunakan</Button>
                                        </Link>
                                    </div>
                                </Col>
                                <Col sm="12" lg="6">
                                    <div className="text-center p-3 bg-white rounded-3">
                                        <b>Pakai E-Wallet</b>
                                        <p className="m-0 fw-light my-1">{detailData.listPrice[1]}</p>
                                        <Link href={`/pages/tryout/detail/${id}/pembayaran?type=e_wallet`}>
                                            <Button className="w-100 rounded-5">Bayar</Button>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </section>
                        <b className="text-center my-2 color-primer">Lebih Murah dengan Bundling TO DA</b>
                    </Card>
                </div>
            )}
        </ProtectedRoute>
    );
};

export default About;

'use client'

import { Button, Col, Row } from "reactstrap"
import Link from "next/link";
import { db } from "../../../../../../../public/firebaseConfig";
import { useParams } from "next/navigation";
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Updated import
import ProtectedRoute from "../../ProtectedRoute";
import Image from "next/image";


const formatDate = (dateString) => {
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0'); // Format day to 2 digits
    const month = months[date.getMonth()]; // Get month name
    const year = date.getFullYear(); // Get year
    const hours = date.getHours().toString().padStart(2, '0'); // Get hours, padded to 2 digits
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Get minutes, padded to 2 digits

    return `${day} ${month} ${year} ${hours}:${minutes}`;
};


export default function Soal() {
    const TPS = ["Kemampuan Penalaran Umum", "Pengetahuan dan Pemahaman Umum", "Kemampuan Memahami Bacaan dan Menulis", "Pengetahuan Kuantitatif"];
    const { id } = useParams(); // Ambil parameter dinamis dari URL
    const [detailData, setDetailData] = useState(null);

    const [type, setType] = useState(null);


    //TPS
    const tps = detailData?.listTest?.filter(item => item.nameTest === "TPS") ?? [];
    let tpsListSubtests = tps.flatMap(element => element.listSubtest);

    //literasi
    const literiasi = detailData?.listTest?.filter(item => item.nameTest === "Tes Literasi") ?? [];
    let listSubtests = literiasi.flatMap(element => element.listSubtest);
    console.log('niki', listSubtests);

    const router = useRouter();

    useEffect(() => {
        if (id) {
            const fetchDetailData = async () => {
                const docRef = doc(db, 'tryout_v1', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setDetailData(data);

                } else {
                    console.log('No such document!');
                }
            };
            fetchDetailData();
        }
    }, [id]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const queryParams = new URLSearchParams(window.location.search);
            setType(queryParams.get('type'));
        }
    }, []);

    if (!detailData) {
        return <div>Loading...</div>;
    }

    console.log('ini halaman', detailData);

    const startDate = detailData.started ? new Date(detailData.started) : null;
    const endDate = detailData.ended ? new Date(detailData.ended) : null;

    const currentDate = new Date();

    console.log('tanggal', startDate);

    let idsoal;
    return (
        <ProtectedRoute>
            <div className="detTrySaya" style={{ padding: '13vh 7% 20px' }}>
                <section className="d-flex align-items-center gap-2 mb-3">
                    <Link href="">
                        <svg className="cursor-pointer" onClick={() => router.back()} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="14" cy="14" r="14" fill="#27B262" />
                            <path d="M15.3111 8.31405C15.2128 8.2145 15.0961 8.13552 14.9675 8.08163C14.839 8.02774 14.7012 8 14.5621 8C14.423 8 14.2852 8.02774 14.1567 8.08163C14.0281 8.13552 13.9114 8.2145 13.8131 8.31405L8.93667 13.2431C8.83818 13.3425 8.76004 13.4605 8.70673 13.5904C8.65342 13.7203 8.62598 13.8596 8.62598 14.0002C8.62598 14.1409 8.65342 14.2801 8.70673 14.41C8.76004 14.54 8.83818 14.658 8.93667 14.7573L13.8131 19.6864C13.9115 19.7858 14.0282 19.8647 14.1568 19.9185C14.2853 19.9723 14.423 20 14.5621 20C14.7012 20 14.8389 19.9723 14.9675 19.9185C15.096 19.8647 15.2127 19.7858 15.3111 19.6864C15.4095 19.587 15.4875 19.469 15.5407 19.3391C15.5939 19.2092 15.6213 19.0699 15.6213 18.9293C15.6213 18.7887 15.5939 18.6495 15.5407 18.5196C15.4875 18.3897 15.4095 18.2717 15.3111 18.1722L11.189 13.9949L15.3111 9.82822C15.7148 9.4094 15.7148 8.72212 15.3111 8.31405Z" fill="white" />
                        </svg>
                    </Link>
                    TryOut Saya
                </section>
                <section>
                    <div className="bg-graylg py-3 px-5 mb-4 rounded-3">
                        <Row>
                            <Col sm="3" lg="3">
                                <div className="bg-primy rounded-3" style={{ height: '170px' }}>
                                    <img src={detailData.image} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                </div>
                            </Col>
                            <Col sm="9" lg="9">
                                <span>
                                    <h5>{detailData.toName}</h5>
                                    <p>{formatDate(detailData.started)} WITA s.d. {formatDate(detailData.ended)} WITA</p>
                                </span>
                                <span>
                                    <p className="pb-3 pt-2">
                                        {detailData.desk}
                                    </p>
                                </span>
                                <span className='d-flex flex-column flex-lg-row align-items-center'>
                                    {!type && (startDate && endDate && (currentDate < startDate || currentDate > endDate)) ? (
                                        <Button className="bg-danger rounded-5 px-4 border-0 me-lg-4">TryOut Telah Berakhir</Button>
                                    ) : !type ? (
                                        <Link href={`/pages/tryout/question/${id}/detail`}>
                                            <Button className="bg-primy rounded-5 px-4 border-0 me-lg-4">Mulai Mengerjakan ≫</Button>
                                        </Link>
                                    ) : type &&  (
                                        <Link href={`/pages/tryout/question/${id}/detail/selesai`} className="text-decoration-underline">
                                            Riwayat Pengerjaan
                                        </Link>
                                    )}
                                </span>
                            </Col>
                        </Row>
                    </div>
                </section>
                <section>
                    <Row>
                        <Col sm="12" lg="4" className='mb-4'>
                            <div className="bg-graylg p-4 rounded-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>
                                        <svg className="me-2" width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="45" height="45" rx="22.5" fill="#27B262" />
                                            <path d="M21.9331 25.3361V23.0672H24.202V25.3361H21.9331ZM17.3952 25.3361V23.0672H19.6641V25.3361H17.3952ZM26.4709 25.3361V23.0672H28.7398V25.3361H26.4709ZM21.9331 29.8739V27.605H24.202V29.8739H21.9331ZM17.3952 29.8739V27.605H19.6641V29.8739H17.3952ZM26.4709 29.8739V27.605H28.7398V29.8739H26.4709ZM12.8574 34.4117V13.9916H16.2608V11.7227H18.5297V13.9916H27.6053V11.7227H29.8742V13.9916H33.2776V34.4117H12.8574ZM15.1263 32.1428H31.0087V20.7983H15.1263V32.1428Z" fill="white" />
                                        </svg>
                                        Fase TO
                                    </span>
                                    <b>{detailData.phase == false ? 'Belum Selesai' : 'Selesai'}</b>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>
                                        <svg className="me-2" width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="45" height="45" rx="22.5" fill="#27B262" />
                                            <path d="M19.6667 12.2857V10H26.3333V12.2857H19.6667ZM21.8889 24.8571H24.1111V18H21.8889V24.8571ZM23 34C21.6296 34 20.3378 33.7288 19.1244 33.1863C17.9111 32.6438 16.8511 31.9055 15.9444 30.9714C15.0378 30.0373 14.3204 28.9467 13.7922 27.6994C13.2641 26.4522 13 25.1238 13 23.7143C13 22.3048 13.2641 20.976 13.7922 19.728C14.3204 18.48 15.0378 17.3897 15.9444 16.4571C16.8511 15.5246 17.9115 14.7867 19.1256 14.2434C20.3396 13.7002 21.6311 13.4286 23 13.4286C24.1481 13.4286 25.25 13.619 26.3056 14C27.3611 14.381 28.3519 14.9333 29.2778 15.6571L30.8333 14.0571L32.3889 15.6571L30.8333 17.2571C31.537 18.2095 32.0741 19.2286 32.4444 20.3143C32.8148 21.4 33 22.5333 33 23.7143C33 25.1238 32.7359 26.4526 32.2078 27.7006C31.6796 28.9486 30.9622 30.0389 30.0556 30.9714C29.1489 31.904 28.0885 32.6423 26.8744 33.1863C25.6604 33.7303 24.3689 34.0015 23 34Z" fill="white" />
                                        </svg>
                                        Total Waktu
                                    </span>
                                    <b>{detailData.totalTime} Menit</b>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>
                                        <svg className="me-2" width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="45" height="45" rx="22.5" fill="#27B262" />
                                            <path d="M28.4545 12.7692H33V34H13V12.7692H17.5455V14.6154H28.4545V12.7692ZM16.6364 22H29.3636V20.1538H16.6364V22ZM16.6364 29.3846H29.3636V27.5385H16.6364V29.3846ZM19.3636 12.7692V10H26.6364V12.7692H19.3636Z" fill="white" />
                                        </svg>
                                        Jumlah Soal
                                    </span>
                                    <b>{detailData.numberQuestions} Soal</b>
                                </div>
                            </div>
                        </Col>
                        <Col sm="12" lg="8">
                            <div className="bg-graylg py-3 px-3 mb-4 rounded-3">
                                <div className="tryoutSec3 mt-0">
                                    <span className="me-3">
                                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="6.5" cy="6.5" r="5.5" stroke="#27B262" stroke-width="2" />
                                        </svg>
                                    </span>
                                    <span className="w-100">
                                        <h5> TPS</h5>
                                        <span>
                                            {tpsListSubtests.map((item, index) => (
                                                <div key={index} className="bg-white">
                                                    <p>{item.name}</p>
                                                    <b>{item.timeMinute} Menit | {item.numberQuestions} Soal</b>
                                                </div>
                                            ))}
                                        </span>
                                    </span>
                                </div>
                                <div className="tryoutSec3 mt-4">
                                    <span className="me-3">
                                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="6.5" cy="6.5" r="5.5" stroke="#27B262" stroke-width="2" />
                                        </svg>
                                    </span>
                                    <span className="w-100">
                                        <h5>Tes Literasi</h5>
                                        <span>
                                            {listSubtests.map((item, index) => (
                                                <div key={index} className="bg-white">
                                                    <p>{item.name}</p>
                                                    <b>{item.timeMinute} Menit | {item.numberQuestions} Soal</b>
                                                </div>
                                            ))}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </section>
            </div>
        </ProtectedRoute>
    )
}
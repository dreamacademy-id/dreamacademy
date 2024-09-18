'use client'

import {
    CardTitle,
    CardBody,
    Card,
    CardSubtitle,
    Input,
} from "reactstrap";
import { Button, Col, Row } from "reactstrap"
import Link from "next/link";
import { db } from "../../../../../../public/firebaseConfig";
import { getDocs, collection } from 'firebase/firestore';
import { useParams } from "next/navigation";
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Updated import
import ProtectedRoute from "../ProtectedRoute";
import { useAuth } from "../../../../../../public/AuthContext";

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, 'tryout_v1'));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

async function fetchUserAnswers() {
    const querySnapshot = await getDocs(collection(db, 'userAnswer'));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

export default function Semuatryout() {
    const [dataTryOut, setDataTryOut] = useState([]);
    const router = useRouter();
    const [type, setType] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [filteredTryOuts, setFilteredTryOuts] = useState([]);
    const { currentUser } = useAuth(); // Get the current logged-in user


    useEffect(() => {
        async function fetchData() {
            // Fetch tryout_v1 and userAnswer data
            const tryoutData = await fetchDataFromFirestore();
            const userAnswerData = await fetchUserAnswers();

            // setDataTryOut(tryoutData);
            setUserAnswers(userAnswerData);

            const matchedTryOuts = tryoutData.filter(tryout =>
                userAnswerData.some(userAnswer =>
                    userAnswer.tryoutId === tryout.id && userAnswer.userId === currentUser.uid
                )
            );

            // Filter the tryouts that don't match any tryoutId or userId
            const unmatchedTryOuts = tryoutData.filter(tryout =>
                !userAnswerData.some(userAnswer =>
                    userAnswer.tryoutId === tryout.id && userAnswer.userId === currentUser.uid
                )
            );

            setFilteredTryOuts(matchedTryOuts); // Tryouts that match both tryoutId and userId
            setDataTryOut(unmatchedTryOuts); // Tryouts that don't match
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const queryParams = new URLSearchParams(window.location.search);
            setType(queryParams.get('type'));
        }
    }, []);

    console.log('type', type);

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
                <section className="text-center">
                    {type === 'toSelesai' ? (
                        <span>
                            <h5>Try Out Selesai</h5>
                            <p>Lihat semua Try Out yang telah kamu ikuti</p>
                        </span>
                    ) : type === 'toTersedia' ? (
                        <span>
                            <h5>Try Out Tersedia</h5>
                            <p>Butuh tantangan? Ikuti Try Out ini!</p>
                        </span>
                    ) : (
                        <span>
                            <h5>Try Out Belum Selesai</h5>
                            <p>Lihat semua TO yang kamu miliki kerjakan TO nya sekarang!</p>
                        </span>
                    )}
                </section>
                <section className="mt-5">
                    {type === 'toSelesai' ? (
                        <Row>
                        {filteredTryOuts.map((item, index) => (
                                <Col sm="12" lg="6" key={index} className="mb-3">
                                    <Card className="w-100 h-100 p-3 cursor-pointer">
                                        <Row className="h-100">
                                            <Col xs='3' sm="3" lg="3" className="p-0 ps-2">
                                                <div className="rounded-3 bg-primy h-100 w-100 d-flex justify-content-center align-items-center flex-column">
                                                    <h3 className="text-white fw-bolder">SNBT</h3>
                                                    <h1 className="fw-bolder m-0">6</h1>
                                                </div>
                                            </Col>
                                            <Col xs='9' sm="9" lg="9" className="h-100">
                                                <Link href={`/pages/tryout/question/${item.id}?type=toSelesai`}>
                                                    <div className="h-100 d-flex flex-column justify-content-between">
                                                        <span>
                                                            <h5>{item.toName}</h5>
                                                            <p>Tes Potensi Skolastik (TPS) dan Tes Literasii</p>
                                                        </span>
                                                        <span className="d-flex justify-content-between">
                                                            <b>Rata-rata Nilai : 845</b>
                                                            <b className="color-primer">Detail</b>
                                                        </span>
                                                    </div>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : type === 'toTersedia' ? (
                        <Row>
                            {dataTryOut.map((item, index) => (
                                <Col sm="12" lg="6" className="mb-3" key={index}>
                                    <Link href={`/pages/tryout/detail/${item.id}`}>
                                        <Card className="w-100 h-100 p-3 cursor-pointer">
                                            <Row className="h-100">
                                                <Col xs='3' sm="3" lg="3" className="p-0 ps-2">
                                                    <div className="rounded-3 bg-primy h-100 w-100 d-flex justify-content-center align-items-center flex-column">
                                                        <h3 className="text-white fw-bolder">SNBT</h3>
                                                        <h1 className="fw-bolder m-0">9</h1>
                                                    </div>
                                                </Col>
                                                <Col xs='9' sm="9" lg="9" className="h-100">
                                                    <div className="h-100 d-flex flex-column justify-content-between">
                                                        <span>
                                                            <h5>{item.toName}</h5>
                                                            <p>Tes Potensi Skolastik (TPS) dan Tes Literasi</p>
                                                        </span>
                                                        <span className="d-flex justify-content-between">
                                                            <b>Gratis dan Berbayar</b>
                                                            <b className="color-primer">Daftar</b>
                                                        </span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <Row>
                        {dataTryOut.map((item, index) => (
                                <Col sm="12" lg="6" key={index} className="mb-3">
                                    <Card className="w-100 h-100 p-3 cursor-pointer">
                                        <Row className="h-100">
                                            <Col xs='3' sm="3" lg="3" className="p-0 ps-2">
                                                <div className="rounded-3 bg-primy h-100 w-100 d-flex justify-content-center align-items-center flex-column">
                                                    <h3 className="text-white fw-bolder">SNBT</h3>
                                                    <h1 className="fw-bolder m-0">6</h1>
                                                </div>
                                            </Col>
                                            <Col xs='9' sm="9" lg="9" className="h-100">
                                                <Link href={`/pages/tryout/question/${item.id}`}>
                                                    <div className="h-100 d-flex flex-column justify-content-between">
                                                        <span>
                                                            <h5>{item.toName}</h5>
                                                            <p>Tes Potensi Skolastik (TPS) dan Tes Literasii</p>
                                                        </span>
                                                        <span className="d-flex justify-content-between">
                                                            <b>Gratis dan Berbayar</b>
                                                            <b className="color-primer">Mulai Mengerjakan</b>
                                                        </span>
                                                    </div>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </section>
            </div>
        </ProtectedRoute>
    )
}
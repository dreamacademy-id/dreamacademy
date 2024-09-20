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
import SalesChart from "../../components/dashboard/SalesChart";
import { db } from "../../../../../public/firebaseConfig";
import { getDocs, collection } from 'firebase/firestore';
import ProtectedRoute from "./ProtectedRoute";

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, 'tryout_v1'));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

const AllTryOut = () => {
    const [dataTryOut, setDataTryOut] = useState([]);
    const [dataStatus, setDataStatus] = useState([]);
    const [dataKerjasama, setDataKerjasama] = useState([]);
    const [detail, setDetail] = useState(false);
    const [kode, setKode] = useState('');

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataFromFirestore();
            const filter = data.filter((item) => item.public === true);

            // Menentukan tanggal sekarang
            const now = new Date();
            const statusFilter = filter.filter((item) => {
                const startedDate = new Date(item.started);
                const endedDate = new Date(item.ended);

                // Cek apakah sekarang berada di antara started dan ended
                return now >= startedDate && now <= endedDate;
            });

            // baru
            // Set state dengan data yang sudah difilter
            setDataTryOut(filter);
            setDataStatus(statusFilter);
        }
        fetchData();
    }, []);

    const handleDetail = () => {
        setDetail(!detail);
    }

    const handleKerjasama = () => {
        // console.log('ini adalah kode ' + kode);

        async function cariData() {
            const data = await fetchDataFromFirestore();
            const filter = data.filter((item) => item.toCode === kode);

            setDataKerjasama(filter);
        }
        cariData();
    }

    return (
        <ProtectedRoute>
            <div className="py-3 allTryOut" style={{ padding: '0 7% 20px', marginTop: window.innerWidth < 576 ? 0 : '18vh' }}>
                <div style={{ marginTop: window.innerWidth < 576 ? '18vh' : 0 }}>
                    <section className="mt-1 mb-5">
                        <h5>Try Out Kerjasama</h5>
                        <div className="d-flex w-50 w-lg-100">
                            <span className="d-flex border-2 ps-2 border-primer align-items-center rounded-5 w-50 w-lg-100 me-3">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="24" height="24" rx="12" fill="black" fill-opacity="0.1" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.027 12.3304C10.7827 13.0421 9.19588 12.6143 8.47844 11.3717C7.75921 10.1259 8.18603 8.533 9.43178 7.81377C10.6775 7.09454 12.2705 7.52136 12.9897 8.76711C13.7071 10.0096 13.2843 11.5976 12.0459 12.3194C12.0428 12.3212 12.0397 12.323 12.0365 12.3248C12.0333 12.3267 12.0302 12.3285 12.027 12.3304ZM11.737 14.0386C10.0063 14.4769 8.12629 13.7384 7.18951 12.1158C6.05929 10.1582 6.73002 7.65506 8.68762 6.52484C10.6452 5.39462 13.1484 6.06534 14.2786 8.02295C15.2153 9.64534 14.915 11.6425 13.6703 12.9222L15.7938 16.6002C16.1021 17.1341 15.9191 17.8168 15.3853 18.125C14.8514 18.4332 14.1687 18.2503 13.8604 17.7164L11.737 14.0386Z" fill="black" fill-opacity="0.5" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Masukkan kode TO Khusus..."
                                    className="border-0 bg-transparent ps-2 w-100"
                                    value={kode}
                                    id="kode"
                                    onChange={(e) => setKode(e.target.value)}
                                    style={{ outline: 'none' }} />
                            </span>
                            <Button className="rounded-5 bg-primy border-0 px-4 fw-bold" onClick={handleKerjasama}>Cari</Button>
                        </div>
                        <Row>
                            {dataKerjasama.map((item, index) => (
                                <Col sm="12" lg="6" key={index} className="mb-3 mb-lg-0">
                                    <Link href={`/pages/tryout/detail/${item.id}`} className="text-decoration-none">
                                        <Card className="w-100 h-100 p-3 cursor-pointer">
                                            <Row className="h-100">
                                                <Col xs='3' sm="3" lg="3" className="p-0 ps-2">
                                                    <div className="rounded-3 bg-primy h-100 w-100 d-flex justify-content-center align-items-center flex-column">
                                                        <h3 className="text-white fw-bolder">SNBT</h3>
                                                        <h1 className="fw-bolder m-0">11</h1>
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
                    </section>
                    <section>
                        <h5 className="mb-3">Try Out Sedang Berlangsung</h5>
                        {/* <p>5 Juli - 7 Juli 2024</p> */}
                        <Row>
                            {dataStatus.map((item, index) => (
                                <Col sm="12" lg="6" key={index} className="mb-3">
                                    <Link href={`/pages/tryout/detail/${item.id}`} className="text-decoration-none">
                                        <Card className="w-100 h-100 p-3 cursor-pointer">
                                            <Row className="h-100">
                                                <Col xs='3' sm="3" lg="3" className="p-0 ps-2">
                                                    <div className="rounded-3 bg-primy h-100 w-100 d-flex justify-content-center align-items-center flex-column">
                                                        <h3 className="text-white fw-bolder">SNBT</h3>
                                                        <h1 className="fw-bolder m-0">11</h1>
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
                    </section>
                    <section className="mt-5">
                        <Row className="d-flex align-items-center justify-content-between mb-2">
                            <Col sm='12' lg='6'>
                                <h5 className="m-0">Try Out Tersedia</h5>
                                <p>Butuh tantangan? Ikuti Try Out ini!</p>
                            </Col>
                            <Col sm='12' lg='6' className='text-lg-end'>
                                <Link href='/pages/tryout/semua-tryout?type=toTersedia'>
                                    <Button className="rounded-5 border-primer bg-transparent color-primer fw-bolder border-2 px-4">Lihat Semua ≫</Button>
                                </Link>
                            </Col>
                        </Row>
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
                            {/* <Col sm="12" lg="6">
                            <Card className="w-100 h-100 p-3 cursor-pointer">
                                <Row className="h-100">
                                    <Col sm="3" lg="3" className="p-0 ps-2">
                                        <div className="rounded-3 bg-primy h-100 w-100 d-flex justify-content-center align-items-center flex-column">
                                            <h3 className="text-white fw-bolder">SNBT</h3>
                                            <h1 className="fw-bolder m-0">10</h1>
                                        </div>
                                    </Col>
                                    <Col sm="9" lg="9" className="h-100">
                                        <div className="h-100 d-flex flex-column justify-content-between">
                                            <span>
                                                <h5>Try Out UTBK 2024 #10 - SNBT</h5>
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
                        </Col> */}
                        </Row>
                    </section>
                    {/* <section className="mt-5">
                    <Row>
                        <Col sm="6" lg="3" className="mb-2">
                            <div class="border-2 border-primer border-secondary rounded-3 p-4 " aria-hidden="true">
                                <span className="text-center d-flex justify-content-center">
                                    <b className="mb-3">/1 months</b>
                                </span>
                                <div class="card-body">
                                    <h5 class="card-title placeholder-glow">
                                        <span class="placeholder col-6"></span>
                                    </h5>
                                    <p class="card-text placeholder-glow">
                                        <span class="placeholder col-7"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-6"></span>
                                        <span class="placeholder col-8"></span>
                                        <span class="placeholder col-8"></span>
                                        <span class="placeholder col-8"></span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col sm="6" lg="3" className="mb-2">
                            <div class="border-2 border-primer border-secondary rounded-3 p-4 " aria-hidden="true">
                                <span className="text-center d-flex justify-content-center">
                                    <b className="mb-3">/3 months</b>
                                </span>
                                <div class="card-body">
                                    <h5 class="card-title placeholder-glow">
                                        <span class="placeholder col-6"></span>
                                    </h5>
                                    <p class="card-text placeholder-glow">
                                        <span class="placeholder col-7"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-6"></span>
                                        <span class="placeholder col-8"></span>
                                        <span class="placeholder col-8"></span>
                                        <span class="placeholder col-8"></span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col sm="6" lg="3" className="mb-2">
                            <div class="border-2 border-primer border-secondary rounded-3 p-4 " aria-hidden="true">
                                <span className="text-center d-flex justify-content-center">
                                    <b className="mb-3">/6 months</b>
                                </span>
                                <div class="card-body">
                                    <h5 class="card-title placeholder-glow">
                                        <span class="placeholder col-6"></span>
                                    </h5>
                                    <p class="card-text placeholder-glow">
                                        <span class="placeholder col-7"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-6"></span>
                                        <span class="placeholder col-8"></span>
                                        <span class="placeholder col-8"></span>
                                        <span class="placeholder col-8"></span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col sm="6" lg="3">
                            <div class="border-2 border-primer border-secondary rounded-3 p-4 " aria-hidden="true">
                                <span className="text-center d-flex justify-content-center">
                                    <b className="mb-3">/1 year</b>
                                </span>
                                <div class="card-body">
                                    <h5 class="card-title placeholder-glow">
                                        <span class="placeholder col-6"></span>
                                    </h5>
                                    <p class="card-text placeholder-glow">
                                        <span class="placeholder col-7"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-4"></span>
                                        <span class="placeholder col-6"></span>
                                        <span class="placeholder col-8"></span>
                                        <span class="placeholder col-8"></span>
                                        <span class="placeholder col-8"></span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </section> */}
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default AllTryOut;

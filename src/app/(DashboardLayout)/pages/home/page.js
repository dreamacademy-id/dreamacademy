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
import youtube from "../../../../../public/images/background/youtube.png"
import contoh from "../../../../../public/images/background/contoh.png"
import chat from "../../../../../public/images/background/chat.png"
import user1 from "../../../../../public/images/users/user1.jpg";
import user2 from "../../../../../public/images/users/user2.jpg";
import user3 from "../../../../../public/images/users/user3.jpg";
import user4 from "../../../../../public/images/users/user4.jpg";
import user5 from "../../../../../public/images/users/user5.jpg";
import clip1 from "../../../../../public/images/icon/clip1.svg"
import clip2 from "../../../../../public/images/icon/clip2.svg"
import clip3 from "../../../../../public/images/icon/clip3.svg"
import clip4 from "../../../../../public/images/icon/clip4.svg"
import clip5 from "../../../../../public/images/icon/clip5.svg"
import clip6 from "../../../../../public/images/icon/clip6.svg"
import clip7 from "../../../../../public/images/icon/clip7.svg"
import clip8 from "../../../../../public/images/icon/clip8.svg"
import Link from "next/link";

const tableData = [
    {
        avatar: clip1,
        name: "Muh. Hilmy Noor Fauzi",
        email: "20 Juli 2024",
        project: "saya sangat senang belajar di Dream Academy karena memiliki banyak contoh soal dan penjelasan yang mudah di pahami",
        status: "pending",
        weeks: "35",
        budget: "95K",
    },
    {
        avatar: user2,
        name: "Muh. Hilmy Noor Fauzi",
        email: "20 Juli 2024",
        project: "Lading pro React",
        status: "done",
        weeks: "35",
        budget: "95K",
    },
    {
        avatar: user3,
        name: "Muh. Hilmy Noor Fauzi",
        email: "20 Juli 2024",
        project: "Elite React",
        status: "holt",
        weeks: "35",
        budget: "95K",
    },
    {
        avatar: user4,
        name: "Muh. Hilmy Noor Fauzi",
        email: "20 Juli 2024",
        project: "Flexy React",
        status: "pending",
        weeks: "35",
        budget: "95K",
    },
    {
        avatar: user5,
        name: "Muh. Hilmy Noor Fauzi",
        email: "20 Juli 2024",
        project: "Ample React",
        status: "done",
        weeks: "35",
        budget: "95K",
    },
    {
        avatar: user5,
        name: "Muh. Hilmy Noor Fauzi",
        email: "20 Juli 2024",
        project: "Ample React",
        status: "done",
        weeks: "35",
        budget: "95K",
    },
    {
        avatar: user5,
        name: "Muh. Hilmy Noor Fauzi",
        email: "20 Juli 2024",
        project: "Ample React",
        status: "done",
        weeks: "35",
        budget: "95K",
    },
];


const HomeLand = () => {
    const titleFitur = ["Pembahasan Soal Lengkap", "Sistem CBT", "Akses dimana saja", "Perangkingan Jurusan", "Hasil Instan", "Tes minat, bakat dan jurusan", "Repot TO", "Pembobotan Nilai / IRT"];
    const ikons = [clip1, clip4, clip8, clip2, clip3, clip5, clip6, clip7];
    const [scrollDirection, setScrollDirection] = useState('down');

    useEffect(() => {
        const interval = setInterval(() => {
            setScrollDirection((prevDirection) => (prevDirection === 'down' ? 'up' : 'down'));
        }, 100); // Change direction every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="lpFirst">
                <div className="homeLand d-flex justify-content-center align-items-center px-5" style={{ minHeight: '70vh', backgroundColor: 'rgba(250, 251, 250, 0.4)', paddingTop: '8%' }}>
                    <Row className="w-100">
                        <Col sm='12' lg='6' className="h-100 d-flex flex-column justify-content-between">
                            <h1>Dream Academy</h1>
                            <p className="text-muted">Subheading for description or instructions</p>
                            <p>
                                Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look:
                            </p>
                            <p>
                                Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content.
                            </p>
                        </Col>
                        <Col sm='12' lg='6'>
                            <div >
                                <Image src={youtube} alt="" className="w-100 h-100" />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className=" d-flex align-items-center justify-content-center" style={{ minHeight: '75vh', backgroundColor: 'rgba(250, 251, 250, 0.4)' }}>
                    <Image src={contoh} alt="" className="w-75 h-100" data-aos="zoom-in-down" />
                </div>
            </div>
            <div className="bg-green w-100 h-100 px-5 card1 position-relative">
                <Row>
                    <Col sm="12" lg="6" style={{ height: '50vh', padding: '0' }}>
                        <Row style={{ zIndex: 0, height: '100%', width: '100%' }}>
                            <Col sm="12" lg="6" className="position-relative" style={{ top: '10px', zIndex: '1', overflowX: 'hidden' }}>
                                <div className="scrolling-cards up">
                                    {tableData.map((item, index) => (
                                        <Card key={index} className="mb-1" style={{ height: '170px' }}>
                                            <div className="d-flex align-items-center p-2">
                                                <Image
                                                    src={item.avatar}
                                                    className="rounded-circle"
                                                    alt="avatar"
                                                    width="45"
                                                    height="45"
                                                />
                                                <div className="ms-3">
                                                    <h6 className="mb-0">{item.name}</h6>
                                                    <span className="text-warning">{item.email}</span>
                                                </div>
                                            </div>
                                            <div className="w-100 h-100 px-3">
                                                {tableData[0].project}
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </Col>
                            <Col sm="12" lg="6" className="position-relative responsive-bottom" style={{ zIndex: '1', overflowX: 'hidden' }}>
                                <div className="scrolling-cards down">
                                    {tableData.map((item, index) => (
                                        <Card key={index} className="mb-1" style={{ height: '170px' }}>
                                            <div className="d-flex align-items-center p-2">
                                                <Image
                                                    src={item.avatar}
                                                    className="rounded-circle"
                                                    alt="avatar"
                                                    width="45"
                                                    height="45"
                                                />
                                                <div className="ms-3">
                                                    <h6 className="mb-0">{item.name}</h6>
                                                    <span className="text-warning">{item.email}</span>
                                                </div>
                                            </div>
                                            <div className="w-100 h-100 px-3">
                                                {tableData[0].project}
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="12" lg="6" className="h-100 my-auto py-5" style={{ height: '50vh' }}>
                        <div className="px-5" data-aos="zoom-in-down">
                            <h3>1000++ Pelajar telah</h3>
                            <h1>Berproses bersama kami</h1>
                            <p className="text-white opacity-50 w-75">
                                Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look
                            </p>
                            <Button className="rounded-5 bg-white px-5 text-black border-0 py-2">Daftar Sekarang</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="lpSecond">
                <div className="w-100 d-flex justify-content-center align-items-center pt-5" style={{ height: '90%', zIndex: '99', position: 'relative', backgroundColor: 'rgba(250, 251, 250, 0.4)' }}>
                    <Card className="m-0 w-75 rounded-2 p-3 bg-white mt-5" data-aos="zoom-in-down" style={{ zIndex: '999' }}>
                        <div className="text-center">
                            <h5 className="text-muted">SIAP MELEWATI RINTANGAN SNBT</h5>
                            <h3>Persiapkan semua untuk Ujianmu</h3>
                            <p className="text-muted">Fitur Try Out</p>
                        </div>
                        <div className="row fiturs px-5 w-100">
                            {titleFitur.map((item, index) => (
                                <section className="fitur-item col-lg-6" key={index}>
                                    <div>
                                        <Image src={ikons[index]} alt="" />
                                    </div>
                                    <span>
                                        <h5>{item}</h5>
                                        <p>Membuat kamu makin paham konsep dalam mengerjakan soal-soal</p>
                                    </span>
                                </section>
                            ))}
                        </div>
                    </Card>
                </div>
                <div className="d-flex gap-5 cards" data-aos="zoom-in-down">
                    <Link href="/pages/tryout">
                        <Card>
                            <div>
                                <svg width="89" height="87" viewBox="0 0 89 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0434 66.426C11.4588 66.426 8.62402 69.1996 8.62402 72.6362C8.62402 76.0695 11.4588 78.9194 15.0434 78.9194H83.5907V66.426H15.0434Z" fill="white" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M79.3553 66.426V72.1218C79.3553 73.5852 78.1648 74.7527 76.6784 74.7527H9.27539C10.1699 77.2376 12.5509 78.9194 15.3001 78.9194H83.591V66.426H79.3553Z" fill="#156738" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3593 57.8756C7.55221 58.1012 1.38281 64.489 1.38281 72.3066C1.38281 80.1953 7.55221 86.5831 15.3593 86.8087H86.2548C87.6689 86.8087 88.8528 85.6077 88.8528 84.1022V81.4002C88.8528 79.9704 87.6689 78.7694 86.2548 78.7694L15.3593 78.8443C11.8668 78.8443 9.03867 75.9886 8.96632 72.5316C8.96632 68.8464 11.8668 65.9189 15.504 65.9189H86.2548C87.6689 65.9189 88.8528 64.7139 88.8528 63.288V60.5821C88.8528 59.0773 87.6689 57.8756 86.2548 57.8756H15.3593Z" fill="#2EC56E" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M84.2549 57.8763V66.4227H86.4188C87.7737 66.4227 88.8589 65.1428 88.8589 63.5471V60.7518C88.8589 59.1523 87.7737 57.8763 86.4188 57.8763H84.2549Z" fill="#156738" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M84.2549 78.9226V86.8086H86.4188C87.7737 86.735 88.8589 85.63 88.8589 84.1541V81.5035C88.8589 80.1012 87.7737 78.9226 86.4188 78.9226H84.2549Z" fill="#156738" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.813 72.3455C16.3923 72.3455 15.1953 73.5353 15.1953 75.0263V82.1724C15.1953 83.674 16.4187 84.8388 17.8262 84.8388C18.1682 84.8388 18.5168 84.7717 18.8588 84.6297L21.5555 83.5109L23.9496 84.5553C24.3047 84.7007 24.6665 84.7717 25.0151 84.7717C26.4423 84.7717 27.6854 83.649 27.6854 82.0981V75.0263C27.6854 73.5353 26.4949 72.3455 25.0677 72.3455H17.813Z" fill="#F9A419" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0434 8.54749C11.4588 8.54749 8.62402 11.4704 8.62402 15.0839C8.62402 18.698 11.4588 21.6979 15.0434 21.6979H83.5907V8.54749H15.0434Z" fill="white" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M79.3553 8.54749V14.5466C79.3553 16.083 78.1648 17.3155 76.6784 17.3155H9.27539C10.1699 19.9273 12.5509 21.6979 15.3001 21.6979H83.591V8.54749H79.3553Z" fill="#156738" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4714 0.654175C6.57223 0.654175 0.0673828 7.10506 0.0673828 15.0852C0.0673828 23.108 6.65113 29.5872 14.6029 29.5872C14.695 29.5872 14.7871 29.5872 14.8792 29.5872H86.2351C87.6623 29.5872 88.8528 28.3829 88.8528 26.882V24.1762C88.8528 22.7469 87.6623 21.5459 86.2351 21.5459H14.8792V21.6209C11.3604 21.5459 8.51906 18.7658 8.44671 15.3101C8.44671 11.6295 11.3604 8.69874 15.0305 8.69874H86.2351C87.6623 8.69874 88.8528 7.49443 88.8528 5.99352V3.36333C88.8528 1.86242 87.6623 0.658109 86.2351 0.658109H14.8792C14.7411 0.654163 14.6096 0.654175 14.4714 0.654175Z" fill="#2EC56E" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M84.2549 0.65094V8.54356H86.4188C87.7737 8.54356 88.8589 7.36165 88.8589 5.88836V3.30614C88.8589 1.83285 87.7737 0.65094 86.4188 0.65094H84.2549Z" fill="#156738" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M84.2549 21.7012V29.5905H86.4188C87.7737 29.5905 88.8589 28.4093 88.8589 26.9367V24.2821C88.8589 22.8798 87.7737 21.7012 86.4188 21.7012H84.2549Z" fill="#156738" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.813 15.1241C16.3923 15.1241 15.1953 16.3165 15.1953 17.8102V24.9708C15.1953 26.4927 16.4384 27.6141 17.8722 27.6141C18.1945 27.6141 18.5299 27.5569 18.8588 27.4326L21.5555 26.3151L23.9496 27.3583C24.3047 27.5076 24.6665 27.5747 25.0151 27.5747C26.4423 27.5747 27.6854 26.45 27.6854 24.8958V17.8102C27.6854 16.3165 26.4949 15.1241 25.0677 15.1241H17.813Z" fill="#F9A419" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.98633 37.4832V49.9765H74.606C78.1248 49.9765 80.9662 47.1996 80.9662 43.7664C80.9662 40.3331 78.1248 37.4832 74.606 37.4832H5.98633Z" fill="white" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M74.5337 37.4832C75.9544 41.5768 72.8894 45.8132 68.4762 45.8132H5.98633V49.9765H74.606C78.1248 49.9765 80.9662 47.1996 80.9662 43.7664C80.9662 40.3331 78.1248 37.4832 74.606 37.4832H74.5337Z" fill="#156738" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.42124 29.5938C1.92164 29.5938 0.724609 30.7711 0.724609 32.2424V34.82C0.724609 36.2953 1.92164 37.4719 3.42124 37.4719H74.7048C78.3025 37.4719 81.2228 40.3442 81.2228 43.8788C81.2228 47.3397 78.3748 50.0647 74.856 50.0647V49.991H3.42124C1.92164 49.991 0.724609 51.1716 0.724609 52.6429V55.2942C0.724609 56.6958 1.92164 57.8724 3.42124 57.8724H74.856C82.6434 57.7251 88.8589 51.3919 88.8589 43.7315C88.8589 36.0743 82.6434 29.8148 74.856 29.5938H3.42124Z" fill="#2EC56E" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M70.4492 29.5938C78.2037 29.7411 84.3862 36.0743 84.3862 43.7315C84.3862 51.3919 78.2037 57.6514 70.4492 57.8724H74.9152C82.6697 57.6514 88.8587 51.3919 88.8587 43.7315C88.8587 36.0743 82.6697 29.7411 74.9152 29.5938H70.4492Z" fill="#156738" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M64.576 44.0603C63.0699 44.0603 61.8926 45.2311 61.8926 46.6833V53.7913C61.8926 55.354 63.2541 56.4787 64.7208 56.4787C65.0825 56.4787 65.4508 56.411 65.8126 56.2617L68.3908 55.2153L71.2059 56.336C71.5676 56.4859 71.9359 56.5537 72.2976 56.5537C73.738 56.5537 75.0404 55.4395 75.0404 53.9406V46.6833C75.0404 45.3027 73.8631 44.0603 72.3569 44.0603C72.3109 44.0603 72.2713 44.0636 72.2253 44.0636H64.7142C64.6682 44.0636 64.6155 44.0603 64.576 44.0603Z" fill="#F9A419" />
                                </svg>

                            </div>
                            <div className="my-auto">Bank Soal</div>
                        </Card>
                    </Link>
                    <Link href="/pages/tryout">
                        <Card>
                            <div>
                                <svg width="74" height="87" viewBox="0 0 74 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask0_765_1547" style={{ MaskType: 'luminance', maskUnits: 'userSpaceOnUse', x: '0', y: '0', width: '74', height: '87' }}>
                                        <path d="M73.3785 0.651031H0.786133V86.8121H73.3785V0.651031Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask0_765_1547)">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7324 0.655121L14.3545 21.0007H58.4493L57.3 0.655121H16.7324Z" fill="#156738" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.8298 0.655121L5.5821 6.26238C1.6499 8.21152 0.110543 12.9667 1.95792 16.9396L13.517 40.7804L16.4452 46.7805L34.7072 37.7417L30.2357 28.3135L16.8298 0.655121Z" fill="#2EC56E" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M57.334 0.655121L44.0047 28.3135L39.4565 37.7417L57.7186 46.7805L60.6467 40.7804L72.2059 16.9396C74.0532 12.9667 72.5139 8.21152 68.581 6.26238L57.334 0.655121Z" fill="#2EC56E" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M30.1934 28.4668C23.3114 30.2457 17.4226 34.6487 13.6763 40.8306L16.5827 46.7805L34.7077 37.817L30.1934 28.4668Z" fill="#156738" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M43.9708 28.4668L39.4565 37.817L57.5816 46.7805L60.488 40.8306C56.7417 34.6487 50.8529 30.2457 43.9708 28.4668Z" fill="#156738" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M36.9998 31.1806C12.4338 31.1806 0.110666 61.1375 17.4833 78.6601C22.7547 83.9776 29.8064 86.8121 36.9673 86.8121C40.5168 86.8121 44.0881 86.1147 47.4884 84.6825C57.8196 80.4376 64.5551 70.2475 64.5551 59.0513C64.5551 43.6875 52.232 31.1806 36.9998 31.1806Z" fill="#F9A419" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M37.1506 40.6786C20.5717 40.6786 12.3226 60.7447 24.0418 72.5168C27.8044 76.2978 32.4483 77.9925 37.0074 77.9925C46.5509 77.9925 55.7355 70.5677 55.7355 59.3484C55.7355 49.0464 47.4091 40.6786 37.1506 40.6786Z" fill="white" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M37.1554 47.463C36.1229 47.463 35.0937 48.0566 34.6038 49.252L33.3997 51.7812C32.9499 52.6496 32.1988 53.2805 31.2239 53.4386L28.5936 53.8335C26.1885 54.0736 25.213 57.2344 27.0142 58.9705L28.8935 60.9475C29.5692 61.5791 29.869 62.6049 29.7191 63.552L29.2693 66.3187C28.9722 68.2542 30.4091 69.8438 32.0597 69.8438C32.5027 69.8438 32.9566 69.7312 33.3997 69.4788L35.8047 68.2163C36.2192 67.9795 36.6697 67.8594 37.1195 67.8594C37.57 67.8594 38.0205 67.9795 38.435 68.2163L40.8394 69.4788C41.2898 69.7346 41.7613 69.8513 42.2152 69.8513C43.8733 69.8513 45.3238 68.3031 44.9703 66.3187L44.5199 63.552C44.3699 62.6049 44.6705 61.5791 45.3455 60.9475L47.2254 58.9705C48.9514 57.1516 47.9758 54.153 45.6454 53.8335L43.0157 53.4386C42.1155 53.2018 41.2898 52.6496 40.9146 51.7025L39.7104 49.1726C39.1887 48.0376 38.1704 47.463 37.1554 47.463Z" fill="#F9A419" />
                                    </g>
                                </svg>

                            </div>
                            <div className="my-auto">Try Out</div>
                        </Card>
                    </Link>
                    <Link href="/pages/tryout">
                        <Card>
                            <div><svg width="78" height="86" viewBox="0 0 78 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.322754" y="0.308716" width="77.6107" height="18.4161" rx="5" fill="#2EC56E" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.7819 5.25067C20.0961 5.25067 20.0961 7.9907 21.7819 7.9907C21.8313 7.9907 21.8752 7.99069 21.9247 7.9852H35.828C35.8774 7.99069 35.9214 7.9907 35.9708 7.9907C37.662 7.9907 37.662 5.25067 35.9708 5.25067C35.9214 5.25067 35.8774 5.25068 35.828 5.25617H21.9247C21.8752 5.25068 21.8313 5.25067 21.7819 5.25067Z" fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.7656 11.2908C20.0964 11.2908 20.0964 13.4818 21.7656 13.4818C21.815 13.4818 21.859 13.4817 21.9084 13.4763H49.0231C49.0725 13.4817 49.1164 13.4818 49.1659 13.4818C50.8406 13.4818 50.8406 11.2908 49.1659 11.2908C49.1164 11.2908 49.0725 11.2963 49.0231 11.2963H21.9084C21.859 11.2963 21.815 11.2908 21.7656 11.2908Z" fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3422 4.15796C13.3037 4.15796 13.2598 4.15796 13.2049 4.16346H7.06044C6.32464 4.16346 5.81396 4.76195 5.81396 5.43735V13.8552C5.81396 14.5306 6.32464 15.129 7.06044 15.129H15.6265C16.2854 15.0577 16.796 14.5306 16.796 13.7838V11.527C16.7192 10.7747 16.1371 10.3958 15.5606 10.3958C14.9785 10.3958 14.4129 10.7747 14.38 11.527V12.5812H8.23004V6.7168H13.2049C13.2598 6.7168 13.3037 6.7223 13.3422 6.7223C14.9895 6.7223 14.9895 4.15796 13.3422 4.15796Z" fill="#F9A419" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1748 4.15244C16.8618 4.15244 16.5324 4.28424 16.2578 4.58625L12.0297 8.8528L10.7503 7.48004C10.4703 7.17254 10.1463 7.05172 9.82786 7.05172C8.87242 7.05172 8.01581 8.21579 8.86693 9.14377L11.0469 11.461C11.2775 11.6752 11.6563 11.8179 12.0297 11.8179C12.1011 11.8344 12.1561 11.8399 12.2219 11.8399C12.513 11.8399 12.76 11.6972 13.0126 11.461L18.1357 6.24998C18.9868 5.32749 18.1302 4.15244 17.1748 4.15244Z" fill="#F9A419" />
                                <rect x="0.322754" y="22.6711" width="77.6107" height="17.7584" rx="5" fill="#2EC56E" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.7819 27.432C20.0961 27.432 20.0961 30.172 21.7819 30.172C21.8313 30.172 21.8752 30.172 21.9247 30.1665H35.828C35.8774 30.172 35.9214 30.172 35.9708 30.172C37.662 30.172 37.662 27.432 35.9708 27.432C35.9214 27.432 35.8774 27.432 35.828 27.4375H21.9247C21.8752 27.432 21.8313 27.432 21.7819 27.432Z" fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.7656 33.4721C20.0964 33.4721 20.0964 35.663 21.7656 35.663C21.815 35.663 21.859 35.663 21.9084 35.6575H49.0231C49.0725 35.663 49.1164 35.663 49.1659 35.663C50.8406 35.663 50.8406 33.4721 49.1659 33.4721C49.1164 33.4721 49.0725 33.4776 49.0231 33.4776H21.9084C21.859 33.4776 21.815 33.4721 21.7656 33.4721Z" fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3422 26.3393C13.3037 26.3393 13.2598 26.3393 13.2049 26.3448H7.06044C6.32464 26.3448 5.81396 26.9433 5.81396 27.6187V36.0365C5.81396 36.7119 6.32464 37.3104 7.06044 37.3104H15.6265C16.2854 37.239 16.796 36.7119 16.796 35.9651V33.7083C16.7192 32.956 16.1371 32.5771 15.5606 32.5771C14.9785 32.5771 14.4129 32.956 14.38 33.7083V34.7625H8.23004V28.8981H13.2049C13.2598 28.8981 13.3037 28.9036 13.3422 28.9036C14.9895 28.9036 14.9895 26.3393 13.3422 26.3393Z" fill="#F9A419" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1748 26.3338C16.8618 26.3338 16.5324 26.4656 16.2578 26.7676L12.0297 31.0342L10.7503 29.6614C10.4703 29.3539 10.1463 29.2331 9.82786 29.2331C8.87242 29.2331 8.01581 30.3972 8.86693 31.3251L11.0469 33.6424C11.2775 33.8566 11.6563 33.9993 12.0297 33.9993C12.1011 34.0157 12.1561 34.0213 12.2219 34.0213C12.513 34.0213 12.76 33.8785 13.0126 33.6424L18.1357 28.4313C18.9868 27.5089 18.1302 26.3338 17.1748 26.3338Z" fill="#F9A419" />
                                <rect x="0.322754" y="44.3759" width="77.6107" height="18.4161" rx="5" fill="#2EC56E" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.7819 49.6134C20.0961 49.6134 20.0961 52.3534 21.7819 52.3534C21.8313 52.3534 21.8752 52.3534 21.9247 52.3479H35.828C35.8774 52.3534 35.9214 52.3534 35.9708 52.3534C37.662 52.3534 37.662 49.6134 35.9708 49.6134C35.9214 49.6134 35.8774 49.6134 35.828 49.6189H21.9247C21.8752 49.6134 21.8313 49.6134 21.7819 49.6134Z" fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.7656 55.6536C20.0964 55.6536 20.0964 57.8445 21.7656 57.8445C21.815 57.8445 21.859 57.8445 21.9084 57.839H49.0231C49.0725 57.8445 49.1164 57.8445 49.1659 57.8445C50.8406 57.8445 50.8406 55.6536 49.1659 55.6536C49.1164 55.6536 49.0725 55.6591 49.0231 55.6591H21.9084C21.859 55.6591 21.815 55.6536 21.7656 55.6536Z" fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3422 48.5208C13.3037 48.5208 13.2598 48.5208 13.2049 48.5263H7.06044C6.32464 48.5263 5.81396 49.1248 5.81396 49.8002V58.218C5.81396 58.8934 6.32464 59.4919 7.06044 59.4919H15.6265C16.2854 59.4205 16.796 58.8934 16.796 58.1466V55.8898C16.7192 55.1375 16.1371 54.7586 15.5606 54.7586C14.9785 54.7586 14.4129 55.1375 14.38 55.8898V56.944H8.23004V51.0796H13.2049C13.2598 51.0796 13.3037 51.0851 13.3422 51.0851C14.9895 51.0851 14.9895 48.5208 13.3422 48.5208Z" fill="#F9A419" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1748 48.5152C16.8618 48.5152 16.5324 48.647 16.2578 48.949L12.0297 53.2156L10.7503 51.8428C10.4703 51.5353 10.1463 51.4145 9.82786 51.4145C8.87242 51.4145 8.01581 52.5786 8.86693 53.5066L11.0469 55.8238C11.2775 56.038 11.6563 56.1807 12.0297 56.1807C12.1011 56.1972 12.1561 56.2027 12.2219 56.2027C12.513 56.2027 12.76 56.06 13.0126 55.8238L18.1357 50.6128C18.9868 49.6903 18.1302 48.5152 17.1748 48.5152Z" fill="#F9A419" />
                                <rect x="0.322754" y="66.7383" width="77.6107" height="18.4161" rx="5" fill="#2EC56E" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.7819 71.9758C20.0961 71.9758 20.0961 74.7159 21.7819 74.7159C21.8313 74.7159 21.8752 74.7158 21.9247 74.7104H35.828C35.8774 74.7158 35.9214 74.7159 35.9708 74.7159C37.662 74.7159 37.662 71.9758 35.9708 71.9758C35.9214 71.9758 35.8774 71.9758 35.828 71.9813H21.9247C21.8752 71.9758 21.8313 71.9758 21.7819 71.9758Z" fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.7656 78.016C20.0964 78.016 20.0964 80.2069 21.7656 80.2069C21.815 80.2069 21.859 80.2069 21.9084 80.2014H49.0231C49.0725 80.2069 49.1164 80.2069 49.1659 80.2069C50.8406 80.2069 50.8406 78.016 49.1659 78.016C49.1164 78.016 49.0725 78.0215 49.0231 78.0215H21.9084C21.859 78.0215 21.815 78.016 21.7656 78.016Z" fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3422 70.8832C13.3037 70.8832 13.2598 70.8832 13.2049 70.8887H7.06044C6.32464 70.8887 5.81396 71.4872 5.81396 72.1626V80.5804C5.81396 81.2558 6.32464 81.8543 7.06044 81.8543H15.6265C16.2854 81.7829 16.796 81.2558 16.796 80.509V78.2522C16.7192 77.4999 16.1371 77.121 15.5606 77.121C14.9785 77.121 14.4129 77.4999 14.38 78.2522V79.3064H8.23004V73.442H13.2049C13.2598 73.442 13.3037 73.4475 13.3422 73.4475C14.9895 73.4475 14.9895 70.8832 13.3422 70.8832Z" fill="#F9A419" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1748 70.8777C16.8618 70.8777 16.5324 71.0095 16.2578 71.3115L12.0297 75.578L10.7503 74.2053C10.4703 73.8978 10.1463 73.7769 9.82786 73.7769C8.87242 73.7769 8.01581 74.941 8.86693 75.869L11.0469 78.1863C11.2775 78.4004 11.6563 78.5431 12.0297 78.5431C12.1011 78.5596 12.1561 78.5651 12.2219 78.5651C12.513 78.5651 12.76 78.4224 13.0126 78.1863L18.1357 72.9752C18.9868 72.0527 18.1302 70.8777 17.1748 70.8777Z" fill="#F9A419" />
                            </svg>
                            </div>
                            <div className="my-auto">Rekomendasi Belajar</div>
                        </Card>
                    </Link>
                </div>
            </div>
        </>

    );
};

export default HomeLand;

'use client'
import React, { useState } from "react";
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
import child from "../../../../../../../../../public/images/background/child.png"
import Link from "next/link";
import ProtectedRoute from "../../../../ProtectedRoute";

const Done = () => {
    return (
        <ProtectedRoute>
            <div className="position-fixed bg-white w-100 d-flex justify-content-center align-items-center" style={{ height: '100vh', zIndex: '99999', top: 0, left: 0 }}>
                <div className="w-50 py-5 d-flex flex-column justify-content-between align-items-center h-100">
                    <section className="text-center">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_485_1753)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M64.1475 33.5299C62.4314 27.1254 58.2414 21.6649 52.4993 18.3497C46.7572 15.0345 39.9333 14.1361 33.5288 15.8522C27.1243 17.5683 21.6639 21.7582 18.3487 27.5003C15.0335 33.2425 14.1351 40.0663 15.8512 46.4708C17.5672 52.8753 21.7572 58.3358 27.4993 61.651C33.2414 64.9662 40.0653 65.8646 46.4698 64.1485C52.8743 62.4324 58.3347 58.2425 61.6499 52.5003C64.9652 46.7582 65.8635 39.9344 64.1475 33.5299ZM30.9406 6.19294C49.612 1.18997 68.8037 12.2703 73.8067 30.9417C78.8097 49.613 67.7293 68.8048 49.058 73.8078C30.3866 78.8107 11.1949 67.7304 6.19191 49.059C1.18893 30.3877 12.2693 11.1959 30.9406 6.19294Z" fill="#27B262" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M64.1465 33.5308C62.4917 27.3014 58.4827 21.958 52.9648 18.627C51.8562 17.9277 51.0665 16.821 50.7658 15.5452C50.465 14.2694 50.6773 12.9265 51.3569 11.8057C52.0365 10.6849 53.129 9.87572 54.3993 9.55246C55.6695 9.2292 57.016 9.41767 58.1486 10.0773C59.8924 11.1331 61.5352 12.3355 63.0769 13.6847C68.2874 18.2444 72.0224 24.2523 73.8058 30.9426C74.149 32.2235 73.9693 33.5882 73.3063 34.7367C72.6433 35.8851 71.5512 36.7231 70.2703 37.0663C68.9894 37.4095 67.6246 37.2298 66.4762 36.5668C65.3277 35.9037 64.4898 34.8117 64.1465 33.5308Z" fill="#27B262" />
                                <path d="M24.9657 36.9239C26.2534 35.6363 28.3411 35.6363 29.6287 36.9239L38.364 45.6592C39.6517 46.9469 39.6517 49.0345 38.364 50.3222C37.0764 51.6098 34.9887 51.6098 33.701 50.3222L24.9657 41.5869C23.6781 40.2992 23.6781 38.2115 24.9657 36.9239Z" fill="#27B262" />
                                <path d="M55.0575 28.9657C56.3451 30.2534 56.3451 32.3411 55.0575 33.6287L38.364 50.3222C37.0764 51.6098 34.9887 51.6098 33.701 50.3222C32.4134 49.0345 32.4134 46.9468 33.701 45.6592L50.3945 28.9657C51.6821 27.6781 53.7698 27.6781 55.0575 28.9657Z" fill="#27B262" />
                            </g>
                            <defs>
                                <clipPath id="clip0_485_1753">
                                    <rect width="80" height="80" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <h5>
                            Pemabayaran Selesai
                        </h5>
                    </section>
                    <section className="d-flex flex-column align-items-center">
                        <Image src={child} alt="" />
                        <Link href="/pages/tryout">
                            <Button className="rounded-5 bg-primy border-0 px-5">Kembali Ke Try Out Saya</Button>
                        </Link>
                    </section>
                </div>
            </div>
        </ProtectedRoute>
    );
};
export default Done;

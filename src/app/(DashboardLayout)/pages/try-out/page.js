'use client'

import { useRouter } from "next/navigation";
import { Button, Col, Row } from "reactstrap"

export default function Try_out() {
    const router = useRouter();

    const handleSignIn = () =>{
        router.push('/pages/login');
    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center w-100" style={{ height: '80vh' }}>
                <Row className="d-flex pt-4 justify-content-center w-100">
                    <Col xs='12' sm='12' lg='2' className='d-flex justify-content-end'>
                        <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="34" cy="34" r="34" fill="#F9A419" fill-opacity="0.5" />
                            <g filter="url(#filter0_d_2057_1552)">
                                <mask id="mask0_2057_1552" style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="13" y="10" width="42" height="49">
                                    <path d="M54.2326 10H13V58.972H54.2326V10Z" fill="white" />
                                </mask>
                                <g mask="url(#mask0_2057_1552)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.0577 10.0024L20.707 21.5664H45.7529L45.1001 10.0024H22.0577Z" fill="#166739" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.1131 10.0024L15.7244 13.1895C13.4909 14.2973 12.6165 17 13.6658 19.2581L20.2314 32.8087L21.8946 36.219L32.2675 31.0816L29.7276 25.7228L22.1131 10.0024Z" fill="#27B262" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M45.1195 10.0024L37.5485 25.7228L34.9651 31.0816L45.338 36.219L47.0011 32.8087L53.5667 19.2581C54.6161 17 53.7417 14.2973 51.5078 13.1895L45.1195 10.0024Z" fill="#27B262" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.7035 25.8101C25.7945 26.8211 22.4497 29.3237 20.3218 32.8373L21.9726 36.2191L32.2677 31.1245L29.7035 25.8101Z" fill="#166739" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M37.5292 25.8101L34.9651 31.1245L45.2601 36.2191L46.911 32.8373C44.7831 29.3237 41.4382 26.8211 37.5292 25.8101Z" fill="#166739" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M33.5699 27.3525C19.6164 27.3525 12.6169 44.3794 22.4845 54.3388C25.4787 57.3612 29.4841 58.9722 33.5514 58.9722C35.5676 58.9722 37.5961 58.5758 39.5275 57.7618C45.3956 55.3491 49.2213 49.5573 49.2213 43.1936C49.2213 34.4612 42.2218 27.3525 33.5699 27.3525Z" fill="#F9A419" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M33.6553 32.751C24.2385 32.751 19.553 44.1561 26.2095 50.8471C28.3467 52.9961 30.9844 53.9593 33.574 53.9593C38.9947 53.9593 44.2116 49.7392 44.2116 43.3625C44.2116 37.507 39.4822 32.751 33.6553 32.751Z" fill="white" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M33.6579 36.6064C33.0714 36.6064 32.4868 36.9439 32.2086 37.6233L31.5246 39.0608C31.2691 39.5544 30.8425 39.913 30.2888 40.0029L28.7947 40.2273C27.4287 40.3638 26.8745 42.1603 27.8976 43.1471L28.9651 44.2707C29.3489 44.6297 29.5192 45.2128 29.434 45.7511L29.1786 47.3236C29.0098 48.4237 29.8259 49.3272 30.7635 49.3272C31.0151 49.3272 31.273 49.2632 31.5246 49.1197L32.8907 48.4021C33.1261 48.2676 33.382 48.1993 33.6375 48.1993C33.8933 48.1993 34.1492 48.2676 34.3847 48.4021L35.7504 49.1197C36.0062 49.2651 36.274 49.3314 36.5318 49.3314C37.4736 49.3314 38.2975 48.4515 38.0967 47.3236L37.8409 45.7511C37.7557 45.2128 37.9264 44.6297 38.3098 44.2707L39.3776 43.1471C40.358 42.1133 39.8039 40.4089 38.4802 40.2273L36.9865 40.0029C36.4752 39.8683 36.0062 39.5544 35.7931 39.0161L35.1091 37.5782C34.8128 36.9331 34.2344 36.6064 33.6579 36.6064Z" fill="#F9A419" />
                                </g>
                            </g>
                            <defs>
                                <filter id="filter0_d_2057_1552" x="13.2244" y="10.0024" width="40.7839" height="51.9697" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="3" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2057_1552" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2057_1552" result="shape" />
                                </filter>
                            </defs>
                        </svg>
                    </Col>
                    <Col xs='12' sm='12' lg='10'>
                        <span className="d-flex flex-column gap-2">
                            <h1 className="fw-bolder">Try Out</h1>
                            <p className="fs-5">Soal tryout dibuat oleh alumni PTN terbaik dengan sistem penilaian IRT untuk membantu kamu masuk PTN impian!</p>
                            <p className="fs-5">Tunggu apa lagi? Yuk, Daftar <b>Dream Academy!</b></p>
                            <Button className="bg-primy w-25 border-0 rounded-5 px-5" onClick={handleSignIn}>Daftar Sekarang</Button>
                        </span>
                    </Col>
                </Row>
            </div>
        </>
    )
}
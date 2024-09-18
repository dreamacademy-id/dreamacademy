'use client'


import { useRouter } from "next/navigation";
import { Button, Col, Row } from "reactstrap"

export default function RekomendasiBelajar() {
    const router = useRouter();

    const handleSignIn = () =>{
        router.push('/pages/login');
    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center w-100 pt-5 pt-lg-0" style={{ height: '80vh' }}>
                <Row className="d-flex pt-4 justify-content-center w-100">
                    <Col xs='12' sm='12' lg='2' className='d-flex justify-content-lg-end justify-content-center'>
                        <svg className="me-4" width="73" height="68" viewBox="0 0 73 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="34" cy="34" r="34" fill="#F9A419" fill-opacity="0.5" />
                            <rect x="25" y="8" width="48" height="11.3898" rx="5" fill="#27B262" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M38.2717 11.0563C37.2291 11.0563 37.2291 12.7509 38.2717 12.7509C38.3023 12.7509 38.3294 12.7509 38.36 12.7475H46.9588C46.9894 12.7509 47.0165 12.7509 47.0471 12.7509C48.0931 12.7509 48.0931 11.0563 47.0471 11.0563C47.0165 11.0563 46.9894 11.0563 46.9588 11.0597H38.36C38.3294 11.0563 38.3023 11.0563 38.2717 11.0563Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M38.2616 14.7921C37.2292 14.7921 37.2292 16.1471 38.2616 16.1471C38.2922 16.1471 38.3193 16.1471 38.3499 16.1437H55.1196C55.1501 16.1471 55.1773 16.1471 55.2079 16.1471C56.2437 16.1471 56.2437 14.7921 55.2079 14.7921C55.1773 14.7921 55.1501 14.7955 55.1196 14.7955H38.3499C38.3193 14.7955 38.2922 14.7921 38.2616 14.7921Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M33.052 10.3807C33.0282 10.3807 33.001 10.3807 32.9671 10.3841H29.1669C28.7118 10.3841 28.396 10.7543 28.396 11.172V16.3782C28.396 16.7959 28.7118 17.166 29.1669 17.166H34.4647C34.8723 17.1219 35.1881 16.7959 35.1881 16.334V14.9383C35.1406 14.473 34.7806 14.2386 34.424 14.2386C34.064 14.2386 33.7142 14.473 33.6938 14.9383V15.5903H29.8903V11.9633H32.9671C33.001 11.9633 33.0282 11.9667 33.052 11.9667C34.0708 11.9667 34.0708 10.3807 33.052 10.3807Z" fill="#FBBC05" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M35.4223 10.3773C35.2287 10.3773 35.025 10.4588 34.8552 10.6456L32.2402 13.2844L31.4489 12.4353C31.2757 12.2452 31.0754 12.1704 30.8784 12.1704C30.2875 12.1704 29.7577 12.8904 30.2841 13.4643L31.6323 14.8975C31.775 15.0299 32.0093 15.1182 32.2402 15.1182C32.2844 15.1284 32.3183 15.1318 32.3591 15.1318C32.5391 15.1318 32.6919 15.0435 32.8481 14.8975L36.0166 11.6746C36.543 11.1041 36.0132 10.3773 35.4223 10.3773Z" fill="#FBBC05" />
                            <rect x="25" y="21.8306" width="48" height="10.9831" rx="5" fill="#27B262" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M38.2717 24.7749C37.2291 24.7749 37.2291 26.4695 38.2717 26.4695C38.3023 26.4695 38.3294 26.4695 38.36 26.4661H46.9588C46.9894 26.4695 47.0165 26.4695 47.0471 26.4695C48.0931 26.4695 48.0931 24.7749 47.0471 24.7749C47.0165 24.7749 46.9894 24.7749 46.9588 24.7783H38.36C38.3294 24.7749 38.3023 24.7749 38.2717 24.7749Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M38.2616 28.5107C37.2292 28.5107 37.2292 29.8658 38.2616 29.8658C38.2922 29.8658 38.3193 29.8658 38.3499 29.8624H55.1196C55.1501 29.8658 55.1773 29.8658 55.2079 29.8658C56.2437 29.8658 56.2437 28.5107 55.2079 28.5107C55.1773 28.5107 55.1501 28.5141 55.1196 28.5141H38.3499C38.3193 28.5141 38.2922 28.5107 38.2616 28.5107Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M33.052 24.0991C33.0282 24.0991 33.001 24.0991 32.9671 24.1025H29.1669C28.7118 24.1025 28.396 24.4727 28.396 24.8904V30.0966C28.396 30.5143 28.7118 30.8844 29.1669 30.8844H34.4647C34.8723 30.8403 35.1881 30.5143 35.1881 30.0524V28.6566C35.1406 28.1914 34.7806 27.957 34.424 27.957C34.064 27.957 33.7142 28.1914 33.6938 28.6566V29.3087H29.8903V25.6817H32.9671C33.001 25.6817 33.0282 25.6851 33.052 25.6851C34.0708 25.6851 34.0708 24.0991 33.052 24.0991Z" fill="#FBBC05" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M35.4223 24.0958C35.2287 24.0958 35.025 24.1773 34.8552 24.3641L32.2402 27.0029L31.4489 26.1539C31.2757 25.9637 31.0754 25.8889 30.8784 25.8889C30.2875 25.8889 29.7577 26.6089 30.2841 27.1828L31.6323 28.616C31.775 28.7484 32.0093 28.8367 32.2402 28.8367C32.2844 28.8469 32.3183 28.8503 32.3591 28.8503C32.5391 28.8503 32.6919 28.762 32.8481 28.616L36.0166 25.3931C36.543 24.8226 36.0132 24.0958 35.4223 24.0958Z" fill="#FBBC05" />
                            <rect x="25" y="35.2543" width="48" height="11.3898" rx="5" fill="#27B262" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M38.2717 38.4937C37.2291 38.4937 37.2291 40.1883 38.2717 40.1883C38.3023 40.1883 38.3294 40.1883 38.36 40.1849H46.9588C46.9894 40.1883 47.0165 40.1883 47.0471 40.1883C48.0931 40.1883 48.0931 38.4937 47.0471 38.4937C47.0165 38.4937 46.9894 38.4937 46.9588 38.4971H38.36C38.3294 38.4937 38.3023 38.4937 38.2717 38.4937Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M38.2616 42.2292C37.2292 42.2292 37.2292 43.5843 38.2616 43.5843C38.2922 43.5843 38.3193 43.5843 38.3499 43.5809H55.1196C55.1501 43.5843 55.1773 43.5843 55.2079 43.5843C56.2437 43.5843 56.2437 42.2292 55.2079 42.2292C55.1773 42.2292 55.1501 42.2326 55.1196 42.2326H38.3499C38.3193 42.2326 38.2922 42.2292 38.2616 42.2292Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M33.052 37.8179C33.0282 37.8179 33.001 37.8179 32.9671 37.8213H29.1669C28.7118 37.8213 28.396 38.1914 28.396 38.6091V43.8153C28.396 44.233 28.7118 44.6032 29.1669 44.6032H34.4647C34.8723 44.559 35.1881 44.233 35.1881 43.7712V42.3754C35.1406 41.9101 34.7806 41.6758 34.424 41.6758C34.064 41.6758 33.7142 41.9101 33.6938 42.3754V43.0274H29.8903V39.4004H32.9671C33.001 39.4004 33.0282 39.4038 33.052 39.4038C34.0708 39.4038 34.0708 37.8179 33.052 37.8179Z" fill="#FBBC05" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M35.4223 37.8143C35.2287 37.8143 35.025 37.8958 34.8552 38.0826L32.2402 40.7214L31.4489 39.8724C31.2757 39.6822 31.0754 39.6075 30.8784 39.6075C30.2875 39.6075 29.7577 40.3274 30.2841 40.9013L31.6323 42.3345C31.775 42.4669 32.0093 42.5552 32.2402 42.5552C32.2844 42.5654 32.3183 42.5688 32.3591 42.5688C32.5391 42.5688 32.6919 42.4805 32.8481 42.3345L36.0166 39.1116C36.543 38.5411 36.0132 37.8143 35.4223 37.8143Z" fill="#FBBC05" />
                            <rect x="25" y="49.0847" width="48" height="11.3898" rx="5" fill="#27B262" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M38.2717 52.324C37.2291 52.324 37.2291 54.0186 38.2717 54.0186C38.3023 54.0186 38.3294 54.0186 38.36 54.0152H46.9588C46.9894 54.0186 47.0165 54.0186 47.0471 54.0186C48.0931 54.0186 48.0931 52.324 47.0471 52.324C47.0165 52.324 46.9894 52.324 46.9588 52.3274H38.36C38.3294 52.324 38.3023 52.324 38.2717 52.324Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M38.2616 56.0596C37.2292 56.0596 37.2292 57.4146 38.2616 57.4146C38.2922 57.4146 38.3193 57.4146 38.3499 57.4112H55.1196C55.1501 57.4146 55.1773 57.4146 55.2079 57.4146C56.2437 57.4146 56.2437 56.0596 55.2079 56.0596C55.1773 56.0596 55.1501 56.063 55.1196 56.063H38.3499C38.3193 56.063 38.2922 56.0596 38.2616 56.0596Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M33.052 51.6482C33.0282 51.6482 33.001 51.6482 32.9671 51.6516H29.1669C28.7118 51.6516 28.396 52.0217 28.396 52.4395V57.6456C28.396 58.0633 28.7118 58.4335 29.1669 58.4335H34.4647C34.8723 58.3893 35.1881 58.0633 35.1881 57.6015V56.2057C35.1406 55.7404 34.7806 55.5061 34.424 55.5061C34.064 55.5061 33.7142 55.7404 33.6938 56.2057V56.8577H29.8903V53.2308H32.9671C33.001 53.2308 33.0282 53.2342 33.052 53.2342C34.0708 53.2342 34.0708 51.6482 33.052 51.6482Z" fill="#FBBC05" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M35.4223 51.6448C35.2287 51.6448 35.025 51.7263 34.8552 51.9131L32.2402 54.5518L31.4489 53.7028C31.2757 53.5126 31.0754 53.4379 30.8784 53.4379C30.2875 53.4379 29.7577 54.1578 30.2841 54.7318L31.6323 56.1649C31.775 56.2974 32.0093 56.3856 32.2402 56.3856C32.2844 56.3958 32.3183 56.3992 32.3591 56.3992C32.5391 56.3992 32.6919 56.311 32.8481 56.1649L36.0166 52.942C36.543 52.3715 36.0132 51.6448 35.4223 51.6448Z" fill="#FBBC05" />
                        </svg>
                    </Col>
                    <Col xs='12' sm='12' lg='10'>
                        <span className="d-flex flex-column gap-2 text-center text-lg-start mt-3 mt-lg-0">
                            <h1 className="fw-bolder">Rekomendasi Belajar</h1>
                            <p className="fs-5">Evaluasi tryout makin mudah rengan Rekomendasi Belajar! <b> Dream Academy</b> akan kasih tahu materi mana <br /> yang perlu kamu pelajari lebih lanjut!</p>
                            <p className="fs-5">Tunggu apa lagi? Yuk, Daftar <b>Dream Academy!</b></p>
                            <Button className="bg-primy w-25 w-lg-75 mx-auto mx-lg-0 border-0 rounded-5 px-5" onClick={handleSignIn}>Daftar Sekarang</Button>
                        </span>
                    </Col>
                </Row>
            </div>
        </>
    )
}
'use client'

import { Button, Card, Form, FormGroup, Input, Label } from "reactstrap"
import bgLogin1 from "../../../../../public/images/background/bg1Login.svg";
import bgLogin2 from "../../../../../public/images/background/bg2Login.svg";
import bgLogin3 from "../../../../../public/images/background/loginbg3.svg";
import Image from "next/image";

export default function Login() {
    return (
        <>
            <div className="position-fixed login d-flex justify-content-center align-items-center bg-white pt-5 pb-3" style={{ height: '100vh', width: '100vw', zIndex: '999999', left: 0, top: 0 }}>
                <Card className="h-75 p-3 d-flex flex-column justify-content-between text-center" style={{width: '30%'}}>
                    <section>
                        <h5>Login</h5>
                    </section>
                    <section>
                        <Form>
                            <FormGroup>
                                <Input
                                    id="exampleEmail"
                                    name="email"
                                    placeholder="email@domain.com"
                                    type="email"
                                />
                            </FormGroup>
                            <Button className="w-100 rounded-3 bg-primer border-0">Sign up with emai</Button>
                            <span className="d-flex align-items-center my-3 fw-light text-secondary">
                                <hr className=" border-black w-50" />
                                <p className="w-100 m-0">or continue with</p>
                                <hr className=" border-black w-50" />
                            </span>
                            <Button className="w-100 rounded-3 bg-graylg border-0 text-black d-flex align-items-center">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_115_940)">
                                        <path d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.8789 15.7789 19.9895 13.221 19.9895 10.1871Z" fill="#4285F4" />
                                        <path d="M10.1993 19.9314C12.9527 19.9314 15.2643 19.0456 16.9527 17.5175L13.7346 15.0814C12.8734 15.6683 11.7176 16.078 10.1993 16.078C7.50242 16.078 5.21352 14.3396 4.39759 11.9368L4.27799 11.9467L1.13003 14.3274L1.08887 14.4392C2.76588 17.6946 6.2106 19.9314 10.1993 19.9314Z" fill="#34A853" />
                                        <path d="M4.39748 11.9368C4.18219 11.3167 4.05759 10.6523 4.05759 9.96583C4.05759 9.27927 4.18219 8.61492 4.38615 7.99484L4.38045 7.86278L1.19304 5.44385L1.08876 5.49232C0.397576 6.84324 0.000976562 8.36026 0.000976562 9.96583C0.000976562 11.5714 0.397576 13.0884 1.08876 14.4393L4.39748 11.9368Z" fill="#FBBC05" />
                                        <path d="M10.1993 3.85336C12.1142 3.85336 13.406 4.66168 14.1425 5.33718L17.0207 2.59107C15.253 0.985496 12.9527 0 10.1993 0C6.2106 0 2.76588 2.23672 1.08887 5.49214L4.38626 7.99466C5.21352 5.59183 7.50242 3.85336 10.1993 3.85336Z" fill="#EB4335" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_115_940">
                                            <rect width="20" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p className="m-0 text-center w-100">Google</p>
                            </Button>
                            <p className="text-secondary-emphasis fw-light">By clicking continue, you agree to our <b>Term of Service and</b> and <b>Privacy Policy</b></p>
                        </Form>
                    </section>
                    <section>
                        <Button className="w-100 rounded-3 bg-graylg border-0 text-black">Register</Button>
                    </section>
                </Card>
                {/* <Image src={bgLogin2} alt="" className="position-absolute" style={{bottom: '-50%', left: '-50%'}} />
                <Image src={bgLogin1} alt="" className="position-absolute" style={{top: '2%', left: '42%'}} /> */}
                {/* <Image src={bgLogin3} alt="" className="position-absolute" style={{top: '-20%', left: '0%'}} /> */}
            </div>
        </>
    )
}
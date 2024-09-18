'use client'

import { Button, Card, Form, FormGroup, Input, Label } from "reactstrap"
import bgLogin1 from "../../../../../public/images/background/bg1Login.svg";
import bgLogin2 from "../../../../../public/images/background/bg2Login.svg";
import bgLogin3 from "../../../../../public/images/background/loginbg3.svg";
import Image from "next/image";
import { auth, provider } from "../../../../../public/firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth"; // Firebase imports
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    // Handle login with email and password
    const handleEmailLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            alert('Login successful!');
            router.push("/"); // Redirect after successful login
        } catch (error) {
            console.error("Error during login: ", error.message);
            alert("Error during login: " + error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            alert('Signed in with Google!');
            router.push("/");
        } catch (error) {
            console.error("Error during Google Sign-In: ", error.message);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="position-fixed login d-flex justify-content-center align-items-center bg-white pt-5 pb-3" style={{ height: '100vh', width: '100%', zIndex: '999999', left: 0, top: 0 }}>
                <Card className="h-75 w-lg-90 p-3 d-flex flex-column justify-content-between text-center" style={{ width: '30%' }}>
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
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup className="border border-1 d-flex justify-content-between rounded-2" style={{borderColor: '#dee2e8'}}>
                                <Input
                                    id="examplePassword"
                                    name="password"
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"} // Switch between text and password
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border-0"
                                />
                                <Button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className='bg-transparent border-0'>
                                    {showPassword ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.68 10.7074C22.9646 11.0622 23.1223 11.5234 23.1223 11.9999C23.1223 12.4782 22.9646 12.9376 22.68 13.2925C20.88 15.4714 16.7829 19.7142 12 19.7142C7.21715 19.7142 3.12 15.4714 1.32 13.2925C1.02964 12.9246 0.8736 12.4686 0.877719 11.9999C0.877719 11.5234 1.03543 11.0622 1.32 10.7074C3.12 8.5285 7.21715 4.28564 12 4.28564C16.7829 4.28564 20.88 8.5285 22.68 10.7074Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 15.4284C12.9093 15.4284 13.7814 15.0672 14.4244 14.4242C15.0674 13.7812 15.4286 12.9092 15.4286 11.9999C15.4286 11.0905 15.0674 10.2185 14.4244 9.57549C13.7814 8.93251 12.9093 8.57129 12 8.57129C11.0907 8.57129 10.2186 8.93251 9.57564 9.57549C8.93266 10.2185 8.57143 11.0905 8.57143 11.9999C8.57143 12.9092 8.93266 13.7812 9.57564 14.4242C10.2186 15.0672 11.0907 15.4284 12 15.4284Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                        :
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22.0828 11.3953C21.2589 9.65947 20.2784 8.24385 19.1414 7.14838L17.9489 8.34088C18.9213 9.27018 19.7684 10.4859 20.5008 11.9999C18.5508 16.0359 15.7828 17.9531 12 17.9531C10.8645 17.9531 9.81867 17.7782 8.86242 17.4285L7.57031 18.7206C8.89844 19.3339 10.375 19.6406 12 19.6406C16.5047 19.6406 19.8656 17.2945 22.0828 12.6023C22.1719 12.4136 22.2182 12.2075 22.2182 11.9988C22.2182 11.7901 22.1719 11.584 22.0828 11.3953ZM20.5929 3.88025L19.5937 2.87994C19.5763 2.86251 19.5557 2.84868 19.5329 2.83924C19.5101 2.82981 19.4857 2.82495 19.4611 2.82495C19.4365 2.82495 19.4121 2.82981 19.3893 2.83924C19.3665 2.84868 19.3458 2.86251 19.3284 2.87994L16.7651 5.44213C15.3518 4.72025 13.7634 4.35932 12 4.35932C7.49531 4.35932 4.13437 6.70541 1.91719 11.3976C1.82807 11.5863 1.78185 11.7924 1.78185 12.0011C1.78185 12.2098 1.82807 12.4159 1.91719 12.6046C2.80297 14.4703 3.86937 15.9656 5.1164 17.0908L2.63625 19.5703C2.60111 19.6054 2.58137 19.6531 2.58137 19.7028C2.58137 19.7525 2.60111 19.8002 2.63625 19.8353L3.63679 20.8359C3.67195 20.871 3.71963 20.8908 3.76933 20.8908C3.81904 20.8908 3.86671 20.871 3.90187 20.8359L20.5929 4.14557C20.6103 4.12815 20.6242 4.10747 20.6336 4.08471C20.643 4.06195 20.6479 4.03755 20.6479 4.01291C20.6479 3.98827 20.643 3.96387 20.6336 3.94111C20.6242 3.91835 20.6103 3.89767 20.5929 3.88025ZM3.49922 11.9999C5.45156 7.96401 8.21953 6.04682 12 6.04682C13.2783 6.04682 14.4405 6.26619 15.495 6.71221L13.8473 8.35986C13.067 7.94353 12.1736 7.78901 11.2988 7.91911C10.4239 8.04921 9.61412 8.45704 8.98873 9.08242C8.36334 9.70781 7.95552 10.5176 7.82542 11.3925C7.69532 12.2673 7.84983 13.1607 8.26617 13.941L6.31101 15.8962C5.2289 14.9411 4.29609 13.6471 3.49922 11.9999ZM9.28125 11.9999C9.28166 11.5867 9.37955 11.1793 9.56698 10.811C9.7544 10.4426 10.0261 10.1237 10.3599 9.88004C10.6938 9.63642 11.0804 9.47498 11.4883 9.40884C11.8963 9.3427 12.3141 9.37373 12.7078 9.4994L9.4057 12.8015C9.32294 12.5424 9.28095 12.272 9.28125 11.9999Z" fill="black" />
                                            <path d="M11.9062 14.6249C11.8251 14.6249 11.7452 14.6212 11.666 14.6139L10.428 15.8519C11.1726 16.137 11.9839 16.2004 12.7637 16.0343C13.5435 15.8683 14.2586 15.4798 14.8224 14.916C15.3862 14.3523 15.7746 13.6372 15.9406 12.8574C16.1067 12.0776 16.0433 11.2663 15.7582 10.5217L14.5202 11.7597C14.5275 11.8389 14.5312 11.9188 14.5312 11.9999C14.5314 12.3447 14.4637 12.6861 14.3318 13.0047C14.2 13.3233 14.0066 13.6127 13.7628 13.8565C13.519 14.1003 13.2296 14.2936 12.911 14.4255C12.5924 14.5573 12.251 14.6251 11.9062 14.6249Z" fill="black" />
                                        </svg>
                                    }
                                </Button>
                            </FormGroup>
                            <Button className="w-100 rounded-3 bg-primer border-0" onClick={handleEmailLogin}>
                                Sign in with email
                            </Button>
                            <span className="d-flex align-items-center my-3 fw-light text-secondary">
                                <hr className="border-black w-50" />
                                <p className="w-100 m-0">or continue with</p>
                                <hr className="border-black w-50" />
                            </span>
                            <Button onClick={handleGoogleSignIn} className="w-100 rounded-3 bg-graylg border-0 text-black d-flex align-items-center btnHover">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_115_940)">
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
                        </Form>
                    </section>
                    <section>
                        <Link href={'/pages/register'}>
                            <Button className="w-100 rounded-3 bg-graylg border-0 text-black btnHover">Register</Button>
                        </Link>
                    </section>
                </Card>
            </div>
        </>
    );
}

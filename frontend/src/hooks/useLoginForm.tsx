import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, signup } from "../store/actions/user-actions";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface useLoginFormProps {
    isLogin: boolean;
}
export const useLoginForm = ({ isLogin }: useLoginFormProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const { pathname } = useLocation();
    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        username: "",
        password: "",
        email: "",
        confirmPassword: "",
    });
    // Validate inputs.
    const validateInput = (name: string, value: string) => {
        let errorMessage = "";
        if (name === "username") {
            if (value.length < 8) {
                errorMessage = "At least 8 char long.";
            }
        } else if (name === "password") {
            if (value.length < 8) {
                errorMessage = "At least 8 char long.";
            } else if (!/\d/.test(value)) {
                errorMessage = "Password must contain at least one number.";
            } else if (!/[!@#$%^&*]/.test(value)) {
                errorMessage =
                    "Password must contain at least one special character.";
            } else if (!/[A-Z]/.test(value)) {
                errorMessage =
                    "Password must contain at least one uppercase letter.";
            }
        } else if (name === "confirmPassword") {
            if (value !== password) {
                errorMessage = "Passwords do not match.";
            }
        } else if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = "Email is not valid.";
            }
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        validateInput("password", password);
        validateInput("email", email);

        // Validate inputs ONLY if it is signup.
        if (!isLogin) {
            validateInput("username", username);
            validateInput("confirmPassword", confirmPassword);
        }

        // Check if there are any errors
        if (Object.values(errors).every((val: string) => val === "")) {
            const userToLogin: any = { password };
            userToLogin[username !== "" ? "username" : "email"] =
                username !== "" ? username : email;
            // Try dispatch in accordance to the /<path>.
            try {
                if (pathname == "/signup") {
                    dispatch(signup({ username, password, email }));
                    navigate("/");
                } else if (pathname == "/home") {
                    dispatch(signup({ username, password, email }));
                    navigate("/home");
                } else {
                    const a = await dispatch(login({ ...userToLogin }));
                    a();
                    navigate("/home");
                }
            } catch (error) {
                const errorMessage = "User Not exsit.";
                setErrors((prevErrors) => ({ ...prevErrors, ["password"]: errorMessage }));
                throw Error(error);
            }
            // Clean inputs.
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setEmail("");
            setErrors({
                username: "",
                password: "",
                email: "",
                confirmPassword: "",
            });
        }
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        email,
        setEmail,
        errors,
        handleSubmit,
        validateInput,
        confirmPassword,
        setConfirmPassword,
    };
};

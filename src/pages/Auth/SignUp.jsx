import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [info, setInfo] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle SignUp Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Silakan masukkan nama lengkap.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Silakan masukkan alamat email yang valid.");
      return;
    }

    if (!password) {
      setError("Silakan masukkan kata sandi");
      return;
    }

    setError("");
    setInfo("");
    setIsSubmitting(true);

    //SignUp API Call
    try {
      // Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      // Backend now requires email verification before login
      setVerificationSent(true);
      setRegisteredEmail(email);
      setInfo(
        "Kami telah mengirimkan tautan verifikasi ke email Anda. Harap verifikasi untuk masuk.."
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(true);
    }
  };

  const handleResendVerification = async () => {
    setError("");
    setInfo("");
    try {
      await axiosInstance.post(API_PATHS.AUTH.RESEND_VERIFICATION, {
        email: registeredEmail || email,
      });
      setInfo("Verification email resent. Please check your inbox.");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to resend verification email. Please try again.");
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black dark:text-white">
        {verificationSent ? "Email Verification" : "Buat Akun"}
      </h3>
      <p className="text-xs text-slate-700 dark:text-slate-400 mt-[5px] mb-6">
        {verificationSent
          ? "Harap verifikasi alamat email Anda untuk melanjutkan."
          : "Bergabunglah dengan kami dengan memasukkan detail Anda di bawah ini."}
      </p>

      {!verificationSent ? (
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Nama Lengkap"
              placeholder="Aldi Pratama"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Alamat Email"
              placeholder="akbarjuliandi@example.com"
              type="text"
            />

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Kata Sandi"
              placeholder="Minimal 8 Karakter"
              type="password"
            />
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          {info && <p className="text-green-600 text-xs pb-2.5">{info}</p>}

          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "PLEASE WAIT..." : "SIGN UP"}
          </button>

          <p className="text-[13px] text-slate-800 dark:text-slate-300 mt-3">
            Already an account?{" "}
            <button
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => {
                setCurrentPage("login");
              }}
            >
              Login
            </button>
          </p>
        </form>
      ) : (
        <div>
          <div className="bg-purple-50 border border-purple-200 text-purple-800 text-sm p-3 rounded mb-3">
            {info ||
              "Kami telah mengirimkan tautan verifikasi ke email Anda. Mohon verifikasi untuk masuk. Klik link Login dibawah"}
          </div>
          <button
            type="button"
            className="btn-small"
            onClick={handleResendVerification}
          >
            Kirim Verifikasi Email
          </button>
          <p className="text-[13px] text-slate-800 dark:text-slate-300 mt-3">
            Kembali ke{" "}
            <button
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => setCurrentPage("login")}
            >
              Login
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignUp;

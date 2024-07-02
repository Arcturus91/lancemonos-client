// hooks/useAuthVerification.js
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const useAuthVerification = () => {
  const [isVerified, setIsVerified] = useState<null | Boolean>(null);
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const authVerification = await fetch(
          `${process.env.NEXT_PUBLIC_AWS_API_GATEWAY_ROUTE}/prod/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_API_GATEWAY_KEY as string,
            },
            credentials: "include", // This ensures cookies are included
          }
        );

        if (authVerification.ok) {
          const responseData = await authVerification.json();
          console.log("Verification successful:", responseData);
          setIsVerified(true);
        } else {
          console.log("Verification failed");
          setIsVerified(false);
          router.push("/auth");
        }
      } catch (error) {
        console.error("Error during verification:", error);
        setIsVerified(false);
        router.push("/auth");
      }
    };
    verifyToken();
  }, [router]);

  return isVerified;
};

export default useAuthVerification;

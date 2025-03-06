import { NextResponse } from "next/server";
import { axiosBackInstance } from "@/utils/axios";

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    // Make the API call to your backend
    const response = await axiosBackInstance.post("/auth/login", {
      email,
      password,
    });

    // Forward the cookies from the backend to the frontend
    const cookies = response.headers["set-cookie"];
    if (cookies) {
      const nextResponse = NextResponse.json(response.data);
      cookies.forEach((cookie) => {
        nextResponse.headers.append("Set-Cookie", cookie);
      });
      return nextResponse;
    }

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error?.response?.data ||
          "خطایی در احراز هویت رخ داد. لطفا مجددا تلاش کنید!",
      },
      { status: error.response?.status || 500 }
    );
  }
}

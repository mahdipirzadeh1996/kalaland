import { NextResponse } from "next/server";
import { axiosBackInstance } from "@/utils/axios";

export async function GET(request) {
  try {
    // Forward cookies from the incoming request to the backend
    const cookies = request.cookies.getAll().reduce((acc, cookie) => {
      acc[cookie.name] = cookie.value;
      return acc;
    }, {});

    // Make the API call to your backend
    const response = await axiosBackInstance.get("/auth/check", {
      headers: {
        Cookie: Object.entries(cookies)
          .map(([name, value]) => `${name}=${value}`)
          .join("; "),
      },
    });

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

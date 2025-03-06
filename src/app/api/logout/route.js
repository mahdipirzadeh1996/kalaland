import { NextResponse } from "next/server";
import { axiosBackInstance } from "@/utils/axios";

export async function POST(request) {
  try {
    // Make the API call to your backend
    const response = await axiosBackInstance.post("/auth/logout");

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error?.response?.data ||
          "خطایی در خروج از حساب کاربری رخ داد. لطفا مجددا تلاش کنید!",
      },
      { status: error.response?.status || 500 }
    );
  }
}

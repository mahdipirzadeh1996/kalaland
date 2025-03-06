import { NextResponse } from "next/server";
import { axiosBackInstance } from "@/utils/axios";

export async function POST(request) {
  const { userData } = await request.json();

  try {
    // Make the API call to your backend
    const response = await axiosBackInstance.post("/auth/sendemail", {
      userData,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error?.response?.data ||
          "خطایی در ثبت‌نام رخ داد. لطفا مجددا تلاش کنید!",
      },
      { status: error.response?.status || 500 }
    );
  }
}

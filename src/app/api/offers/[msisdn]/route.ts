import { NextResponse, NextRequest } from "next/server";
import { IOffer, IApiResponse } from "@/libs/types";

export async function GET(
  request: NextRequest,
  context: { params: { msisdn: string } } // ❌ No Promise<> here!
): Promise<NextResponse<IApiResponse<IOffer[]>>> {
  try {
    const { msisdn } = context.params; // ✅ Works as expected!

    if (!msisdn || msisdn.length < 9) {
      return NextResponse.json(
        {
          status: "error",
          error: "Invalid MSISDN provided",
        },
        { status: 400 }
      );
    }

    const externalApiUrl = `https://api.kata.africa/kata/v1/get-offers/${msisdn}`;

    const response = await fetch(externalApiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          status: "error",
          error: `External API error: ${
            errorData.message || response.statusText
          }`,
        },
        { status: response.status }
      );
    }

    const externalData = await response.json();
    console.log(externalData);

    const offers: IOffer[] = externalData.data.map((item: any) => ({
      offeringId: item.offeringId,
      offerName: item.offerName || "Unnamed Offer",
      description: item.description || "No description provided",
      offerPrice: parseFloat(item.offerPrice) || 0,
      resourceAmount: item.resourceAmount,
      resourceAccId: item.resourceAccId,
      resourceValue: item.resourceValue,
      offerValidity: parseInt(item.offerValidity) || 0,
      resourceType: item.resourceType || "unknown",
      offerUssdName: item.offerUssdName,
      offerSource: item.offerSource,
      locationId: item.locationId,
      subscribed: item.subscribed || false,
      isActive: true,
    }));

    return NextResponse.json({
      status: "success",
      message: "Offers pulled successfully",
      reference: externalData.reference,
      accountId: externalData.accountId,
      requestReference: externalData.requestReference,
      data: offers,
    });
  } catch (error) {
    console.error("Error fetching offers from external API:", error);
    return NextResponse.json(
      {
        status: "error",
        error: "Failed to fetch offers from external service",
      },
      { status: 500 }
    );
  }
}

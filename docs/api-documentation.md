## Base URL

All API endpoints are relative to the base URL of the Next.js application:
In this case the base url is just the same application url



## Endpoints

### 1. Get Offers

Retrieves available offers for a specific phone number (MSISDN).

- **URL**: `/api/offers/:msisdn`
- **Method**: `GET`
- **URL Params**: 
  - `msisdn` (required): Phone number in international format without the leading plus sign (e.g., `254704145832`)
- **Response**:

```json
{
    "status": "success",
    "message": "Offers pulled successfully",
    "reference": "182e71fdc58911709a48aaacc2",
    "accountId": "",
    "data": [
        {
            "offeringId": 50502021,
            "offerName": "Sh25=1GB + FREE 1GB 1Hr",
            "description": "No description provided",
            "offerPrice": 25,
            "resourceAccId": 5158,
            "resourceValue": 2048,
            "offerValidity": 1,
            "resourceType": "unknown",
            "offerUssdName": "Sh25=1GB + FREE 1GB 1Hr",
            "offerSource": "CVM10",
            "locationId": null,
            "subscribed": false,
            "isActive": true
        },
        {
            "offeringId": 50502021,
            "offerName": "Sh15=500MB 1hr",
            "description": "No description provided",
            "offerPrice": 15,
            "resourceAccId": 5158,
            "resourceValue": 500,
            "offerValidity": 1,
            "resourceType": "unknown",
            "offerUssdName": "Sh15=500MB 1hr",
            "offerSource": "CVM9",
            "locationId": null,
            "subscribed": false,
            "isActive": true
        }
        ]
        }
```

### 2. Purchase Offer

Initiates a purchase for a specific offer using either airtime or M-Pesa as the payment method.

- **URL**: `/api/purchase`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:

```typescript
{
  accountId: string;      // Account identifier
  msisdn: string;         // Phone number without country code
  offeringId: string;     // ID of the offer being purchased
  paymentMode: 'airtime' | 'mpesa';  // Payment method
  price: number | string; // Price in smallest currency unit
  resourceAmount: number | string; // Amount of resource (e.g., data in MB)
  validity: number | string; // Validity period in days
}
```
- **ResponseAirtime**:

```json
{
    "status": "success",
    "message": "Airtime payment processed successfully",
    "requestId": "ab0df96c-ad1a-44e5-90cb-8ef6e0c66e57",
    "data": {
        "requestId": "ab0df96c-ad1a-44e5-90cb-8ef6e0c66e57",
        "accountId": "2401",
        "msisdn": "7037295526",
        "offeringId": "20220124",
        "paymentMode": "airtime",
        "price": 25,
        "resourceAmount": 46080,
        "validity": 30,
        "status": "pending",
        "createdAt": "2025-03-20T07:33:35.782Z",
        "updatedAt": "2025-03-20T07:33:35.782Z",
        "paymentStatus": "completed",
        "paymentDetails": {
            "success": true,
            "message": "Airtime payment processed successfully",
            "transactionId": "AIR1742456015792",
            "timestamp": "2025-03-20T07:33:35.792Z"
        }
    }
}
```
- **ResponseMpesa**:

```json
{
    "status": "success",
    "message": "M-Pesa payment initiated. Please complete payment on your device.",
    "requestId": "d9a63d78-2c46-450a-9e58-8f84a8af7370",
    "data": {
        "requestId": "d9a63d78-2c46-450a-9e58-8f84a8af7370",
        "accountId": "2401",
        "msisdn": "7037295526",
        "offeringId": "20220124",
        "paymentMode": "mpesa",
        "price": 25,
        "resourceAmount": 46080,
        "validity": 30,
        "status": "pending",
        "createdAt": "2025-03-20T07:35:08.164Z",
        "updatedAt": "2025-03-20T07:35:08.164Z",
        "paymentStatus": "completed",
        "paymentDetails": {
            "success": true,
            "message": "M-Pesa payment initiated. Please complete payment on your device.",
            "transactionId": "MPESA1742456108166",
            "timestamp": "2025-03-20T07:35:08.166Z",
            "requestId": "d9a63d78-2c46-450a-9e58-8f84a8af7370"
        }
    }
}
```

### 3. Check Purchase Status

Checks the status of a purchase request, especially useful for M-Pesa payments that require confirmation.

- **URL**: `/api/status/:requestId/:accountId`
- **Method**: `GET`
- **URL Params**: 
  - `requestId` (required): The unique request ID returned from the purchase API
  - `accountId` (required): The account ID used in the purchase request



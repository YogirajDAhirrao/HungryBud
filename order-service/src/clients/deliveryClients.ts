export const deliveryClient = {
  async createDelivery(orderId: String) {
    const response = await fetch(
      `${process.env.DELIVERY_SERVICE_URL}/delivery`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      }
    );
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Delivery service failed: ${response.status} ${text}`);
    }
    return response.json() as Promise<{
      deliveryId: string;
      status: string;
    }>;
  },
};
